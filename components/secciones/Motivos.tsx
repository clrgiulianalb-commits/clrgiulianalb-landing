import { motivos } from "@/content/site";

export function Motivos() {
  return (
    <section className="seccion" id="para-quien">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(01)</span>
          <h2 className="rotulo__t">Para quién es este espacio</h2>
        </div>

        <ul className="motivos">
          {motivos.map((motivo, i) => (
            <li className="motivo aparece" key={motivo.titulo}>
              <span className="motivo__n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="motivo__t">{motivo.titulo}</h3>
              <p className="motivo__d">{motivo.detalle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
