# Instructivo para Giuliana

Tu página web ya está programada y subida a GitHub. Falta conectarla a Vercel,
que es el servicio que la va a publicar en internet.

Una vez que hagas esto **una sola vez**, cada cambio que hagamos se publica solo,
sin que tengas que tocar nada nunca más.

Son unos 10 minutos. No necesitás saber programar y no tenés que instalar nada.

---

## Paso 1 — Poné el repositorio en privado

Ahora mismo cualquiera puede ver los archivos del proyecto, incluida la carpeta
con tus fotos y tus diseños. Esto lo arregla:

1. Entrá a <https://github.com/clrgiulianalb-commits/clrgiulianalb-landing/settings>
2. Bajá del todo, hasta el recuadro rojo que dice **Danger Zone**.
3. Buscá **Change repository visibility** → **Change visibility** → **Make private**.
4. Te va a pedir que escribas el nombre del repositorio para confirmar:
   `clrgiulianalb-commits/clrgiulianalb-landing`
5. Confirmá.

Listo. Eso no afecta en nada a la página: sigue funcionando igual.

---

## Paso 2 — Creá tu cuenta en Vercel

1. Entrá a <https://vercel.com/signup>
2. Elegí **Continue with GitHub** (no uses mail y contraseña: al entrar con
   GitHub queda todo conectado solo).
3. Autorizá cuando GitHub te lo pida.
4. Si te pregunta el tipo de cuenta, elegí **Hobby** por ahora. Sobre esto leé la
   nota del final, que importa.

---

## Paso 3 — Importá el proyecto

1. Ya dentro de Vercel, clickeá **Add New…** (arriba a la derecha) → **Project**.
2. Te va a mostrar la lista de tus repositorios de GitHub. Buscá
   **clrgiulianalb-landing** y clickeá **Import**.
   - Si no aparece, clickeá **Adjust GitHub App Permissions** y dale acceso a ese
     repositorio. Hace falta porque lo pusiste en privado en el Paso 1.
3. Vercel va a detectar solo que es un proyecto Next.js. **No cambies nada** de
   lo que te muestra: ni el Framework Preset, ni el Build Command, ni el Output
   Directory.
4. No hace falta cargar ninguna variable de entorno. La página no usa base de
   datos ni claves.
5. Clickeá **Deploy**.

Esperá un minuto o dos. Cuando termine te muestra la página y una dirección
tipo `clrgiulianalb-landing.vercel.app`. Abrila: esa ya es tu web funcionando.

---

## Con eso ya está

A partir de ahora, **cada vez que subamos un cambio, la página se actualiza
sola** en un par de minutos. No tenés que volver a entrar a Vercel ni apretar
nada.

Cuando trabajemos en algo antes de publicarlo, Vercel además genera una
dirección de prueba aparte, así podés verlo y aprobarlo antes de que salga a la
web de verdad.

---

## Paso 4 (opcional) — Tu propio dominio

Si en algún momento comprás un dominio propio, tipo `giulianalopezbravo.com.ar`:

1. En Vercel: tu proyecto → **Settings** → **Domains**.
2. Escribí el dominio y seguí las instrucciones que te da para configurarlo.

Avisanos cuando lo tengas y lo ajustamos del lado del código.

---

## Paso 5 (opcional) — Darle acceso a Eric

Para que Eric pueda ver los deploys y ayudarte si algo falla, sin necesidad de
tu contraseña:

1. En Vercel: **Settings** de tu cuenta → **Members** → **Invite**.
2. Agregá su mail: `eric.vp.94@gmail.com`, con rol **Member**.

Esto es lo correcto: él trabaja con su propia cuenta y vos podés sacarle el
acceso cuando quieras, con un clic.

**No le pases tu contraseña de Vercel ni de GitHub a nadie, nunca.** Ni a Eric.
No hace falta para nada de esto.

---

## Nota sobre el plan gratuito

El plan **Hobby** de Vercel es gratis, pero según sus propios términos es solo
para uso **personal y no comercial**. Su documentación menciona explícitamente
las páginas de captación de clientes como uso comercial, así que una web que
promociona tus consultas entra en esa categoría.

En la práctica muchas webs profesionales chicas funcionan en Hobby sin
problemas, pero el riesgo existe: te puede llegar un mail pidiéndote que pases a
un plan pago, y si no lo hacés, te suspenden el sitio.

Las opciones, para que decidas con la información:

- **Seguir en Hobby.** Gratis. Funciona hoy. El riesgo es una suspensión más
  adelante.
- **Vercel Pro.** Unos 20 dólares por mes. Sin restricción de uso comercial.
- **Cloudflare Pages o Netlify.** Sus planes gratuitos sí permiten uso comercial.
  La página está hecha de forma que se puede mudar sin rehacerla.

Arrancá con Hobby para tenerla andando, y si más adelante te llega algún aviso,
lo resolvemos ahí.

---

## Si algo no sale

| Qué ves | Qué hacer |
|---|---|
| El repositorio no aparece en la lista de Vercel | **Adjust GitHub App Permissions** y darle acceso a ese repositorio |
| El deploy falla en rojo | Sacale una captura a la pantalla y mandásela a Eric. No toques la configuración |
| La página abre pero se ve rota | Esperá un minuto y recargá con Ctrl+F5. Si sigue igual, avisá |
| No encontrás el botón Deploy | Bajá: está al final del formulario de importación |
