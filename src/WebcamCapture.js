import React, { useCallback, useRef} from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { setCameraImage } from "./features/cameraSlice";
//import { input } from "@testing-library/user-event/dist/cjs/event/input.js";
import './App.css';
import './WebcamCapture.css'

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",

};

function WebcamCapture() {
    const webcamRef = useRef(null)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
        const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('./preview');
        
      }, [webcamRef]);

    return ( 
    <div className="webcamCapture">
           <Webcam 
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                width={videoConstraints.width}
                videoConstraints={videoConstraints}

           />
               
      <RadioButtonUncheckedIcon  onClick={capture}
          className="webcamCapture__Button"
         
         
         fontSize="large"
      />

  
    </div>);
}
export default WebcamCapture;