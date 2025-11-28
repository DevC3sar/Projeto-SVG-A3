import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar com rosto realista - Estilo minimalist
 * Cabeça, olhos, nariz, boca com design limpo
 */
export default function (key, draw, opts = {}) {
    const nextColor = getColorIterator(key)
    const size = opts.size || 200
    const center = size / 2

    // Cores
    const skinColor = nextColor()
    const hairColor = nextColor()
    const eyeColor = nextColor()
    const mouthColor = nextColor()

    // Cabelo (topo da cabeça)
    const hairStyle = key.next16() % 4
    if (hairStyle === 0) {
        // Cabelo reto
        draw.rect(size * 0.2, size * 0.15).move(size * 0.2, size * 0.08).attr({ fill: hairColor })
    } else if (hairStyle === 1) {
        // Cabelo ondulado
        draw.path(`M ${size * 0.2} ${size * 0.12} Q ${size * 0.5} ${size * 0.02}, ${size * 0.8} ${size * 0.12}`).attr({ stroke: hairColor, "stroke-width": size * 0.12, fill: hairColor, "stroke-linecap": "round" })
    } else if (hairStyle === 2) {
        // Cabelo com volume
        draw.circle(size * 0.35).move(size * 0.075, size * 0.05).attr({ fill: hairColor })
    } else {
        // Cabelo curto
        draw.rect(size * 0.15, size * 0.2).move(size * 0.25, size * 0.08).attr({ fill: hairColor })
    }

    // Cabeça (círculo)
    draw.circle(size * 0.6).move(size * 0.2, size * 0.25).attr({ fill: skinColor, stroke: hairColor, "stroke-width": 2 })

    // Orelhas
    draw.ellipse(size * 0.08, size * 0.15).move(size * 0.15, size * 0.35).attr({ fill: skinColor })
    draw.ellipse(size * 0.08, size * 0.15).move(size * 0.77, size * 0.35).attr({ fill: skinColor })

    // Olhos
    const eyeSpacing = size * 0.12
    const eyeY = size * 0.35

    // Olho esquerdo
    draw.circle(size * 0.08).move(size * 0.25, eyeY).attr({ fill: eyeColor })
    draw.circle(size * 0.03).move(size * 0.27, eyeY + size * 0.02).attr({ fill: "#000000" })

    // Olho direito
    draw.circle(size * 0.08).move(size * 0.55, eyeY).attr({ fill: eyeColor })
    draw.circle(size * 0.03).move(size * 0.57, eyeY + size * 0.02).attr({ fill: "#000000" })

    // Sobrancelhas
    draw.path(`M ${size * 0.24} ${size * 0.32} Q ${size * 0.29} ${size * 0.28}, ${size * 0.34} ${size * 0.32}`).attr({ stroke: hairColor, "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
    draw.path(`M ${size * 0.54} ${size * 0.32} Q ${size * 0.59} ${size * 0.28}, ${size * 0.64} ${size * 0.32}`).attr({ stroke: hairColor, "stroke-width": 2, fill: "none", "stroke-linecap": "round" })

    // Nariz
    const noseStyle = key.next16() % 2
    if (noseStyle === 0) {
        // Nariz simples
        draw.path(`M ${size * 0.5} ${size * 0.38} L ${size * 0.48} ${size * 0.48} L ${size * 0.52} ${size * 0.48}`).attr({ stroke: skinColor, "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
    } else {
        // Nariz com sombreado
        draw.polygon([
            [size * 0.5, size * 0.38],
            [size * 0.48, size * 0.48],
            [size * 0.52, size * 0.48]
        ]).attr({ fill: skinColor, stroke: hairColor, "stroke-width": 1 })
    }

    // Boca
    const mouthStyle = key.next16() % 3
    const mouthY = size * 0.6

    if (mouthStyle === 0) {
        // Sorriso feliz
        draw.path(`M ${size * 0.4} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.05}, ${size * 0.6} ${mouthY}`).attr({ stroke: mouthColor, "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
    } else if (mouthStyle === 1) {
        // Boca séria
        draw.line(size * 0.4, mouthY, size * 0.6, mouthY).attr({ stroke: mouthColor, "stroke-width": 2, "stroke-linecap": "round" })
    } else {
        // Boca neutra com pequeno sorriso
        draw.path(`M ${size * 0.4} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.02}, ${size * 0.6} ${mouthY}`).attr({ stroke: mouthColor, "stroke-width": 2.5, fill: "none", "stroke-linecap": "round" })
    }

    // Marcas/sardas (opcional, baseado no hash)
    const hasMarks = key.next16() % 2 === 0
    if (hasMarks) {
        for (let i = 0; i < 3; i++) {
            const x = size * 0.25 + (i % 2) * size * 0.3 + key.next16() % 20 - 10
            const y = size * 0.4 + Math.floor(i / 2) * size * 0.15 + key.next16() % 10 - 5
            draw.circle(size * 0.02).move(x, y).attr({ fill: mouthColor, opacity: 0.6 })
        }
    }
}
