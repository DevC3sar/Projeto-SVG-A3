import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // GEOMETRIC FACES: Rostos geométricos abstratos
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.1)

    const cx = 500
    const cy = 450
    const faceColor = nextColor()
    const featureColor = nextColor()

    // Rosto - base geométrica
    const faceType = key.next16() % 4
    const faceSize = 300

    switch(faceType) {
        case 0:
            // Circular
            draw.circle().size(faceSize).move(cx - faceSize/2, cy - faceSize/2)
                .fill(faceColor).opacity(0.8)
            break
        case 1:
            // Quadrada
            draw.rect().size(faceSize, faceSize).move(cx - faceSize/2, cy - faceSize/2)
                .fill(faceColor).opacity(0.8)
            break
        case 2:
            // Triangular
            draw.polyline([
                cx, cy - faceSize/2,
                cx + faceSize/2, cy + faceSize/2,
                cx - faceSize/2, cy + faceSize/2
            ]).fill(faceColor).opacity(0.8)
            break
        case 3:
            // Hexagonal
            const hexPoints = []
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2
                hexPoints.push(cx + Math.cos(angle) * (faceSize/2))
                hexPoints.push(cy + Math.sin(angle) * (faceSize/2))
            }
            draw.polyline(hexPoints).fill(faceColor).opacity(0.8)
            break
    }

    // Olhos geométricos
    const eyeType = key.next16() % 4
    const eyeY = cy - 50
    const eyeSize = 40

    for (let eyeX of [cx - 80, cx + 80]) {
        switch(eyeType) {
            case 0:
                // Círculos
                draw.circle().size(eyeSize).move(eyeX - eyeSize/2, eyeY - eyeSize/2)
                    .fill(featureColor).opacity(0.9)
                break
            case 1:
                // Quadrados
                draw.rect().size(eyeSize, eyeSize).move(eyeX - eyeSize/2, eyeY - eyeSize/2)
                    .fill(featureColor).opacity(0.9)
                break
            case 2:
                // Triângulos apontados para baixo
                draw.polyline([
                    eyeX - eyeSize/2, eyeY - eyeSize/2,
                    eyeX + eyeSize/2, eyeY - eyeSize/2,
                    eyeX, eyeY + eyeSize/2
                ]).fill(featureColor).opacity(0.9)
                break
            case 3:
                // Diamantes
                draw.polyline([
                    eyeX, eyeY - eyeSize/2,
                    eyeX + eyeSize/2, eyeY,
                    eyeX, eyeY + eyeSize/2,
                    eyeX - eyeSize/2, eyeY
                ]).fill(featureColor).opacity(0.9)
                break
        }
    }

    // Nariz
    const noseType = key.next16() % 3
    const noseY = cy + 30

    if (noseType === 0) {
        // Linha
        draw.line(cx, noseY - 30, cx, noseY + 30)
            .stroke({ color: featureColor, width: 6 }).opacity(0.8)
    } else if (noseType === 1) {
        // Triângulo
        draw.polyline([
            cx, noseY - 30,
            cx + 20, noseY + 30,
            cx - 20, noseY + 30
        ]).fill(featureColor).opacity(0.7)
    } else {
        // Losango
        draw.polyline([
            cx, noseY - 40,
            cx + 25, noseY,
            cx, noseY + 40,
            cx - 25, noseY
        ]).fill(featureColor).opacity(0.7)
    }

    // Boca
    const mouthType = key.next16() % 3
    const mouthY = cy + 100

    if (mouthType === 0) {
        // Reta
        draw.line(cx - 60, mouthY, cx + 60, mouthY)
            .stroke({ color: featureColor, width: 8 }).opacity(0.8)
    } else if (mouthType === 1) {
        // Sorrisão
        const points = []
        for (let i = 0; i <= 10; i++) {
            const x = cx - 60 + (i / 10) * 120
            const y = mouthY + Math.sin((i / 10) * Math.PI) * 40
            points.push(x)
            points.push(y)
        }
        draw.polyline(points).fill('none').stroke({ color: featureColor, width: 6 }).opacity(0.8)
    } else {
        // Triângulo invertido
        draw.polyline([
            cx - 60, mouthY,
            cx + 60, mouthY,
            cx, mouthY + 60
        ]).fill(featureColor).opacity(0.6)
    }

    // Acessórios (cabelo, chapéu, etc)
    const accType = key.next16() % 3
    const accColor = nextColor()

    if (accType === 0) {
        // Cabelo (retangular)
        draw.rect().size(380, 80).move(cx - 190, cy - 190)
            .fill(accColor).opacity(0.6)
    } else if (accType === 1) {
        // Chapéu (triangular)
        draw.polyline([
            cx, cy - faceSize/2 - 100,
            cx + 150, cy - faceSize/2 - 20,
            cx - 150, cy - faceSize/2 - 20
        ]).fill(accColor).opacity(0.7)
    } else {
        // Coroa (zig-zag)
        const crownPoints = []
        for (let i = 0; i <= 5; i++) {
            const x = cx - 150 + (i / 5) * 300
            const y = cy - faceSize/2 - (i % 2 === 0 ? 50 : 100)
            crownPoints.push(x)
            crownPoints.push(y)
        }
        draw.polyline(crownPoints).fill('none').stroke({ color: accColor, width: 8 }).opacity(0.7)
    }
}
