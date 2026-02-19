import { AppComponents as AC } from "./scripts/AppComponents.mjs";

async function loadComp(element, compstr) {
  console.log(element, compstr);
  
  let applet = new AC[compstr]();
  console.log(applet);
  
  await applet.render(element);
}

let mainArea = document.querySelector(".AppArea"); //TODO dynamically allow tree of panels h(1,2,v(1,2)) type
let selectedAppPanel = mainArea;

// navbuttons event Listener to change View
let navbuttons = document.querySelectorAll(".nav-btn");
navbuttons.forEach((el) => {
  el.addEventListener("click", (event) => {
    let value = el.getAttribute("value");
    console.log("now component loading : " + value);
    loadComp(selectedAppPanel, value);
  });
});
