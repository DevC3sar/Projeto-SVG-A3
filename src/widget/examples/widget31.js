import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar com rosto estilo cartoon
 * Mais expressivo com grandes olhos e traços divertidos
 */
export default function (key, draw, opts = {}) {
    const nextColor = getColorIterator(key)
    const size = opts.size || 200
    const center = size / 2

    // Cores
    const skinColor = nextColor()
    const hairColor = nextColor()
    const eyeColor = nextColor()
    const accentColor = nextColor()

    // Cabelo estilo cartoon (base)
    const hairType = key.next16() % 3
    if (hairType === 0) {
        // Cabelo ponta para cima
        for (let i = 0; i < 5; i++) {
            const x = size * 0.2 + (i * size * 0.15)
            draw.polygon([
                [x, size * 0.15],
                [x - size * 0.04, size * 0.08],
                [x + size * 0.04, size * 0.08]
            ]).attr({ fill: hairColor })
        }
    } else if (hairType === 1) {
        // Cabelo volumoso
        draw.circle(size * 0.3).move(size * 0.1, size * 0.05).attr({ fill: hairColor })
        draw.circle(size * 0.25).move(size * 0.15, size * 0.08).attr({ fill: hairColor })
        draw.circle(size * 0.3).move(size * 0.55, size * 0.05).attr({ fill: hairColor })
    } else {
        // Cabelo liso
        draw.rect(size * 0.6, size * 0.12).move(size * 0.2, size * 0.1).attr({ fill: hairColor })
    }

    // Cabeça (base com rosto redondo)
    draw.circle(size * 0.5).move(size * 0.25, size * 0.22).attr({ fill: skinColor, stroke: accentColor, "stroke-width": 2 })

    // Orelhas cartoon
    draw.circle(size * 0.08).move(size * 0.15, size * 0.35).attr({ fill: skinColor, stroke: accentColor, "stroke-width": 1.5 })
    draw.circle(size * 0.08).move(size * 0.77, size * 0.35).attr({ fill: skinColor, stroke: accentColor, "stroke-width": 1.5 })

    // Grandes olhos (cartoon)
    const eyeSize = size * 0.12
    const eyeY = size * 0.38

    // Olho esquerdo
    draw.ellipse(eyeSize, eyeSize * 1.3).move(size * 0.28, eyeY).attr({ fill: eyeColor, stroke: "#000", "stroke-width": 2 })
    draw.circle(eyeSize * 0.5).move(size * 0.31, eyeY + size * 0.04).attr({ fill: "#000000" })
    draw.circle(eyeSize * 0.25).move(size * 0.33, eyeY + size * 0.02).attr({ fill: "#ffffff", opacity: 0.8 })

    // Olho direito
    draw.ellipse(eyeSize, eyeSize * 1.3).move(size * 0.6, eyeY).attr({ fill: eyeColor, stroke: "#000", "stroke-width": 2 })
    draw.circle(eyeSize * 0.5).move(size * 0.63, eyeY + size * 0.04).attr({ fill: "#000000" })
    draw.circle(eyeSize * 0.25).move(size * 0.65, eyeY + size * 0.02).attr({ fill: "#ffffff", opacity: 0.8 })

    // Sobrancelhas expressivas
    const browY = size * 0.33
    draw.path(`M ${size * 0.26} ${browY} Q ${size * 0.34} ${browY - size * 0.03}, ${size * 0.42} ${browY}`).attr({ stroke: hairColor, "stroke-width": 2.5, fill: "none", "stroke-linecap": "round" })
    draw.path(`M ${size * 0.58} ${browY} Q ${size * 0.66} ${browY - size * 0.03}, ${size * 0.74} ${browY}`).attr({ stroke: hairColor, "stroke-width": 2.5, fill: "none", "stroke-linecap": "round" })

    // Nariz simples (dois pontos)
    draw.circle(size * 0.03).move(size * 0.485, size * 0.5).attr({ fill: accentColor })
    draw.circle(size * 0.03).move(size * 0.515, size * 0.5).attr({ fill: accentColor })

    // Boca grande e expressiva
    const mouthExpression = key.next16() % 4
    const mouthY = size * 0.63

    if (mouthExpression === 0) {
        // Sorriso grande
        draw.path(`M ${size * 0.35} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.08}, ${size * 0.65} ${mouthY}`).attr({ stroke: accentColor, "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
        draw.line(size * 0.35, mouthY, size * 0.65, mouthY).attr({ stroke: accentColor, "stroke-width": 2 })
    } else if (mouthExpression === 1) {
        // Boca neutra
        draw.line(size * 0.4, mouthY, size * 0.6, mouthY).attr({ stroke: accentColor, "stroke-width": 2.5, "stroke-linecap": "round" })
    } else if (mouthExpression === 2) {
        // Pequeno sorriso tímido
        draw.path(`M ${size * 0.42} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.03}, ${size * 0.58} ${mouthY}`).attr({ stroke: accentColor, "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
    } else {
        // Boca surpresa (O)
        draw.circle(size * 0.05).move(size * 0.475, size * 0.6).attr({ fill: accentColor })
    }

    // Blush (bochechas)
    const blushColor = accentColor
    draw.ellipse(size * 0.08, size * 0.06).move(size * 0.16, size * 0.48).attr({ fill: blushColor, opacity: 0.5 })
    draw.ellipse(size * 0.08, size * 0.06).move(size * 0.76, size * 0.48).attr({ fill: blushColor, opacity: 0.5 })
}
