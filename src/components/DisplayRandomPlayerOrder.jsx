import { GetMatchCard } from '../components/GetMatchCard';

export const DisplayRandomPlayerOrder = ({ randomPlayerOrder, playerNames, selectedGameLabel }) => {

  const findPlayer = ({ playerNames, match }, index) => {
    return playerNames.filter((player) => {
      return player.playerNumber == match[index];
    })[0];
  };

  return (
    randomPlayerOrder.map((round, index) => {
      const matchRounds = round[`Round${[index]}`];
      return (
        <div className='round'>
          <h3>
            Round {index + 1}
          </h3>
          <div className='round-matches-grid-container'>
            {matchRounds.map((match, index) => {
              const firstPlayerMatchup = findPlayer({ playerNames, match }, 0);
              const secondPlayerMatchup = findPlayer({ playerNames, match }, 1);
              return (
                <GetMatchCard index={index} firstPlayerMatchup={firstPlayerMatchup} secondPlayerMatchup={secondPlayerMatchup} selectedGameLabel={selectedGameLabel} />
              );
            })}
          </div>
        </div>
      );
    })
  );
};