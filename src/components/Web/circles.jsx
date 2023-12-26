import React, { useEffect, useState } from "react";
import "./Web.css";

import {animate,scroll} from "motion";



const lines = [
    {
        color: "firstColor",
        line: "firstPattern",
        text: "HTML",
    },
    {
        color: "secendColor",
        line: "secendPattern",
        text: "CSS",
    },
    {
        color: "thirdColor",
        line: "thirdPattern",
        text: "JavaScript",
    },
    {
        color: "fourthColor",
        line: "fourthPattern",
        text: "Building Projects 1",
    },
    {
        color: "firstColor",
        line: "firstPattern",
        text: "JS Frameworks",
    },
    {
        color: "secendColor",
        line: "secendPattern",
        text: "CSS Frameworks",
    },
    {
        color: "thirdColor",
        line: "thirdPattern",
        text: "Building Projects 2",
    },
    {
        color: "fourthColor",
        line: "fourthPattern",
        text: "Git",
    },
    {
        color: "firstColor",
        line: "firstPattern",
        text: "NodeJs",
    },
    {
        color: "secendColor",
        line: "secendPattern",
        text: "Express",
    },
    {
        color: "thirdColor",
        line: "thirdPattern",
        text: "SQL",
    },
    {
        color: "fourthColor",
        line: "fourthPattern",
        text: "Final Project",
    }
];
const days = [
    "الأسبوع الأول","الأسبوع الثاني","الأسبوع الثالث","الأسبوع الرابع","الأسبوع الخامس","الأسبوع السادس","الأسبوع السابع","الأسبوع الثامن","الأسبوع التاسع","الأسبوع العاشر","الأسبوع الحادي عشر","الأسبوع الثاني عشر"
]
const Circles = () => {
    const [hide, setHide] = useState(0);
    const [show, setShow] = useState(0);
    const displaying = () => {
        setHide(1);

        const timer = setInterval(() => {
            setHide(0);
            setShow(1);

            clearInterval(timer);
        }, 1000)
    }

    useEffect(() => {
        scroll(animate(".progress", { strokeDasharray: ["0,1", "1,1"] }));
    },[]);
    return(
        <div id="lineContainer" className="en">
            <h1 className="ar sRtl thin"> المسار :</h1>
            <div id="mainCircle" className={show === 0 && hide === 0 ? "pulse-base" : "parentCircle"} onClick={displaying}>
                
            </div>
            <div id="startTheLine" className={hide === 0 ? "hide" : "show"} data-aos="fade-down">
                <h1>Let's Go 🚀</h1>
            </div>
            <div className="startLine fourthPattern">
    
            </div>
            {lines.map((x,i,array) => { 
                return(
                    <div className={"circleContainer "} key={i}>
                        <div className="linesContainer">
                            <div className={"circle" + i + " circles " + x.color}>
                            
                            </div>
                            {i !== array.length - 1 && 
                                <div className={"lines " + x.line}>
    
                                </div>
                            }
                        </div>
                        <div className={(i + 1) % 2 == 0 ? "detailsContainer rightText toRightText" : "detailsContainer leftText"} data-aos="fade-up">
                                <h3 className="ar">: {days[i]}<p className="en detailText">{"\n"}{x.text}</p></h3>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Circles;