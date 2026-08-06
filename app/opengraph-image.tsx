import { ImageResponse } from "next/og";

import { identidad } from "@/content/site";

export const alt = `${identidad.nombre} · ${identidad.rol}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tarjeta para cuando el enlace se comparte por WhatsApp o redes. */
export default function Imagen() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#FDF7F4",
          backgroundImage:
            "radial-gradient(40% 50% at 88% 12%, #F8E2DB 0%, transparent 70%), radial-gradient(36% 44% at 8% 92%, #E6DBE9 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7B042F",
          }}
        >
          Counseling
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 86,
            color: "#2B1A20",
            marginTop: 22,
            lineHeight: 1.05,
          }}
        >
          {identidad.nombre}
        </div>

        <div style={{ display: "flex", fontSize: 38, color: "#5C4A4F", marginTop: 20 }}>
          {identidad.rol}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 46,
            height: 4,
            width: 190,
            background: "#F1ACBB",
          }}
        />

        <div style={{ display: "flex", fontSize: 30, color: "#7B042F", marginTop: 40 }}>
          Un espacio para entender lo que te pasa, a tu propio ritmo.
        </div>
      </div>
    ),
    size,
  );
}
