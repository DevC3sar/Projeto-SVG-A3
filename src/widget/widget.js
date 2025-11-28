// Importa todos os 30 estilos de avatar
import widget00 from "./examples/widget00.js"
import widget01 from "./examples/widget01.js"
import widget02 from "./examples/widget02.js"
import widget03 from "./examples/widget03.js"
import widget04 from "./examples/widget04.js"
import widget05 from "./examples/widget05.js"
import widget06 from "./examples/widget06.js"
import widget07 from "./examples/widget07.js"
import widget08 from "./examples/widget08.js"
import widget09 from "./examples/widget09.js"
import widget10 from "./examples/widget10.js"
import widget11 from "./examples/widget11.js"
import widget12 from "./examples/widget12.js"
import widget13 from "./examples/widget13.js"
import widget14 from "./examples/widget14.js"
import widget15 from "./examples/widget15.js"
import widget16 from "./examples/widget16.js"
import widget17 from "./examples/widget17.js"
import widget18 from "./examples/widget18.js"
import widget19 from "./examples/widget19.js"
import widget20 from "./examples/widget20.js"
import widget21 from "./examples/widget21.js"
import widget22 from "./examples/widget22.js"
import widget23 from "./examples/widget23.js"
import widget24 from "./examples/widget24.js"
import widget25 from "./examples/widget25.js"
import widget26 from "./examples/widget26.js"
import widget27 from "./examples/widget27.js"
import widget28 from "./examples/widget28.js"
import widget29 from "./examples/widget29.js"
import widget30 from "./examples/widget30.js"
import widget31 from "./examples/widget31.js"
import widget32 from "./examples/widget32.js"
import widget33 from "./examples/widget33.js"
import widget34 from "./examples/widget34.js"
import widget35 from "./examples/widget35.js"
import widget36 from "./examples/widget36.js"
import widget37 from "./examples/widget37.js"
import widget38 from "./examples/widget38.js"
import widget39 from "./examples/widget39.js"

// Array com todos os widgets disponíveis
const allWidgets = [
  widget00, widget01, widget02, widget03, widget04,
  widget05, widget06, widget07, widget08, widget09,
  widget10, widget11, widget12, widget13, widget14,
  widget15, widget16, widget17, widget18, widget19,
  widget20, widget21, widget22, widget23, widget24,
  widget25, widget26, widget27, widget28, widget29,
  widget30, widget31, widget32, widget33, widget34,
  widget35, widget36, widget37, widget38, widget39
]

/**
 * widget(key, draw, opts)
 * - key: objeto com métodos next(), next256(), next16()
 * - draw: objeto compatível com svg.js (tem .rect(), .circle(), .polyline(), etc.)
 * - opts: { size } (opcional) - apenas para referencia; não obrigatório
 * 
 * Seleciona aleatoriamente (mas deterministicamente) um dos 30 estilos
 * baseado na chave fornecida.
 */
function widget(key, draw, opts = {}) {
  // Seleciona um widget aleatoriamente baseado na chave
  // Usa key.next256() para obter um valor entre 0-255
  const widgetIndex = key.next256() % allWidgets.length
  const selectedWidget = allWidgets[widgetIndex]
  
  // Executa o widget selecionado
  selectedWidget(key, draw, opts)
}

export default widget
