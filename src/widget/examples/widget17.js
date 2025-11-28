import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de gradiente com faixas
    const bandCount = 5 + (key.next16() % 6)
    const bandHeight = 1000 / bandCount

    for (let band = 0; band < bandCount; band++) {
        const y = band * bandHeight
        const color = nextColor()
        
        // Desenha faixa base
        draw.rect().size(1000, bandHeight).move(0, y)
            .fill(color).opacity(0.3)

        // Adiciona linhas e detalhes
        const lineCount = 2 + (key.next16() % 4)
        for (let line = 0; line < lineCount; line++) {
            const lineY = y + (line + 1) * (bandHeight / (lineCount + 1))
            const offset = (key.next256() / 255) * 200 - 100
            
            draw.polyline([
                0 + offset, lineY,
                500, lineY + 30,
                1000 + offset, lineY
            ]).fill('none').stroke({
                color: nextColor(),
                width: 3,
                linecap: 'round'
            }).opacity(0.6)
        }
    }

    // Sobreposição com círculos aleatórios
    for (let i = 0; i < 6; i++) {
        const x = (key.next256() / 255) * 1000
        const y = (key.next256() / 255) * 1000
        const size = 60 + (key.next16() % 120)
        
        draw.circle().size(size).move(x - size/2, y - size/2)
            .fill(nextColor()).opacity(0.4)
    }
}
