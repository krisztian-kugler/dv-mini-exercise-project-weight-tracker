import { Entry } from "../models/entry.model";

export default class StorageService {
  public entries: Entry[] = [];

  constructor() {
    this.getEntries();
  }

  createEntry(entry: Entry) {
    this.entries.push(entry);
    localStorage.setItem("weight-tracker", JSON.stringify(this.entries));
  }

  getEntries() {
    if (localStorage.getItem("weight-tracker")) {
      this.entries = (JSON.parse(localStorage.getItem("weight-tracker")) as Array<any>).map(entry => {
        return {
          ...entry,
          date: new Date(entry.date)
        };
      });
    }
  }
}
