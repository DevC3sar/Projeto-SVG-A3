import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // BORINGAVATARS: Formas geométricas modernas e minimalistas
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.2)

    // Padrão 1: Forma geométrica grande ao fundo
    const shapeType = key.next16() % 4
    const color1 = nextColor()
    const color2 = nextColor()
    const color3 = nextColor()

    switch(shapeType) {
        case 0: // Círculos sobrepostos
            draw.circle().size(600).move(100, 100).fill(color1).opacity(0.4)
            draw.circle().size(500).move(300, 200).fill(color2).opacity(0.5)
            draw.circle().size(400).move(400, 400).fill(color3).opacity(0.6)
            break
        case 1: // Quadrados rotacionados
            draw.rect().size(500, 500).move(250, 250)
                .fill(color1).opacity(0.4)
                .transform({ rotate: 45 })
            draw.rect().size(350, 350).move(325, 325)
                .fill(color2).opacity(0.5)
                .transform({ rotate: 45 })
            break
        case 2: // Triângulos
            const tri = []
            draw.polyline([500, 100, 900, 700, 100, 700])
                .fill(color1).opacity(0.5)
            draw.polyline([500, 200, 800, 650, 200, 650])
                .fill(color2).opacity(0.6)
            break
        case 3: // Linhas diagonais
            for (let i = 0; i < 8; i++) {
                const offset = i * 150
                const color = i % 2 === 0 ? color1 : color2
                draw.line(-200 + offset, -200, 1200 + offset, 1200)
                    .stroke({ color, width: 100 }).opacity(0.3)
            }
            break
    }

    // Padrão 2: Detalhes geométricos no centro
    const detailType = key.next16() % 3
    const cx = 500
    const cy = 500
    const detailColor = nextColor()

    switch(detailType) {
        case 0: // Grid de pontos
            for (let x = 200; x < 800; x += 150) {
                for (let y = 200; y < 800; y += 150) {
                    draw.circle().size(40).move(x - 20, y - 20)
                        .fill(detailColor).opacity(0.7)
                }
            }
            break
        case 1: // Estrela central
            const r = 150
            const starPoints = []
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2 - Math.PI / 2
                const radius = i % 2 === 0 ? r : r * 0.4
                starPoints.push(cx + Math.cos(angle) * radius)
                starPoints.push(cy + Math.sin(angle) * radius)
            }
            draw.polyline(starPoints).fill(detailColor).opacity(0.8)
            break
        case 2: // Ondas
            for (let wave = 0; wave < 4; wave++) {
                const points = []
                for (let x = 0; x <= 1000; x += 50) {
                    const y = 400 + (wave - 1.5) * 80 + Math.sin(x / 100) * 30
                    points.push(x)
                    points.push(y)
                }
                draw.polyline(points).fill(detailColor).opacity(0.3 + wave * 0.15)
            }
            break
    }
}
