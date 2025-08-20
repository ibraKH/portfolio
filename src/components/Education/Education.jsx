import './Education.css';
import Typer from '../Typer/Typer.jsx';

const educationArray = [
    {time: "July 18-Aug 23", title: "Bechelor of Computer Engineering", institution: "Taif University", details: ""},
    {time: "Sep 22-Dec 22", title: "Nanodegree in Full Stack JavaScript Developer", institution: "Udacity - MCIT, Online", details: "Mastered Node.js backend development, TypeScript, and API creation with PostgreSQL and Express. Proficient in Angular fundamentals and deployment automation using AWS Elastic Beanstalk and CircleCI."},
    {time: "Current", title: "Master of Machine Learning and Computer Vision", institution: "Australian National University", details: ""}
]

const Education = () => {
  return (
    <div className='Education' data-aos="fade-down">
        <Typer words={["Education", "Certificates", "Qualifications"]} />
        <div className="EducationContainer">
            {educationArray.map((x,i) => {
                return (
                    <div className="EducationCard" key={i}>
                        <div className="EducationCircleContainer">
                            <div className="EducationDate" data-aos="fade-right">
                                <p>{x.time}</p>
                            </div>
                        </div>
                        <div className="EducationRightSection" data-aos="fade-up">
                            <h2>{x.title}</h2>
                            <h3>{x.institution}</h3>
                            <p>{x.details}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Education