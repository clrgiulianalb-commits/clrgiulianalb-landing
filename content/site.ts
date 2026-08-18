/**
 * FUENTE ÚNICA DE CONTENIDO
 * =========================
 * Todo el texto, los datos de contacto y los enlaces de la landing viven acá.
 * Para actualizar la página no hace falta tocar ningún componente.
 *
 * Los campos marcados con `PENDIENTE` son datos que todavía no tenemos.
 * Mientras valgan `null` o `[]`, la sección correspondiente NO se renderiza:
 * la página se mantiene coherente y no muestra texto de relleno.
 */

// ---------------------------------------------------------------------------
// Identidad
// ---------------------------------------------------------------------------

export const identidad = {
  nombre: "Giuliana López Bravo",
  nombrePila: "Giuliana",
  rol: "Consultora Psicológica",
  disciplina: "Counseling",
  /** Aparece bajo el nombre en la barra superior y en el footer. */
  bajadaBreve: "Counseling · Consultoría Psicológica",
  /** PENDIENTE: ciudad o zona desde la que atiende. `null` = no se muestra. */
  ciudad: null as string | null,
  modalidad: "Modalidad virtual",
  foto: {
    src: "/giuliana-sobre-mi.svg",
    width: 180,
    height: 270,
    alt: "Retrato de Giuliana López Bravo, consultora psicológica, sonriendo.",
  },
  logo: {
    src: "/logo.png",
    width: 2000,
    height: 2000,
    alt: "Logo de Giuliana López Bravo, Consultora Psicológica.",
  },
} as const;

// ---------------------------------------------------------------------------
// Contacto
// ---------------------------------------------------------------------------

/**
 * Número en formato internacional para el enlace click-to-chat de WhatsApp.
 * Regla oficial: código de país + número, sin "+", sin espacios, sin guiones,
 * sin el 0 de larga distancia y sin el 15.
 *
 *   11-2400-5754  (Buenos Aires)
 *   -> 54 · 9 · 11 · 24005754
 *   -> 5491124005754
 */
const WHATSAPP_E164 = "5491124005754";

const WHATSAPP_MENSAJE =
  "Hola Giuliana, vi tu página y me gustaría coordinar un encuentro.";

export const contacto = {
  telefonoVisible: "11-2400-5754",
  whatsapp: {
    numero: WHATSAPP_E164,
    mensaje: WHATSAPP_MENSAJE,
    /** wa.me abre la app en el celular y WhatsApp Web en la computadora. */
    href: `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`,
  },
  /** PENDIENTE: usuario de Instagram, sin la arroba. Ej.: "giulianalb.counseling" */
  instagram: null as string | null,
  /** PENDIENTE: casilla de mail de contacto. */
  email: null as string | null,
  /** PENDIENTE: franja horaria de atención. Ej.: "Lunes a viernes, 9 a 19 h" */
  horarios: null as string | null,
  compromisoRespuesta: "Respondo personalmente, en el día o al día siguiente.",
} as const;

/** Dominio final del sitio. Se usa para el SEO y las etiquetas Open Graph. */
export const SITIO_URL = "https://giulianalopezbravo.com.ar";

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Counseling · Consultoría Psicológica",
  /** Se parte en líneas para controlar el ritmo de lectura en mobile. */
  titulo: ["A veces no sabés", "qué te pasa,", "pero sabés que algo", "no está bien."],
  bajada:
    "Soy Giuliana, consultora psicológica. Acompaño a personas que están atravesando un momento difícil y necesitan un espacio para entender lo que les pasa, a su propio ritmo.",
  microcopy: "Modalidad virtual · Escribime y coordinamos",
} as const;

// ---------------------------------------------------------------------------
// Frases propias (tomadas de sus publicaciones)
// ---------------------------------------------------------------------------

export const puente = {
  frase: "A veces hay angustia, confusión y malestar aunque la causa no esté clara.",
  apoyo: "No hace falta que tengas claro qué te pasa para empezar a hablarlo.",
} as const;

// ---------------------------------------------------------------------------
// Para quién es este espacio
// ---------------------------------------------------------------------------

