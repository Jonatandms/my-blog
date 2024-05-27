import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import { Button, Typography, Box } from '@mui/material';

const UserModerationContainer = styled(Box)`
  padding: 2rem;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const UserModeration = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers().catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <UserModerationContainer>
      <Typography variant="h4" gutterBottom>User Moderation</Typography>
      <UserList>
        {users.map(user => (
          <UserItem key={user.id}>
            <span>{user.name} ({user.email})</span>
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                sx={{ mr: 2 }}
              >
                {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </span>
          </UserItem>
        ))}
      </UserList>
    </UserModerationContainer>
  );
};

export default UserModeration;
