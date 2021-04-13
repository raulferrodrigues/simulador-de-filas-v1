var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "lodash"], function (require, exports, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.EventList = void 0;
    _ = __importStar(_);
    class EventList {
        constructor() {
            this.sort = () => {
                const lowToHigh = (a, b) => a.scheduledTime > b.scheduledTime ? 1 : -1;
                this.list.sort(lowToHigh);
            };
            this.list = [];
        }
        push(action, currentTime, interval) {
            this.list.push({
                action: action,
                time: interval,
                scheduledTime: currentTime + interval,
            });
            this.sort();
        }
        pop() {
            const event = _.first(this.list);
            this.list = _.drop(this.list);
            return event;
        }
        getList() {
            return _.cloneDeep(this.list);
        }
    }
    exports.EventList = EventList;
    var Action;
    (function (Action) {
        Action["Enqueue"] = "ENQUEUE";
        Action["Dequeue"] = "DEQUEUE";
        Action["None"] = "-";
        Action["Stop"] = "STOP";
    })(Action = exports.Action || (exports.Action = {}));
});
