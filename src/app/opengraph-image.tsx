import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Waypoints — Drop a Waypoint. Share Your Journey.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #34d399, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 8px 32px rgba(52, 211, 153, 0.3)",
            }}
          >
            W
          </div>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            Waypoints
          </span>
        </div>
        <span
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
          }}
        >
          Drop a Waypoint. Share Your Journey.
        </span>
        <span
          style={{
            fontSize: "20px",
            color: "#52525b",
            marginTop: "16px",
          }}
        >
          waypoints.fyi
        </span>
      </div>
    ),
    { ...size }
  );
}
