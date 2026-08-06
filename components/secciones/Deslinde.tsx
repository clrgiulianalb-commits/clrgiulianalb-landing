import { deslinde } from "@/content/site";

/**
 * El bloque cromáticamente más fuerte de la página es, a propósito, el que
 * dice qué NO es este espacio. La claridad sobre el alcance profesional no va
 * en letra chica: es parte del encuadre y protege a las dos partes.
 */
export function Deslinde() {
  return (
    <section className="seccion seccion--vino">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(06)</span>
          <h2 className="rotulo__t">{deslinde.titulo}</h2>
        </div>

        <div className="medida aparece">
          {deslinde.parrafos.map((parrafo) => (
            <p className="deslinde__p" key={parrafo}>
              {parrafo}
            </p>
          ))}

          <div className="urgencias">
            <h3 className="urgencias__t">{deslinde.urgencias.titulo}</h3>
            <p className="urgencias__p">{deslinde.urgencias.intro}</p>
            <ul className="urgencias__lista">
              {deslinde.urgencias.lineas.map((linea) => (
                <li key={linea.numero}>
                  <a href={`tel:${linea.marcar}`}>{linea.numero}</a>
                  <span className="urgencias__d"> — {linea.detalle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
