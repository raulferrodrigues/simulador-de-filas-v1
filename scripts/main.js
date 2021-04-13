define(["require", "exports", "./queueSimulator/queueSimulator", "./queueSimulator/components/EventList"], function (require, exports, queueSimulator_1, EventList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const button = document.querySelector('button')
    // const input1 = document.getElementById('num1') as HTMLInputElement
    // const input2 = document.getElementById('num2') as HTMLInputElement
    // function add(num1: number, num2: number) {
    //   return num1 + num2
    // }
    // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // button!.addEventListener('click', function() {
    //   console.log(add(+input1.value, +input2.value))
    // })
    const rules = {
        arrival: { floor: 1, ceil: 2 },
        service: { floor: 3, ceil: 6 },
    };
    const firstEvent = { action: EventList_1.Action.Enqueue, time: 2 };
    const initialSize = 0;
    const capacity = 3;
    const serves = 1;
    const simDuration = 100;
    new queueSimulator_1.QueueSimulator(rules, initialSize, firstEvent, capacity, serves, simDuration);
});
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// const arr2 = [5, 6, 4, 7, 3, 8, 2, 9, 1]
// const lowToHigh = (a: number, b: number) => a > b ? 1 : -1 
// const highToLow = (a: number, b: number) => a < b ? 1 : -1 
// console.debug('highToLow', arr.sort(highToLow))
// console.debug('lowToHigh', arr2.sort(lowToHigh))
// arr.push(10)
// console.debug('push 10', arr)
// arr.pop()
// console.debug('pop', arr)
// arr = _.drop(arr)
// console.debug('lodash', arr)
// const obj = { hello: '' }
// var objCopy = obj
// objCopy.hello = 'world'
// console.debug('obj', obj)
// console.debug('objCopy', objCopy)
// let arr = [1, 2, 3]
// arr[2] = 4
// console.debug(arr)
