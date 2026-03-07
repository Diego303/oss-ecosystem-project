# OSS Ecosystem — Design System

Guía de referencia de diseño, estilo y componentes para la web del ecosistema de herramientas (intake, architect, vigil).

---

## 1. Concepto y Filosofía

### Identidad visual

La web usa un concepto **"Chameleon"**: cada herramienta tiene su propio universo visual (paleta, texturas, sensaciones), y la web muta entre ellos conforme el usuario navega. Las secciones compartidas (hero, pipeline, principios, CTA, footer) viven en un **dark neutro** que actúa como lienzo base.

### Principios de diseño

- **Cambio de paleta por herramienta**: Cada sección de herramienta cambia completamente fondo, tinta, bordes, y código de colores. No es un tema oscuro con acentos — es un cambio de mundo completo.
- **Sin cuadrículas de fondo**: Los fondos son sólidos con un radial-gradient sutil del color accent de cada herramienta (efecto "glow"). No se usan grid patterns ni texturas repetitivas.
- **Brutalismo contenido**: Sombras sólidas (sin blur) en los code blocks, bordes de 2px, cero border-radius. Pero aplicado con contención — no es brutalist por ser brutalist, es para transmitir precisión técnica.
- **Tipografía técnica**: Monospace para metadatos, fases, etiquetas. Display geométrico para títulos. Body legible para texto largo.
- **Flat + profundidad por color**: La profundidad se crea por contraste entre secciones (dark → cream → green → dark), no por sombras ni elevaciones.

---

## 2. Paleta de Colores

### 2.1 Base — Secciones neutras (hero, pipeline, principios, CTA, footer)

| Token | Hex | Uso |
|-------|-----|-----|
| `bg-dark` | `#0a0a0c` | Fondo principal de secciones neutras |
| `bg-dark-alt` | `#111114` | Fondo alternativo (principios) |
| `text-primary` | `#ededed` | Texto principal sobre dark |
| `text-secondary` | `rgba(255,255,255,0.5)` | Párrafos, descripciones |
| `text-dim` | `rgba(255,255,255,0.35)` | Tags, labels de fase |
| `text-muted` | `rgba(255,255,255,0.25)` | Numeración, hints |
| `border-dark` | `rgba(255,255,255,0.08)` | Bordes sutiles, separadores |
| `border-dark-hover` | `rgba(255,255,255,0.15)` | Bordes en hover |

**Glow del hero**: `radial-gradient(ellipse 600px 400px at 50% 40%, rgba(200,90,50,0.04), transparent)` — un toque cálido terracotta casi imperceptible centrado en el hero.

### 2.2 intake — Dark Blueprint

Sensación: Mesa de trabajo nocturna, plano técnico, tinta blanca sobre negro.

| Token | Hex | Uso |
|-------|-----|-----|
| `intake-bg` | `#050505` | Fondo de sección |
| `intake-accent` | `#ededed` | Color de marca, nombres de comando, bordes de icono |
| `intake-text` | `#9999a5` | Texto de párrafos |
| `intake-dim` | `#5a5a66` | Labels, fases, metadatos |
| `intake-border` | `#3f3f46` | Bordes de code blocks |
| `intake-border-top` | `#1f1f22` | Separador de sección |
| `intake-code-bg` | `#0a0a0a` | Fondo de code block |
| `intake-code-header` | `#0e0e0e` | Header de code block |
| `intake-shadow` | `#1f1f22` | Sombra sólida de code blocks |
| `intake-glow` | `rgba(237,237,237,0.02)` | Radial glow de fondo (posición: 25% 50%) |

**Icono**: Cuadrado 2D hueco. SVG `<rect>` con stroke `#ededed`.
**Símbolo tipográfico**: `◻`

### 2.3 architect — Warm Cream Paper

Sensación: Manual de obra impreso, papel crema de alta calidad, tinta de ladrillo.

