/**
 * El círculo abierto.
 *
 * El logo de Giuliana es una circunferencia que no cierra, con una rama que
 * crece justo por donde se abre. Ese gesto —un contorno que sostiene sin
 * encerrar— es el motivo que estructura toda la página.
 *
 * El arco cubre 320°: arranca a 200° y termina a 160°, dejando la abertura
 * sobre el lado izquierdo, igual que en el logo.
 *
 * `pathLength="1"` normaliza el largo de cada trazo, y por eso el dibujo
 * progresivo funciona igual a cualquier tamaño.
 */
export function CirculoAbierto({ animado = true }: { animado?: boolean }) {
  return (
    <svg
      className={`circulo${animado ? " circulo--anim" : ""}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path pathLength="1" d="M4.9 33.6A48 48 0 1 1 4.9 66.4" />

      {/* La rama, en el hueco que deja el arco. */}
      <g transform="translate(0,-2)">
        <path pathLength="1" d="M10 82C6 68 10 54 20 44" />
        <g transform="translate(9 73) rotate(-140) scale(.85)">
          <path pathLength="1" d="M0 0Q7 -6 14 0Q7 6 0 0Z" />
        </g>
        <g transform="translate(10 63) rotate(-35) scale(.9)">
          <path pathLength="1" d="M0 0Q7 -6 14 0Q7 6 0 0Z" />
        </g>
        <g transform="translate(13 55) rotate(-150) scale(.8)">
          <path pathLength="1" d="M0 0Q7 -6 14 0Q7 6 0 0Z" />
        </g>
        <g transform="translate(16 49) rotate(-40) scale(.85)">
          <path pathLength="1" d="M0 0Q7 -6 14 0Q7 6 0 0Z" />
        </g>
      </g>
    </svg>
  );
}
