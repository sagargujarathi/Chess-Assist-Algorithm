
import { SecureKing } from '/secureking.js';
export const BlackToolKit = document.querySelector('.black-toolkit');
export const WhiteToolKit = document.querySelector('.white-toolkit');
export const ToolKitPiece = document.querySelectorAll('.tooltip-piece')
export let promote = '';
// Event listeners

ToolKitPiece.forEach(element => {
    element.addEventListener('click', () => {
        promote.style.backgroundImage = element.style.backgroundImage;
        promote = '';
        WhiteToolKit.style.transform = BlackToolKit.style.transform = 'scale(0)';
        SecureKing();
    })
})

import { Turn, Check, Select } from '/solve.js'
import { Circle, Red, Blue, White } from '/main.js'
export function Index(i, j, k) {
    switch (k) {
        case 1:
            i--;
            break;
        case 2:
            i++;
            break;
        case 3:
            j++;
            break;
        case 4:
            j--;
            break;
        case 5:
            i--, j++;
            break;
        case 6:
            i--, j--;
            break;
        case 7:
            i++, j++;
            break;
        case 8:
            i++, j--;
            break;
    }
    return [i, j];
}
export function color(i, j) {
    if (range(i, j)) {
        return true;
    }
    let element = document.querySelector(`#p-${i}-${j}`);
    let image = element.style.backgroundImage;
    if (image == '') {
        if (CheckClass(element)) {
            return false;
        }
        element.style.backgroundImage = Circle;
        return false;
    }
    else if (image == Circle) {
        element.style.backgroundImage = '';
        return false;
    }
    else if (element.style.backgroundColor == Red) {
        element.style.backgroundColor = ((i + j) % 2 == 0) ? White : Blue;
    }
    else if ((image[13] == 'w' && Turn) || (image[13] == 'b' && !Turn)) {
        if (CheckClass(element)) {
            return true;
        }
        element.style.backgroundColor = Red;
    }
    return true;
}
export function range(i, j) {
    if (i < 0 || j < 0 || i > 7 || j > 7) {
        return true;
    }
    return false;
}
//  Function to check list of classes

export function CheckClass(element) {
    if (Select.classList.contains('AvoidMove')) {
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

// Function for Toolkit display

export function ShowBlackToolKit(element, j) {
    promote = element;
    let xy = element.getBoundingClientRect();
    BlackToolKit.style.transform = 'translate(-50% , -50%) scale(1)';
    BlackToolKit.style.height = `${xy.height}px`;
    BlackToolKit.style.width = `${xy.height * 2}px`;
    BlackToolKit.style.top = `${xy.top - xy.width / 2 - 5}px`;
    if (j == 0) {
        BlackToolKit.style.left = `${xy.right + 5}px`;
    }
    else if (j == 7) {
        BlackToolKit.style.left = `${xy.left - 5}px`;
    }
    else {
        BlackToolKit.style.left = `${(xy.left + xy.right) / 2}px`;
    }
}
export function ShowWhiteToolKit(element, j) {
    promote = element;
    let xy = element.getBoundingClientRect();
    WhiteToolKit.style.transform = 'translate(-50% , -50%) scale(1)';
    WhiteToolKit.style.height = `${xy.height}px`;
    WhiteToolKit.style.width = `${xy.height * 2}px`;
    WhiteToolKit.style.top = `${xy.bottom + xy.width / 2 + 5}px`;
    if (j == 0) {
        WhiteToolKit.style.left = `${xy.right + 5}px`;
    }
    else if (j == 7) {
        WhiteToolKit.style.left = `${xy.left - 5}px`;
    }
    else {
        WhiteToolKit.style.left = `${(xy.left + xy.right) / 2}px`;
    }
}
export function ResetPromote() {
    BlackToolKit.style.transform = WhiteToolKit.style.transform = 'scale(0)';
    promote = '';
}