| Token | Hex | Uso |
|-------|-----|-----|
| `architect-bg` | `#FDFBF7` | Fondo de sección |
| `architect-accent` | `#C85A32` | Color de marca, nombres de comando, subtítulos |
| `architect-ink` | `#292524` | Texto principal, bordes gruesos (equivale a Stone 800) |
| `architect-text` | `#57534E` | Texto de párrafos (Stone 600) |
| `architect-border` | `#292524` | Bordes de code blocks |
| `architect-code-bg` | `#FFFFFF` | Fondo de code block |
| `architect-code-header` | `#F3EFE6` | Header de code block |
| `architect-shadow` | `#292524` | Sombra sólida |
| `architect-glow` | `rgba(200,90,50,0.04)` | Radial glow de fondo (posición: 75% 50%) |

**Icono**: Triángulo hueco. SVG `<polygon>` con stroke `#C85A32`.
**Símbolo tipográfico**: `△`

### 2.4 vigil — Green Audit Paper

Sensación: Informe de auditoría, papel de impresora matricial verdoso, sellos de conformidad.

| Token | Hex | Uso |
|-------|-----|-----|
| `vigil-bg` | `#F4F7F5` | Fondo de sección |
| `vigil-accent` | `#10B981` | Color de marca, indicadores OK (Emerald 500) |
| `vigil-ink` | `#022C22` | Texto principal, bordes gruesos (Emerald 950) |
| `vigil-text` | `#064E3B` | Texto de párrafos (Emerald 900) |
| `vigil-border` | `#022C22` | Bordes de code blocks |
| `vigil-code-bg` | `#FFFFFF` | Fondo de code block |
| `vigil-code-header` | `#E8F0EB` | Header de code block |
| `vigil-shadow` | `#022C22` | Sombra sólida |
| `vigil-alert` | `#EF4444` | Errores, vulnerabilidades (Red 500) |
| `vigil-glow` | `rgba(16,185,129,0.04)` | Radial glow de fondo (posición: 25% 50%) |

**Icono**: Rombo hueco. SVG `<polygon>` con stroke `#10B981`.
**Símbolo tipográfico**: `◇`

---

## 3. Tipografía

Tres familias de Google Fonts con roles estrictos.

### 3.1 Display — Títulos (Space Grotesk)

```
font-family: 'Space Grotesk', sans-serif
```

| Contexto | Peso | Tamaño | Letter-spacing |
|----------|------|--------|----------------|
| H1 (hero) | 700 | `clamp(34px, 5vw, 56px)` | `-0.04em` |
| H2 (sección) | 700 | `clamp(26px, 3.5vw, 38px)` | `-0.03em` |
| H3 (herramienta) | 700 | `32px` | `-0.03em` |
| H4 (tarjeta principio) | 600 | `15px` | — |
| Nombre en journey stop | 700 | `20px` | — |
| Nav logo | 700 | `15px` | `-0.02em` |

`line-height` de títulos: `1.08`.

### 3.2 Body — Texto general (Inter)

```
font-family: 'Inter', sans-serif
```

| Contexto | Peso | Tamaño | Line-height |
|----------|------|--------|-------------|
| Hero párrafo | 300 | `17px` | `1.75` |
| Sección párrafo | 300 | `15px` | `1.75` |
| Descripción journey stop | 300 | `13px` | `1.55` |
| Tarjeta principio | 300 | `13px` | `1.6` |

`font-weight: 300` para todo el body. `500` para negritas inline (`<strong>`).

### 3.3 Monospace — Código y metadatos (JetBrains Mono)

```
font-family: 'JetBrains Mono', monospace
```

| Contexto | Peso | Tamaño | Estilo |
|----------|------|--------|--------|
| Nav links | — | `11px` | `uppercase`, `letter-spacing: 0.1em` |
| Badges/tags hero | — | `11px` | `uppercase`, `letter-spacing: 0.15em` |
| Phase labels | — | `10px` | `uppercase`, `letter-spacing: 0.2em` |
| Subtítulos herramienta | — | `11px` | `uppercase`, `letter-spacing: 0.1em` |
| Features list | — | `12px` | — |
| Code blocks | — | `12.5px` | `line-height: 1.9` |
| Botones | 500 | `12px` | `uppercase`, `letter-spacing: 0.08em` |
| Section tags (`// Pipeline`) | — | `10px` | `uppercase`, `letter-spacing: 0.2em` |
| Footer | — | `10px` | `uppercase`, `letter-spacing: 0.08em` |

