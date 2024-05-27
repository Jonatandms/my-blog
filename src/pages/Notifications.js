import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const NotificationsContainer = styled.div`
  padding: 2rem;
`;

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/notifications`));
        const notificationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(notificationsData);
      }
    };

    fetchNotifications().catch(error => console.error('Error fetching notifications:', error));
  }, [currentUser]);

  const markAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(db, `users/${currentUser.uid}/notifications`, notificationId);
      await updateDoc(notificationRef, { read: true });
      setNotifications(notifications.map(notif => notif.id === notificationId ? { ...notif, read: true } : notif));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <NotificationsContainer>
      <h2>Notifications</h2>
      <List>
        {notifications.map(notification => (
          <ListItem key={notification.id} disableGutters>
            <ListItemText
              primary={notification.message}
              secondary={notification.timestamp.toDate().toLocaleString()}
              style={{ textDecoration: notification.read ? 'line-through' : 'none' }}
            />
            {!notification.read && (
              <Button variant="contained" color="primary" onClick={() => markAsRead(notification.id)}>
                Mark as Read
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </NotificationsContainer>
  );
};

export default Notifications;
