import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar com rosto em estilo low-poly (geométrico moderno)
 * Triângulos e formas geométricas criam rosto abstrato mas reconhecível
 */
export default function (key, draw, opts = {}) {
    const nextColor = getColorIterator(key)
    const size = opts.size || 200

    // Cores
    const color1 = nextColor()
    const color2 = nextColor()
    const color3 = nextColor()
    const color4 = nextColor()

    // Cabelo (triângulos)
    const hairColor = color1
    for (let i = 0; i < 4; i++) {
        const x = size * 0.15 + (i * size * 0.2)
        draw.polygon([
            [x, size * 0.1],
            [x - size * 0.08, size * 0.05],
            [x + size * 0.08, size * 0.05]
        ]).attr({ fill: hairColor, stroke: "#333", "stroke-width": 0.5 })
    }

    // Topo da cabeça (grandes triângulos)
    const headColor = color2
    draw.polygon([
        [size * 0.3, size * 0.2],
        [size * 0.25, size * 0.35],
        [size * 0.5, size * 0.3]
    ]).attr({ fill: headColor, stroke: "#333", "stroke-width": 0.5 })

    draw.polygon([
        [size * 0.5, size * 0.3],
        [size * 0.75, size * 0.35],
        [size * 0.7, size * 0.2]
    ]).attr({ fill: headColor, stroke: "#333", "stroke-width": 0.5 })

    // Lateral esquerda do rosto
    draw.polygon([
        [size * 0.25, size * 0.35],
        [size * 0.2, size * 0.55],
        [size * 0.4, size * 0.5]
    ]).attr({ fill: color1, stroke: "#333", "stroke-width": 0.5 })

    // Centro do rosto
    draw.polygon([
        [size * 0.4, size * 0.35],
        [size * 0.4, size * 0.5],
        [size * 0.6, size * 0.5],
        [size * 0.6, size * 0.35]
    ]).attr({ fill: headColor, stroke: "#333", "stroke-width": 0.5 })

    // Lateral direita do rosto
    draw.polygon([
        [size * 0.6, size * 0.35],
        [size * 0.6, size * 0.5],
        [size * 0.8, size * 0.55],
        [size * 0.75, size * 0.35]
    ]).attr({ fill: color1, stroke: "#333", "stroke-width": 0.5 })

    // Queixo
    draw.polygon([
        [size * 0.35, size * 0.5],
        [size * 0.65, size * 0.5],
        [size * 0.5, size * 0.7]
    ]).attr({ fill: color2, stroke: "#333", "stroke-width": 0.5 })

    // OLHO ESQUERDO
    const eyeLeftColor = color3
    draw.polygon([
        [size * 0.3, size * 0.35],
        [size * 0.38, size * 0.35],
        [size * 0.4, size * 0.42],
        [size * 0.32, size * 0.42]
    ]).attr({ fill: eyeLeftColor, stroke: "#333", "stroke-width": 1 })

    // Brilho do olho esquerdo
    draw.polygon([
        [size * 0.32, size * 0.36],
        [size * 0.36, size * 0.36],
        [size * 0.35, size * 0.39]
    ]).attr({ fill: "#ffffff", stroke: "none" })

    // OLHO DIREITO
    const eyeRightColor = color4
    draw.polygon([
        [size * 0.62, size * 0.35],
        [size * 0.7, size * 0.35],
        [size * 0.68, size * 0.42],
        [size * 0.6, size * 0.42]
    ]).attr({ fill: eyeRightColor, stroke: "#333", "stroke-width": 1 })

    // Brilho do olho direito
    draw.polygon([
        [size * 0.64, size * 0.36],
        [size * 0.68, size * 0.36],
        [size * 0.65, size * 0.39]
    ]).attr({ fill: "#ffffff", stroke: "none" })

    // Sobrancelha esquerda
    draw.polygon([
        [size * 0.28, size * 0.3],
        [size * 0.42, size * 0.28],
        [size * 0.4, size * 0.33],
        [size * 0.3, size * 0.35]
    ]).attr({ fill: hairColor, stroke: "#333", "stroke-width": 0.5 })

    // Sobrancelha direita
    draw.polygon([
        [size * 0.58, size * 0.28],
        [size * 0.72, size * 0.3],
        [size * 0.7, size * 0.35],
        [size * 0.6, size * 0.33]
    ]).attr({ fill: hairColor, stroke: "#333", "stroke-width": 0.5 })

    // NARIZ (triângulos)
    const noseColor = color3
    draw.polygon([
        [size * 0.48, size * 0.42],
        [size * 0.52, size * 0.42],
        [size * 0.5, size * 0.48]
    ]).attr({ fill: noseColor, stroke: "#333", "stroke-width": 0.5 })

    // BOCA
    const mouthStyle = key.next16() % 2
    const mouthColor = color4

    if (mouthStyle === 0) {
        // Boca sorridente (triângulos)
        draw.polygon([
            [size * 0.38, size * 0.55],
            [size * 0.5, size * 0.62],
            [size * 0.62, size * 0.55]
        ]).attr({ fill: mouthColor, stroke: "#333", "stroke-width": 0.5 })
    } else {
        // Boca neutra
        draw.polygon([
            [size * 0.4, size * 0.56],
            [size * 0.6, size * 0.56],
            [size * 0.58, size * 0.59],
            [size * 0.42, size * 0.59]
        ]).attr({ fill: mouthColor, stroke: "#333", "stroke-width": 0.5 })
    }

    // Orelha esquerda (triângulos)
    draw.polygon([
        [size * 0.2, size * 0.4],
        [size * 0.15, size * 0.45],
        [size * 0.18, size * 0.52],
        [size * 0.25, size * 0.48]
    ]).attr({ fill: color1, stroke: "#333", "stroke-width": 0.5 })

    // Orelha direita
    draw.polygon([
        [size * 0.8, size * 0.4],
        [size * 0.85, size * 0.45],
        [size * 0.82, size * 0.52],
        [size * 0.75, size * 0.48]
    ]).attr({ fill: color1, stroke: "#333", "stroke-width": 0.5 })

    // Sombreado para profundidade
    draw.polygon([
        [size * 0.15, size * 0.5],
        [size * 0.25, size * 0.6],
        [size * 0.2, size * 0.7]
    ]).attr({ fill: "#000000", opacity: 0.1, stroke: "none" })

    draw.polygon([
        [size * 0.85, size * 0.5],
        [size * 0.75, size * 0.6],
        [size * 0.8, size * 0.7]
    ]).attr({ fill: "#000000", opacity: 0.1, stroke: "none" })
}
