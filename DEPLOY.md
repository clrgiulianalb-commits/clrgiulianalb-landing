# Deploy y acceso a Vercel

Repo: `git@github.com:clrgiulianalb-commits/clrgiulianalb-landing.git`

Los pasos que tiene que hacer Giuliana están en **[PARA-GIULIANA.md](PARA-GIULIANA.md)**,
escritos para alguien que no programa. Este documento es el lado técnico.

---

## Cómo funciona el deploy

Integración nativa de Git de Vercel. Ella importa el repo una vez desde el
dashboard y a partir de ahí:

- **push a `main`** → deploy a producción
- **cualquier otra rama o PR** → deploy de preview con su propia URL

Sin tokens, sin secrets, sin GitHub Actions. Para un sitio estático sin base de
datos es lo que menos piezas móviles tiene.

**Por qué no GitHub Actions**, aunque estaba armado y funcionando: Eric tiene
permiso `WRITE` sobre el repo, no `ADMIN`, y cargar secrets requiere admin. El
pipeline le habría dado a Giuliana *más* trabajo (crear un token, buscar dos IDs,
cargar tres valores) en vez de menos. Si en algún momento hace falta, está la
sección "Volver a Actions" al final.

### Qué NO tiene que estar en el repo

No agregues `vercel.json` con `git.deploymentEnabled: false`. Esa opción existe
justamente para apagar los deploys automáticos por Git, que es lo que acá
queremos que funcione. Se sacó del repo por eso.

---

## El único punto de atención: el plan

El plan Hobby de Vercel es gratis pero, según los términos de Vercel, es solo
para uso personal y **no comercial**. Su documentación menciona explícitamente
las landing de captación de clientes como uso comercial.

En la práctica arranca funcionando igual. El riesgo real es un mail pidiendo
migrar a Pro (~USD 20/mes) y, si no se hace, suspensión.

Si eso pasa, la salida barata es que el sitio es **100% estático**: todas las
rutas se prerenderizan en build. Mudarlo a Cloudflare Pages o Netlify —cuyos
planes gratuitos sí permiten uso comercial— es cambiar de proveedor, no rehacer
la página. Habría que agregar `output: "export"` e `images: { unoptimized: true }`
en `next.config.mjs`.

---

## MCP de Vercel, acotado a este proyecto

Esto es para Eric, y es independiente del deploy.

### Qué significa "solo para este proyecto"

Son dos cosas distintas:

- **La configuración** del server: con scope `local` (el default) queda en
  `C:\Users\erics\.claude.json`, bajo
  `projects → "C:\\project\\clrgiulianalb-landing" → mcpServers`. Solo se carga
  al abrir Claude Code desde este directorio. **Esto es lo que se pidió y se
  cumple.**
- **Las credenciales OAuth**: van a `C:\Users\erics\.claude\.credentials.json`,
  bajo `mcpOAuth`, con clave `<nombreServidor>|<hash>`. Eso es **global al
  usuario de Windows** y ningún scope lo cambia. Por eso abajo se usa un nombre
  propio y una URL acotada al proyecto: así generan un token separado y nunca
  colisionan con un `vercel` personal.

`https://mcp.vercel.com` y `https://mcp.vercel.com/<org>/<project>` son recursos
OAuth distintos, con tokens separados. Pueden convivir.

### Pasos

Primero, que Giuliana invite a Eric a su cuenta de Vercel como Member (Paso 5 de
PARA-GIULIANA.md). Con eso el MCP se autentica con la cuenta de Eric y ve el
proyecto de ella, sin que nadie comparta contraseñas.

```powershell
cd C:\project\clrgiulianalb-landing

# 1. Limpiar restos previos, si los hubiera.
#    Sin esto Claude Code reusa el refresh token viejo y nunca dispara el login.
claude mcp logout vercel-giuliana     # ignorá el error si no existe
claude mcp remove vercel-giuliana     # ignorá el error si no existe

# 2. Agregar el server. Los slugs salen de la barra de direcciones del
#    dashboard: https://vercel.com/<org>/<project>
claude mcp add --transport http vercel-giuliana https://mcp.vercel.com/<org>/<project>

# 3. Verificar dónde quedó
claude mcp get vercel-giuliana
claude mcp list                        # esperá "! Needs authentication"

# 4. Autenticar
claude mcp login vercel-giuliana
```

Detalles que importan:

- `--transport http` es obligatorio: Vercel MCP usa Streamable HTTP. Sin el flag,
  Claude Code lo toma como stdio y falla.
- **No pongas `--scope`.** El default ya es `local`. `--scope project` crearía un
  `.mcp.json` commiteable; `--scope user` lo activaría en todos los proyectos.
