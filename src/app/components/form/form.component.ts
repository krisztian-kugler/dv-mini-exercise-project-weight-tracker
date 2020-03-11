import { Component, DependencyInjector, formatForDateInput } from "@core";
import EventService from "../../services/event.service";
import StorageService from "../../services/storage.service";
import { Entry } from "src/app/models/entry.model";
import "./form.component.scss";

@Component({
  selector: "wt-form"
})
export default class FormComponent extends HTMLElement {
  date = new Date();
  form: HTMLFormElement;
  dateInput: HTMLInputElement;
  weightInput: HTMLInputElement;
  private eventService: EventService;
  private storage: StorageService;

  constructor() {
    super();
  }

  connectedCallback() {
    this.eventService = DependencyInjector.inject(this, EventService);
    this.storage = DependencyInjector.inject(this, StorageService);
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <form>
      <label class="label">
        <small>Date</small>
        <input class="input-date" type="datetime-local" value="${formatForDateInput(this.date)}" max="${formatForDateInput(
      this.date
    )}" required />
      </label>
      <label class="label">
        <small>Weight (kg)</small>
        <input class="input-weight" type="number" min="0" step="0.1" required />
      </label>
      <button type="submit">Add</button>
    <form>`;

    this.form = this.querySelector("form");
    this.dateInput = this.querySelector(".input-date");
    this.weightInput = this.querySelector(".input-weight");
    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();

      const entry: Entry = {
        date: new Date(this.dateInput.value),
        weight: +this.weightInput.value
      };

      this.storage.createEntry(entry);

      this.eventService.addEntry$.next(entry);
    });
  }
}
