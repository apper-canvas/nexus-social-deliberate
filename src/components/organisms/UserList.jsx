import React from 'react';
import UserCard from '@/components/molecules/UserCard';

const UserList = ({ users, onFollow }) => {
  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <UserCard key={user.id} user={user} onFollow={onFollow} index={index} />
      ))}
    </div>
  );
};

export default UserList;