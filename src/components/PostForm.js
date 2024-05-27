import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, addDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImageDropzone = styled.div`
  border: 2px dashed #007bff;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  margin-top: 1rem;
`;

const PostForm = ({ postId, onPostSaved }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [format, setFormat] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    if (postId) {
      setIsEditing(true);
      const fetchPost = async () => {
        try {
          const postRef = doc(db, 'posts', postId);
          const postSnap = await getDoc(postRef);
          if (postSnap.exists()) {
            const postData = postSnap.data();
            setTitle(postData.title);
            setContent(postData.content);
            setFormat(postData.format);
            setFeaturedImageUrl(postData.featuredImage);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFeaturedImage(file);
      setFeaturedImageUrl(URL.createObjectURL(file));
    },
  });

  const handleContentImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = featuredImageUrl;
    if (featuredImage) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${featuredImage.name}`);
      await uploadBytes(storageRef, featuredImage);
      imageUrl = await getDownloadURL(storageRef);
    }

    const postData = {
      title,
      content,
      format,
      featuredImage: imageUrl,
    };

    try {
      if (isEditing) {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, postData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: new Date(),
        });
      }
      onPostSaved();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={PostForm.modules}
        formats={PostForm.formats}
        placeholder="Write something amazing..."
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={(input) => (input && input.setAttribute('id', 'upload-image'))}
        onChange={handleContentImageUpload}
      />
      <Button variant="outlined" onClick={() => document.getElementById('upload-image').click()}>
        Insert Image
      </Button>
      <FormControl variant="outlined">
        <InputLabel>Format</InputLabel>
        <Select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          label="Format"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="markdown">Markdown</MenuItem>
          <MenuItem value="code">Code</MenuItem>
        </Select>
      </FormControl>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <ImageDropzone>
          {featuredImageUrl ? (
            <PreviewImage src={featuredImageUrl} alt="Featured" />
          ) : (
            <p>Drag 'n' drop a featured image, or click to select one</p>
          )}
        </ImageDropzone>
      </div>
      <Button type="submit" variant="contained" color="primary">
        {isEditing ? 'Update Post' : 'Save Post'}
      </Button>
    </FormContainer>
  );
};

// Configuración de Quill
PostForm.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

PostForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default PostForm;
