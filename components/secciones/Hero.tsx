import Image from "next/image";

import { BotonWhatsApp } from "@/components/BotonWhatsApp";
import { CirculoAbierto } from "@/components/CirculoAbierto";
import { cierre, hero, identidad } from "@/content/site";

export function Hero() {
  const lineas = hero.titulo;
  const ultima = lineas[lineas.length - 1];

  return (
    <section className="hero" id="inicio">
      <div className="acuarela" aria-hidden="true" />

      <div className="contenedor hero__in">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1 className="hero__titulo">
            {lineas.slice(0, -1).map((linea) => (
              <span key={linea}>{linea}</span>
            ))}
            <span className="script">{ultima}</span>
          </h1>

          <p className="lead hero__bajada">{hero.bajada}</p>

          <div className="hero__acciones">
            <BotonWhatsApp id="cta-hero" ancho>
              {cierre.ctaHero}
            </BotonWhatsApp>
            <p className="hero__micro">{hero.microcopy}</p>
          </div>
        </div>

        <div className="retrato">
          <CirculoAbierto />
          <Image
            className="retrato__foto"
            src={identidad.foto.src}
            width={identidad.foto.width}
            height={identidad.foto.height}
            alt={identidad.foto.alt}
            sizes="(min-width: 62rem) 24rem, 74vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
