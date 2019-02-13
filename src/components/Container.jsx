import React from 'react';
import uuid from 'uuid';
import Friends from './Friends';
import FriendAdder from './FriendAdder';


const initialState = {
  friends: [
    { id: uuid(), name: 'Tom', age: '35' },
    { id: uuid(), name: 'Luke', age: '27' },
  ],
  currentFriendId: null,
};

class Container extends React.Component {
  state = initialState

  addFriend = (name, age) => {
    this.setState(
      st => ({ friends: st.friends.concat({ id: uuid(), name, age }) }),
    );
  }

  updateFriend = (id, name, age) => {
    this.setState(
      st => {
        const otherFriends = st.friends.filter(fr => fr.id !== id);
        return { friends: otherFriends.concat({ id, name, age }) };
      },
    );
  }

  deleteFriend = id => {
    this.setState(
      st => ({ friends: st.friends.filter(fr => fr.id !== id) }),
    );
    this.setCurrentFriend(null);
  }

  setCurrentFriend = id => {
    this.setState({ currentFriendId: id });
  }

  render() {
    const currentFriend = this.state.friends.find(
      fr => fr.id === this.state.currentFriendId,
    );

    return (
      <div className='container'>
        <Friends
          friends={this.state.friends}
          deleteFriend={this.deleteFriend}
          setCurrentFriend={this.setCurrentFriend}
        />

        {
          !this.state.currentFriendId &&
          <FriendAdder
            addFriend={this.addFriend}
          />
        }
        {
          this.state.currentFriendId &&
          <FriendAdder
            currentFriend={currentFriend}
            updateFriend={this.updateFriend}
            setCurrentFriend={this.setCurrentFriend}
          />
        }
      </div>
    );
  }
}

export default Container;
