
import PromptSync from "prompt-sync";

const prompt = PromptSync();

// const fund: string | number =Number( prompt('what is your fund? '));

// if (!isNaN(fund)) {
//   // console.log(`your bet $${bet}`)

//   if (fund <= 99) {
//     console.log('fund too small(minimum $100)')
//   } else if (fund>= 100) {
//     console.log(`your fund $${fund}`)
//   }
// } else {
//   console.log("put only number")
// }

const suits = ["♠", "♥", "♦", "♣"] as const;
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

interface Card {
  suit: typeof suits[number];
  rank: typeof ranks[number];
}


function shuffledDeck<T>(deck: T[]): T[] {
  for (let i = deck.length - 1; i > 0; i --) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const decks: Card[] = [];
for (const suit of suits) {
  for (const rank of ranks) {
    decks.push({suit, rank})
       // decks.pop()
  }
}

const shuffled = shuffledDeck(decks);
// console.log(shuffled);
const oneCard = shuffled.pop();
if (oneCard) {
  console.log(`${oneCard.rank}${oneCard.suit}`)
}























































// function shuffleArray(array: string[]): string[] {
//   for (let i = array.length - 1; i > 0; i--) {
//     const randomIndex = Math.floor(Math.random() * (i + 1));
//     [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
//   }
//   return array;
// }

// const suits: string[] = ["♠", "♥", "♦", "♣"];
// const ranks: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
// const deck: any[] = [];

// for (let suit of suits) {
//   for (let rank of ranks) {
//     deck.push(suit + rank)
//   }
// }

// console.log(`Total Cards: ${deck.length}`);

// for (let i = 0; i < deck.length; i += 13) {
//   console.log(deck.slice(i, i + 13).join(" "));
// }

// const topCard = deck.pop();
// console.log(`Top Card: ${topCard}`)

// const topCard = Math.floor(Math.random () * deck.length)
// console.log(`Top Card: ${topCard}`)


// for (let suit of suits) {
//   for (let rank of ranks) {
//     const topCard = deck.pop();
//     console.log(`top card: ${suit + rank}`)
//     console.log( topCard)
//   }
// }



