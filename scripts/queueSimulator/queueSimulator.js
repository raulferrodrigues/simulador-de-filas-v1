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
define(["require", "exports", "lodash", "../rng/lcg", "./components/EventList"], function (require, exports, _, lcg_1, EventList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QueueSimulator = void 0;
    _ = __importStar(_);
    let globalCounter = 0;
    class QueueSimulator {
        // <
        constructor(rules, initialSize, firstEvent, capacity = Infinity, servers = 1, simDuration = 10) {
            var _a;
            this.logTime = (interval) => {
                const lastestLog = _.last(this.logs);
                if (!lastestLog)
                    throw new Error('Logs are empty! Logs should be initialized with a None log. Check the constructor');
                if (this.size > lastestLog.state.length)
                    throw new Error('CRITICAL (!): Queue size is bigger than state length.');
                const newState = [...lastestLog.state];
                const newTime = newState[this.size] + interval;
                newState[this.size] = newTime;
                this.currentTime = newState.reduce((acc, state) => acc + state, 0); // Contabiliza o tempo
                return newState;
            };
            this.arrivalSchedule = () => {
                const nextArrivalTime = this.lcg.next(this.rules.arrival.floor, this.rules.arrival.ceil);
                this.events.push(EventList_1.Action.Enqueue, this.currentTime, nextArrivalTime);
            };
            this.serviceSchedule = () => {
                const nextServiceTime = this.lcg.next(this.rules.service.floor, this.rules.service.ceil);
                this.events.push(EventList_1.Action.Dequeue, this.currentTime, nextServiceTime);
            };
            this.scheduler = () => {
                console.debug('Events', this.events.getList(), 'size', this.size);
                globalCounter++;
                const nextEvent = this.events.pop();
                if (nextEvent) {
                    switch (nextEvent.action) {
                        case EventList_1.Action.Enqueue:
                            this.enqueue(nextEvent.time);
                            break;
                        case EventList_1.Action.Dequeue:
                            this.dequeue(nextEvent.time);
                            break;
                    }
                }
                if (globalCounter < 1000)
                    this.scheduler();
            };
            this.lcg = new lcg_1.LCG();
            this.rules = rules;
            this.size = initialSize;
            this.capacity = capacity;
            this.servers = servers;
            this.simDuration = simDuration;
            const firstLog = {
                action: EventList_1.Action.None,
                queueSize: 0,
                simTime: 0,
                state: new Array(capacity + 1).fill(0),
            };
            this.logs = [firstLog];
            this.currentTime = firstEvent.time;
            this.events = new EventList_1.EventList();
            this.events.push(firstEvent.action, 0, firstEvent.time);
            this.scheduler();
            console.debug('last state', (_a = _.last(this.logs)) === null || _a === void 0 ? void 0 : _a.state);
        }
        enqueue(time) {
            const newState = this.logTime(time);
            const newLog = {
                action: EventList_1.Action.Enqueue,
                queueSize: this.size,
                simTime: this.currentTime,
                state: newState,
            };
            newLog.queueSize++;
            if (this.size < this.capacity) {
                this.size++;
                if (this.size <= this.servers) {
                    this.serviceSchedule();
                }
            }
            this.logs.push(newLog);
            this.arrivalSchedule();
        }
        dequeue(time) {
            const newState = this.logTime(time);
            this.size--;
            const newLog = {
                action: EventList_1.Action.Dequeue,
                queueSize: this.size,
                simTime: this.currentTime,
                state: newState,
            };
            if (this.size > 0) {
                this.serviceSchedule();
            }
            this.logs.push(newLog);
        }
    }
    exports.QueueSimulator = QueueSimulator;
});
