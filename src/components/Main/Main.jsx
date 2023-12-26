import "./Main.css"

const Main = () => {
  return (
    <div id='Main'>
        <div className="MainPicture">
            <div className="MainText">
                <img src="/images/Name.webp" alt="My name" className='MyName' data-aos="fade-down" />
            </div>
            <div className="MainPattern" data-aos="fade-up">
                <img src="/images/MainPattern.webp" alt="Main Pattern" className='pattern' />
                <img src="/images/MyPicture.webp" alt="My Picture" className='pattern' />
            </div>
        </div>
    </div>
  )
}

export default Main;