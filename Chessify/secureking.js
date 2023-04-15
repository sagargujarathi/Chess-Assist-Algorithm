// Inport section
import { Turn, DoCheck } from '/solve.js'
import { Fragments } from '/main.js'
import { range, Index } from '/reusable.js'

// Function to secure king
let select;
let count = 0;
let mark = 0;

// Count variables to count number of danger paths of king
export let CountDanger = 0;
export function SecureKing() {
  CountDanger = 0;
  Fragments.forEach(element => {
    let img = element.style.backgroundImage;
    if ((Turn && img[13] == 'w') || (!Turn && img[13] == 'b')) {
      let i = Number(element.id[2]);
      let j = Number(element.id[4]);
      select = element;
      count = mark = 0;
      switch (img[14]) {
        case 'p':
          pawn(i, j);
          break;
        case 'r':
          rook(i - 1, j, 1);
          count = mark = 0;
          rook(i + 1, j, 2);
          count = mark = 0;
          rook(i, j + 1, 3);
          count = mark = 0;
          rook(i, j - 1, 4);
          count = mark = 0;
          break;
        case 'b':
          bishop(i - 1, j + 1, 5);
          count = mark = 0;
          bishop(i - 1, j - 1, 6);
          count = mark = 0;
          bishop(i + 1, j + 1, 7);
          count = mark = 0;
          bishop(i + 1, j - 1, 8);
          count = mark = 0;
          break;
        case 'n':
          knight(i, j);
          break;
        case 'q':
          queen(i - 1, j, 1);
          count = mark = 0;
          queen(i + 1, j, 2);
          count = mark = 0;
          queen(i, j + 1, 3);
          count = mark = 0;
          queen(i, j - 1, 4);
          count = mark = 0;
          queen(i - 1, j + 1, 5);
          count = mark = 0;
          queen(i - 1, j - 1, 6);
          count = mark = 0;
          queen(i + 1, j + 1, 7);
          count = mark = 0;
          queen(i + 1, j - 1, 8);
          count = mark = 0;
          break;
        case 'k':
          king(i, j);
          break;
      }
    }
  })
}
function pawn(i, j) {
  if (Turn) {
    Verify(i - 1, j - 1);
    Verify(i - 1, j + 1);
  }
  else {
    Verify(i + 1, j + 1);
    Verify(i + 1, j - 1);
  }
}
function rook(i, j, k) {
  let x = Verify(i, j);
  if (x == 1) {
    return;
  }
  if (x == 2) {
    if (count > 0) {
      return;
    }
    count++;
    mark = i;
  }
  else if (x == 4) {
    if (count == 0) {
      NextMove(i, j, k);
    }
    return 4;
  }
  let index = Index(i, j, k);
  if (rook(index[0], index[1], k) == 4) {
    if (mark == i) {
      AddAvoidMoveClass(i, j);
    }
    else if (count == 0) {
      AddDangerPathClass(i, j);
    }
    else {
      AddOkPath(i, j);
    }
    return 4;
  }
}
function bishop(i, j, k) {
  let x = Verify(i, j);
  if (x == 1) {
    return;
  }
  if (x == 2) {
    if (count > 0) {
      return;
    }
    count++;
    mark = i;
  }
  else if (x == 4) {
    if (count == 0) {
      NextMove(i, j, k);
    }
    return 4;
  }
  let index = Index(i, j, k);
  if (bishop(index[0], index[1], k) == 4) {
    if (mark == i) {
      AddAvoidMoveClass(i, j);
    }
    else if (count == 0) {
      AddDangerPathClass(i, j);
    }
    else {
      AddOkPath(i, j);
    }
    return 4;
  }
}
function queen(i, j, k) {
  let x = Verify(i, j);
  if (x == 1) {
    return;
  }
  if (x == 2) {
    if (count > 0) {
      return;
    }
    count++;
    mark = i;
  }
  else if (x == 4) {
    if (count == 0) {
      NextMove(i, j, k);
    }
    return 4;
  }
  let index = Index(i, j, k);
  if (queen(index[0], index[1], k) == 4) {
    if (mark == i && count != 0) {
      AddAvoidMoveClass(i, j);
    }
    else if (count == 0) {
      AddDangerPathClass(i, j);
    }
    else {
      AddOkPath(i, j);
    }
    return 4;
  }
}
function knight(i, j) {
  Verify(i - 2, j + 1);
  Verify(i - 2, j - 1);
  Verify(i + 2, j + 1);
  Verify(i + 2, j - 1);
  Verify(i - 1, j + 2);
  Verify(i + 1, j + 2);
  Verify(i - 1, j - 2);
  Verify(i + 1, j - 2);
}
function king(i, j) {
  Verify(i - 1, j);
  Verify(i + 1, j);
  Verify(i - 1, j + 1);
  Verify(i - 1, j - 1);
  Verify(i + 1, j + 1);
  Verify(i + 1, j - 1);
  Verify(i, j + 1);
  Verify(i, j - 1);
}

// Verify function { Important function }
// 1 => stop iterating now!
// 2 => Add AvoidMove class to this piece if king is found in future
// 3 => Add DangerPath to this class
// 4 => Add DangerPiece to this element

function Verify(i, j) {
  if (range(i, j)) {
    return 1;
  }
  let element = document.querySelector(`#p-${i}-${j}`);
  let img = element.style.backgroundImage;
  if (count == 0) {
    element.classList.add('AvoidPath');
  }
  if ((Turn && img[13] == 'w') || (!Turn && img[13] == 'b')) {
    return 1;
  }
  if ((Turn && img[13] == 'b') || (!Turn && img[13] == 'w')) {
    if (img[14] == 'k') {
      if (count == 0) {
        select.classList.add('DangerPiece');
        CountDanger++;
        DoCheck();
        return 4;
      }
      select.classList.add('OkPath');
      return 4;
    }
    return 2;
  }
}
function AddAvoidMoveClass(i, j) {
  document.querySelector(`#p-${i}-${j}`).classList.add('AvoidMove');
}
function AddDangerPathClass(i, j) {
  document.querySelector(`#p-${i}-${j}`).classList.add('DangerPath');
}
function AddOkPath(i, j) {
  document.querySelector(`#p-${i}-${j}`).classList.add('OkPath');
}
function NextMove(i, j, k) {
  let index = Index(i, j, k);
  i = index[0];
  j = index[1];
  if (range(i, j)) {
    return;
  }
  document.querySelector(`#p-${i}-${j}`).classList.add('AvoidPath');

}