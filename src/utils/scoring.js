import { categories } from './categories';


export const calculatePoints = (userCategory, labels) => {
  const detectedLabels = labels.map(label => label.description.toLowerCase());
  const expectedLabels = categories[userCategory] || [];

  const matches = detectedLabels.filter(label =>
    expectedLabels.some(expected => label.includes(expected))
  );

  if (matches.length > 0) {
    return 10; // Foto validada
  } else {
    return 0;  // Foto no validada
  }
};

export const correctionBonus = 5;
export const multipleClassificationBonus = 5;
export const weeklyChallengeBonus = 20;

export const getDiscountByPoints = (totalPoints) => {
  if (totalPoints >= 550) return 50;
  if (totalPoints >= 450) return 45;
  if (totalPoints >= 370) return 40;
  if (totalPoints >= 300) return 35;
  if (totalPoints >= 240) return 30;
  if (totalPoints >= 180) return 25;
  if (totalPoints >= 130) return 20;
  if (totalPoints >= 90) return 15;
  if (totalPoints >= 60) return 10;
  if (totalPoints >= 30) return 5;
  return 0;
};
