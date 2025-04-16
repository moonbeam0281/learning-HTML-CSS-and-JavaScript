const button = document.getElementById("clkBtn");
const input = document.getElementById("input");
const h1 = document.getElementById("header");

function changeText() {
    h1.innerText = input.value;
  }

button.addEventListener("click", () => {
    changeText();
});