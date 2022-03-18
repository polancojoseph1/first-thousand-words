# First Thousand Words

First Thoudand Words is a website that gives you flash cards to study and to be able to write 1000 words in 17 languages
Foobar is a Python library for dealing with word pluralization.

## About First Thousand Words

Once you click top right corner you will be able to choose which language you want to learn.

In the middle of the screen there is a card that has text in the language of your choice and an English translation under it.

You are given a deck of 25 cards, and you can use the next and prev buttons to be able to go to the next and previous card.

The grey score bar on top moves depending on which card you are on. It will be empty when you are on card one and it will be full when you are on the 25th card.

After you saw all of the cards in a given deck you will be given a new deck of cards.

Once you complete all 40 decks, you will be taken to deck one.

## Technical Details

This application was made with Javascript, HTML and CSS

### Data Structures

With Javascript I created 4 major data structures to make First Thousand Words possible. A singly linked list, a doubly linked list, a current node tracker, and a set(called visited). The singly linked list is cyclic and is used to store the decks. The doubly linked list is also cyclic and is used to keep track of the 25 cards for a given deck. The current node tracker is used for the cards, and the decks to see which deck, and which card we are on. Lastly the set is used to track which cards we visited, once we have visited all 25 cards in a deck, we go to the next deck.

### Recursion

With recursion we are able to change from one language to the next. I added a return statement once the language is not the current language to avoid overlap.

### Local Storage

With the help of local storage this website is able to save your progress so when you reopen the website you will retain your current deck.
