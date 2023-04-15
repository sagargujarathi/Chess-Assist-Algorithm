import { Index, color} from '/reusable.js'
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