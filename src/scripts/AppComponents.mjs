async function loadHTML(htmlPath) {
  const res = await fetch(htmlPath);
  const html = await res.text();
  return html;
}
class AppComponent extends HTMLElement {
  constructor() {
    super();
  }
  static htmlpath;
  connectedCallback() {
    console.log("stuff connected");
  }
  init() {
    this.innerHTML = this.getHTML();
    console.error("No init method overload");
  }
  async render(el) {
    console.error("No render method overload");
    el.innerHTML = `<p>No render method overload</p> `;
  }
}
class CalendarView extends AppComponent {
  constructor() {
    super();
  }

  static today = new Date();
  selectedmonth = CalendarView.today.getMonth();
  
  renderDays = () => {
    let month = new Date(CalendarView.today.getFullYear(), this.selectedmonth);
    this.querySelector(".cal-sel-month").textContent = month.toLocaleDateString(
      "fr-FR",
      { month: "long", year: "numeric" },
    );
    this.querySelector(".cal-now-weekday").textContent =
      CalendarView.today.toLocaleDateString("fr-FR", { weekday: "long" });
    this.querySelector(".cal-now-date").textContent =
      CalendarView.today.toLocaleDateString("fr-FR", { day: "numeric" });
    this.querySelector(".cal-now-month").textContent =
      CalendarView.today.toLocaleDateString("fr-FR", { month: "long" });

    let firstday = new Date( //date of the 1st of the month
      CalendarView.today.getFullYear(),
      this.selectedmonth,
      1,
    );

    let offset = -((firstday.getDay() + 6) % 7) - 1;
    console.log(offset, firstday.toDateString());

    let arrofdivs = Array.from(document.getElementsByClassName("dyn-day"));

    let calStart = new Date(firstday);
    calStart.setDate(calStart.getDate() + offset);
    let numberOfDays = new Date(firstday);
    numberOfDays.setFullYear(
      numberOfDays.getFullYear(),
      numberOfDays.getMonth() + 1,
      numberOfDays.getDate() - 1,
    );
    numberOfDays = numberOfDays.getDate();

    for (const el of arrofdivs) {
      calStart.setDate(calStart.getDate() + 1);
      offset++;
      let today = (false)
      if (offset >= 0 && offset < numberOfDays) {
        el.innerHTML = `<div class="cal-dates-cont ${today ? "today" : ""} date:"${calStart.toLocaleDateString("FR-fr", {day: "2-digit"}) + calStart.toLocaleDateString("FR-fr", {month: "2-digit"}) + calStart.getFullYear()}" style="width: 100%;">${calStart.toLocaleDateString("FR-fr", { day: "numeric" })}</div>`;
      } else {
        el.innerHTML = `<div class="cal-dates-cont cal-inactive" style="width: 100%;">${calStart.toLocaleDateString("FR-fr", { day: "numeric" })}</div>`;
      }
    }
  };

  async connectedCallback() {
    console.log("from connectedCallback:", this.today);
    this.innerHTML = await this.getHTML();
    setTimeout(this.renderDays, 20);
    this.querySelector(".cal-next-month").addEventListener("click", (e) => {
      this.selectedmonth++;
      this.renderDays();
      console.warn(this.selectedmonth);
    });
    this.querySelector(".cal-prev-month").addEventListener("click", (e) => {
      this.selectedmonth--;
      this.renderDays();
      console.warn(this.selectedmonth);
    });
  }

  static htmlpath = "./views/calendarView.html";

  async getHTML() {
    this.innerHTML = await loadHTML(CalendarView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}
class PlannerView extends AppComponent {
  constructor() {
    super();
  }
  
  static htmlpath = "./views/plannerView.html";

  init() {
    this.today = Date(Date.now());
    console.log(this.today.toString());
    this.innerHTML = this.getHTML();
  }

  async connectedCallback() {
    this.innerHTML = await this.getHTML();
  }
  async getHTML() {
    this.innerHTML = await loadHTML(PlannerView.htmlpath);
    console.warn(this.innerHTML);
    
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
    console.warn(el, this)
  }
}
class StatsView extends AppComponent {
  constructor() {
    super();
  }

  static htmlpath = "./views/statsView.html";

  init() {
    this.innerHTML = this.getHTML();
  }

  async getHTML() {
    this.innerHTML = await loadHTML(StatsView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}
class DBView extends AppComponent {
  constructor() {
    super();
  }

  static htmlpath = "./views/dbView.html";

  init() {
    this.innerHTML = this.getHTML();
  }

  async getHTML() {
    this.innerHTML = await loadHTML(DBView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}
class FilterView extends AppComponent {
  constructor() {
    super();
  }

  static htmlpath = "./views/filterView.html";

  init() {
    this.innerHTML = this.getHTML();
  }

  async getHTML() {
    this.innerHTML = await loadHTML(FilterView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}
class EditView extends AppComponent {
  constructor() {
    super();
  }

  static htmlpath = "./views/editView.html";

  init() {
    this.innerHTML = this.getHTML();
  }

  async getHTML() {
    this.innerHTML = await loadHTML(EditView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}
class ConfigView extends AppComponent {
  constructor() {
    super();
  }

  static htmlpath = "./views/configView.html";

  init() {
    this.innerHTML = this.getHTML();
  }

  async getHTML() {
    this.innerHTML = await loadHTML(ConfigView.htmlpath);
    return this.innerHTML;
  }

  render(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(this);
  }
}

customElements.define("ac-calendar", CalendarView);
customElements.define("ac-planner", PlannerView);
customElements.define("ac-stats", StatsView);
customElements.define("ac-db", DBView);

customElements.define("ac-filter", FilterView);
customElements.define("ac-edit", EditView);

customElements.define("ac-config", ConfigView);

export const AppComponents = {
  calendar: CalendarView,
  planner: PlannerView,
  stats: StatsView,
  dbview: DBView,
  filter: FilterView,
  edit: EditView,
  config: ConfigView,
};
