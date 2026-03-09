import { TarotCard } from '../constants';

interface UserData {
  name: string;
  gender: string;
  question: string;
}

interface SelectedCard {
  card: TarotCard;
  isReversed: boolean;
}

export const generateLocalInterpretation = (userData: UserData, selectedCards: SelectedCard[]): string => {
  const [past, present, future] = selectedCards;

  const getCardText = (item: SelectedCard, position: string) => {
    const { card, isReversed } = item;
    let text = `【${position}：${card.name} (${isReversed ? '逆位' : '正位'})】\n`;
    
    if (isReversed) {
      text += `能量处于内省或阻塞状态。${card.meaning}的正面力量目前难以完全发挥，可能暗示着内在的转化、延迟或需要重新审视的方向。`;
    } else {
      text += `能量正位运行，预示着${card.meaning}的力量正在积极显现。这是一个明确的信号，指引你顺应当下的趋势。`;
    }
    return text;
  };

  const intro = `尊敬的 ${userData.name}，宇宙的星辰已为你排布。针对你所关心的“${userData.question}”，以下是来自古老塔罗的本地启示：\n\n`;

  const analysis = `一、 牌阵解析\n\n` +
    getCardText(past, '过去') + '\n\n' +
    getCardText(present, '现在') + '\n\n' +
    getCardText(future, '未来') + '\n\n';

  const synthesis = `二、 综合解读\n\n` +
    `从整体牌阵来看，你的旅程正经历从“${past.card.name}”的根源，经过“${present.card.name}”的现状，向“${future.card.name}”的可能演变。` +
    `这表明你的问题“${userData.question}”正处于一个关键的转折点。建议你关注内在的直觉，平衡感性与理性的力量。\n\n`;

  const advice = `三、 宇宙建议\n\n` +
    `1. 保持觉察：留意生活中细微的同步性事件。\n` +
    `2. 顺势而为：不要强求结果，而是关注当下的每一步行动。\n` +
    `3. 信任直觉：你内心深处已经拥有了答案，只需静心聆听。`;

  return intro + analysis + synthesis + advice;
};

export const generateLocalFortune = (): string => {
  const fortunes = [
    "星辰在寂静中低语，指引你走向未知的辉煌。",
    "命运的丝线始终握在你手中，每一次选择都在编织未来。",
    "当下的迷雾只是暂时的，内心的光芒终将照亮前路。",
    "宇宙从不急于求成，耐心是通往智慧的必经之路。",
    "每一个终点都是新旅程的起点，勇敢迈出那一步。",
    "你所寻找的答案，其实一直藏在你对世界的温柔里。",
    "顺应自然的力量，你会发现万物皆有其时。",
    "心之所向，便是光之所在。"
  ];
  return fortunes[Math.floor(Math.random() * fortunes.length)];
};
