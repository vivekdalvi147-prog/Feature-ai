export const tarotDeck = [
  // --- MAJOR ARCANA (The 22 Main Cards) ---
  { id: 0, name: "The Fool", image: "0.jpg", keyword: "New Beginnings", meaning: "Spontaneity, faith, and a new journey into the unknown." },
  { id: 1, name: "The Magician", image: "1.jpg", keyword: "Manifestation", meaning: "Harnessing your skills and resources to create your reality." },
  { id: 2, name: "The High Priestess", image: "2.jpg", keyword: "Intuition", meaning: "Looking within for answers; spiritual wisdom and mystery." },
  { id: 3, name: "The Empress", image: "3.jpg", keyword: "Abundance", meaning: "Nurturing energy, fertility, and the beauty of nature." },
  { id: 4, name: "The Emperor", image: "4.jpg", keyword: "Authority", meaning: "Structure, stability, and logical leadership." },
  { id: 5, name: "The Hierophant", image: "5.jpg", keyword: "Tradition", meaning: "Spiritual wisdom, conventional teaching, and institutional belief." },
  { id: 6, name: "The Lovers", image: "6.jpg", keyword: "Relationships", meaning: "Harmony, choices, and aligning values in partnerships." },
  { id: 7, name: "The Chariot", image: "7.jpg", keyword: "Determination", meaning: "Victory through willpower and overcoming obstacles." },
  { id: 8, name: "Strength", image: "8.jpg", keyword: "Inner Power", meaning: "Compassion, courage, and soft power over primal instincts." },
  { id: 9, name: "The Hermit", image: "9.jpg", keyword: "Soul Searching", meaning: "Introspection, seeking truth, and inner guidance." },
  { id: 10, name: "Wheel of Fortune", image: "10.jpg", keyword: "Cycles", meaning: "Fate, change, and the natural flow of life's ups and downs." },
  { id: 11, name: "Justice", image: "11.jpg", keyword: "Cause & Effect", meaning: "Fairness, truth, and legal or karmic balance." },
  { id: 12, name: "The Hanged Man", image: "12.jpg", keyword: "Perspective", meaning: "Surrender, letting go, and seeing things from a new angle." },
  { id: 13, name: "Death", image: "13.jpg", keyword: "Transformation", meaning: "The end of a major phase, making room for something new." },
  { id: 14, name: "Temperance", image: "14.jpg", keyword: "Balance", meaning: "Moderation, patience, and finding the middle ground." },
  { id: 15, name: "The Devil", image: "15.jpg", keyword: "Shadow Self", meaning: "Attachment, addiction, and exploring inner constraints." },
  { id: 16, name: "The Tower", image: "16.jpg", keyword: "Sudden Change", meaning: "Upheaval that breaks down old foundations for growth." },
  { id: 17, name: "The Star", image: "17.jpg", keyword: "Hope", meaning: "Renewal, inspiration, and peace after a storm." },
  { id: 18, name: "The Moon", image: "18.jpg", keyword: "Illusion", meaning: "Subconscious fears, dreams, and navigating uncertainty." },
  { id: 19, name: "The Sun", image: "19.jpg", keyword: "Vitality", meaning: "Joy, success, and radiating positive energy." },
  { id: 20, name: "Judgement", image: "20.jpg", keyword: "Absolution", meaning: "Self-evaluation, awakening, and hearing a higher calling." },
  { id: 21, name: "The World", image: "21.jpg", keyword: "Completion", meaning: "Integration, accomplishment, and the end of a cycle." },

  // --- MINOR ARCANA (Representative Examples) ---
  { id: 22, name: "Ace of Wands", image: "w1.jpg", keyword: "Inspiration", meaning: "A spark of new energy, creativity, and potential." },
  { id: 23, name: "Ace of Cups", image: "c1.jpg", keyword: "Love", meaning: "Emotional beginnings, overflowing feelings, and intuition." },
  { id: 24, name: "Ace of Swords", image: "s1.jpg", keyword: "Clarity", meaning: "Breakthroughs, sharp intellect, and new ideas." },
  { id: 25, name: "Ace of Pentacles", image: "p1.jpg", keyword: "Prosperity", meaning: "Material opportunity, health, and new foundations." }
  // (Full 78 cards are usually mapped via ID for the AI to interpret)
];

export const tarotSpreads = [
  { id: 'single', name: 'Daily Draw', cards: 1 },
  { id: 'three', name: 'Past, Present, Future', cards: 3 },
  { id: 'celtic', name: 'Celtic Cross', cards: 10 }
];
