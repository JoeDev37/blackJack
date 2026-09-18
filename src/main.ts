
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
        decks.push({ suit, rank});
      }
    }

    const shuffled: Card[] = shuffledDeck(decks, );

    // player's hand
    // const hand: Card[] = deal(shuffled, 2)
    // if (hand.length === 2){
    //   console.log(`Your hand: ${hand.map(c => `${c.rank}${c.suit}`).join(" ")} (total ${calculateHandValue(hand)})`)
    // }

    // dealer's hand
    // const dealerHand: Card[] = deal(shuffled, 2);
    // if (dealerHand.length === 2) {
    //   console.log(`Dealer's hand: ${dealerHand.map(c => `${c.rank}${c.suit}`).join( "  " )} (total ${calculateHandValue(dealerHand)})`)
    // } // how to hide the second card??????

    function justPlay() {

         // player's hand
    const hand: Card[] = deal(shuffled, 2)
    if (hand.length === 2){
      console.log(`Your hand: ${hand.map(c => `${c.rank}${c.suit}`).join(" ")} (total ${calculateHandValue(hand)})`)
    }

    // dealer's hand
    const dealerHand: Card[] = deal(shuffled, 2);
    if (dealerHand.length === 2) {
      console.log(`Dealer's hand: ${dealerHand.map(c => `${c.rank}${c.suit}`).join( "  " )} (total ${calculateHandValue(dealerHand)})`)
    } // how to hide the second card??????
      
    }
    justPlay();


    // hit or stand action
    // hit =  take another card
    // stand = take no more card(keep the currnet card)

    let hitStand: string = prompt('hit/stand ');

    // if (hitStand === "hit") {
    //   justPlay()
    // }

    while(hitStand === "hit") {
      justPlay();

      hitStand = prompt('hit/stand ')
    }

    if (hitStand === "stand") {
      console.log('game ends here')
    }
    


    // Give a value for cards
    function calculateHandValue(hand: Card[]): number {
      let score = 0;
      let aceScore = 0;

      for (const card of hand) {
        if (card.rank === 'A') {
          aceScore += 1;
          score += 11
        } else if (['J', 'Q', 'K'].includes(card.rank)) {
          score += 10
        } else  {
          score += parseInt(card.rank, 10)
        }
      }


      while (score > 21 && aceScore > 0) {
        score -= 10;
        aceScore -= 1;
      }
      return score
    }
  
  }
} else {
  console.log("put only number");
}
 
