import Image from "next/image";

import { identidad, sobreMi } from "@/content/site";

export function SobreMi() {
  return (
    <section className="seccion" id="sobre-mi">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(04)</span>
          <h2 className="rotulo__t">{sobreMi.titulo}</h2>
        </div>

        <div className="sobre">
          <div className="sobre__media aparece">
            <Image
              className="sobre__logo"
              src={identidad.foto.src}
              width={identidad.foto.width}
              height={identidad.foto.height}
              alt={identidad.foto.alt}
              sizes="(min-width: 56rem) 22rem, 60vw"
            />
          </div>

          <div className="sobre__texto aparece">
            {sobreMi.parrafos.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}

            <p className="sobre__destacada">{sobreMi.destacada}</p>

            {sobreMi.formacion.length > 0 && (
              <ul>
                {sobreMi.formacion.map((item) => (
                  <li key={item.titulo}>
                    <strong>{item.titulo}</strong> · {item.institucion}
                    {item.anio ? ` · ${item.anio}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
