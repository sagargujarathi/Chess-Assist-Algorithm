import { Index, color } from '/reusable.js'
export function queen(i, j, k) {
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