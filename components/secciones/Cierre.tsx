import { BotonWhatsApp } from "@/components/BotonWhatsApp";
import { Hoja } from "@/components/Iconos";
import { cierre, contacto } from "@/content/site";

export function Cierre() {
  return (
    <section className="seccion seccion--blanca cierre" id="contacto">
      <div className="acuarela" aria-hidden="true" />

      <div className="contenedor cierre__in aparece">
        <Hoja className="hoja" size={26} />

        <h2 className="cierre__t">{cierre.titulo}</h2>
        <p className="cierre__b">{cierre.bajada}</p>

        <BotonWhatsApp id="cta-cierre">{cierre.cta}</BotonWhatsApp>

        <p className="cierre__extra">
          {contacto.telefonoVisible} · {contacto.compromisoRespuesta}
          {contacto.horarios ? ` · ${contacto.horarios}` : ""}
        </p>
      </div>
    </section>
  );
}
