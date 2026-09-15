
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const fund: string | number = Number(prompt("what is your fund? "));

if (!isNaN(fund)) {
  if (fund <= 99) {
    console.log("fund too small(minimum $100)");
  } else if (fund >= 100) {
    console.log(`your fund $${fund}`);

    // enter bet

    const bet: number = Number(prompt("Enter your bet: $"));
    console.log(`...$${fund - bet}`);

    const suits = ["♠", "♥", "♦", "♣"] as const;
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ] as const;

    interface Card {
      suit: (typeof suits)[number];
      rank: (typeof ranks)[number];
    }

    function shuffledDeck<T>(deck: T[]): T[] {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }

    const decks: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        decks.push({ suit, rank });
        // decks.pop()
      }
    }

    const shuffled: Card[] = shuffledDeck(decks);
    // console.log(shuffled);
    const oneCard: Card | undefined = shuffled.pop();
    if (oneCard) {
      console.log(`Your hand: ${oneCard.rank}${oneCard.suit}`);
    }
  }
} else {
  console.log("put only number");
}
 
