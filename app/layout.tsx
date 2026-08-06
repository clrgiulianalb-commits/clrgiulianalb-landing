import type { Metadata, Viewport } from "next";
import { Parisienne, Playfair_Display, Poppins } from "next/font/google";

import { SITIO_URL, contacto, identidad } from "@/content/site";

import "./globals.css";

/* Playfair Display retoma la serif del logo.
   Poppins es la sans geométrica de sus carruseles.
   Parisienne se acerca a su letra manuscrita y se usa en tres frases, no más. */

const display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const texto = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-texto",
});

const script = Parisienne({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-script",
});

const DESCRIPCION =
  "Counseling y consultoría psicológica con Giuliana López Bravo. Un espacio para entender lo que te pasa, a tu propio ritmo. Modalidad virtual.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO_URL),
  title: {
    default: `${identidad.nombre} · ${identidad.rol}`,
    template: `%s · ${identidad.nombre}`,
  },
  description: DESCRIPCION,
  applicationName: identidad.nombre,
  authors: [{ name: identidad.nombre }],
  keywords: [
    "counseling",
    "consultora psicológica",
    "consultoría psicológica",
    "acompañamiento emocional",
    "counseling online",
    "enfoque centrado en la persona",
    "Argentina",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_AR",
    url: SITIO_URL,
    siteName: identidad.nombre,
    title: `${identidad.nombre} · ${identidad.rol}`,
    description: DESCRIPCION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${identidad.nombre} · ${identidad.rol}`,
    description: DESCRIPCION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf7f4",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: identidad.nombre,
  description: DESCRIPCION,
  url: SITIO_URL,
  image: `${SITIO_URL}${identidad.foto.src}`,
  telephone: `+${contacto.whatsapp.numero}`,
  areaServed: "AR",
  availableLanguage: "es",
  provider: {
    "@type": "Person",
    name: identidad.nombre,
    jobTitle: identidad.rol,
    image: `${SITIO_URL}${identidad.foto.src}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${display.variable} ${texto.variable} ${script.variable}`}>
      <body>
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        {children}
        <script
          type="application/ld+json"
          // Contenido propio y estático: no hay entrada de usuario acá.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
