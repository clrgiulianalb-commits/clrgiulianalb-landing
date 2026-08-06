# Giuliana López Bravo · Consultora Psicológica

Landing page de presentación. Una sola página, sin base de datos, sin formularios:
todo el contacto pasa por WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · CSS puro.
Sin Tailwind, sin librerías de animación, sin dependencias de UI. Son 3 paquetes
en total y el sitio se genera 100% estático.

---

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
```

Otros comandos:

```bash
npm run build        # build de producción
npm run start        # sirve el build
npm run typecheck    # next typegen && tsc --noEmit
```

## Deploy

Todo el procedimiento —vincular el proyecto a la cuenta de Vercel de Giuliana,
CI/CD con GitHub Actions y el MCP de Vercel acotado a este proyecto— está en
**[DEPLOY.md](DEPLOY.md)**.

El pipeline ya está escrito: [`.github/workflows/vercel.yml`](.github/workflows/vercel.yml)
hace typecheck, preview en cada PR y producción en cada push a `main`. Falta
cargar tres valores en GitHub, explicados en DEPLOY.md.

---

## Actualizar el contenido

**Todo el texto vive en un solo archivo: [`content/site.ts`](content/site.ts).**

Nombre, teléfono, redes, motivos de consulta, preguntas frecuentes, textos de
botones y el encuadre profesional salen de ahí. Para cambiar la página no hace
falta abrir ningún componente.

### Datos que faltan cargar

Están marcados con `PENDIENTE` en el archivo. Mientras valgan `null` o `[]`,
**la sección correspondiente no se renderiza**: la página se mantiene coherente
y nunca muestra texto de relleno.

| Dato | Dónde | Qué pasa hoy |
|---|---|---|
| Usuario de Instagram | `contacto.instagram` | No aparece el enlace en el pie |
| Email | `contacto.email` | No aparece el enlace en el pie |
| Horarios de atención | `contacto.horarios` | No se muestra en el cierre |
| Ciudad | `identidad.ciudad` | No se usa |
| Duración, frecuencia, honorarios, medios de pago | `encuadre` | Solo se ve la fila "Modalidad" |
| Formación e institución | `sobreMi.formacion` | No se muestra el bloque |
| Testimonios | `testimonios` | La sección entera no existe |

### Sobre los testimonios

El array está vacío **a propósito**. No inventamos testimonios: en el sitio real
de una profesional serían falsos, y eso es publicidad engañosa. Cuando haya
testimonios reales, con consentimiento explícito de quien los escribió, se
agregan al array y la sección aparece sola con su numeración correcta.

### Cambiar el número de WhatsApp

En `content/site.ts`, la constante `WHATSAPP_E164`. Formato internacional, sin
`+`, sin espacios, sin guiones, sin el 0 de larga distancia y sin el 15:

```
11-2400-5754  (Buenos Aires)
  → 54 · 9 · 11 · 24005754
  → 5491124005754
```

El mensaje precargado del chat está justo debajo, en `WHATSAPP_MENSAJE`.

---

## De dónde sale el diseño

La identidad no es inventada: sale de sus propias piezas. Los colores se
extrajeron midiendo los píxeles del logo, el flyer y los carruseles de Instagram
que están en `doc/COUNSELING/`.

| Token | Hex | Origen |
|---|---|---|
| `--c-vino` | `#7B042F` | Color de texto de su serie "Noción de yo" |
| `--c-blush` | `#F8E2DB` | Fondo de su serie "Inteligencia Emocional" |
| `--c-malva` | `#E6DBE9` | Fondo de su serie "Intro" |
| `--c-rosa` | `#F1ACBB` | Rosa del logo |
| `--c-lienzo` | `#FDF7F4` | Off-white cálido de sus placas |
| `--c-marron` | `#604134` | "Consultora Psicológica" del logo |

Los tonos de tinta (`--c-tinta`, `--c-tinta-2`) y de borde (`--c-borde`) se
derivaron de esos para que cada par texto/fondo cumpla WCAG. Los ratios están
anotados en el CSS, al lado de cada token.

### El elemento distintivo

