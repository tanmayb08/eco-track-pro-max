import Link from "next/link";

export default function ToolCard({ tool }) {
  const firstImage = tool?.tool_images?.[0]?.url;

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.06)" }}>
      <div style={{ height: "180px", backgroundColor: "#f3f4f6" }}>
        <img
          src={
            firstImage ||
            "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=1200&q=60"
          }
          alt={tool.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ display: "inline-block", backgroundColor: "#10b981", color: "white", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", marginBottom: "10px" }}>
          {tool.category}
        </div>

        <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#111827" }}>
          {tool.name}
        </h3>

        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
          {tool.description}
        </p>

        <div style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginBottom: "10px" }}>
          ${tool.price_per_day}/day
        </div>

        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          Location: {tool.location}
        </div>

        {/* Optional button */}
        <div style={{ marginTop: "14px" }}>
          <Link href={`/tool/${tool.id}`} style={{ color: "#2563eb", fontWeight: "600", fontSize: "14px" }}>
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
