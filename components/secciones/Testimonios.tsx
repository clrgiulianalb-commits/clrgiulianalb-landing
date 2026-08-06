import { testimonios } from "@/content/site";

/**
 * Aparece sola en cuanto haya testimonios reales cargados en content/site.ts.
 * Mientras el array esté vacío, la sección no se renderiza.
 */
export function Testimonios() {
  if (testimonios.length === 0) return null;

  return (
    <section className="seccion seccion--blush">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(07)</span>
          <h2 className="rotulo__t">Lo que dicen quienes pasaron por acá</h2>
        </div>

        <ul className="testimonios">
          {testimonios.map((testimonio) => (
            <li className="testimonio aparece" key={testimonio.autor}>
              <blockquote className="testimonio__t">{testimonio.texto}</blockquote>
              <p className="testimonio__a">{testimonio.autor}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
