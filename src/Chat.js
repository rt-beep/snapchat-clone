// Chat.js
import React from 'react';
import "./Chat.css";
import { Avatar } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import ReactTimeago from 'react-timeago';
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = async () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            await setDoc(doc(db, 'posts', id), { read: true }, { merge: true }
            
        );

            navigate('/chats/view');
        }
    };

    return (
        <div onClick={open} className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div className='chat__info'>
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view -"}{" "}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>
            {!read && <StopIcon className='chat__readIcon' />}
        </div>
    );
}

export default Chat;
