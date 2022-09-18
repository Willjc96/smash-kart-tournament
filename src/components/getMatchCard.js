import { getPlayerAvatar } from '../components/getPlayerAvatar';

export const getMatchCard = (index, firstPlayerMatchupName, secondPlayerMatchupName) => {
  const firstPlayerNumber = firstPlayerMatchupName?.playerNumber;
  const secondPlayerNumber = secondPlayerMatchupName?.playerNumber;
  const firstPlayerName = firstPlayerMatchupName?.playerName;
  const secondPlayerName = secondPlayerMatchupName?.playerName;
  return (
    <div className='match-card'>
      {/* <p> */}
      Match {index + 1}:
      <div>
        <div className='player-card'>
          {getPlayerAvatar(firstPlayerNumber)} {firstPlayerName}
        </div>
        <div className='player-card'>
          {getPlayerAvatar(secondPlayerNumber)} {secondPlayerName}
        </div>
      </div>
      {/* </p> */}
    </div>
  );
};