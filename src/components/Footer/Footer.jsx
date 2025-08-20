import './Footer.css';

const Footer = () => {
  return (
    <div className='Footer'>
        <div className="Break">

        </div>
        <div className="FooterContainer">
            <div className="FooterText">
                <h1>
                    Let's collaborate and turn ideas into digital realities. Connect with me today!
                </h1>
            </div>
            <div className="FooterLinks">
                <a href="https://github.com/ibraKH" target="__blank">
                    <img src="/images/Social/Github.svg" alt="Github" className="SocialMediaIcons" />
                </a>
                <a href="https://www.linkedin.com/in/ibrahimalharthi/" target="__blank">
                    <img src="/images/Social/LinkedIn.svg" alt="LinkedIn" className="SocialMediaIcons" />
                </a>
                <a href="https://twitter.com/IGsibra" target="__blank">
                    <img src="/images/Social/X.svg" alt="X" className="SocialMediaIcons" />
                </a>
            </div>
        </div>
        <p>
            © Copyright 2025 - IBRA
        </p>
    </div>
  )
}

export default Footer;