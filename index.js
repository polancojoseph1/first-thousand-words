function flashCards(languageTo = "es") {

  let next;

  let prev;

  function page(words, languageTo = "es") {

    function translate(text, languageFrom, languageTo = "es") {
      fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: languageFrom,
          target: languageTo,
          format: "text"
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(data => {
          let dataTranslation = data.translatedText;
          let languageToElement = document.querySelector(".language-to");
          let languageFromElement = document.querySelector(".language-from");
          let translationElement = document.querySelector(".translation");
          let translation = document.querySelector(".word");
          if (text === dataTranslation) {
            if (languageHash[languageTo]) dataTranslation = languageHash[languageTo][text];
          } else if (languageHash[languageTo] && languageHash[languageTo][text]) {
            dataTranslation = languageHash[languageTo][text];
          }
          languageToElement.textContent = languageCodes[languageTo.trim()];
          translationElement.textContent = text;
          languageFromElement.textContent = languageCodes[languageFrom.trim()];
          translation.textContent = dataTranslation;
          visited.add(current.index);
        })
    }

    let doublyLinkedList;

    function populate(doublyLinkedList) {
      for (let i = 0; i < 25; i++) {
        if (!doublyLinkedList) {
          doublyLinkedList = new DoublyLinkedList(new Node(words[i], "en", languageTo));
        } else {
          doublyLinkedList.append(new Node(words[i], "en", languageTo));
        }
      }
      return doublyLinkedList;
    }

    // Populate our doubly linked list
    doublyLinkedList = populate(doublyLinkedList);

    // Connect the head and tail of our doubly linked list
    doublyLinkedList.makeCyclic();


    current = new CurrentNode(doublyLinkedList.head);

    function cardInit() {
      let temp = current.current;

      translate(temp.translation, temp.languageFrom, temp.languageTo);
    }
    
    cardInit();

    let currentCount = 0;

    let nextButton = document.querySelector(".button.next");

    let prevButton = document.querySelector(".button.prev");

    next = () => {
      currentCount += 4.1666;
      if (currentCount <= 100) document.querySelector(".inner-score-bar").style.width = currentCount + "%";
      else {
        currentCount = 0;
        document.querySelector(".inner-score-bar").style.width = currentCount + "%"
      }
      current.next();
      let node = current.current;
      translate(node.translation, node.languageFrom, node.languageTo);
      document.querySelector(".button.next").style.pointerEvents = "none";
      setTimeout(() => {
        document.querySelector(".button.next").style.pointerEvents = "";
      }, 500);
    }

    prev = () => {
      currentCount -= 4.1666;
      if (currentCount < 0) currentCount = 100;
      document.querySelector(".inner-score-bar").style.width = currentCount + "%";
      current.prev();
      let node = current.current;
      translate(node.translation, node.languageFrom, node.languageTo);
      document.querySelector(".button.prev").style.pointerEvents = "none";
      setTimeout(() => {
        document.querySelector(".button.prev").style.pointerEvents = "";
      }, 500);
    }

    nextButton.addEventListener("click", next);

    prevButton.addEventListener("click", prev);

  }

  let sll;

  function populate() {
    let array = [];

    for (let i = 0; i < words.length; i++) {
      array.push(words[i]);
      if (array.length === 25) {
        if (!sll) sll = new SinglyLinkedList(array)
        else sll.append(array)
        array = [];
      }
    }
    if (array.length > 0) {
      sll.append(new SinglyNode(array));
    }
  }

  populate();

  let currentSLL = new CurrentNode(sll.goToNthDeck(localStorage.getItem(languageTo)));

  sll.makeCyclic();

  page(currentSLL.current, languageTo);

  setInterval(() => {
    if (languageTo !== localStorage.getItem("language")) {
      return;
    }
    currentSLL.index = Math.floor(localStorage.getItem(languageTo)) - 1;
    currentSLL.updateScore();
  }, 0);

  currentSLL.updateScore();

  function changeBarColor() {
    let bar = document.querySelector(".inner-score-bar");
    if (current && (current.index >= 21 && current.index <= 24)) {
      bar.style.background = "green";
    } else if (current && (current.index >= 0 && current.index <= 4)) {
      bar.style.background = "red";
    } else if (current) {
      bar.style.background = "rgb(245, 211, 20)";
    }
  }
    
function displayComplete() {
  let scoreContainer = document.querySelector(".score-container");
  scoreContainer.style.background = "#00885a";
  scoreContainer.style.color = "#001911";
  scoreContainer.style.padding = "2px 15px";
  let scoreContainerChildren = scoreContainer.children;
  scoreContainerChildren[0].textContent = "Complete"; 
}
  
function displayScore() {
  let scoreContainer = document.querySelector(".score-container");
  scoreContainer.style.background = "#ebe9e3";
  scoreContainer.style.color = "#001911";
  scoreContainer.style.padding = "2px 30px";
  let scoreContainerChildren = scoreContainer.children;
  scoreContainerChildren[0].textContent = "Deck";
}



setInterval(() => {
  changeBarColor();
  if (languageTo !== localStorage.getItem("language")) {
    return;
  }
  if (visited.length >= 24 && current.index >= 24) {
    displayComplete();
    setTimeout(() => {
      displayScore();
    }, 500)
    currentSLL.next();
    let currentCount = Math.floor(localStorage.getItem(languageTo));
    localStorage.setItem(languageTo, currentCount + 1 > 40 ? 0 : currentCount + 1);
    currentSLL.updateScore();
    removeEventListeners();
    visited.clear();
    page(currentSLL.current, languageTo);
    reset();
  }
  
}, 500)

}

flashCards();