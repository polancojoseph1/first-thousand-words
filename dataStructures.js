class Node {
  constructor(translation, languageFrom, languageTo) {
    this.translation = translation;
    this.languageFrom = languageFrom;
    this.languageTo = languageTo;
    this.next = null;
    this.previous = null;
  }
}

class CurrentNode {
  constructor(node) {
    this.current = node;
    this.index = 0;
  }
  next() {
    this.current = this.current.next;
    this.index++;
    if (this.current >= 25) this.index = 0;
  }
  prev() {
    if (!this.current.prev) return;
    this.current = this.current.previous;
    this.index--;
    if (this.current < 0) this.index = 24;
  }
  updateScore() {
    let score = document.querySelector(".score-text");
    score.innerText = (this.index + 1) + "/40";
  }
}

class DoublyLinkedList {
  constructor(node) {
    this.head = node;
    this.length = 1;
    this.tail = this.head;
  }

  printList() {
      let array = [];
      let currentList = this.head;
      while (currentList !== null) {
          array.push(currentList.value);
          currentList = currentList.next;
      }
      return this;
  }

  // Insert node at end of the list
  append(newNode) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;

      this.length++;
      this.printList();
  }

  // Insert node at the start of the list
  prepend(newNode) {
    newNode.next = this.head;
    this.head.previous = newNode;
    this.head = newNode;

    this.length++;
    this.printList();
  }

  // Insert node at a given index
  insert (index, newNode) {
      if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
          console.log(`Invalid index. Current length is ${this.length}.`);
          return this;
      }

      // If index is 0, prepend
      if (index === 0) {
          this.prepend(newNode);
          return this;
      }

      // If index is equal to this.length, append
      if (index === this.length) {
          this.append(newNode);
          return this;
      }

      // Reach the node at that index
      let previousNode = this.head;

      for (let k = 0; k < index - 1; k++) {
          previousNode = previousNode.next;
      }

      let nextNode = previousNode.next;
      
      newNode.next = nextNode;
      previousNode.next = newNode;
      newNode.previous = previousNode;
      nextNode.previous = newNode;

      this.length++;
      this.printList();
  }

  // Remove a node
  remove (index) {
      if (!Number.isInteger(index) || index < 0 || index > this.length) {
          console.log(`Invalid index. Current length is ${this.length}.`);
          return this;
      }

      // Remove head
      if (index === 0) {
          this.head = this.head.next;
          this.head.previous = null;

          this.length--;
          this.printList();
          return this;
      }

      // Remove tail
      if (index === this.length - 1) {
          this.tail = this.tail.previous;
          this.tail.next = null;

          this.length--;
          this.printList();
          return this;
      }

      // Remove node at an index
      let previousNode = this.head;

      for (let k = 0; k < index - 1; k++) {
          previousNode = previousNode.next;
      }
      let deleteNode = previousNode.next;
      let nextNode = deleteNode.next;

      previousNode.next = nextNode;
      nextNode.previous = previousNode;

      this.length--;
      this.printList();
      return this;
  }

  // make the linked list cyclic
  makeCyclic() {
    if (this.head && this.length > 1) {
      this.head.previous = this.tail;
      this.tail.next = this.head;
    }
  }
}

class SinglyNode {
  constructor(array) {
    this.array = array;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(node) {
    this.head = node;
    this.tail = this.head;
    this.length = 1;
  }
  append(node) {
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }
  prepend(node) {
    if (!node) return;
    node.next = this.head;
    this.head = node;
    this.length--;
  }
  goToNthDeck(n) {
    let node = this.head;
    let count = 1;
    while (count < n) {
      node = node.next;
      count++;
    }
    return node;
  }
  makeCyclic() {
    if (this.head && this.length > 1) {
      this.tail.next = this.head;
    }
  }
}

class Visited {
  constructor() {
    this.object = new Set();
    this.length = 0;
  }
  add(value) {
    if (this.object.has(value)) return;
    this.object.add(value);
    this.length++;
  }
  clear() {
    this.object.clear();
    this.length = 0;
  }
}

let visited = new Visited();
let current;