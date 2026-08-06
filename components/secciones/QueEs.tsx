import { queEs } from "@/content/site";

export function QueEs() {
  const [definicion, ...resto] = queEs.parrafos;

  return (
    <section className="seccion seccion--blush" id="counseling">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(02)</span>
          <h2 className="rotulo__t">{queEs.titulo}</h2>
        </div>

        <div className="medida flujo aparece">
          <p className="queEs__cita">{definicion}</p>
          {resto.map((parrafo) => (
            <p className="lead" key={parrafo}>
              {parrafo}
            </p>
          ))}
        </div>

        <p className="queEs__destacada script aparece">{queEs.destacada}</p>

        <p className="queEs__cierre aparece">{queEs.cierre}</p>
      </div>
    </section>
  );
}
