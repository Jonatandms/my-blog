import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const savePost = async (title, content, format, featuredImageUrl) => {
  try {
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      format,
      featuredImage: featuredImageUrl,
      createdAt: serverTimestamp(),
    });
    console.log('Post successfully saved!');
  } catch (error) {
    console.error('Error saving post:', error);
  }
};
