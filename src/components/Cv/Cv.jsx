import { useRef, useState } from 'react';
import CountUp from 'react-countup';
import './Cv.css'

const Cv = () => {
    const ref = useRef(null);
    const [done, setDone] = useState(false);
    const [image, setImage] = useState('useImage');
    const [showCounter, setShowCounter] = useState('hide');
    
    const downloading = () => {
        setImage('hideImage');
        setShowCounter('showCounter');
        setTimeout(() => {
            if(!done){
                setDone(true);
            }
        }, 2000);

    };

    const download = () => {
        if(done){
            window.open('/SE_ibrahim_alharthi_resume.pdf', "_blank")
        }
    }
  return (
        <div className="CvContainer">
            <h2 data-aos="fade-up">Grab a copy of my CV!</h2>
            <div className="donwloadContainer" onClick={downloading}>
                <img src="/images/download.svg" alt="download" className={image} />
                <a href='/SE_ibrahim_alharthi_resume.pdf' className={'hide'} target='_blank'>
                    <button ref={ref}>Donwload</button>
                </a>
                <div className={done === true ? "wrapper" : 'hide'}>
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <CountUp  className={done === false ? showCounter : showCounter + ' hide'} end={100} duration={1.5} onEnd={download}/>
            </div>  
        </div>      
  );
}

export default Cv;
