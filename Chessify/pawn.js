import { range } from '/reusable.js'
import { Turn } from '/solve.js'
import { Circle, Red, White, Blue } from './main.js';
import { CheckClass } from './reusable.js';
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
        element.style.backgroundImage = Circle;
        return true;
    }
    else if (!k && img == Circle) {
        if (CheckClass(element)) {
            return true;
        }
        element.style.backgroundImage = '';
        return true;
    }
    else if (k && element.style.backgroundColor == Red) {
        if (CheckClass(element)) {
            return true;
        }
        element.style.backgroundColor = ((i + j) % 2 == 0) ? White : Blue;
    }
    else if (((img[13] == 'w' && Turn) || (img[13] == 'b' && !Turn)) && k) {
        if (CheckClass(element)) {
            return;
        }
        element.style.backgroundColor = Red;
    }
    return false;
}