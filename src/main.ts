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

    function deal<T>(deck: T[], count: number): T[] {
      return deck.splice(-count, count);
    }
    const decks: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        decks.push({ suit, rank });
      }
    }

    const shuffled: Card[] = shuffledDeck(decks);

    // player's hand
    const hand: Card[] = deal(shuffled, 2);
    if (hand.length === 2) {
      console.log(
        `→ Your hand: ${hand.map((c) => `${c.rank}${c.suit}`).join(" ")} (total ${calculateHandValue(hand)})`,
      );
    }

    // dealer's hand
    const dealerHand: Card[] = deal(shuffled, 2);
    if (dealerHand.length === 2) {
      console.log(
        `→ Dealer's hand: ${dealerHand.map((c) => `${c.rank}${c.suit}`).join("  ")} (total ${calculateHandValue(dealerHand)})`,
      );
    } // how to hide the second card??????

    let hitStand: string = prompt("hit/stand: ");

    while (hitStand === "hit") {
      const newCard: Card[] = deal(shuffled, 1);
      if (newCard[0]) {
        hand.push(newCard[0]);
        console.log(
          `→ Your hand: ${hand.map((c) => `${c.rank}${c.suit}`).join(" ")} (total ${calculateHandValue(hand)})`,
        );
      }
      if (calculateHandValue(hand) >= 22) {
        console.log("→ bust, Dealer won!");
        console.log(`→ you left: $${fund - bet}`);
        // console.log('Dealer Won')
        break;
      } else if (calculateHandValue(hand) === 21) {
        console.log("→ You won!!");
        console.log(`→ your fund: $${fund + bet}`);
      }
      // ask if the player wants to continue
      hitStand = prompt("hit/stand: ");
    }

    if (hitStand === "stand") {
      while (true) {
        const dealerValue = calculateHandValue(dealerHand);

        // Dealer busts
        if (dealerValue > 21) {
          console.log("→ Dealer busts, player won!");
          console.log(`→ your fund: $${fund + bet}`);
          break;
        }

        // Dealer stands on 17-21
        if (dealerValue >= 17) {
          console.log(
            `→ Dealer stands: ${dealerHand
              .map((c) => `${c.rank}${c.suit}`)
              .join("  ")} (total ${dealerValue})`,
          );
          break;
        }

        // Dealer is 16 or less, so hit
        const newCard: Card[] = deal(shuffled, 1);

        if (newCard[0]) {
          dealerHand.push(newCard[0]);

          console.log(
            `→ Dealer's hand: ${dealerHand
              .map((c) => `${c.rank}${c.suit}`)
              .join("  ")} (total ${calculateHandValue(dealerHand)})`,
          );
        }
      }

      // Compare final hands after dealer is finished
      console.log(`→ ${compHands(hand, dealerHand)}`);
    }

    type gameResult = "player won!" | "dealer won!" | "tie.";

    function compHands(pH: Card[], dH: Card[]): gameResult {
      const playerScore = calculateHandValue(pH);
      const dealerScore = calculateHandValue(dH);

      if (playerScore > 21) {
        return "dealer won!";
      }

      if (dealerScore > 21) {
        return "player won!";
      }

      if (playerScore > dealerScore) {
        return "player won!";
      } else if (dealerScore > playerScore) {
        return "dealer won!";
      } else {
        return "tie.";
      }
    }

    // Give a value for cards
    function calculateHandValue(hand: Card[]): number {
      let score = 0;
      let aceScore = 0;

      for (const card of hand) {
        if (card.rank === "A") {
          aceScore += 1;
          score += 11;
        } else if (["J", "Q", "K"].includes(card.rank)) {
          score += 10;
        } else {
          score += parseInt(card.rank, 10);
        }
      }

      while (score > 21 && aceScore > 0) {
        score -= 10;
        aceScore -= 1;
      }
      return score;
    }
  }
} else {
  console.log("put only number.");
}
