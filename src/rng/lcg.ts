export class LCG {
     a: number = 1103515245
     m: number = 2 ** 31
     c: number = 4
     seed: number = 0

     rand: number = 7
    
    constructor(seed?: number) {
        if (seed) { this.rand = seed }
    }

    next(min?: number, max?: number): number {
        const floor = min ? min : 0
        const ceil = max ? max : 1
        if (floor && ceil && floor >= ceil) throw `floor(${floor})  >= ceiling(${ceil})`

        this.rand = (this.a * this.rand + this.c) % this.m 

        const res = (ceil - floor) * (this.rand / this.m) + floor
        return res
    }
}