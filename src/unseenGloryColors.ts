export const unseenGloryColors = ["#ff6600", "#00aa00", "#2E9AFE"];

export const randomUnseenGloryColor = (skipColor: string | null = null) => {
  const availableColors = [...unseenGloryColors];
  if (skipColor) {
    const index = availableColors.indexOf(skipColor);
    if (index > -1) {
      availableColors.splice(index, 1);
    }
  }
  const colorClassIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[colorClassIndex];
};
