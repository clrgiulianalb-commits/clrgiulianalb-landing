"use client";

import { useEffect, useState } from "react";

import { contacto } from "@/content/site";

import { IconoWhatsApp } from "./Iconos";

/** Los CTA de WhatsApp que ya están en la página. */
const CTAS_EN_PAGINA = ["cta-hero", "cta-cierre"];

/**
 * Botón flotante de WhatsApp.
 *
 * Regla: nunca puede haber dos llamados a WhatsApp visibles a la vez. El
 * flotante aparece cuando el CTA del hero salió de pantalla y se esconde
 * de nuevo cuando entra el CTA de cierre.
 */
export function FabWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const objetivos = CTAS_EN_PAGINA.map((id) => document.getElementById(id)).filter(
      (nodo): nodo is HTMLElement => nodo !== null,
    );

    // Si no encontramos los anclajes, el flotante es el único acceso: se muestra.
    if (objetivos.length === 0) {
      setVisible(true);
      return;
    }

    const enPantalla = new Map<Element, boolean>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          enPantalla.set(entrada.target, entrada.isIntersecting);
        }
        setVisible(![...enPantalla.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    objetivos.forEach((nodo) => observador.observe(nodo));
    return () => observador.disconnect();
  }, []);

  return (
    <a
      className="fab"
      data-visible={visible}
      href={contacto.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribirle a Giuliana por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      <IconoWhatsApp size={26} />
    </a>
  );
}
