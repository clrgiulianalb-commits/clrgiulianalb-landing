import { pasos } from "@/content/site";

export function ComoTrabajo() {
  return (
    <section className="seccion seccion--blanca" id="como-trabajo">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(03)</span>
          <h2 className="rotulo__t">¿Cómo empezaríamos?</h2>
        </div>

        <ol className="pasos">
          {pasos.map((paso) => (
            <li className="paso aparece" key={paso.titulo}>
              <h3 className="paso__t">{paso.titulo}</h3>
              <p className="paso__d">{paso.detalle}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