---

## 4. Layout y Espaciado

### Grid

```
max-width: 1100px
padding lateral: 28px
```

### Secciones de herramienta

```
padding vertical: 100px
grid: 2 columnas, 1fr 1fr, gap 56px
```

La sección de architect invierte el orden visual con `direction: rtl` en la grid (código a la izquierda, texto a la derecha).

### Separadores entre secciones

- **Dark → tool**: `border-top: 2px solid [tool-border-top]`
- **Dark → dark**: `border-top: 1px solid rgba(255,255,255,0.06–0.08)`

### Hierarchy del hero

```
padding-top: 130px (incluye espacio para nav fija de 52px)
padding-bottom: 60px
hero-top margin-bottom: 64px (antes del journey)
```

### Journey map

```
max-width: 900px
stop-dot: 64x64px
stops escalonados: margin-top 0 / 80px / 160px
```

### Responsive (≤900px)

- Tool grids → 1 columna
- Journey stops → columna vertical, sin curva SVG
- Principles grid → 1 columna
- Nav links ocultos excepto CTA

### Responsive (≤600px)

- Botones → columna, full width
- Footer → columna centrada

---

## 5. Componentes

### 5.1 Nav

- Fija (`position: fixed`)
- Background: `rgba(10,10,10,0.85)` con `backdrop-filter: blur(10px)`
- Borde inferior: `1px solid rgba(255,255,255,0.08)`
- Altura: `52px`
- Logo: Space Grotesk 700, 15px
- Links: JetBrains Mono 11px, uppercase
- CTA: Fondo blanco (`#ededed`), texto negro (`#0a0a0a`)

### 5.2 Botones

**Primario (sobre dark)**:
```css
background: #ededed; color: #0a0a0a;
font: JetBrains Mono, 12px, 500, uppercase;
padding: 12px 28px;
letter-spacing: 0.08em;
/* hover: opacity 0.85 */
```

**Secundario/Ghost (sobre dark)**:
```css
background: transparent;
color: rgba(255,255,255,0.5);
border: 1px solid rgba(255,255,255,0.15);
/* hover: color #fff, border rgba(255,255,255,0.3) */
```

**Sin border-radius. Sin box-shadow en botones.**

### 5.3 Code Blocks (por paleta)

Estructura HTML:
```html
<div class="cb-[dark|warm|green]">
  <div class="h">Header text</div>
  <div class="b">
    <span class="line">...</span>
  </div>
</div>
```

Propiedades compartidas:
- Borde: `2px solid`
- Sombra sólida: offset `6px 6px 0 0` (intake/architect) o `4px 4px 0 0` (vigil)
- Border-radius: `0`
- Header: JetBrains Mono 10px, uppercase, tracking 0.12em
- Body: JetBrains Mono 12.5px, line-height 1.9, padding 18px

**Syntax highlighting por paleta:**

