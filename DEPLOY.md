# Deploy: Vercel de Giuliana + CI/CD + MCP

Repo: `git@github.com:clrgiulianalb-commits/clrgiulianalb-landing.git`

---

## 0. Lo primero, que no se negocia

**No le pidas la contraseña de Vercel a Giuliana.** Ni por WhatsApp, ni "para
configurarlo rápido", ni una sola vez.

Hay dos caminos para que el deploy termine en la cuenta de ella. Los dos dejan
la credencial en manos de su dueña.

| | **Camino A — recomendado** | Camino B — solo si no queda otra |
|---|---|---|
| Qué hace ella | Te invita a su team de Vercel como Member | Crea el proyecto, genera el token y hace ella el login del OAuth |
| Con qué cuenta trabajás vos | **La tuya** | La de ella |
| Si algo sale mal | Te saca del team en 10 segundos | Tiene que revocar token y grant OAuth |
| Riesgo | Bajo | Alto: el token actúa **como ella** en toda su cuenta |

La documentación de Vercel es explícita sobre el MCP: conectarlo *"grants the AI
system you're using the same access as your Vercel user account"*. Eso incluye
las herramientas de compra (`buy_pro`, `buy_credits`, `buy_domain`), que hacen
cargos reales y no reembolsables — a la tarjeta de ella.

**Andá por el Camino A.** Pedile esto tal cual:

> Entrá a vercel.com → tu team → Settings → Members → Invite, y agregá mi mail
> `eric.vp.94@gmail.com` con rol Member. Con eso yo trabajo con mi propia cuenta
> y no necesito nada tuyo.

Lo que sigue está escrito para el Camino A. Donde el Camino B cambia algo, está
marcado **[Camino B]**.

---

## 1. Crear y vincular el proyecto

El proyecto tiene que existir en Vercel **antes** del primer run de CI: sin
proyecto no hay `PROJECT_ID`.

```powershell
npm i -g vercel@latest
cd C:\project\clrgiulianalb-landing
vercel login
vercel link
```

En el prompt de `vercel link`:

1. `Set up "clrgiulianalb-landing"?` → **yes**
2. `Which scope?` → **el team de Giuliana**, no tu cuenta personal.
   Este paso es el que decide a qué cuenta va el deploy. Si te equivocás acá,
   todo lo demás queda mal.
3. `Link to existing project?` → **no** → nombre `clrgiulianalb-landing`

Queda `.vercel/project.json` (ya está en `.gitignore`, no se commitea):

```powershell
type .vercel\project.json
# { "orgId": "team_xxxxxxxx", "projectId": "prj_xxxxxxxx" }
```

**Hacé el primer deploy a mano, ahora:**

```powershell
vercel --prod
```

No es opcional. El primer deployment de un proyecto nuevo en Vercel siempre es
de producción, aunque omitas `--prod`. Si el primero sale de un PR con el
workflow, ese preview te pisa producción.

**[Camino B]** Los pasos de esta sección los hace Giuliana en su máquina y te
pasa **solo los dos IDs**. No son credenciales: son identificadores opacos que
por sí solos no dan acceso.

---

## 2. CI/CD con GitHub Actions

El workflow ya está en [`.github/workflows/vercel.yml`](.github/workflows/vercel.yml).
Hace typecheck, después preview en cada PR y producción en cada push a `main`.

### 2.1 Crear el token, acotado al proyecto

1. `https://vercel.com/account/tokens`
2. Nombre: `github-actions-clrgiulianalb`
3. **Scope** → clickeá el team de Giuliana → seleccioná **`clrgiulianalb-landing`**.
   Si elegís *All Projects* te crea un token de team: mal. Un token
   project-scoped (prefijo `vcp_`) rechaza cualquier request a otro proyecto.
4. Expiración: **90 días**. No pongas "no expiration".
5. Copiá el valor ahora: se muestra una sola vez.

**[Camino B]** El token lo crea **y lo pega ella**. Un secret de GitHub es
write-only: una vez cargado no lo lee nadie, ni vos ni ella. Si te lo manda por
chat, ya está comprometido: que lo revoque y genere otro.

### 2.2 Cargar en GitHub

`https://github.com/clrgiulianalb-commits/clrgiulianalb-landing/settings/secrets/actions`

| Nombre | Pestaña | Valor |
|---|---|---|
| `VERCEL_TOKEN` | **Secrets** | el token de 2.1 |
| `VERCEL_ORG_ID` | **Variables** | `orgId` de `project.json` |
| `VERCEL_PROJECT_ID` | **Variables** | `projectId` de `project.json` |

Ojo con espacios o saltos de línea al pegar el token: es la causa número uno de
`The specified token is not valid`.

**[Camino B] obligatorio además:** Settings → Environments → New environment →
`production` → Required reviewers → agregá a Giuliana. Con eso un push a `main`
no puede desplegar con el token de ella sin que alguien apruebe a mano.

### 2.3 Variables de entorno del proyecto

