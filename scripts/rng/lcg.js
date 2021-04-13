define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LCG = void 0;
    class LCG {
        constructor(seed) {
            this.a = 1103515245;
            this.m = Math.pow(2, 31);
            this.c = 4;
            this.seed = 0;
            this.rand = 7;
            if (seed) {
                this.rand = seed;
            }
        }
        next(min, max) {
            const floor = min ? min : 0;
            const ceil = max ? max : 1;
            if (floor && ceil && floor >= ceil)
                throw `floor(${floor})  >= ceiling(${ceil})`;
            this.rand = (this.a * this.rand + this.c) % this.m;
            const res = (ceil - floor) * (this.rand / this.m) + floor;
            return res;
        }
    }
    exports.LCG = LCG;
});
