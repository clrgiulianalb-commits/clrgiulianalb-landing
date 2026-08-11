import { contacto, identidad } from "@/content/site";

export function Pie() {
  const anio = new Date().getFullYear();

  return (
    <footer className="pie">
      <div className="contenedor pie__in">
        <div>
          <p className="pie__nombre">{identidad.nombre}</p>
          <p className="pie__rol">
            {identidad.bajadaBreve} · {identidad.modalidad}
          </p>
        </div>

        {/* Sin WhatsApp acá: el contacto ya está en el CTA del cierre y en el
            botón flotante. Repetir el número al pie era ruido. */}
        <div className="pie__enlaces">
          {contacto.instagram && (
            <a
              href={`https://instagram.com/${contacto.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{contacto.instagram}
            </a>
          )}

          {contacto.email && <a href={`mailto:${contacto.email}`}>{contacto.email}</a>}

          <span>© {anio}</span>
        </div>
      </div>
    </footer>
  );
}
