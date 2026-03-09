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
  { id: 0, name: "愚者", arcana: "Major", meaning: "新的开始，天真，自发，自由的精神", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
  { id: 1, name: "魔术师", arcana: "Major", meaning: "显化，资源丰富，力量，受启发的行动", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
  { id: 2, name: "女祭司", arcana: "Major", meaning: "直觉，神圣知识，神圣女性，潜意识", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
  { id: 3, name: "皇后", arcana: "Major", meaning: "女性气质，美丽，自然，育养，丰盛", image: "https://upload.wikimedia.org/wikipedia/commons/a/af/RWS_Tarot_03_Empress.jpg" },
  { id: 4, name: "皇帝", arcana: "Major", meaning: "权威，建立，结构，父亲形象", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
  { id: 5, name: "教皇", arcana: "Major", meaning: "精神智慧，宗教信仰，从众，传统，体制", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
  { id: 6, name: "恋人", arcana: "Major", meaning: "爱，和谐，关系，价值观对齐，选择", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg" },
  { id: 7, name: "战车", arcana: "Major", meaning: "控制，意志力，成功，行动，决心", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
  { id: 8, name: "力量", arcana: "Major", meaning: "力量，勇气，说服，影响力，同情心", image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/RWS_Tarot_08_Strength.jpg" },
  { id: 9, name: "隐士", arcana: "Major", meaning: "灵魂搜寻，内省，孤独，内在指引", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
  { id: 10, name: "命运之轮", arcana: "Major", meaning: "好运，业力，生命周期，命运，转折点", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { id: 11, name: "正义", arcana: "Major", meaning: "正义，公平，真理，因果，法律", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
  { id: 12, name: "倒吊人", arcana: "Major", meaning: "暂停，臣服，放手，新视角", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
  { id: 13, name: "死亡", arcana: "Major", meaning: "结束，改变，转化，过渡", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
  { id: 14, name: "节制", arcana: "Major", meaning: "平衡，节制，耐心，目的", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
  { id: 15, name: "恶魔", arcana: "Major", meaning: "阴影自我，依恋，成瘾，限制，性", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
  { id: 16, name: "高塔", arcana: "Major", meaning: "突然的改变，动荡，混乱，启示，觉醒", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
  { id: 17, name: "星星", arcana: "Major", meaning: "希望，信仰，目的，更新，灵性", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
  { id: 18, name: "月亮", arcana: "Major", meaning: "幻象，恐惧，焦虑，潜意识，直觉", image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/RWS_Tarot_18_Moon.jpg" },
  { id: 19, name: "太阳", arcana: "Major", meaning: "积极，乐趣，温暖，成功，活力", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
  { id: 20, name: "审判", arcana: "Major", meaning: "审判，重生，内在召唤，赦免", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
  { id: 21, name: "世界", arcana: "Major", meaning: "完成，整合，成就，旅行", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" },

  // Minor Arcana - Wands
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 22 + i,
    name: `${['权杖首牌', '权杖二', '权杖三', '权杖四', '权杖五', '权杖六', '权杖七', '权杖八', '权杖九', '权杖十', '权杖侍从', '权杖骑士', '权杖王后', '权杖国王'][i]}`,
    arcana: "Minor" as const,
    suit: "Wands" as const,
    meaning: "行动，能量，激情，灵感",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['1/11/Wands01.jpg', '0/0f/Wands02.jpg', 'f/ff/Wands03.jpg', 'a/a4/Wands04.jpg', '9/9d/Wands05.jpg', '3/3b/Wands06.jpg', 'e/e4/Wands07.jpg', '6/6b/Wands08.jpg', '4/4d/Wands09.jpg', '0/0b/Wands10.jpg', '6/6a/Wands11.jpg', '1/16/Wands12.jpg', '0/0d/Wands13.jpg', 'c/ce/Wands14.jpg'][i]}`
  })),

  // Minor Arcana - Cups
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 36 + i,
    name: `${['圣杯首牌', '圣杯二', '圣杯三', '圣杯四', '圣杯五', '圣杯六', '圣杯七', '圣杯八', '圣杯九', '圣杯十', '圣杯侍从', '圣杯骑士', '圣杯王后', '圣杯国王'][i]}`,
    arcana: "Minor" as const,
    suit: "Cups" as const,
    meaning: "情感，关系，连接，直觉",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['3/36/Cups01.jpg', 'f/f8/Cups02.jpg', '7/7a/Cups03.jpg', '3/35/Cups04.jpg', 'd/d9/Cups05.jpg', '1/17/Cups06.jpg', 'b/b0/Cups07.jpg', '6/60/Cups08.jpg', '2/24/Cups09.jpg', '8/84/Cups10.jpg', 'a/ad/Cups11.jpg', 'f/fa/Cups12.jpg', '6/62/Cups13.jpg', '0/04/Cups14.jpg'][i]}`
  })),

  // Minor Arcana - Swords
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 50 + i,
    name: `${['宝剑首牌', '宝剑二', '宝剑三', '宝剑四', '宝剑五', '宝剑六', '宝剑七', '宝剑八', '宝剑九', '宝剑十', '宝剑侍从', '宝剑骑士', '宝剑王后', '宝剑国王'][i]}`,
    arcana: "Minor" as const,
    suit: "Swords" as const,
    meaning: "理智，逻辑，沟通，冲突",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['1/1a/Swords01.jpg', '9/9e/Swords02.jpg', '0/02/Swords03.jpg', 'b/bf/Swords04.jpg', '2/23/Swords05.jpg', '2/29/Swords06.jpg', '3/34/Swords07.jpg', 'a/a7/Swords08.jpg', '2/2f/Swords09.jpg', 'd/d4/Swords10.jpg', '4/4c/Swords11.jpg', 'b/b5/Swords12.jpg', 'd/d4/Swords13.jpg', '3/33/Swords14.jpg'][i]}`
  })),

  // Minor Arcana - Pentacles
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 64 + i,
    name: `${['星币首牌', '星币二', '星币三', '星币四', '星币五', '星币六', '星币七', '星币八', '星币九', '星币十', '星币侍从', '星币骑士', '星币王后', '星币国王'][i]}`,
    arcana: "Minor" as const,
    suit: "Pentacles" as const,
    meaning: "工作，金钱，健康，显化",
    image: `https://upload.wikimedia.org/wikipedia/commons/${['f/fd/Pents01.jpg', '9/9f/Pents02.jpg', '4/42/Pents03.jpg', '3/35/Pents04.jpg', '9/96/Pents05.jpg', 'a/a6/Pents06.jpg', '8/8a/Pents07.jpg', '4/49/Pents08.jpg', 'f/f0/Pents09.jpg', '3/3f/Pents10.jpg', 'e/ec/Pents11.jpg', 'd/d5/Pents12.jpg', '8/88/Pents13.jpg', '1/1c/Pents14.jpg'][i]}`
  })),
];
