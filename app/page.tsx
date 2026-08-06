import { Barra } from "@/components/Barra";
import { FabWhatsApp } from "@/components/FabWhatsApp";
import { Pie } from "@/components/Pie";
import { Cierre } from "@/components/secciones/Cierre";
import { ComoTrabajo } from "@/components/secciones/ComoTrabajo";
import { Deslinde } from "@/components/secciones/Deslinde";
import { Encuadre } from "@/components/secciones/Encuadre";
import { Faq } from "@/components/secciones/Faq";
import { Hero } from "@/components/secciones/Hero";
import { Motivos } from "@/components/secciones/Motivos";
import { Puente } from "@/components/secciones/Puente";
import { QueEs } from "@/components/secciones/QueEs";
import { SobreMi } from "@/components/secciones/SobreMi";
import { Testimonios } from "@/components/secciones/Testimonios";

/**
 * El orden sigue el recorrido real de alguien que está considerando pedir
 * ayuda: ¿esto habla de mí? → ¿qué es esto? → ¿puedo confiar en ella? →
 * ¿qué va a pasar? → ¿cómo empiezo?
 */
export default function Pagina() {
  return (
    <>
      <Barra />

      <main id="contenido">
        <Hero />
        <Puente />
        <Motivos />
        <QueEs />
        <ComoTrabajo />
        <SobreMi />
        <Encuadre />
        <Deslinde />
        <Testimonios />
        <Faq />
        <Cierre />
      </main>

      <Pie />
      <FabWhatsApp />
    </>
  );
}
