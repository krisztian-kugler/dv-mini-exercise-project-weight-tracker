import { Entry, EntryWithDateString } from "../models/entry.model";
import { quicksort } from "../utils/quicksort";

export default class StorageService {
  constructor(public entries: Entry[] = []) {
    this.entries = quicksort(this.getEntries(), "date", "descending");
  }

  public createEntry(entry: Entry) {
    this.entries.push(entry);
    quicksort(this.getEntries(), "date").reverse();
    localStorage.setItem("weight-tracker", JSON.stringify(this.entries));
  }

  private getEntries(): Entry[] {
    if (localStorage.getItem("weight-tracker")) {
      const parsedEntries = JSON.parse(localStorage.getItem("weight-tracker")) as Array<EntryWithDateString>;
      return parsedEntries.map(entry => ({ ...entry, date: new Date(entry.date) }));
    }
  }
}
