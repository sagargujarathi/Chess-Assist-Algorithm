
const blackBox = document.querySelector('.black-box');
const whiteBox = document.querySelector('.white-box');
export function ShowDead(element) {
    let name = element.style.backgroundImage[13];
    let newDiv = document.createElement('div');
    newDiv.classList.add('dead');
    newDiv.style.backgroundImage = element.style.backgroundImage;
    if (name == 'b') {
        blackBox.appendChild(newDiv);
    }
    else {
        whiteBox.appendChild(newDiv);
    }
}
export function ClearDead() {
    document.querySelectorAll('.dead').forEach(element => {
        element.remove();
    })
}
