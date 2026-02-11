"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { createServerClient } from "@supabase/ssr";

export default function AddToolPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    pricePerDay: "",
    description: "",
    brand: "",
    model: "",
    condition: "",
    location: "",
  });

  const [images, setImages] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // string[]
  const [loading, setLoading] = useState(false);

  const categories = [
    "Power Tools",
    "Hand Tools",
    "Equipment",
    "Cleaning",
    "Painting",
    "Gardening",
    "Automotive",
    "Other",
  ];

  const conditions = ["Like New", "Excellent", "Good", "Fair", "Acceptable"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    // preview
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const uploadOneImage = async ({ file, ownerId, toolId }) => {
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const filePath = `${ownerId}/${toolId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("tool-photos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("tool-photos").getPublicUrl(filePath);
    const publicUrl = data?.publicUrl;

    // save record in tool_images
    const { error: imgInsertError } = await supabase.from("tool_images").insert({
      tool_id: toolId,
      owner_id: ownerId,
      path: filePath,
      url: publicUrl,
    });

    if (imgInsertError) throw imgInsertError;

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Must be logged in
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        alert("Please sign in first.");
        setLoading(false);
        return;
      }

      const ownerId = session.user.id;

      // 1) Insert tool
      const payload = {
        owner_id: ownerId,
        name: formData.name,
        category: formData.category,
        price_per_day: Number(formData.pricePerDay),
        description: formData.description,
        brand: formData.brand || null,
        model: formData.model || null,
        condition: formData.condition,
        location: formData.location,
        is_available: true,
      };

      const { data: toolRow, error: toolError } = await supabase
        .from("tools")
        .insert(payload)
        .select("id")
        .single();

      if (toolError) throw toolError;

      const toolId = toolRow.id;

      // 2) Upload images (optional but you want required)
      if (images.length === 0) {
        alert("Please add at least 1 image.");
        setLoading(false);
        return;
      }

      for (const file of images) {
        await uploadOneImage({ file, ownerId, toolId });
      }

      alert("Tool listed successfully!");
      window.location.href = "/search";
    } catch (err) {
      console.error(err);
      alert("Error: " + (err?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
            List Your Tool
          </h1>
          <p style={{ color: "#6b7280" }}>
            Share your tools with the community and earn some extra income
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label htmlFor="name" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Tool Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  placeholder="e.g., Power Drill, Circular Saw"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pricePerDay" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Price per Day ($) *
                </label>
                <input
                  type="number"
                  id="pricePerDay"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  placeholder="15.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="condition" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brand" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  placeholder="e.g., DeWalt, Makita"
                />
              </div>

              <div>
                <label htmlFor="model" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                  placeholder="e.g., DCD771C2"
                />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="description" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", minHeight: "100px" }}
                placeholder="Describe your tool..."
                rows="4"
                required
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="location" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Pickup Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                placeholder="Enter your address or neighborhood"
                required
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Add Photos
              </h3>
              <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                <div style={{ color: '#9ca3af', marginBottom: '8px' }}>
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                  PNG, JPG, GIF up to 10MB
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid #d1d5db', marginTop: '16px' }}
                >
                  Select Files
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                 backgroundColor: '#10b981',
                color: '#ffffff',
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer",
                  border: "none",
                }}
              >
                {loading ? "Listing..." : "List Tool"}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                style={{
                  flex: 1,
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  border: "1px solid #d1d5db",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
