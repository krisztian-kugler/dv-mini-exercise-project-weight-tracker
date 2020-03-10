export class Observer {
  constructor(public update?: Function, public error?: Function, public complete?: Function) {}
}
