import { useEffect, useState } from 'react';
import './Preload.css'

const Preload = () => {
    const [showElement,setShowElement] = useState(true)
    useEffect(()=>{
        setTimeout(function() {
        setShowElement(false)
            }, 1200);
        },
    [])

    return (
        <div className={showElement ? 'Preload' : 'Preload hide'}>
            <h1 className="PreloadName">IBRA</h1>
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round" />
                <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round" />
                <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round" />
                <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default Preload;