// react-zh/1-planner/src/data/categoryIcons.ts
const categoryIcons: Record<string, string> = {
  "Fókusz idő": "⏱️",
  Hobbi: "🎨",
  Szabadidő: "🎮",
  Sport: "🏃‍♂️",
};

export const getIcon = (category: string): string | undefined => {
  return categoryIcons[category];
};

export default categoryIcons;
