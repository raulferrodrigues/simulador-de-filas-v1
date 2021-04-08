import { LinearCongruentialGenerator } from "./rng/lcg"

const button = document.querySelector('button')
const input1 = document.getElementById('num1')! as HTMLInputElement
const input2 = document.getElementById('num2')! as HTMLInputElement

function add(num1: number, num2: number) {
    return num1 + num2
}

button!.addEventListener('click', function() {
    console.log(add(+input1.value, +input2.value))

    let lcg = new LinearCongruentialGenerator(5)
    const nexrRand = lcg.next

    for (var i = 0; i < 50; i++) {
        console.log(nexrRand())
    }
})
