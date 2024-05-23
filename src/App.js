import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import Login from "./Login";
import { auth } from './firebase';
import './App.css';
import {onAuthStateChanged} from 'firebase/auth'


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }));
      } else {
        dispatch(logout());
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img
          className='app__logo'
          src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt="" />

          <div className='app__body'>
            <div className='app__bodyBackground'>
            <Routes>
              <Route path="/chats/view" element={<ChatView />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/preview" element={<Preview />} />
              <Route exact path="/" element={<WebcamCapture />} />
            </Routes>
              </div>
            
          </div>
          </>
          
        )}
      </Router>
    </div>
   
  );
}

export default App;
