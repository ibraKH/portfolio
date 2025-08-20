import './Experience.css';
import Typer from '../Typer/Typer.jsx';

const experienceArray = [
    {time: "Dec 22-Apr 23", title: "Freelance Web Developer", institution: "Online, Part-time", details: "Designed & developed a top-ranking website with React, Bootstrap, & Astro. Implemented SEO strategies for high search visibility, optimizing content & aligning goals with marketing strategies."},
    {time: "July 23-Aug 23", title: "Computer Engineer training", institution: "King Fahd Air base, Taif", details: "Trained in switch programming, network configure, telephone lines, and PC maintenance for efficient tech solutions."},
    {time: "Feb 24-Jun 24", title: "Software Engineer Intern", institution: "Nortal", details: "Focused on frontend development using React within an Agile team. Took ownership of implementing user interfaces and ensuring seamless integration with backend services, while collaborating closely with UX/UI designers and product managers."}
]

const Experience = () => {
  return (
    <div className='Experience' data-aos="fade-down">
        <Typer words={["Experience", "Professional Background"]} />
        <div className="ExperienceContainer">
            {experienceArray.map((x,i) => {
                return (
                    <div className="ExperienceCard" key={i}>
                        <div className="ExperienceCircleContainer">
                            <div className="ExperienceDate" data-aos="fade-right">
                                <p>{x.time}</p>
                            </div>
                        </div>
                        <div className="ExperienceRightSection" data-aos="fade-up">
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

export default Experience