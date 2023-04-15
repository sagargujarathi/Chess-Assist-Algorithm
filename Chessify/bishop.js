import { Index, color } from '/reusable.js'
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