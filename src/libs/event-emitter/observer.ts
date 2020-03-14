export class Observer {
  constructor(public next?: Function, public error?: Function, public complete?: Function) {}
}
