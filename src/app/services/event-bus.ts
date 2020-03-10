import { Subject } from "../../libs/observable/index";
import { Entry } from "../models/entry.model";

export default class EventBus {
  addEntry$ = new Subject<Entry>();
}
