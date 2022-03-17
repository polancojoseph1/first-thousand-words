document.querySelector(".button.next").addEventListener("mouseover", () => fontIncrease(".button.next", "60px", "21px"), false);
document.querySelector(".button.next").addEventListener("mouseout", () => fontIncrease(".button.next",  "50px", "17px"), false);
document.querySelector(".button.prev").addEventListener("mouseover", () => fontIncrease(".button.prev", "60px", "21px"), false);
document.querySelector(".button.prev").addEventListener("mouseout", () => fontIncrease(".button.prev", "50px", "17px"), false);
document.querySelector(".card").addEventListener("mouseover", () => fontIncreaseCard(".language-text", "18px", "55px"), false);
document.querySelector(".card").addEventListener("mouseout", () => fontIncreaseCard(".language-text", "15px", "50px"), false);
document.querySelector(".card").addEventListener("mouseover", () => fontIncreaseCardLine(".card-line", "90%"), false);
document.querySelector(".card").addEventListener("mouseout", () => fontIncreaseCardLine(".card-line",  "80%"), false);

function removeEventListeners() {
  let nextButton = document.querySelector(".button.next");
  let prevButton = document.querySelector(".button.prev");
  let clone1 = nextButton.cloneNode(true);
  let clone2 = prevButton.cloneNode(true);
  nextButton.parentNode.replaceChild(clone1, nextButton);
  prevButton.parentNode.replaceChild(clone2, prevButton);
}

function reset() {
  document.querySelector(".inner-score-bar").style.width = "0%";
  visited.clear();
}

function fontIncrease(element, font1, font2) {
  let children = document.querySelector(element).children;
  children[0].style.fontSize = font1;
  children[1].style.fontSize = font2;
}

function fontIncreaseCard(listElement, font1, font2) {
  let array = document.querySelectorAll(listElement);
  let element1 = array[0];
  let element2 = array[1];
  let children1 = element1.children;
  let children2 = element2.children;
  children1[0].style.fontSize = font1;
  children1[1].style.fontSize = font2;
  children2[0].style.fontSize = font1;
  children2[1].style.fontSize = font2;
}

let languageTo;

function fontIncreaseCardLine(element, width) {
  document.querySelector(element).style.width = width;
}

document.querySelector(".drop-down").addEventListener("click", () => {
  let menu = document.querySelector(".menu");
  let display = menu.style.display;
  menu.style.display = display === "" || display === "none" ? "block" : "none";
})

let menu = document.querySelector(".menu");
let newDiv = document.createElement("div");
newDiv.style.textAlign = "center";
newDiv.style.textDecoration = "underline";

newDiv.style.marginTop = "10x";
newDiv.style.fontSize = "30px";
newDiv.style.cursor = "initial";

newDiv.style.marginBottom = "10px";
menu.appendChild(newDiv);
let lineDiv = document.createElement("div");
lineDiv.classList.add("menu-line");
lineDiv.style.textDecoration = "underline";
menu.appendChild(lineDiv)
newDiv.style.color = "#a59e9b";
newDiv.textContent = "Languages";
for (let key in languages) {
  let div = document.createElement("div");
  div.textContent = key;
  div.style.marginLeft = "15px"
  div.style.color = "#a59e9b";
  div.textContent = key;
  div.style.marginLeft = "15px";
  div.style.color = "#a59e9b";
  div.addEventListener("click", () => {
    menu.style.display = "none";
    removeEventListeners();
    current = null;
    reset();
    let languageCode = languages[div.textContent];
    localStorage.setItem("language", languageCode);
    flashCards(languageCode);
    return;
  })
  let lineDiv = document.createElement("div");
  lineDiv.classList.add("menu-line");
  lineDiv.style.textDecoration = "underline"
  menu.appendChild(div);
  menu.appendChild(lineDiv);
  languages[key];
}

localStorage.setItem("language", "es");