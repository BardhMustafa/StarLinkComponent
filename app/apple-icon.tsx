import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0E1A",
      }}
    >
      <svg width="132" height="132" viewBox="6 6 22 22">
        <path
          d="M17 6c.8 6 4 9.2 11 11-7 1.8-10.2 5-11 11-.8-6-4-9.2-11-11 7-1.8 10.2-5 11-11z"
          fill="#2A3FFB"
        />
        <circle cx="17" cy="17" r="2.4" fill="#FFFFFF" />
      </svg>
    </div>,
    size,
  );
}