Si en algún momento el sitio necesita variables, cargalas en Vercel → proyecto →
Settings → Environment Variables, marcando **Production** y **Preview**. Si
faltan, `vercel pull` no las trae y el build de CI se cae.

Hoy el sitio no usa ninguna.

---

## 3. Evitar el doble deploy

Si el repo queda conectado a Vercel por la integración de Git **y** además corre
este workflow, cada push genera dos deployments: uno del webhook y otro de
Actions. Doble build, y en `main` una carrera por quién aliasea el dominio.

Ya está resuelto en [`vercel.json`](vercel.json):

```json
{ "git": { "deploymentEnabled": false } }
```

Eso desactiva **solo** los deploys automáticos disparados por Git. Los deploys
por CLI siguen funcionando, que es justo lo que queremos.

**No desconectes la integración desde el dashboard.** Con `deploymentEnabled:
false` conservás los commit statuses en GitHub, está versionado en el repo (se
revisa en un PR, no depende de que alguien se acuerde de un toggle) y se
revierte con un commit de una línea. Desconectar es destructivo y, si el
proyecto es de otra persona, rehacerlo implica volver a pedirle permisos.

*Detalle:* Vercel necesita haber leído al menos un deployment que contenga el
archivo para que la config quede activa. El primer push después de agregar
`vercel.json` puede todavía disparar un deploy automático. De ahí en más, queda
silenciado.

---

## 4. MCP de Vercel, solo para este proyecto

### Qué significa "solo para este proyecto"

Son dos cosas distintas, no las mezcles:

- **La configuración** del server: con scope `local` (el default) queda en
  `C:\Users\erics\.claude.json`, bajo
  `projects → "C:\\project\\clrgiulianalb-landing" → mcpServers`. Solo se carga
  cuando abrís Claude Code desde este directorio. **Esto es lo que pediste y se
  cumple.**
- **Las credenciales OAuth**: van a `C:\Users\erics\.claude\.credentials.json`,
  bajo `mcpOAuth`, con clave `<nombreServidor>|<hash>`. Eso es **global a tu
  usuario de Windows** y ningún scope lo cambia. Por eso abajo usamos un nombre
  propio (`vercel-giuliana`) y la URL acotada al proyecto: así nunca colisiona
  con un `vercel` tuyo personal.

`https://mcp.vercel.com` y `https://mcp.vercel.com/<org>/<project>` son recursos
OAuth distintos, con tokens separados. Podés tener los dos en paralelo sin que
se pisen.

### 4.1 Limpiar restos previos

```powershell
cd C:\project\clrgiulianalb-landing
claude mcp logout vercel-giuliana     # ignorá el error si no existe
claude mcp remove vercel-giuliana     # ignorá el error si no existe
```

Si no limpiás, Claude Code reusa el refresh token viejo y nunca dispara el login.

### 4.2 Agregar el server

Los slugs de la URL salen de la barra de direcciones del dashboard
(`https://vercel.com/<org>/<project>`), **no** de los IDs de `project.json`.

```powershell
cd C:\project\clrgiulianalb-landing
claude mcp add --transport http vercel-giuliana https://mcp.vercel.com/<org>/<project>
```

- `--transport http` es obligatorio: Vercel MCP usa Streamable HTTP. Sin el flag,
  Claude Code lo toma como stdio y falla.
- **No pongas `--scope`.** El default ya es `local`. `--scope project` crearía un
  `.mcp.json` commiteable en el repo; `--scope user` lo activaría en todos tus
  proyectos.
- **No pongas `--header "Authorization: ..."`.** Si el server lo rechaza, Claude
  Code reporta conexión fallida en vez de caer al flujo OAuth.

Verificá dónde quedó:

```powershell
claude mcp get vercel-giuliana
claude mcp list          # esperá "! Needs authentication"
```

### 4.3 Autenticar

**[Camino A]** — con tu cuenta, que ya está en el team de ella:

```powershell
claude mcp login vercel-giuliana
```

**[Camino B]** — forzar el login con la cuenta de Giuliana. Esto es lo delicado:
la sesión de Vercel viaja por cookie, así que si tu navegador está logueado con
tu cuenta, la pantalla de consentimiento autoriza **tu** cuenta sin avisarte. El
consent screen no es un selector de cuenta.

Con ella presente o en videollamada controlando la pantalla:

1. ```powershell
   claude mcp login vercel-giuliana --no-browser
   ```
   La terminal imprime una URL de `vercel.com/oauth/authorize`.
2. Abrí esa URL en una **ventana de incógnito** (Ctrl+Shift+N). Incógnito no
   comparte cookies, así que Vercel muestra el login. Tu sesión normal queda
   intacta.
3. **Giuliana escribe su mail y su contraseña, ella misma.** Vos te corrés del
   teclado.
4. Ella aprueba el consent screen.
5. El navegador redirige a `http://localhost:PORT/callback?code=...` y muestra
   un error de conexión. **Es lo esperado.** Copiá la URL completa de la barra y
   pegala en el prompt de la terminal.
