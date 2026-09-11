
import PromptSync from "prompt-sync";

const prompt = PromptSync();

// const name: string = prompt('what is your name? ');

// console.log(`Hello, ${name}`);
// 🂡 🂢 🂣 🂤 🂥 🂦 🂧 🂨 🂩 🂪 🂫 🂭 🂮
// 🂱 🂲 🂳 🂴 🂵 🂶 🂷 🂸 🂹 🂺 🂻 🂽 🂾
// 🃁 🃂 🃃 🃄 🃅 🃆 🃇 🃈 🃉 🃊 🃋 🃍 🃎
// 🃑 🃒 🃓 🃔 🃕 🃖 🃗 🃘 🃙 🃚 🃛 🃝 🃞
//
//
//
// ♠A ♠2 ♠3 ♠4 ♠5 ♠6 ♠7 ♠8 ♠9 ♠10 ♠J ♠Q ♠K
// ♥A ♥2 ♥3 ♥4 ♥5 ♥6 ♥7 ♥8 ♥9 ♥10 ♥J ♥Q ♥K
// ♦A ♦2 ♦3 ♦4 ♦5 ♦6 ♦7 ♦8 ♦9 ♦10 ♦J ♦Q ♦K
// ♣A ♣2 ♣3 ♣4 ♣5 ♣6 ♣7 ♣8 ♣9 ♣10 ♣J ♣Q ♣K
//
// 

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array;
}

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const deck = [];

for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(suit + rank)
  }
}

console.log(`Total Cards: ${deck.length}`);

for (let i = 0; i < deck.length; i += 13) {
  console.log(deck.slice(i, i + 13).join(" "));
}

const topCard = deck.pop();
console.log(`Top Card: ${topCard}`)










