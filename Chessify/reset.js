// Import section
import { White, Blue } from '/main.js'
import { ResetTime } from '/time.js'
import { TurnDisplay, ResetSolve } from '/solve.js'
import { ClearDead } from '/deadbox.js'
import { popUp, blockScreen } from '/main.js'
import { ResetPromote } from './reusable.js'
// Selecting all pieces images

export const bp = "url(/pieces/bp.png)";
export const br = "url(/pieces/br.png)";
export const bn = "url(/pieces/bn.png)";
export const bb = "url(/pieces/bb.png)";
export const bq = "url(/pieces/bq.png)";
export const bk = "url(/pieces/bk.png)";
export const wp = "url(/pieces/wp.png)";
export const wr = "url(/pieces/wr.png)";
export const wn = "url(/pieces/wn.png)";
export const wb = "url(/pieces/wb.png)";
export const wq = "url(/pieces/wq.png)";
export const wk = "url(/pieces/wk.png)";
// Array of pieces

const matrix = [
  ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
  ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
]
export function reset() {
  ResetSolve();
  arrange();
  ResetTime();
  ClearDead();
  ResetPromote();
  TurnDisplay.innerText = 'White'
  blockScreen.style.transform = popUp.style.transform = 'scale(0)';
}
function arrange() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let element = document.querySelector(`#p-${i}-${j}`);
      if ((i + j) % 2 == 0) {
        element.style.backgroundColor = White;
      }
      else {
        element.style.backgroundColor = Blue;
      }
      if (matrix[i][j] != '') {
        element.style.backgroundImage = eval(`${matrix[i][j]}`);
      }
      else {
        element.style.backgroundImage = '';
      }
    }
  }
}