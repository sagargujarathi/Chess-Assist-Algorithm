// Import section

import { SelectColor, Circle, Red, White, Blue, MoveSound } from '/main.js'
import { StartBlackTime, StartWhiteTime, StopBlackTime, StopWhiteTime } from '/time.js'
import { pawn } from '/pawn.js'
import { bishop } from '/bishop.js'
import { rook } from '/rook.js'
import { queen } from '/queen.js'
import { king } from '/king.js'
import { knight } from '/knight.js'
import { SecureKing } from '/secureking.js';
import { Fragments } from './main.js'
import { IsWin } from './win.js'
import { ShowDead } from './deadbox.js'
import { ShowWhiteToolKit, ShowBlackToolKit, promote } from './reusable.js'
export let Select = '';
export let Turn = true;
export let Check = false;
let freeze = false;
export const TurnDisplay = document.querySelector('.turn');
// Note : Turn => true => It is black turn
// Note : Turn => false => It is white turn
export function solve(element) {
  let img = element.style.backgroundImage;
  if ((Select == '' && img == '') || promote != '') {
    return;
  }
  if (CheckColor(img[13])) {
    if (Select != '') {
      let i = Number(Select.id[2]);
      let j = Number(Select.id[4]);
      Select.style.backgroundColor = ((i + j) % 2 == 0) ? White : Blue;
      MoveAssist(Select);
    }
    Select = element;
    Select.style.backgroundColor = SelectColor;
    MoveAssist(Select);
  }
  else if (VerifyMove(element)) {
    let i = Number(Select.id[2]);
    let j = Number(Select.id[4]);
    Select.style.backgroundColor = ((i + j) % 2 == 0) ? White : Blue;
    MoveAssist(Select);
    if (element.style.backgroundImage != '') {
      ShowDead(element);
    }
    MoveSound.play();
    if ((element.id[2] == 0 && !Turn && Select.style.backgroundImage[14] == 'p')) {
      ShowWhiteToolKit(element, Number(element.id[4]));
    }
    else if (element.id[2] == 7 && Turn && Select.style.backgroundImage[14] == 'p') {
      ShowBlackToolKit(element, Number(element.id[4]));
    }
    element.style.backgroundImage = Select.style.backgroundImage;
    Select.style.backgroundImage = '';
    Select = '';
    Check = false;
    ChangeTurn();
    ResetClass();
    if (promote == '') {
      SecureKing();
    }
    IsWin();
  }
}
// Checks color

function CheckColor(image) {
  if ((image == 'b' && Turn) || (image == 'w' && !Turn)) {
    return true;
  }
  return false;
}

//  Function to change turn
function ChangeTurn() {
  if (Turn) {
    Turn = false;
    StopBlackTime();
    StartWhiteTime();
    TurnDisplay.innerText = 'White';
  }
  else {
    Turn = true;
    StopWhiteTime();
    StartBlackTime();
    TurnDisplay.innerText = 'Black';
  }
}
// Function to reset this file
export function ResetSolve() {
  Select = '';
  Turn = false;
  freeze = false;
  Check = false;
  ResetClass();
}
// Function to assit selected move

function MoveAssist(element) {
  let i = Number(element.id[2]);
  let j = Number(element.id[4]);
  switch (element.style.backgroundImage[14]) {
    case 'p':
      pawn(i, j);
      break;
    case 'r':
      rook(i, j, 0);
      break;
    case 'b':
      bishop(i, j, 0);
      break;
    case 'n':
      knight(i, j);
      break;
    case 'q':
      queen(i, j, 0);
      break;
    case 'k':
      king(i, j);
      break;
  }
}
//  Function to verify move
function VerifyMove(element) {
  if (element.style.backgroundImage == Circle || element.style.backgroundColor == Red) {
    return true;
  }
  return false;
}
// Function to do check

export function DoCheck() {
  Check = true;
}
export function DoFreeze() {
  freeze = true;
}
function ResetClass() {
  Fragments.forEach(element => {
    element.classList.remove('AvoidPath', 'DangerPath', 'AvoidMove', 'DangerPiece', 'OkPath');
  })
}