export const motivos = [
  {
    titulo: "Momentos de crisis o angustia",
    detalle:
      "Atravesás una situación que te desbordó y necesitás poder ponerla en palabras con alguien.",
  },
  {
    titulo: "Dificultades en los vínculos",
    detalle:
      "Las relaciones con tu familia, tu pareja o tu trabajo te están pesando más de lo que podés sostener sola o solo.",
  },
  {
    titulo: "Necesidad de comprender lo que te pasa",
    detalle:
      "Sentís malestar pero no lográs identificar de dónde viene ni qué hacer con eso.",
  },
  {
    titulo: "Reaccionás y después te arrepentís",
    detalle:
      "Algo se activa antes de que puedas pensarlo, y querés entender qué hay detrás de esa reacción.",
  },
  {
    titulo: "Algo te afecta más de lo que esperabas",
    detalle:
      "Una situación te tocó una fibra que no imaginabas y querés poder mirarla de cerca.",
  },
] as const;

// ---------------------------------------------------------------------------
// Qué es el counseling
// ---------------------------------------------------------------------------

export const queEs = {
  titulo: "Qué es el counseling",
  parrafos: [
    "El counseling es un espacio terapéutico centrado en la persona, donde podés explorar lo que te pasa a tu propio ritmo.",
    "No se trata de decirte qué hacer, sino de acompañarte en tu proceso.",
  ],
  destacada: "Las emociones no son un problema. No entenderlas, sí.",
  cierre:
    "Las emociones no aparecen porque sí: vienen a decirnos algo. Trabajar sobre ellas no es dejar de sentir, sino poder reconocer lo que te pasa, entenderlo y aprender a regularlo.",
} as const;

// ---------------------------------------------------------------------------
// Cómo trabajo
// ---------------------------------------------------------------------------

export const pasos = [
  {
    titulo: "Me escribís",
    detalle:
      "Por WhatsApp, cuando quieras. No hace falta que expliques todo ni que sepas por dónde empezar: alcanza con decirme que querés coordinar un encuentro.",
  },
  {
    titulo: "Coordinamos el primer encuentro",
    detalle:
      "Buscamos un día y un horario que te sirvan. Nos vemos por videollamada, desde donde te sientas cómoda o cómodo.",
  },
  {
    titulo: "Empezamos a revisar en conjunto lo que te pasa",
    detalle:
      "Vamos al ritmo que necesites. No hay respuestas correctas ni un guion: el trabajo es que puedas escucharte y encontrar tus propios recursos.",
  },
] as const;

// ---------------------------------------------------------------------------
// Sobre mí
// ---------------------------------------------------------------------------

export const sobreMi = {
  titulo: "Sobre mí",
  parrafos: [
    "Soy Giuliana López Bravo, consultora psicológica. Trabajo desde el enfoque centrado en la persona: parto de la idea de que cada uno tiene los recursos para encontrar su propio camino, y de que a veces lo que falta es alguien que escuche de verdad mientras lo buscás.",
    "Me interesa especialmente cómo construimos la mirada que tenemos sobre nosotros mismos. Esa forma de vernos se arma a lo largo de nuestro desarrollo, sobre todo en los primeros años, a través de las miradas y valoraciones de quienes nos cuidaron. Muchas veces seguimos mirándonos desde esas primeras ideas aunque hoy no nos representen del todo.",
    "En counseling el trabajo no es cambiar quién sos, sino poder revisar cómo te estás viendo hoy. Porque la forma en la que te percibís también puede transformarse.",
  ],
  destacada: "Entenderte, también es cuidarte.",
  /**
   * PENDIENTE: formación, título e institución.
   * Ej.: { titulo: "Consultora Psicológica", institucion: "Holos San Isidro", anio: "2021" }
   * Con el array vacío, la sección de formación no aparece.
   */
  formacion: [] as { titulo: string; institucion: string; anio?: string }[],
} as const;

// ---------------------------------------------------------------------------
// Encuadre
// ---------------------------------------------------------------------------

/** Las filas con `valor: null` se omiten al renderizar. */
export const encuadre = [
  { etiqueta: "Modalidad", valor: "Virtual, por videollamada" },
  { etiqueta: "Duración del encuentro", valor: null as string | null }, // PENDIENTE
  { etiqueta: "Frecuencia", valor: null as string | null }, // PENDIENTE
  { etiqueta: "Honorarios", valor: null as string | null }, // PENDIENTE
  { etiqueta: "Medios de pago", valor: null as string | null }, // PENDIENTE
];

