import { listOfColours } from '../components/ListOfPlayerColours';
import { Avatar } from 'antd';

export const getPlayerAvatar = (playerId) => {
  return (
    <Avatar
      shape='square'
      size='medium'
      style={{
        backgroundColor: listOfColours[playerId],
        borderWidth: '0.5px',
        border: 'solid',
        borderColor: 'grey'
      }}
    />
  );
};