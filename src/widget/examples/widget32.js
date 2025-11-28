import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar profissional estilo corporativo
 * Rosto realista com aparência formal e elegante
 */
export default function (key, draw, opts = {}) {
    const nextColor = getColorIterator(key)
    const size = opts.size || 200
    const center = size / 2

    // Cores (mais formais)
    const skinColor = nextColor()
    const hairColor = nextColor()
    const eyeColor = nextColor()
    const clothColor = nextColor()

    // Cabelo profissional
    const hairStyle = key.next16() % 4
    if (hairStyle === 0) {
        // Cabelo curto penteado para trás
        draw.ellipse(size * 0.35, size * 0.18).move(size * 0.2, size * 0.08).attr({ fill: hairColor })
    } else if (hairStyle === 1) {
        // Cabelo longo reto
        draw.path(`M ${size * 0.2} ${size * 0.12} Q ${size * 0.4} ${size * 0.08}, ${size * 0.8} ${size * 0.15}`).attr({ stroke: hairColor, "stroke-width": size * 0.1, fill: hairColor, "stroke-linecap": "round" })
    } else if (hairStyle === 2) {
        // Cabelo loiro/claro penteado
        draw.path(`M ${size * 0.3} ${size * 0.1} L ${size * 0.45} ${size * 0.08} L ${size * 0.55} ${size * 0.08} L ${size * 0.7} ${size * 0.1} Q ${size * 0.5} ${size * 0.2}, ${size * 0.3} ${size * 0.1}`).attr({ fill: hairColor })
    } else {
        // Cabelo volumoso professional
        draw.ellipse(size * 0.4, size * 0.2).move(size * 0.15, size * 0.07).attr({ fill: hairColor })
    }

    // Cabeça com tom realista
    draw.circle(size * 0.55).move(size * 0.175, size * 0.25).attr({ fill: skinColor, stroke: "#cccccc", "stroke-width": 1 })

    // Pescoço
    draw.rect(size * 0.15, size * 0.12).move(size * 0.425, size * 0.75).attr({ fill: skinColor })

    // Ombros/Corpo (camisa/terno)
    draw.rect(size, size * 0.25).move(0, size * 0.8).attr({ fill: clothColor })

    // Gola da camisa
    draw.polygon([
        [size * 0.3, size * 0.8],
        [size * 0.4, size * 0.75],
        [size * 0.5, size * 0.75],
        [size * 0.6, size * 0.75],
        [size * 0.7, size * 0.8]
    ]).attr({ fill: "#ffffff" })

    // Olhos realistas
    const eyeSize = size * 0.07
    const eyeY = size * 0.4

    // Olho esquerdo
    draw.ellipse(eyeSize, eyeSize * 0.8).move(size * 0.3, eyeY).attr({ fill: eyeColor, stroke: "#999", "stroke-width": 0.5 })
    draw.circle(eyeSize * 0.6).move(size * 0.32, eyeY + size * 0.01).attr({ fill: "#000000" })
    draw.circle(eyeSize * 0.3).move(size * 0.34, eyeY - size * 0.01).attr({ fill: "#ffffff", opacity: 0.7 })

    // Olho direito
    draw.ellipse(eyeSize, eyeSize * 0.8).move(size * 0.6, eyeY).attr({ fill: eyeColor, stroke: "#999", "stroke-width": 0.5 })
    draw.circle(eyeSize * 0.6).move(size * 0.62, eyeY + size * 0.01).attr({ fill: "#000000" })
    draw.circle(eyeSize * 0.3).move(size * 0.64, eyeY - size * 0.01).attr({ fill: "#ffffff", opacity: 0.7 })

    // Sobrancelhas sutis
    draw.path(`M ${size * 0.28} ${size * 0.37} L ${size * 0.42} ${size * 0.35}`).attr({ stroke: hairColor, "stroke-width": 1.5, "stroke-linecap": "round" })
    draw.path(`M ${size * 0.58} ${size * 0.35} L ${size * 0.72} ${size * 0.37}`).attr({ stroke: hairColor, "stroke-width": 1.5, "stroke-linecap": "round" })

    // Nariz refinado
    draw.path(`M ${size * 0.5} ${size * 0.42} L ${size * 0.5} ${size * 0.52}`).attr({ stroke: skinColor, "stroke-width": 1, "stroke-linecap": "round" })
    draw.circle(size * 0.02).move(size * 0.475, size * 0.52).attr({ fill: skinColor })
    draw.circle(size * 0.02).move(size * 0.525, size * 0.52).attr({ fill: skinColor })

    // Boca profissional
    const mouthMood = key.next16() % 2
    const mouthY = size * 0.65

    if (mouthMood === 0) {
        // Sorriso leve profissional
        draw.path(`M ${size * 0.4} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.02}, ${size * 0.6} ${mouthY}`).attr({ stroke: "#999", "stroke-width": 1.5, fill: "none", "stroke-linecap": "round" })
    } else {
        // Boca neutra séria
        draw.line(size * 0.42, mouthY, size * 0.58, mouthY).attr({ stroke: "#999", "stroke-width": 1.5 })
    }

    // Sombra facial (barba levemente desenhada para alguns)
    const hasStubble = key.next16() % 3 === 0
    if (hasStubble) {
        for (let i = 0; i < 4; i++) {
            draw.circle(size * 0.015).move(size * 0.35 + i * size * 0.15, size * 0.62).attr({ fill: hairColor, opacity: 0.3 })
        }
    }

    // Profundidade - sombra na lateral do rosto
    draw.ellipse(size * 0.08, size * 0.4).move(size * 0.85, size * 0.35).attr({ fill: "#000000", opacity: 0.05 })
}
