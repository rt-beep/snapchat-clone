import React, { useEffect, useState } from 'react';
import './Chats.css';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Chat from './Chat';
import { db, auth } from './firebase';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Handle case when user is not logged in
            // For example, redirect to login page
            navigate('/login');
            return;
        }

        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        });

        return () => unsubscribe();
    }, [user, navigate]);

    const takeSnap = () => {
        dispatch(resetCameraImage());
        navigate("/");
    };

    if (!user) {
        // If user is null (not logged in), render a loading message or login button
        return <div>Loading...</div>; // Or render a login button
    }

    return (
        <div className='chats'>
            <div className='chats__header'>
                <Avatar 
                    src={user?.profilePic}
                    onClick={() => auth.signOut()}
                    className='chats__avatar' 
                />
                <div className='chats__search'>
                    <SearchIcon className='chats__searchIcon' />
                    <input placeholder='Friends' type='text' />
                </div>
                <ChatBubbleIcon className='chats__chatIcon' />
            </div>

            <div className='chats__posts'>
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat 
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>

            <RadioButtonUncheckedIcon  
                className='chats__takePicIcon'
                onClick={takeSnap}
                fontSize='large'
            /> 
        </div>
    );
}

export default Chats;
