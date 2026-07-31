import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RBX.AI — Sisteme AI pentru afaceri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0B",
          color: "#FAFAFA",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: "#86868D",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          RBX.AI · Sisteme AI pentru afaceri
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Clienții tăi primesc răspuns
          <span
            style={{
              background: "#FAFAFA",
              color: "#0A0A0B",
              padding: "0 14px",
              marginLeft: 14,
              borderRadius: 8,
            }}
          >
            instant
          </span>
        </div>
        <div style={{ fontSize: 26, color: "#A1A1A6", marginTop: 30 }}>
          Chiar și la 3 noaptea. · @bogdanrus.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
