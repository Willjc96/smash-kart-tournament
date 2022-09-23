import { listOfColours } from '../components/ListOfPlayerColours';
import { Avatar } from 'antd';

export const getPlayerAvatar = (playerId) => {
  return (
    <Avatar
      shape='square'
      size='medium'
      className='avatar-icon'
      style={{
        backgroundColor: listOfColours[playerId],
      }}
    />
  );
};