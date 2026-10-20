import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

type OgInput = {
  /** Mono label, e.g. "[ 002 ] LINE CARD". */
  label: string;
  title: string;
  /** Optional muted second half of the title. */
  muted?: string;
  tagline: string;
};

const STAR = "M17 6c.8 6 4 9.2 11 11-7 1.8-10.2 5-11 11-.8-6-4-9.2-11-11 7-1.8 10.2-5 11-11z";

/** 1200×630 card in the Datasheet style: ink panel, cobalt band, lime signal. */
export function renderOgImage({ label, title, muted, tagline }: OgInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F2F3F5",
        padding: 40,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0E1A",
          borderRadius: 36,
          padding: "48px 56px",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 34 34">
              <rect width="34" height="34" rx="9" fill="#161B2B" />
              <path d={STAR} fill="#2A3FFB" />
              <circle cx="17" cy="17" r="2.4" fill="#FFFFFF" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>StarLink</span>
              <span style={{ fontSize: 14, letterSpacing: 5, color: "#8790A6" }}>COMPONENTS</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              color: "#A9B0C2",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#D4FF3A" }} />
            CA · DE · HK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#8790A6" }}>
            {label.toUpperCase()}
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: title.length + (muted?.length ?? 0) > 44 ? 68 : 84,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            {/* One flex item per word so wrapped lines stay flush left. */}
            {[
              ...title.split(" ").map((word) => ({ word, muted: false })),
              ...(muted ?? "")
                .split(" ")
                .filter(Boolean)
                .map((word) => ({ word, muted: true })),
            ].map(({ word, muted: isMuted }, i) => (
              <span key={i} style={{ marginRight: 20, color: isMuted ? "#8790A6" : "#FFFFFF" }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2D3550",
            paddingTop: 22,
            fontSize: 22,
            color: "#A9B0C2",
          }}
        >
          <span>{tagline}</span>
          <span
            style={{
              display: "flex",
              background: "#2A3FFB",
              color: "#FFFFFF",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 20,
            }}
          >
            starlinkcomponents.com
          </span>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