// ---------------------------------------------------------------------------
// Sobre este espacio — encuadre profesional
// ---------------------------------------------------------------------------

export const deslinde = {
  titulo: "Sobre este espacio",
  parrafos: [
    "El counseling acompaña procesos personales: momentos de crisis, decisiones, vínculos, formas de mirarse a uno mismo. No es psicoterapia ni tratamiento psiquiátrico, y no incluye diagnósticos ni indicación de medicación.",
    "Cuando una consulta necesita otro tipo de abordaje, te lo digo con claridad y te oriento para que llegues al profesional indicado. Que estés bien acompañada o acompañado importa más que sostener el espacio conmigo.",
  ],
  urgencias: {
    titulo: "Si necesitás ayuda urgente",
    intro:
      "Este no es un espacio de atención inmediata. Si estás en riesgo o atravesando una urgencia, comunicate ahora con:",
    lineas: [
      {
        numero: "911",
        marcar: "911",
        detalle: "Emergencias, en todo el país",
      },
      {
        numero: "0800-999-0091",
        marcar: "08009990091",
        detalle: "Línea nacional de salud mental, gratuita, las 24 horas",
      },
      {
        numero: "135",
        marcar: "135",
        detalle:
          "Centro de Asistencia al Suicida, desde CABA y Gran Buenos Aires (011-5275-1135 desde el resto del país)",
      },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Preguntas frecuentes
// ---------------------------------------------------------------------------

export const faq = [
  {
    pregunta: "¿Necesito saber qué me pasa para empezar?",
    respuesta:
      "No. Muchas veces se llega justamente por eso: hay malestar, angustia o confusión y la causa no está clara. Poner eso en palabras ya es parte del trabajo.",
  },
  {
    pregunta: "¿En qué se diferencia del trabajo de un psicólogo?",
    respuesta:
      "El counseling acompaña procesos de personas que están atravesando situaciones de la vida cotidiana, y trabaja sobre los recursos que ya tenés. No realiza diagnósticos ni trata patologías: eso corresponde a la psicología clínica y a la psiquiatría. Si tu consulta requiere ese abordaje, te oriento para la derivación.",
  },
  {
    pregunta: "¿Cómo son los encuentros?",
    respuesta:
      "Son virtuales, por videollamada, en un día y horario que coordinamos. Solo necesitás un lugar donde puedas hablar tranquila o tranquilo y una buena conexión.",
  },
  {
    pregunta: "¿De qué tenemos que hablar?",
    respuesta:
      "De lo que vos quieras traer. No hay temas obligatorios ni un orden establecido. Si un día no sabés por dónde arrancar, empezamos por ahí.",
  },
  {
    pregunta: "¿Lo que hablamos queda en este espacio?",
    respuesta:
      "Sí. Todo lo que se conversa en los encuentros es confidencial.",
  },
  {
    pregunta: "¿Cómo empiezo?",
    respuesta:
      "Escribime por WhatsApp y coordinamos el primer encuentro. No hace falta que prepares nada.",
  },
] as const;

// ---------------------------------------------------------------------------
// Testimonios
// ---------------------------------------------------------------------------

/**
 * Intencionalmente vacío.
 *
 * No inventamos testimonios: en un sitio profesional real serían falsos y,
 * además de poco serio, es publicidad engañosa. Cuando haya testimonios
 * reales y con consentimiento explícito de quienes los escribieron,
 * se agregan acá y la sección aparece sola.
 */
export const testimonios = [] as { texto: string; autor: string }[];

// ---------------------------------------------------------------------------
// Cierre
// ---------------------------------------------------------------------------

export const cierre = {
  titulo: "Si sentís que este espacio puede ayudarte",
  bajada:
    "Podés escribirme cuando quieras para coordinar un encuentro. No hace falta que tengas nada resuelto para dar el primer paso.",
  cta: "Escribime por WhatsApp",
  ctaHero: "Escribime por WhatsApp",
} as const;

// ---------------------------------------------------------------------------
// Navegación
// ---------------------------------------------------------------------------

export const navegacion = [
  { href: "#para-quien", label: "Para quién" },
  { href: "#counseling", label: "Qué es" },
  { href: "#como-trabajo", label: "Cómo trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#preguntas", label: "Preguntas" },
] as const;
