"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcg_1 = require("./rng/lcg");
const button = document.querySelector('button');
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener('click', function () {
    console.log(add(+input1.value, +input2.value));
    let lcg = new lcg_1.LinearCongruentialGenerator(5);
    const nexrRand = lcg.next;
    for (var i = 0; i < 50; i++) {
        console.log(nexrRand());
    }
});
