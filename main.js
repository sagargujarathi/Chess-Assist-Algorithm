//  DO NOT COPY!! CONTACT sagargujarathi108@gmail.com IF WANNA TALK ME
//  Import section
import { solve } from '/solve.js'
import { reset } from '/reset.js'
import { stopTime } from './time.js';
import { alertContainer } from './time.js'
// Declaring constants

export const Fragments = document.querySelectorAll('.piece');
export const MoveSound = new Audio("/resources/moveSound.mp3");
export const Red = 'rgb(244, 132, 132)';
export const Blue = 'rgb(63, 193, 201)';
export const White = 'rgb(245, 245, 245)';
export const Circle = 'url("/resources/circle.png")';
export const SelectColor = 'rgb(205, 233, 144)';
const Reset = document.querySelector('.reset-game');
const start = document.querySelector('.start');
export const popUp = document.querySelector('.start-popup');
export const blockScreen = document.querySelector('.block-screen');
const okBtn = document.querySelector('.ok-btn');
// Adding event listeners

Fragments.forEach(element => { element.addEventListener('click', () => { solve(element) }) });
Reset.addEventListener('click', () => { blockScreen.style.transform = popUp.style.transform = ' translate(-50% , -50%) scale(1)', stopTime() });
start.addEventListener('click', () => { reset() });
okBtn.addEventListener('click', () => { alertContainer.style.transform = 'scale(0)', popUp.style.transform = ' translate(-50% , -50%) scale(1)' })
// Real things starts here!