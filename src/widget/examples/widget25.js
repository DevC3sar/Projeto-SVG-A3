import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // MONSTERID: Monstros cartunos com características aleatórias
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    const bodyColor = nextColor()
    const eyeColor = nextColor()
    const mouthColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.15)

    const cx = 500
    const cy = 500

    // Corpo (blob/bolha)
    const bodyWidth = 280
    const bodyHeight = 320
    const bodyType = key.next16() % 3

    if (bodyType === 0) {
        // Forma redonda
        draw.circle().size(bodyWidth).move(cx - bodyWidth/2, cy - bodyHeight/2)
            .fill(bodyColor).opacity(0.8)
    } else if (bodyType === 1) {
        // Forma quadrada com cantos redondos
        draw.rect().size(bodyWidth, bodyHeight).move(cx - bodyWidth/2, cy - bodyHeight/2)
            .fill(bodyColor).radius(40).opacity(0.8)
    } else {
        // Forma de gota
        const points = []
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2
            const radius = bodyHeight/2 * (0.8 + 0.2 * Math.sin(angle * 3))
            points.push(cx + Math.cos(angle) * radius)
            points.push(cy + Math.sin(angle) * radius)
        }
        draw.polyline(points).fill(bodyColor).opacity(0.8)
    }

    // Olhos
    const eyeSize = 50
    const eyeYOffset = -80
    const eyeSpacing = 100
    const eyeType = key.next16() % 4

    for (let eyeX of [cx - eyeSpacing, cx + eyeSpacing]) {
        if (eyeType === 0) {
            // Olhos redondos
            draw.circle().size(eyeSize).move(eyeX - eyeSize/2, cy + eyeYOffset - eyeSize/2)
                .fill(eyeColor).opacity(0.9)
            // Pupila
            draw.circle().size(eyeSize * 0.4).move(eyeX - eyeSize * 0.2, cy + eyeYOffset - eyeSize * 0.2)
                .fill('black').opacity(0.8)
        } else if (eyeType === 1) {
            // Olhos quadrados
            draw.rect().size(eyeSize, eyeSize).move(eyeX - eyeSize/2, cy + eyeYOffset - eyeSize/2)
                .fill(eyeColor).opacity(0.9)
        } else if (eyeType === 2) {
            // Olhos em X
            const offset = eyeSize / 2
            draw.line(eyeX - offset, cy + eyeYOffset - offset, eyeX + offset, cy + eyeYOffset + offset)
                .stroke({ color: eyeColor, width: 8 }).opacity(0.8)
            draw.line(eyeX - offset, cy + eyeYOffset + offset, eyeX + offset, cy + eyeYOffset - offset)
                .stroke({ color: eyeColor, width: 8 }).opacity(0.8)
        } else {
            // Olhos de triângulo
            draw.polyline([
                eyeX, cy + eyeYOffset - eyeSize/2,
                eyeX + eyeSize/2, cy + eyeYOffset + eyeSize/2,
                eyeX - eyeSize/2, cy + eyeYOffset + eyeSize/2
            ]).fill(eyeColor).opacity(0.9)
        }
    }

    // Boca
    const mouthType = key.next16() % 3
    const mouthY = cy + 80

    if (mouthType === 0) {
        // Sorrisão
        draw.polyline([
            cx - 80, mouthY,
            cx, mouthY + 60,
            cx + 80, mouthY
        ]).fill(mouthColor).opacity(0.8)
    } else if (mouthType === 1) {
        // Boca reta
        draw.line(cx - 80, mouthY, cx + 80, mouthY)
            .stroke({ color: mouthColor, width: 10 }).opacity(0.8)
    } else {
        // Boca redonda (O)
        draw.circle().size(60).move(cx - 30, mouthY - 30)
            .fill('none').stroke({ color: mouthColor, width: 8 }).opacity(0.8)
    }

    // Accessories (orelhas, chifres, etc)
    const accessoryType = key.next16() % 4
    const accColor = nextColor()

    if (accessoryType === 0) {
        // Orelhas
        for (let earX of [cx - 140, cx + 140]) {
            draw.circle().size(60).move(earX - 30, cy - 160)
                .fill(accColor).opacity(0.7)
        }
    } else if (accessoryType === 1) {
        // Chifres
        for (let hornX of [cx - 100, cx + 100]) {
            draw.polyline([
                hornX, cy - 160,
                hornX - 30, cy - 230,
                hornX - 20, cy - 200
            ]).fill(accColor).opacity(0.8)
            draw.polyline([
                hornX, cy - 160,
                hornX + 30, cy - 230,
                hornX + 20, cy - 200
            ]).fill(accColor).opacity(0.8)
        }
    } else if (accessoryType === 2) {
        // Cabelo espetado
        for (let i = 0; i < 5; i++) {
            const hairX = cx - 100 + (i * 50)
            const height = 60 + (i % 2) * 20
            draw.polyline([
                hairX, cy - 160,
                hairX, cy - 160 - height
            ]).stroke({ color: accColor, width: 12 }).opacity(0.7)
        }
    } else {
        // Antenas com bolinhas
        for (let antX of [cx - 80, cx + 80]) {
            draw.line(antX, cy - 160, antX, cy - 240)
                .stroke({ color: accColor, width: 8 }).opacity(0.7)
            draw.circle().size(30).move(antX - 15, cy - 255)
                .fill(accColor).opacity(0.8)
        }
    }
}
