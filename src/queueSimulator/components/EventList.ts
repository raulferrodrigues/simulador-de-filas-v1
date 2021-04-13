import * as _ from 'lodash'


export class EventList {
  private list: Event[] 

  constructor() {
    this.list = []
  }

  private sort = () => {
    const lowToHigh = (a: Event, b: Event) => a.scheduledTime > b.scheduledTime ? 1 : -1
    this.list.sort(lowToHigh)
  }

  push(action: Action, currentTime: number, interval: number): void {
    this.list.push({
      action: action,
      time: interval,
      scheduledTime: currentTime + interval,
    })
    this.sort()
  }

  pop(): Event | undefined {
    const event = _.first(this.list)
    this.list = _.drop(this.list)
    return event
  }

  getList(): Event[] {
    return _.cloneDeep(this.list)
  }
}

export enum Action {
  Enqueue = 'ENQUEUE',
  Dequeue = 'DEQUEUE',
  None = '-',
  Stop = 'STOP'
}

export type Event = {
  action: Action
  time: number
  scheduledTime: number
  debug?: unknown
}