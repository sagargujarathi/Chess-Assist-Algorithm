import { CountDanger } from "./secureking.js";
import { Fragments, blockScreen } from "./main.js";
import { Turn, Check, DoFreeze } from "./solve.js";
import { Index, range } from './reusable.js';
import { StopBlackTime, StopWhiteTime, alertContainer, messageContainer } from './time.js';
let select = '';
export function IsWin() {
    if (!Check) {
        return;
    }
    Fragments.forEach(element => {
        let img = element.style.backgroundImage;
        if (((Turn && img[13] == 'b') || (!Turn && img[13] == 'w')) && img[14] == 'k' && !element.classList.contains('AvoidMove')) {
            select = element;
            CheckKing(element);
            return;
        }
    })
}

//  Function to check if king can move or not!
let CountSave = 0;
let MoveCount = 0;
function CheckKing(element) {
    MoveCount = CountSave = 0;
    let i = Number(element.id[2]);
    let j = Number(element.id[4]);
    checkking(i - 1, j);
    checkking(i + 1, j);
    checkking(i - 1, j + 1);
    checkking(i - 1, j - 1);
    checkking(i + 1, j + 1);
    checkking(i - 1, j - 1);
    checkking(i, j + 1);
    checkking(i, j - 1);
    if (MoveCount < 8) {
        return;
    }
    if (CountDanger >= 1) {
        CanSave();
        if (MoveCount == 8 && CountSave == 0) {
            DoWin();
            DoFreeze();
            StopBlackTime();
            StopWhiteTime();
            return;
        }
        return;
    }
}
function DoWin() {
    blockScreen.style.transform = alertContainer.style.transform = 'translate(-50% , -50%) scale(1)';
    if (Turn) {
        messageContainer.innerText = 'White is Winner!!  Rematch to start again!'
    }
    else {
        messageContainer.innerText = 'Black is Winner!!  Rematch to start again!'
    }
}
function CanSave() {
    Fragments.forEach(element => {
        let img = element.style.backgroundImage;
        if (img[13] == 'b' && Turn || img[13] == 'w' && !Turn && CountSave == 0) {
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
            }
        }
    })
}
function checkking(i, j) {
    if (range(i, j)) {
        MoveCount++;
        return;
    }
    let element = document.querySelector(`#p-${i}-${j}`);
    let img = element.style.backgroundImage;
    if (element.classList.contains('AvoidPath') || element.classList.contains('DangerPath')) {
        MoveCount++;
        return;
    }
    if (img == '' || (img[13] == 'w' && Turn) || (img[13] == 'b' && !Turn)) {
        return;
    }
    MoveCount++;
}
export function rook(i, j, k) {
    if (k == 0) {
        rook(i - 1, j, 1);
        rook(i + 1, j, 2);
        rook(i, j + 1, 3);
        rook(i, j - 1, 4);
        return;
    }
    if (color(i, j)) {
        return;
    }
    let index = Index(i, j, k);
    rook(index[0], index[1], k);
}
function color(i, j) {
    if (range(i, j)) {
        return true;
    }
    let element = document.querySelector(`#p-${i}-${j}`);
    let image = element.style.backgroundImage;
    if (image == '') {
        if (CheckClass(element)) {
            return false;
        }
        CountSave++;
        return false;
    }
    else if ((image[13] == 'w' && Turn) || (image[13] == 'b' && !Turn)) {
        if (CheckClass(element)) {
            return true;
        }
        CountSave++;
    }
    return true;
}
function CheckClass(element) {
    if (select.classList.contains('AvoidMove')) {
        if ((element.classList.contains('DangerPath') || element.classList.contains('DangerPiece') || element.classList.contains('OkPath'))) {
            return false;
        }
        return true;
    }
    if (Check) {
        if (element.classList.contains('DangerPath') || element.classList.contains('DangerPiece')) {
            return false;
        }
        return true;
    }
    return false;
}
function knight(i, j) {
    color(i - 2, j + 1);
    color(i - 2, j - 1);
    color(i + 2, j + 1);
    color(i + 2, j - 1);
    color(i - 1, j + 2);
    color(i + 1, j + 2);
    color(i - 1, j - 2);
    color(i + 1, j - 2);
}
export function bishop(i, j, k) {
    if (k == 0) {
        bishop(i - 1, j + 1, 5);
        bishop(i - 1, j - 1, 6);
        bishop(i + 1, j + 1, 7);
        bishop(i + 1, j - 1, 8);
        return;
    }
    if (color(i, j)) {
        return;
    }
    let index = Index(i, j, k);
    bishop(index[0], index[1], k);
}
function queen(i, j, k) {
    if (k == 0) {
        queen(i - 1, j, 1);
        queen(i + 1, j, 2);
        queen(i, j + 1, 3);
        queen(i, j - 1, 4);
        queen(i - 1, j + 1, 5);
        queen(i - 1, j - 1, 6);
        queen(i + 1, j + 1, 7);
        queen(i + 1, j - 1, 8);
        return;
    }
    if (color(i, j)) {
        return;
    }
    let index = Index(i, j, k);
    queen(index[0], index[1], k);
}
export function pawn(i, j) {
    if (Turn) {
        if (pawncolor(i + 1, j, false) && i == 1) {
            pawncolor(i + 2, j, false);
        }
        pawncolor(i + 1, j + 1, true);
        pawncolor(i + 1, j - 1, true);
    }
    else {
        if (pawncolor(i - 1, j, false) && i == 6) {
            pawncolor(i - 2, j, false);
        }
        pawncolor(i - 1, j + 1, true);
        pawncolor(i - 1, j - 1, true);
    }
}
function pawncolor(i, j, k) {
    if (range(i, j)) {
        return false;
    }
    let element = document.getElementById(`p-${i}-${j}`);
    let img = element.style.backgroundImage;
    if (img == '' && !k) {
        if (CheckClass(element)) {
            return true;
        }
        CountSave++;
        return true;
    }
    else if (((img[13] == 'w' && Turn) || (img[13] == 'b' && !Turn)) && k) {
        if (CheckClass(element)) {
            return;
        }
        CountSave++;
    }
    return false;
}