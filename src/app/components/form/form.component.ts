import { Component, DependencyInjector, formatForDateInput } from "@core";
import EventBus from "../../services/event-bus";
import "./form.component.scss";

@Component({
  selector: "wt-form"
})
export default class FormComponent extends HTMLElement {
  date = new Date();
  form: HTMLFormElement;
  dateInput: HTMLInputElement;
  weightInput: HTMLInputElement;
  eventBus: EventBus;

  constructor() {
    super();
  }

  connectedCallback() {
    this.eventBus = DependencyInjector.inject(this, EventBus);
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
      this.eventBus.addEntry$.next({
        date: new Date(this.dateInput.value),
        weight: +this.weightInput.value
      });
    });
  }
}
