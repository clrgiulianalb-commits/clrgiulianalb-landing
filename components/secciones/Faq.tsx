import { IconoMas } from "@/components/Iconos";
import { faq } from "@/content/site";

/**
 * Acordeón con `<details>` nativo: accesible por teclado y por lector de
 * pantalla sin una línea de JavaScript.
 */
export function Faq() {
  return (
    <section className="seccion" id="preguntas">
      <div className="contenedor">
        <div className="rotulo aparece">
          <span className="rotulo__n">(08)</span>
          <h2 className="rotulo__t">Preguntas frecuentes</h2>
        </div>

        <div className="faq">
          {faq.map((item) => (
            <details className="faq__item aparece" key={item.pregunta}>
              <summary className="faq__q">
                {item.pregunta}
                <IconoMas className="faq__mas" />
              </summary>
              <p className="faq__a">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
