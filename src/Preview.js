import React, { useEffect } from 'react';
import "./Preview.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateIcon from '@mui/icons-material/Create';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import NoteIcon from '@mui/icons-material/Note';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { storage, db } from './firebase';
import { selectUser } from './features/appSlice';


function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate('/');
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  }

  const sendPost = () => {
    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);
  
    console.log("Uploading image to storage...");
    uploadString(storageRef, cameraImage, 'data_url')
      .then(() => {
        console.log("Getting download URL...");
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        if (!url) {
          throw new Error('Failed to get download URL');
        }
        console.log("Download URL obtained:", url);
        console.log("Adding post to Firestore...");
        return addDoc(collection(db, 'posts'), {
          imageUrl: url,
          username: user.username || 'REACT9',
          read: false,
          profilePic: user.profilePic || '', // Ensure profilePic is defined or provide a default value
          timestamp: serverTimestamp(),
        });
      })
      .then(() => {
        console.log("Post added successfully, navigating to /chats");
        navigate('/chats');
      })
      .catch((error) => {
        console.error("Error uploading post: ", error);
      });
  };
  
  

  return (
    <div className='preview'>
      <CloseOutlinedIcon onClick={closePreview} className='preview__close' />
      <div className="preview__toolbarRight">
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />        
      </div>        
    </div>
  );
}

export default Preview;