import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar com rosto ilustrado estilo anime
 * Grandes olhos expressivos, estilo mangá
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

    // Cabelo estilo anime (volumoso e com movimento)
    const hairStyle = key.next16() % 3
    if (hairStyle === 0) {
        // Cabelo pontiagudo (estilo rebelde)
        for (let i = 0; i < 7; i++) {
            const angle = (i / 7) * Math.PI * 2
            const x = size * 0.5 + Math.cos(angle) * size * 0.25
            const y = size * 0.3 + Math.sin(angle) * size * 0.2 - size * 0.15
            draw.polygon([
                [size * 0.5, size * 0.3],
                [x - size * 0.03, y - size * 0.05],
                [x + size * 0.03, y - size * 0.05]
            ]).attr({ fill: hairColor })
        }
    } else if (hairStyle === 1) {
        // Cabelo comprido ondulado
        draw.path(`M ${size * 0.2} ${size * 0.15} Q ${size * 0.3} ${size * 0.05}, ${size * 0.5} ${size * 0.1} Q ${size * 0.7} ${size * 0.05}, ${size * 0.8} ${size * 0.15}`).attr({ stroke: hairColor, "stroke-width": size * 0.15, fill: "none", "stroke-linecap": "round" })
    } else {
        // Cabelo curto despenteado
        draw.ellipse(size * 0.35, size * 0.15).move(size * 0.175, size * 0.1).attr({ fill: hairColor })
    }

    // Cabeça
    draw.circle(size * 0.5).move(size * 0.25, size * 0.3).attr({ fill: skinColor, stroke: "#000", "stroke-width": 1.5 })

    // Orelhas
    draw.ellipse(size * 0.06, size * 0.12).move(size * 0.17, size * 0.42).attr({ fill: skinColor, stroke: "#000", "stroke-width": 1 })
    draw.ellipse(size * 0.06, size * 0.12).move(size * 0.77, size * 0.42).attr({ fill: skinColor, stroke: "#000", "stroke-width": 1 })

    // OLHOS GRANDES ESTILO ANIME
    const eyeY = size * 0.42

    // Olho esquerdo
    const leftEyeX = size * 0.32
    draw.ellipse(size * 0.15, size * 0.22).move(leftEyeX - size * 0.075, eyeY - size * 0.11).attr({ fill: eyeColor, stroke: "#000", "stroke-width": 2 })
    
    // Brilho grande no olho esquerdo
    draw.ellipse(size * 0.08, size * 0.12).move(leftEyeX - size * 0.04, eyeY - size * 0.08).attr({ fill: "#ffffff" })
    
    // Pupila
    draw.circle(size * 0.06).move(leftEyeX - size * 0.03, eyeY - size * 0.02).attr({ fill: "#000000" })

    // Olho direito
    const rightEyeX = size * 0.68
    draw.ellipse(size * 0.15, size * 0.22).move(rightEyeX - size * 0.075, eyeY - size * 0.11).attr({ fill: eyeColor, stroke: "#000", "stroke-width": 2 })
    
    // Brilho grande no olho direito
    draw.ellipse(size * 0.08, size * 0.12).move(rightEyeX - size * 0.04, eyeY - size * 0.08).attr({ fill: "#ffffff" })
    
    // Pupila
    draw.circle(size * 0.06).move(rightEyeX - size * 0.03, eyeY - size * 0.02).attr({ fill: "#000000" })

    // Sobrancelhas anime (ângulo mais dramático)
    const browY = size * 0.32
    draw.line(size * 0.26, browY - size * 0.02, size * 0.38, browY + size * 0.01).attr({ stroke: hairColor, "stroke-width": 2.5, "stroke-linecap": "round" })
    draw.line(size * 0.62, browY + size * 0.01, size * 0.74, browY - size * 0.02).attr({ stroke: hairColor, "stroke-width": 2.5, "stroke-linecap": "round" })

    // Nariz - bem pequeno no estilo anime
    draw.polygon([
        [size * 0.5, size * 0.55],
        [size * 0.48, size * 0.58],
        [size * 0.52, size * 0.58]
    ]).attr({ fill: accentColor, stroke: "#000", "stroke-width": 0.5 })

    // Boca estilo anime
    const mouthExpression = key.next16() % 3
    const mouthY = size * 0.68

    if (mouthExpression === 0) {
        // Sorriso brilhante
        draw.path(`M ${size * 0.35} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.07}, ${size * 0.65} ${mouthY}`).attr({ stroke: "#000", "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
        draw.line(size * 0.35, mouthY, size * 0.65, mouthY).attr({ stroke: accentColor, "stroke-width": 2 })
    } else if (mouthExpression === 1) {
        // Boca de anime séria
        draw.path(`M ${size * 0.38} ${mouthY} Q ${size * 0.5} ${mouthY + size * 0.02}, ${size * 0.62} ${mouthY}`).attr({ stroke: "#000", "stroke-width": 1.5, fill: "none", "stroke-linecap": "round" })
    } else {
        // Expressão de surpresa
        draw.ellipse(size * 0.06, size * 0.08).move(size * 0.47, size * 0.64).attr({ fill: accentColor, stroke: "#000", "stroke-width": 1 })
    }

    // Blush exagerado (muito vermelho)
    const blushColor = accentColor
    draw.ellipse(size * 0.1, size * 0.08).move(size * 0.12, size * 0.52).attr({ fill: blushColor, opacity: 0.6 })
    draw.ellipse(size * 0.1, size * 0.08).move(size * 0.78, size * 0.52).attr({ fill: blushColor, opacity: 0.6 })
}