| Clase | Intake (#dark) | Architect (#warm) | Vigil (#green) |
|-------|---------------|-------------------|----------------|
| `.cmd` | `#ededed` | `#C85A32` | `#10B981` |
| `.fl` (flags) | `#9999a5` | `#292524` | `#022C22` |
| `.s` (strings) | `#7e7e90` | `#57534E` | `#064E3B` |
| `.cm` (comments) | `#3a3a44` | `#a8a29e` | `#86B89E` |
| `.pr` (prompt $) | `#5a5a66` | `#57534E` | `#10B981` |
| `.o` (output) | `#5a5a66` | `#57534E` | `#064E3B` |

### 5.4 Feature Lists

```html
<ul class="ft">
  <li>Texto de feature</li>
</ul>
```

El `::before` varía por herramienta:
- intake: `◻` en color `#ededed`
- architect: `△` en color `#C85A32`
- vigil: `◇` en color `#10B981`

Font: JetBrains Mono, 12px.

### 5.5 Principle Cards

```css
border: 1px solid rgba(255,255,255,0.08);
padding: 24px 20px;
/* hover: border-color rgba(255,255,255,0.15) */
```

Grid: 3 columnas, gap 14px. Sin background explícito (hereda del padre dark). Numeración en JetBrains Mono 10px, color `rgba(255,255,255,0.25)`.

### 5.6 Section Headers

Estructura:
```html
<div class="sh">
  <div class="sh-tag">// Título sección</div>
  <h2>Título principal</h2>
  <p>Subtítulo opcional</p>
</div>
```

- `.sh-tag`: JetBrains Mono, 10px, uppercase, tracking 0.2em, `rgba(255,255,255,0.3)`
- `h2`: Space Grotesk 700, `clamp(26px, 3.5vw, 38px)`, tracking `-0.03em`
- `p`: 15px, `rgba(255,255,255,0.45)`, weight 300

### 5.7 Phase Labels

En las secciones de herramientas:
```css
font-family: var(--f-mono);
font-size: 10px;
letter-spacing: 0.2em;
text-transform: uppercase;
```

Formato: `◻ Fase 01 — Preparación` / `△ Fase 02 — Implementación` / `◇ Fase 03 — Verificación`

---

## 6. Iconos SVG

Los tres iconos son formas geométricas primitivas, stroke-only, sin fill.

### intake — Cuadrado 2D hueco

```svg
<svg viewBox="0 0 24 24" fill="none">
  <rect x="2" y="2" width="20" height="20"
        stroke="#ededed" stroke-width="2" fill="none"/>
</svg>
```

### architect — Triángulo hueco

```svg
<svg viewBox="0 0 40 40" fill="none">
  <polygon points="20,4 38,36 2,36"
           stroke="#C85A32" stroke-width="2" fill="none"/>
</svg>
```

### vigil — Rombo hueco

```svg
<svg viewBox="0 0 40 40" fill="none">
  <polygon points="20,2 38,20 20,38 2,20"
           stroke="#10B981" stroke-width="2" fill="none"/>
</svg>
```

Tamaños usados: `22x22` en journey stops, `20x20` en hero icons y dentro de code blocks más pequeños.

Icon container (journey stop-dot):
```css
width: 64px; height: 64px;
border: 2px solid rgba(255,255,255,0.12);
background: rgba(10,10,12,0.9); /* opaco para tapar la línea */
```

Con un pseudo-element `::before` de borde sutil exterior `inset: -6px`.

---

## 7. Animaciones

### 7.1 Fade Up (entrada de página)

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Aplicado a `.hero-top` y `.journey` con `animation-delay: 0s / 0.15s`.

### 7.2 Draw Path (línea del journey)

```css
@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}
```

Se calcula dinámicamente vía JS: `strokeDasharray = pathLength`, `strokeDashoffset = pathLength`, luego se anima a 0 en `1.5s ease-out` con delay `0.3s`.

### 7.3 Traveling Dots (proyectos en el pipeline)

Sistema de spawner con `requestAnimationFrame`:

- **Spawn rate**: Cada 1.2s–3s aleatorio
- **Max simultáneos**: 3 dots
- **Duración por dot**: 3.5s–5.5s aleatorio
- **Tamaño dot inner**: r = 2.5–4
- **Tamaño dot glow**: r = 10–15
- **Easing**: ease-in-out cuadrático
- **Fade in**: primeros 6% del recorrido
- **Fade out**: últimos 10% del recorrido + 15% extra post-llegada

Color interpolado por posición:
- `0%–50%`: `#ededed` → `#C85A32`
- `50%–100%`: `#C85A32` → `#10B981`

Cada dot tiene su propio `<radialGradient>` SVG para que los colores no se contaminen entre dots.

### 7.4 Transiciones hover

- Nav links: `color .15s`
- Principle cards: `border-color .2s`
- Botones: `opacity .15s`

Todas son CSS transitions simples. No se usan transforms en hover (a excepción de los botones brutalistas con box-shadow, no presentes en la versión final).

---

## 8. Estructura de Secciones

Orden de la página y paleta de cada sección:

```
┌─────────────────────────────────────────┐
│  NAV (fixed)              Dark #0a0a0a  │
├─────────────────────────────────────────┤
│  HERO + Journey Map       Dark #0a0a0c  │
│  (glow terracotta)                      │
├─────────────────────────────────────────┤
│  INTAKE section           Dark #050505  │
│  (glow blanco)                          │
├─────────────────────────────────────────┤
│  ARCHITECT section        Cream #FDFBF7 │
│  (glow terracotta)                      │
├─────────────────────────────────────────┤
│  VIGIL section            Green #F4F7F5 │
│  (glow esmeralda)                       │
├─────────────────────────────────────────┤
│  FULL PIPELINE (code)     Dark #0a0a0c  │
├─────────────────────────────────────────┤
│  PRINCIPLES (6 cards)     Dark #111114  │
├─────────────────────────────────────────┤
│  CTA                      Dark #0a0a0c  │
├─────────────────────────────────────────┤
│  FOOTER                   Dark #0a0a0c  │
└─────────────────────────────────────────┘
```

### Patrón para nuevas secciones

Si necesitas añadir una sección nueva, decide primero en qué "mundo" vive:

- **Sección neutral/global** → Usa la paleta dark base (#0a0a0c o #111114)
- **Sección de intake** → Paleta dark blueprint (#050505)
- **Sección de architect** → Paleta cream (#FDFBF7)
- **Sección de vigil** → Paleta green audit (#F4F7F5)
- **Sección mixta** → Usa dark base con acentos de las 3 herramientas

El radial glow siempre va en `background-image` del fondo de la sección, con el accent de la herramienta correspondiente al 2%–4% de opacidad.

---

## 9. Journey Map — Especificación Técnica

El journey es un SVG dinámico que se calcula en runtime.

### Estructura SVG

```
<svg class="journey-svg">
  <defs>
    <linearGradient id="pathGrad">  ← degradado de la línea
  </defs>
  <path id="pathDash"/>              ← línea dashed de fondo
  <path id="pathGlow"/>              ← línea con gradiente y animación
  <g id="dotsContainer"/>            ← dots dinámicos creados por JS
</svg>
```

### Cálculo de la curva

JS lee `getBoundingClientRect()` de cada `.stop-dot`, calcula centros relativos al contenedor `.journey`, y genera una cubic Bézier con puntos de control para una S-curve suave:

```
M [intake_center]
C [cp1], [cp2], [architect_center]
C [cp3], [cp4], [vigil_center]
```

Los control points usan 45%/55% de la distancia horizontal entre nodos para crear curvas simétricas.

### Z-indexing

- `z-index: 1` → SVG path (queda detrás)
- `z-index: 2` → Journey stops (quedan delante, tapan la línea con su background opaco)

---

## 10. Reglas de Consistencia

### Cosas que NO hacer

- No usar `border-radius` en ningún componente
- No usar `box-shadow` con blur (solo sombras sólidas de offset)
- No usar gradientes decorativos (solo el radial glow sutil de fondo)
- No usar cuadrículas/grids de fondo
- No mezclar paletas entre secciones (una sección = un mundo)
- No usar iconos que no sean las 3 formas geométricas primitivas (◻ △ ◇)
- No usar colores fuera de la paleta definida
- No usar `font-weight` > 300 en body text (500 solo para `<strong>`)

### Cosas que SÍ hacer

- Cada sección de herramienta debe sentirse como "otra web" al scrollear
- El code block de cada herramienta usa su propia paleta de syntax highlighting
- Los separadores entre secciones siempre son border-top en el color de la herramienta que viene
- Los radial glows van posicionados asimétricamente (25%/75% horizontal) para dar movimiento
- Las features lists siempre usan el símbolo geométrico de la herramienta como viñeta
- Los textos de fase siempre siguen el formato: `[símbolo] Fase [XX] — [Nombre]`
