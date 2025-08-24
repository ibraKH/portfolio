import "./Main.css"

const Main = () => {
  return (
    <div id='Main'>
        <div className="MainPicture">
            <div className="TextAnimation">
              <img src="/images/vectors/Text.svg" alt="ibrahim portfolio" className="MainTextImage" draggable="false"/>
              <img src="/images/vectors/Dots.svg" alt="Dots" className="MainDots" draggable="false"/>
            </div>
            <div className="scrollArrowContainer">
              <div className="scrollArrow">
                <p>scroll</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Main;