import "./Projects.css";

let projectsArray = [
    {title: "E-commerce website", image: "second.webp", tech: "Nodejs | PostgreSQL | AWS | Angular", link: "https://github.com/ibraKH/fullstack-app"},
    {title: "MLP Model", image: "third.webp", tech: "Python | Pandas | Matplotlib", link: "https://github.com/ibraKH/MLP_model"},
    {title: "Full Stack Map", image: "fourth.webp", tech: "React | Astro | Figma", link: "https://www.ibra.ws/map/"},
    {title: "Image Proccessing", image: "fifth.webp", tech: "Nodejs | Sharp | TypeScript | Jasmine", link: "https://github.com/ibraKH/imageProcessing"},
    {title: "Weather app", image: "sixth.webp", tech: "Nodejs | Weather API", link: "https://github.com/ibraKH/weather-app"},
    {title: "Telegram Bot", image: "first.webp", tech: "Nodejs | Telegram API", link: "https://github.com/ibraKH/telegram-bot"}
];

const Projects = () => {
  return (
    <div className="ProjectsContainer">
        <h1 className="ProjectsTitle" data-aos="fade-down">Projects</h1>
        <div className='CardsContainer'>
            {projectsArray.map((x,i) => {
                return (
                    <div className="card" data-aos="fade-up" key={i}>
                        <a href={x.link} target="_blank">
                            <svg fill="none" viewBox="0 0 342 175" height="175" width="342" xmlns="http://www.w3.org/2000/svg" className="background">
                                <path className="CardPathSvg" fill="url(#paint0_linear_103_640)" d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"></path>
                                <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" y2="128" x2="354.142" y1="128" x1="0" id="paint0_linear_103_640">
                                    <stop stopColor="#5936B4"></stop>
                                    <stop stopColor="#362A84" offset="1"></stop>
                                </linearGradient>
                                </defs>
                            </svg>
                            <div className="cardImage">
                                <img src={"/images/Projects/" + x.image} alt="Project image" />
                            </div>
                            <div className="cardText">
                                <h2 className="CardTextTitle">{x.title}</h2>
                                <p className="CardTextTechs">{x.tech}</p>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
        <a href="https://github.com/ibraKH" target="_blank" className="LinkToGithubProjects" data-aos="flip-left">
            <div className='MoreButton'>
                <img src="/images/icons/github.svg" alt="github" className='MoreInGithub' />
                <img src="/images/icons/github-yellow.svg" alt="github" className='MoreInGithubYellow' />
            </div>
        </a>
    </div>
    
  )
}

export default Projects;