import React, { useEffect } from 'react'
import './ChatView.css'
import { useSelector } from 'react-redux'
import { selectSelectedImage } from './features/appSlice'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './CountdownCircleTimer.css'

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage)
    const navigate = useNavigate()

    useEffect(() => {
        if (!selectedImage) {
            exit()
        }
    }, [selectedImage])

    const exit =  () => {
        navigate('/chats')
    }

    return (
        <div className='chatView'>
            <img src={selectedImage} onClick={exit} alt="" />
            <div className='chatVew__timer'>
             <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            className="countdown-timer"
            colors={['#004777']}
        >
            {({ remainingTime }) => {
                if (remainingTime === 0) {
                    exit();
                }

                return <span className="timer-text">{remainingTime}</span>;
            }}
        </CountdownCircleTimer>

            </div>
            
           
        </div>
    )
}

export default ChatView