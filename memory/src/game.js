import React, { Component } from 'react';
// import './MemoryGame.css';



const IMAGES = ["cat", "cat", "dog", "dog", "horse", "horse", "pig",
"pig", "snake", "snake", "fish", "fish"];

class MemoryGame extends Component {
constructor(props) {
  super(props);

  // You can simplify your state a lot
  this.state = {
    cards: shuffleArray(IMAGES.slice()),
    selected: [], // indexes which have been selected
    correct: [] // indexes which have been guessed correctly
  };
}

// Don't need a componentWillMount

onCardClick(clickedIndex) {
  const { selected, cards, correct } = this.state;

  if (selected.length === 0) { // selecting a first card
    this.setState({ selected: [clickedIndex] })
  } else if (selected.length === 1) { // they're selecting a second card
    if (cards[selected[0]] === cards[clickedIndex]) {
      // It's a match :)
      // Add selected cards to `correct` and reset selection
      this.setState({
          correct: correct.concat([selected[0], clickedIndex]),
          selected: []
      });
    } else {
      // It's not a match :(
      // Select it for now, and reset selection in a bit
      this.setState({ selected: [selected[0], clickedIndex] });
      setTimeout(() => {
        this.setState({ selected: [] })
      }, 1500);
    }
  }
  // Otherwise they already have 2 selected and we don't wanna do anything
}

render() {
  const { correct, selected, cards } = this.state;
  return (
    <div>
      <h1>Memory Game</h1>
      <div className="mui-panel wrapper">
        {cards.map((image, i) => (
          <MemoryCard
            key={i}
            image={image}
            isCorrect={correct.includes(i)}
            isSelected={selected.includes(i)}
            onSelect={() => this.onCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
}

// Extracted into it's own component
const MemoryCard = ({ image, isSelected, isCorrect, onSelect }) => (
<div
  className="modal mui-panel"
  onClick={() => {
    // You can only select a card that's not already correct and
    // isn't currently selected
    if (!isCorrect && !isSelected) {
      onSelect();
    }
  }}
>
  <img
    style={{ visibility: (isCorrect || isSelected) ? 'visible' : 'hidden' }}
    src={"./" + image + ".jpg"}
    srcSet={"./" + image + "_lrg.jpg 1000w"}
    alt={image}
  />
</div>
);

// Probably in a different file
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

export default MemoryGame;