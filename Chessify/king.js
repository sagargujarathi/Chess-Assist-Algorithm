
import { range } from '/reusable.js'
import { Circle, Red, White, Blue } from '/main.js'
import { Turn } from '/solve.js'
export function king(i, j) {
    kingcolor(i - 1, j);
    kingcolor(i + 1, j);
    kingcolor(i - 1, j + 1);
    kingcolor(i - 1, j - 1);
    kingcolor(i + 1, j + 1);
    kingcolor(i + 1, j - 1);
    kingcolor(i, j + 1);
    kingcolor(i, j - 1);
}
function kingcolor(i, j) {
    if (range(i, j)) {
        return;
    }
    let element = document.querySelector(`#p-${i}-${j}`);
    let img = element.style.backgroundImage;
    if (element.classList.contains('AvoidPath') || element.classList.contains('DangerPath')) {
        return;
    }
    if (img == '') {
        element.style.backgroundImage = Circle;
    }
    else if (img == Circle) {
        element.style.backgroundImage = '';
    }
    else if (element.style.backgroundColor == Red) {
        element.style.backgroundColor = ((i + j) % 2 == 0) ? White : Blue;
    }
    else if ((img[13] == 'w' && Turn) || (img[13] == 'b' && !Turn)) {
        element.style.backgroundColor = Red;
    }
}