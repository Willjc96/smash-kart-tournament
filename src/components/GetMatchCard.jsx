import { InputNumber, Select } from 'antd';
import { useState, useEffect } from 'react';
import { getPlayerAvatar } from './getPlayerAvatar';
import { placementOptions } from './placementOptions';
import { scoringSystem } from './scoringSystem';


export const GetMatchCard = (props) => {
  const { index, firstPlayerMatchup, secondPlayerMatchup, selectedGameLabel } = props;

  const [firstPlayerScore, setFirstPlayerScore] = useState(null);
  const [secondPlayerScore, setSecondPlayerScore] = useState(null);
  const [firstPlayerRank, setFirstPlayerRank] = useState(null);
  const [secondPlayerRank, setSecondPlayerRank] = useState(null);

  const upperScoreInputClass = 'score-input-top-empty';
  const lowerScoreInputClass = 'score-input-bottom-empty';

  useEffect(() => {

  }, [firstPlayerScore, secondPlayerScore, firstPlayerRank, secondPlayerRank]);

  const getScoringSystemInput = (playerNumberStatus, playerNumber) => {
    let background;
    switch (scoringSystem(selectedGameLabel)) {
      case 'totalWins':
        if (firstPlayerScore && secondPlayerScore) {
          if (firstPlayerScore === secondPlayerScore) {
            background = 'orange';
          }
          else if (playerNumber === 'firstPlayer') {
            if (firstPlayerScore > secondPlayerScore) {
              background = 'lime';
            }
            else if (secondPlayerScore > firstPlayerScore) {
              background = 'red';
            }
          }
          else if (playerNumber === 'secondPlayer') {
            if (secondPlayerScore > firstPlayerScore) {
              background = 'lime';
            }
            else if (firstPlayerScore > secondPlayerScore) {
              background = 'red';
            }
          }
        }
        return <InputNumber className={playerNumberStatus} placeholder='-' onChange={(e) => updatePlayerScore(e, playerNumber)} style={{ background: background }} />;
        break;

      case 'rankedPosition':
        // remember that the lower the rank the better the performance so lowest value is the winner
        if (firstPlayerRank && secondPlayerRank) {
          if (firstPlayerRank === secondPlayerRank) {
            background = 'orange';
          }
          else if (playerNumber === 'firstPlayer') {
            if (firstPlayerRank < secondPlayerRank) {
              background = 'lime';
            }
            else if (secondPlayerRank < firstPlayerRank) {
              background = 'red';
            }
          }
          else if (playerNumber === 'secondPlayer') {
            if (secondPlayerRank < firstPlayerRank) {
              background = 'lime';
            }
            else if (firstPlayerRank < secondPlayerRank) {
              background = 'red';
            }
          }
        } else background = 'white';

        return <Select className={playerNumberStatus} options={placementOptions} onChange={(e) => updatePlayerRank(e, playerNumber)} style={{ width: '25%', background: background, backgroundColor: 'none' }} />;
        break;
      default: return;
    }
  };

  const firstPlayerNumber = firstPlayerMatchup?.playerNumber;
  const secondPlayerNumber = secondPlayerMatchup?.playerNumber;
  const firstPlayerName = firstPlayerMatchup?.playerName;
  const secondPlayerName = secondPlayerMatchup?.playerName;

  const updatePlayerScore = (score, playerNumber) => {
    console.log(score, playerNumber, '<<<score');
    playerNumber === 'firstPlayer' ? setFirstPlayerScore(score) : null;
    playerNumber === 'secondPlayer' ? setSecondPlayerScore(score) : null;
  };
  const updatePlayerRank = (rank, playerNumber) => {
    console.log(rank, playerNumber, '<<<rank');
    playerNumber === 'firstPlayer' ? setFirstPlayerRank(rank) : null;
    playerNumber === 'secondPlayer' ? setSecondPlayerRank(rank) : null;
  };

  return (
    <div className='match-card'>
      Match {index + 1}:
      <div>
        <div className='player-card'>
          {getPlayerAvatar(firstPlayerNumber)} {firstPlayerName}
          {getScoringSystemInput(upperScoreInputClass, 'firstPlayer')}
        </div>
        <div className='player-card'>
          {getPlayerAvatar(secondPlayerNumber)} {secondPlayerName}
          {getScoringSystemInput(lowerScoreInputClass, 'secondPlayer')}
        </div>
      </div>
    </div>
  );
};