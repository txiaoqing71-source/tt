export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  meaning: string;
  image: string;
}

export const TAROT_CARDS: TarotCard[] = [
  // Major Arcana (0-21)
  { id: 0, name: "The Fool", arcana: "Major", meaning: "New beginnings, innocence, spontaneity, a free spirit", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
  { id: 1, name: "The Magician", arcana: "Major", meaning: "Manifestation, resourcefulness, power, inspired action", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
  { id: 2, name: "The High Priestess", arcana: "Major", meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
  { id: 3, name: "The Empress", arcana: "Major", meaning: "Femininity, beauty, nature, nurturing, abundance", image: "https://upload.wikimedia.org/wikipedia/commons/a/af/RWS_Tarot_03_Empress.jpg" },
  { id: 4, name: "The Emperor", arcana: "Major", meaning: "Authority, establishment, structure, a father figure", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
  { id: 5, name: "The Hierophant", arcana: "Major", meaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
  { id: 6, name: "The Lovers", arcana: "Major", meaning: "Love, harmony, relationships, values alignment, choices", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg" },
  { id: 7, name: "The Chariot", arcana: "Major", meaning: "Control, willpower, success, action, determination", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
  { id: 8, name: "Strength", arcana: "Major", meaning: "Strength, courage, persuasion, influence, compassion", image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/RWS_Tarot_08_Strength.jpg" },
  { id: 9, name: "The Hermit", arcana: "Major", meaning: "Soul-searching, introspection, being alone, inner guidance", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
  { id: 10, name: "Wheel of Fortune", arcana: "Major", meaning: "Good luck, karma, life cycles, destiny, a turning point", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { id: 11, name: "Justice", arcana: "Major", meaning: "Justice, fairness, truth, cause and effect, law", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
  { id: 12, name: "The Hanged Man", arcana: "Major", meaning: "Pause, surrender, letting go, new perspectives", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
  { id: 13, name: "Death", arcana: "Major", meaning: "Endings, change, transformation, transition", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
  { id: 14, name: "Temperance", arcana: "Major", meaning: "Balance, moderation, patience, purpose", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
  { id: 15, name: "The Devil", arcana: "Major", meaning: "Shadow self, attachment, addiction, restriction, sexuality", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
  { id: 16, name: "The Tower", arcana: "Major", meaning: "Sudden change, upheaval, chaos, revelation, awakening", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
  { id: 17, name: "The Star", arcana: "Major", meaning: "Hope, faith, purpose, renewal, spirituality", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
  { id: 18, name: "The Moon", arcana: "Major", meaning: "Illusion, fear, anxiety, subconscious, intuition", image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/RWS_Tarot_18_Moon.jpg" },
  { id: 19, name: "The Sun", arcana: "Major", meaning: "Positivity, fun, warmth, success, vitality", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
  { id: 20, name: "Judgement", arcana: "Major", meaning: "Judgement, rebirth, inner calling, absolution", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
  { id: 21, name: "The World", arcana: "Major", meaning: "Completion, integration, accomplishment, travel", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" },

  // Minor Arcana - Wands
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 22 + i,
    name: `${['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'][i]} of Wands`,
    arcana: "Minor" as const,
    suit: "Wands" as const,
    meaning: "Action, energy, passion, inspiration",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['1/11/Wands01.jpg', '0/0f/Wands02.jpg', 'f/ff/Wands03.jpg', 'a/a4/Wands04.jpg', '9/9d/Wands05.jpg', '3/3b/Wands06.jpg', 'e/e4/Wands07.jpg', '6/6b/Wands08.jpg', '4/4d/Wands09.jpg', '0/0b/Wands10.jpg', '6/6a/Wands11.jpg', '1/16/Wands12.jpg', '0/0d/Wands13.jpg', 'c/ce/Wands14.jpg'][i]}`
  })),

  // Minor Arcana - Cups
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 36 + i,
    name: `${['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'][i]} of Cups`,
    arcana: "Minor" as const,
    suit: "Cups" as const,
    meaning: "Emotions, relationships, connections, intuition",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['3/36/Cups01.jpg', 'f/f8/Cups02.jpg', '7/7a/Cups03.jpg', '3/35/Cups04.jpg', 'd/d9/Cups05.jpg', '1/17/Cups06.jpg', 'b/b0/Cups07.jpg', '6/60/Cups08.jpg', '2/24/Cups09.jpg', '8/84/Cups10.jpg', 'a/ad/Cups11.jpg', 'f/fa/Cups12.jpg', '6/62/Cups13.jpg', '0/04/Cups14.jpg'][i]}`
  })),

  // Minor Arcana - Swords
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 50 + i,
    name: `${['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'][i]} of Swords`,
    arcana: "Minor" as const,
    suit: "Swords" as const,
    meaning: "Intellect, logic, communication, conflict",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['1/1a/Swords01.jpg', '9/9e/Swords02.jpg', '0/02/Swords03.jpg', 'b/bf/Swords04.jpg', '2/23/Swords05.jpg', '2/29/Swords06.jpg', '3/34/Swords07.jpg', 'a/a7/Swords08.jpg', '2/2f/Swords09.jpg', 'd/d4/Swords10.jpg', '4/4c/Swords11.jpg', 'b/b5/Swords12.jpg', 'd/d4/Swords13.jpg', '3/33/Swords14.jpg'][i]}`
  })),

  // Minor Arcana - Pentacles
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 64 + i,
    name: `${['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'][i]} of Pentacles`,
    arcana: "Minor" as const,
    suit: "Pentacles" as const,
    meaning: "Work, money, health, manifestation",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['f/fd/Pents01.jpg', '9/9f/Pents02.jpg', '4/42/Pents03.jpg', '3/35/Pents04.jpg', '9/96/Pents05.jpg', 'a/a6/Pents06.jpg', '8/8a/Pents07.jpg', '4/49/Pents08.jpg', 'f/f0/Pents09.jpg', '3/3f/Pents10.jpg', 'e/ec/Pents11.jpg', 'd/d5/Pents12.jpg', '8/88/Pents13.jpg', '1/1c/Pents14.jpg'][i]}`
  })),
];
