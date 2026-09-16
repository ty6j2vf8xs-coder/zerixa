import { ImageResponse } from "next/og";

export const alt = "Zerixa — construction materials from Türkiye";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Links to zerixa.ai get a real card in WhatsApp and LinkedIn, not a bare URL. */
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
          background: "#0c0f14",
          color: "#f1f5f9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f59e0b",
              color: "#0c0f14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Z
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>zerixa.ai</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.12,
          }}
        >
          <div>Tiles, sanitaryware and profiles</div>
          <div>from Turkish factories.</div>
        </div>

        <div style={{ marginTop: 28, fontSize: 34, color: "#fbbf24" }}>
          One container. One invoice. One shipment.
        </div>

        <div style={{ marginTop: 40, fontSize: 26, color: "#94a3b8" }}>
          A fast CIF price — factory names included.
        </div>
      </div>
    ),
    size,
  );
}
