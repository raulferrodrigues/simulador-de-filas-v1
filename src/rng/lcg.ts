export class LinearCongruentialGenerator {
    m: number = 31
    a: number = 1103515245
    c: number = 12345
    seed: number = 1

    rand: number = 0

    constructor(seed: number) {
        if (seed) { this.rand = seed }
    }

    next(): number {
        this.m = 2 ** 24
        this.rand = (this.a * this.rand + this.c) % this.m
        return this.rand
    }
}