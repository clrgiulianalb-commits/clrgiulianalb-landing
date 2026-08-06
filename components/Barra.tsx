import { identidad, navegacion } from "@/content/site";

import { BotonWhatsApp } from "./BotonWhatsApp";

export function Barra() {
  return (
    <header className="barra">
      <div className="contenedor barra__in">
        <a className="barra__marca" href="#inicio">
          <span className="barra__nombre">{identidad.nombre}</span>
          <span className="barra__rol">{identidad.rol}</span>
        </a>

        <nav className="barra__nav" aria-label="Secciones de la página">
          {navegacion.map((item) => (
            <a key={item.href} className="barra__link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <BotonWhatsApp className="boton--chico">Escribime</BotonWhatsApp>
      </div>
    </header>
  );
}
