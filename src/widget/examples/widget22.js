import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // ROBOHASH: Robô simplificado com partes modulares
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    const bodyColor = nextColor()
    const headColor = nextColor()
    const accentColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.1)

    const headX = 500
    const headY = 250
    const bodyX = 500
    const bodyY = 550

    // Cabeça (quadrada/redonda)
    const headType = key.next16() % 2
    const headSize = 200
    if (headType === 0) {
        draw.rect().size(headSize, headSize).move(headX - headSize/2, headY - headSize/2)
            .fill(headColor).opacity(0.8)
    } else {
        draw.circle().size(headSize).move(headX - headSize/2, headY - headSize/2)
            .fill(headColor).opacity(0.8)
    }

    // Olhos
    const eyeType = key.next16() % 3
    const eyeY = headY - 30
    const eyeSize = 30
    
    for (let eyeX of [headX - 60, headX + 60]) {
        if (eyeType === 0) {
            // Círculos
            draw.circle().size(eyeSize).move(eyeX - eyeSize/2, eyeY - eyeSize/2)
                .fill(accentColor).opacity(0.9)
        } else if (eyeType === 1) {
            // Quadrados
            draw.rect().size(eyeSize, eyeSize).move(eyeX - eyeSize/2, eyeY - eyeSize/2)
                .fill(accentColor).opacity(0.9)
        } else {
            // Triângulos
            draw.polyline([
                eyeX, eyeY - eyeSize/2,
                eyeX + eyeSize/2, eyeY + eyeSize/2,
                eyeX - eyeSize/2, eyeY + eyeSize/2
            ]).fill(accentColor).opacity(0.9)
        }
    }

    // Boca
    const mouthY = headY + 60
    const mouthType = key.next16() % 2
    if (mouthType === 0) {
        draw.line(headX - 50, mouthY, headX + 50, mouthY)
            .stroke({ color: accentColor, width: 6 }).opacity(0.8)
    } else {
        draw.polyline([headX - 50, mouthY - 20, headX, mouthY + 20, headX + 50, mouthY - 20])
            .fill('none').stroke({ color: accentColor, width: 6 }).opacity(0.8)
    }

    // Corpo
    const bodyWidth = 160
    const bodyHeight = 220
    draw.rect().size(bodyWidth, bodyHeight).move(bodyX - bodyWidth/2, bodyY)
        .fill(bodyColor).opacity(0.8)

    // Botões no corpo
    const buttonCount = 2 + (key.next16() % 3)
    for (let i = 0; i < buttonCount; i++) {
        const buttonY = bodyY + 40 + (i * 50)
        draw.circle().size(30).move(bodyX - 15, buttonY)
            .fill(accentColor).opacity(0.7)
    }

    // Antenas
    const antennaType = key.next16() % 2
    const antennaX1 = headX - 80
    const antennaX2 = headX + 80
    const antennaTopY = headY - 120

    if (antennaType === 0) {
        // Retas
        draw.line(antennaX1, headY - headSize/2, antennaX1, antennaTopY)
            .stroke({ color: accentColor, width: 8 }).opacity(0.7)
        draw.line(antennaX2, headY - headSize/2, antennaX2, antennaTopY)
            .stroke({ color: accentColor, width: 8 }).opacity(0.7)
    } else {
        // Com bolinhas no topo
        draw.line(antennaX1, headY - headSize/2, antennaX1, antennaTopY)
            .stroke({ color: accentColor, width: 8 }).opacity(0.7)
        draw.line(antennaX2, headY - headSize/2, antennaX2, antennaTopY)
            .stroke({ color: accentColor, width: 8 }).opacity(0.7)
        
        draw.circle().size(30).move(antennaX1 - 15, antennaTopY - 15)
            .fill(accentColor).opacity(0.7)
        draw.circle().size(30).move(antennaX2 - 15, antennaTopY - 15)
            .fill(accentColor).opacity(0.7)
    }

    // Pernas
    const legWidth = 40
    const legHeight = 80
    for (let legX of [bodyX - 70, bodyX + 70]) {
        draw.rect().size(legWidth, legHeight).move(legX - legWidth/2, bodyY + bodyHeight)
            .fill(bodyColor).opacity(0.7)
    }
}
