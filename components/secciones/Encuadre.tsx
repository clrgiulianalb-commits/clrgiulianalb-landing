import { encuadre } from "@/content/site";

/**
 * La ficha de encuadre baja la ansiedad por transparencia: modalidad,
 * duración, frecuencia, honorarios. Las filas sin dato todavía cargado
 * simplemente no se dibujan.
 */
export function Encuadre() {
  const filas = encuadre.filter((fila) => fila.valor !== null);

  if (filas.length === 0) return null;

  return (
    <section className="seccion seccion--blush">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(05)</span>
          <h2 className="rotulo__t">Encuadre</h2>
        </div>

        <dl className="ficha medida aparece">
          {filas.map((fila) => (
            <div className="ficha__fila" key={fila.etiqueta}>
              <dt className="ficha__et">{fila.etiqueta}</dt>
              <span className="ficha__guia" aria-hidden="true" />
              <dd className="ficha__v">{fila.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
