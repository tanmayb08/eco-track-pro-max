'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { supabase } from "@/lib/supabase/client";

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("all");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocationLoading(false);
          loadTools(); // Reload tools with new location
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not get your location. Showing all tools.');
          setLocationLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLocationLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const findItems = () => {
    if (!userLocation) {
      getCurrentLocation();
      return;
    }
    
    // Call the Supabase Database Function if it exists
    supabase.rpc('get_nearby_items', {
      user_lat: userLocation.latitude,
      user_lng: userLocation.longitude,
      radius_meters: 10000 // 10km radius
    }).then(({ data, error }) => {
      if (!error && data) {
        setTools(data);
      } else {
        loadTools(); // Fallback to regular load
      }
    });
  };

  const categories = ["all", "Power Tools", "Hand Tools", "Equipment", "Cleaning", "Painting", "Gardening", "Automotive", "Other"];

  const loadTools = async () => {
    setLoading(true);

    let query = supabase
      .from("tools")
      .select(
        `
        id,name,category,description,price_per_day,location,condition,brand,model,is_available,owner_id,created_at,latitude,longitude,
        tool_images(url)
      `
      )
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (category !== "all") query = query.eq("category", category);
    if (location.trim()) query = query.ilike("location", `%${location.trim()}%`);

    const { data, error } = await query;

    if (error) {
      console.error(error);
      alert("Failed to load tools: " + error.message);
      setTools([]);
    } else {
      let toolsWithDistance = data || [];
      
      // Sort by distance if user location is available
      if (userLocation && toolsWithDistance.length > 0) {
        toolsWithDistance = toolsWithDistance
          .filter(tool => tool.latitude && tool.longitude) // Only tools with coordinates
          .map(tool => ({
            ...tool,
            distance: calculateDistance(
              userLocation.latitude, 
              userLocation.longitude, 
              tool.latitude, 
              tool.longitude
            )
          }))
          .sort((a, b) => a.distance - b.distance); // Sort by distance (closest first)
      }
      
      setTools(toolsWithDistance);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation(); // Get user location on page load
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
            Search Tools
          </h1>
          <p style={{ color: "#000000" }}>Find tools available in your community</p>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label htmlFor="location" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", color: "#000000"}}
              />
            </div>

            <div>
              <label htmlFor="category" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", color: "#000000" }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={findItems}
                style={{ width: "100%", backgroundColor: "#10b981", color: "white", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "500", cursor: "pointer", border: "none" }}
              >
                Search Tools
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Available Tools ({tools.length} found)
          </h2>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            {userLocation ? `📍 Sorted by distance from your location` : location ? `Near ${location}` : "All locations"}
          </div>
        </div>

        {loading && <p style={{ color: "#6b7280" }}>Loading...</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {!loading && tools.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", marginBottom: "8px" }}>
              No tools found
            </h3>
            <p style={{ color: "#6b7280" }}>Try adjusting your search filters or location</p>
          </div>
        )}
      </main>
    </div>
  );
}
