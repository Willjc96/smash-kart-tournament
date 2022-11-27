export const placementOptions = [];
const totalNumberOfPlaces = 12;
// totalNumberOfPlaces refers to all players (even cpu players) in a given match/race, not just the ones recording their scores
for (let i = 0; i < totalNumberOfPlaces; i++) {
  switch (i) {
    case 0:
      placementOptions.push({ label: '1st', value: 1 });
      break;
    case 1:
      placementOptions.push({ label: '2nd', value: 2 });
      break;
    case 2:
      placementOptions.push({ label: '3rd', value: 3 });
      break;
    default:
      placementOptions.push({ label: `${i + 1}th`, value: i + 1 });
      break;
  }
}