Su logo es **una circunferencia que no cierra**, con una rama que crece justo por
donde se abre. Ese gesto —un contorno que sostiene sin encerrar— es el motivo que
estructura la página: enmarca el retrato del hero como SVG en línea
(`components/CirculoAbierto.tsx`), se dibuja solo al entrar, y reaparece como
numeración entre paréntesis en cada sección.

### Tipografía

- **Playfair Display** — títulos. Retoma la serif del logo.
- **Poppins** — cuerpo y navegación. Es la sans geométrica de sus carruseles.
- **Parisienne** — tres frases y nada más. Se acerca a la letra manuscrita que
  usa en sus placas.

Las tres se cargan con `next/font/google`, así que quedan self-hosted en el build
y no hay pedidos a servidores de Google en producción.

### Movimiento

Las apariciones al scrollear usan `animation-timeline: view()`, envuelto en
`@supports` y en `@media (prefers-reduced-motion: no-preference)`. Cero
JavaScript. Si el navegador no lo soporta, el contenido simplemente está visible
desde el principio. Con `prefers-reduced-motion: reduce` no se mueve nada y el
círculo aparece ya dibujado.

El único JavaScript de cliente en toda la página son 30 líneas: el botón flotante
de WhatsApp, que aparece cuando el CTA del hero sale de pantalla y se esconde
cuando entra el de cierre. Nunca hay dos llamados a WhatsApp compitiendo.

---

## Estructura

```
app/
  layout.tsx            fuentes, metadata, JSON-LD
  page.tsx              orden de las secciones
  globals.css           sistema de diseño completo
  icon.svg              favicon
  opengraph-image.tsx   tarjeta al compartir el enlace
content/
  site.ts               ← TODO el contenido
components/
  Barra.tsx  Pie.tsx  BotonWhatsApp.tsx  FabWhatsApp.tsx
  CirculoAbierto.tsx  Iconos.tsx
  secciones/            una por sección
public/
  giuliana.jpg  logo.png
doc/                    material original de Giuliana (no se publica)
```

El orden de las secciones sigue el recorrido real de alguien que está pensando en
pedir ayuda: *¿esto habla de mí?* → *¿qué es esto?* → *¿puedo confiar en ella?* →
*¿qué va a pasar?* → *¿cómo empiezo?*

---

## Encuadre profesional

La sección "Sobre este espacio" es el bloque de color más fuerte de la página, y
es deliberado: aclara que el counseling **no es psicoterapia ni tratamiento
psiquiátrico**, que no incluye diagnósticos ni medicación, y que ante una consulta
que requiera otro abordaje hay derivación.

Incluye las líneas de urgencia verificadas: **911**, **0800-999-0091** (línea
nacional de salud mental, gratuita, 24 h) y **135** (Centro de Asistencia al
Suicida, CABA y GBA; 011-5275-1135 desde el resto del país).

Antes de publicar, conviene que Giuliana lea y apruebe ese texto: es el que
define el alcance de lo que ofrece.

---

## Accesibilidad

Verificado en el navegador, no a ojo:

- Sin scroll horizontal desde 320px.
- Todos los targets táctiles llegan a 44px, incluidos los teléfonos de urgencia.
- Un solo `h1` y jerarquía de encabezados sin saltos.
- Todas las imágenes con `alt`; todos los enlaces con nombre accesible.
- `lang="es-AR"`, foco visible en todo lo interactivo, salto al contenido.
- Contraste WCAG AA o AAA en cada par texto/fondo que se usa.

> Nota para quien toque el CSS: `--c-hairline` es **decorativa** (1.36:1). Nunca
> puede delimitar un control ni transportar información sola. Todo límite de
> control usa `--c-borde` (3.39:1 mínimo). Está anotado en el archivo.

---

## Antes de publicar

- [ ] Cargar los datos `PENDIENTE` de `content/site.ts`.
- [ ] Reemplazar `SITIO_URL` por el dominio real.
- [ ] Confirmar el número de WhatsApp con Giuliana y probar el enlace desde un celular.
- [ ] Que Giuliana lea y apruebe la sección "Sobre este espacio".
- [ ] Considerar una foto de mejor resolución: la actual es de 524×950 y se usa
      en el hero. Sirve, pero una toma más grande y con luz pareja levantaría
      bastante la pieza.
