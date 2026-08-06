import { contacto } from "@/content/site";

import { IconoWhatsApp } from "./Iconos";

type Props = {
  children: React.ReactNode;
  /** `id` para que el botón flotante sepa cuándo esconderse. */
  id?: string;
  variante?: "solido" | "inverso";
  ancho?: boolean;
  className?: string;
};

/**
 * Enlace click-to-chat.
 *
 * `wa.me` es el formato oficial: abre la aplicación en el celular y
 * WhatsApp Web en la computadora, sin pasos intermedios. El número y el
 * mensaje precargado salen de content/site.ts.
 */
export function BotonWhatsApp({
  children,
  id,
  variante = "solido",
  ancho = false,
  className,
}: Props) {
  const clases = [
    "boton",
    variante === "inverso" ? "boton--inverso" : "",
    ancho ? "boton--ancho" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      id={id}
      className={clases}
      href={contacto.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconoWhatsApp />
      {children}
    </a>
  );
}
