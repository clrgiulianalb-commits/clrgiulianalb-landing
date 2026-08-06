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

        <nav className="pie__enlaces" aria-label="Contacto y redes">
          <a href={contacto.whatsapp.href} target="_blank" rel="noopener noreferrer">
            WhatsApp {contacto.telefonoVisible}
          </a>

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
        </nav>
      </div>
    </footer>
  );
}
