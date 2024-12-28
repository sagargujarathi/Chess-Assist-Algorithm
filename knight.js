import {color} from '/reusable.js'
export function knight(i, j) {
    color(i - 2, j + 1);
    color(i - 2, j - 1);
    color(i + 2, j + 1);
    color(i + 2, j - 1);
    color(i - 1, j + 2);
    color(i + 1, j + 2);
    color(i - 1, j - 2);
    color(i + 1, j - 2);
}