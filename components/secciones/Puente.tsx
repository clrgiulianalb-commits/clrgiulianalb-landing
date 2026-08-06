import { Hoja } from "@/components/Iconos";
import { puente } from "@/content/site";

/**
 * Una sola frase suya, con todo el aire alrededor.
 * Es el bloque donde el espacio en blanco hace el trabajo.
 */
export function Puente() {
  return (
    <section className="seccion seccion--malva">
      <div className="contenedor puente aparece">
        <Hoja className="hoja" size={26} />
        <p className="puente__frase">{puente.frase}</p>
        <p className="puente__apoyo">{puente.apoyo}</p>
      </div>
    </section>
  );
}
