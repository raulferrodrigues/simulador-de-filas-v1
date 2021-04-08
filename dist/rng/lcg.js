"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearCongruentialGenerator = void 0;
class LinearCongruentialGenerator {
    constructor(seed) {
        this.m = 31;
        this.a = 1103515245;
        this.c = 12345;
        this.seed = 1;
        this.rand = 0;
        if (seed) {
            this.rand = seed;
        }
    }
    next() {
        this.m = Math.pow(2, 24);
        this.rand = (this.a * this.rand + this.c) % this.m;
        return this.rand;
    }
}
exports.LinearCongruentialGenerator = LinearCongruentialGenerator;
