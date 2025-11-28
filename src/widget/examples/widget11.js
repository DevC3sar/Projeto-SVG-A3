import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de onda em cascata
    for (let wave = 0; wave < 5; wave++) {
        const baseY = 100 + (wave * 180)
        const wavePoints = []
        
        for (let x = 0; x <= 1000; x += 100) {
            const offset = Math.sin((x / 100 + wave + key.next16() / 20) * 0.5) * 80
            wavePoints.push(x)
            wavePoints.push(baseY + offset)
        }
        
        wavePoints.push(1000)
        wavePoints.push(1000)
        wavePoints.push(0)
        wavePoints.push(1000)
        
        draw.polyline(wavePoints)
            .fill(nextColor()).opacity(0.5)
    }
}