- **No pongas `--header "Authorization: ..."`.** Si el server lo rechaza, Claude
  Code reporta conexión fallida en vez de caer al flujo OAuth.

### Verificación

```powershell
cd C:\project\clrgiulianalb-landing
claude mcp list        # vercel-giuliana ... ✔ Connected

cd C:\Users\erics
claude mcp list        # NO aparece: esto prueba que el scope local funcionó
```

Después, pedile a Claude que corra `list_projects` del MCP y confirme que ve
`clrgiulianalb-landing`.

### Si hubiera que usar la cuenta de ella directamente

No es necesario con la invitación al team, pero por si acaso: el OAuth de Vercel
toma la sesión **por cookie del navegador**. Si tu navegador está logueado con tu
cuenta, la pantalla de consentimiento autoriza **la tuya** sin avisarte — el
consent screen no es un selector de cuenta.

La forma correcta, con ella presente:

1. `claude mcp login vercel-giuliana --no-browser` → imprime una URL.
2. Abrir esa URL en una **ventana de incógnito** (Ctrl+Shift+N). Sin cookies
   compartidas, Vercel muestra el login.
3. **Ella escribe su mail y contraseña, ella misma.**
4. Aprueba el consentimiento.
5. El navegador redirige a `http://localhost:PORT/callback?code=...` y muestra un
   error de conexión: **es lo esperado**. Copiar la URL completa de la barra y
   pegarla en el prompt de la terminal.
6. Cerrar el incógnito.

No metas `prompt=login` a mano en la URL: no es un parámetro soportado y romperías
el `state`/PKCE. Y el switcher de team de Vercel no sirve: cambia el *team* dentro
de la *misma cuenta*, y el OAuth autoriza al **usuario**.

Al terminar: `claude mcp logout vercel-giuliana && claude mcp remove vercel-giuliana`,
y que ella revoque el grant desde su cuenta.

---

## Problemas frecuentes

### Deploy

| Síntoma | Causa | Solución |
|---|---|---|
| El repo no aparece al importar en Vercel | La GitHub App no tiene acceso al repo privado | **Adjust GitHub App Permissions** y darle acceso |
| Push a main no dispara nada | El repo no quedó conectado, o alguien agregó `vercel.json` con `deploymentEnabled: false` | Revisar Settings → Git del proyecto, y que no exista ese archivo |
| Build falla por versión de Node | Vercel usa una versión distinta a la local | Project → Settings → Node.js Version → 22. Next 16 requiere ≥ 20.9 |
| Dos deployments por commit | Se agregó Actions además de la integración nativa | Elegir uno de los dos |

### MCP

| Síntoma | Causa | Solución |
|---|---|---|
| No aparece en `claude mcp list` | Corriste `claude` desde otro directorio | El scope local está atado a la raíz del repo |
| `! Needs authentication` | Falta el login o murió el refresh token | `claude mcp login vercel-giuliana`, o `/mcp` → Re-authenticate |
| `✘ Failed to connect` | Slug mal escrito en la URL | `claude mcp get` y comparar con la barra del dashboard |
| El login no abre nada y conecta al toque | Reusó el token de la cuenta anterior | `claude mcp logout` **y** revocar el grant en Vercel |
| Ve los proyectos equivocados | Se autorizó con la cookie del navegador | Logout, `--no-browser`, incógnito |

---

## Volver a Actions, si algún día hace falta

Tiene sentido solo si se quiere que algo (typecheck, tests) frene el deploy
cuando falla. Requiere permiso `ADMIN` sobre el repo para cargar secrets.

Resumen de lo que haría falta:

1. Token de Vercel **project-scoped** (`vercel.com/account/tokens`, scope →
   proyecto, no *All Projects*), con vencimiento.
2. En GitHub: `VERCEL_TOKEN` como **Secret**; `VERCEL_ORG_ID` y
   `VERCEL_PROJECT_ID` como **Variables** (no Secrets: los secrets se enmascaran
   en los logs y hacen indepurable un "Project not found"). Los IDs salen de
   `.vercel/project.json` después de `vercel link`.
3. Workflow con `vercel pull` → `vercel build` → `vercel deploy --prebuilt`, los
   tres en el **mismo job** (los jobs no comparten disco). `--prod` va en `build`
   **y** en `deploy`: si va solo en `deploy`, se construye con variables de
   preview y se publica eso a producción.
4. `vercel.json` con `git.deploymentEnabled: false` para no deployar dos veces.

El pipeline completo está en el historial: `git show 0c403a7 -- .github/workflows/vercel.yml`
