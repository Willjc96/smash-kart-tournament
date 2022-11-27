export const scoringSystem = (selectedGameLabel) => {
  switch (selectedGameLabel) {
    case 'Mario Kart 8':
      return 'rankedPosition';
      break;
    case 'Super Smash Bros.':
      return 'totalWins';
      break;
    case 'Chess':
      return 'totalWins';
      break;
    default: return 'totalWins';
      break;
  }
};