6. Cerrá la ventana de incógnito.

No metas `prompt=login` a mano en la URL: no es un parámetro soportado y romperías
el `state`/PKCE. Y no uses el switcher de team de Vercel: cambia el *team* dentro
de la *misma cuenta*, y el OAuth autoriza al **usuario**.

### 4.4 Verificar con qué cuenta quedó

Abrí Claude Code en este directorio y pedile que corra `list_projects` del MCP.
Si aparecen tus proyectos personales en vez de los de ella, autorizaste con la
cuenta equivocada: volvé a 4.1.

**[Camino B] cuando termines el trabajo**, cerrá la puerta:

```powershell
claude mcp logout vercel-giuliana
claude mcp remove vercel-giuliana
```

Y que ella revoque el grant desde su cuenta de Vercel.

---

## 5. Verificación

```powershell
# El MCP existe acá...
cd C:\project\clrgiulianalb-landing
claude mcp list        # vercel-giuliana ... ✔ Connected

# ...y NO existe en ningún otro lado. Esto prueba que el scope local funcionó.
cd C:\Users\erics
claude mcp list        # vercel-giuliana no aparece
```

Después, el ciclo completo:

1. `git checkout -b test/ci && git commit --allow-empty -m "test ci" && git push -u origin test/ci`
2. Abrí un PR contra `main`.
3. En Actions corren **Typecheck** y después **Deploy Preview**.
4. Aparece un comentario con la URL del preview. Abrila.
5. En Vercel → Deployments: **un solo** deployment `Preview`. Si ves dos, la
   sección 3 no quedó aplicada.
6. Mergeá. Corre **Deploy Production**, y queda un solo deployment `Production`.
7. `git branch -d test/ci && git push origin --delete test/ci`

Checklist:

- [ ] `claude mcp list` conecta desde el proyecto y no aparece desde otro directorio
- [ ] El MCP ve los proyectos de la cuenta correcta
- [ ] No existe `.mcp.json` en el repo
- [ ] `VERCEL_TOKEN` como Secret; `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID` como Variables
- [ ] El token es project-scoped (`vcp_`) y tiene vencimiento
- [ ] Un PR = un preview. Un merge a main = una producción
- [ ] Vos nunca supiste la contraseña de Giuliana

---

## 6. Problemas frecuentes

### MCP

| Síntoma | Causa | Solución |
|---|---|---|
| No aparece en `claude mcp list` | Corriste `claude` desde otro directorio | El scope local está atado a la raíz del repo |
| `! Needs authentication` | Falta el login o murió el refresh token | `claude mcp login vercel-giuliana`, o `/mcp` → Re-authenticate |
| `✘ Failed to connect` | Slug mal escrito en la URL | `claude mcp get` y compará con la barra del dashboard |
| El login no abre nada y conecta al toque | Reusó el token de la cuenta anterior | `claude mcp logout` **y** revocar el grant en Vercel |
| Ve **tus** proyectos, no los de ella | Autorizaste con la cookie de tu navegador | 4.1 + 4.3 completos: logout, `--no-browser`, incógnito |
| Nada pasa tras aprobar en el navegador | Falló el redirect a localhost | Copiá la URL completa del callback y pegala en la terminal |

### CI/CD

| Síntoma | Causa | Solución |
|---|---|---|
| `The specified token is not valid` | Token vencido, mal copiado o de otro proyecto | Regenerar; revisar espacios al pegar |
| `Error: Project not found` | `VERCEL_PROJECT_ID` incorrecto | Comparar con el dashboard. Si están como Secrets, los logs muestran `***`: pasalos a Variables |
| `You defined "VERCEL_ORG_ID" but you forgot...` | Falta uno de los dos | El CLI exige los dos o ninguno |
| `no prebuilt output found in ".vercel/output"` | `deploy --prebuilt` sin `vercel build` previo | Los tres comandos van en el **mismo job**: los jobs no comparten disco |
| **Dos deployments por commit** | Integración de Git activa + Actions | Sección 3 |
| Producción construida con variables de preview | `--prod` solo en `deploy` | Va en `build` **y** en `deploy` |
| Typecheck falla en CI pero anda local | `next-env.d.ts` está en `.gitignore` | Ya resuelto: `npm run typecheck` corre `next typegen` primero |
| El workflow no corre nunca | Ruta o YAML inválido | Tiene que ser `.github/workflows/vercel.yml` |
| No podés cargar secrets | No sos Admin del repo | Que los cargue Giuliana |

---

## 7. Higiene

1. Poné un recordatorio para rotar `VERCEL_TOKEN` antes de los 90 días.
2. Giuliana tiene que saber dónde está el botón de revocar
   (`vercel.com/account/tokens`) **antes** de que haga falta.
3. No existe OIDC federado para autenticar deploys a Vercel: solo token
   estático. Scope acotado y rotación son la única defensa real.
