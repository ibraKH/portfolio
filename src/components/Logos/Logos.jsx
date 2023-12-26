import "./Logos.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


let imagesRow1 = [
  'arduino.svg','cpp.svg','express.svg','firebase.svg','github.svg','javascript.svg',
  'mysql.svg','npm.svg','python.svg','svelte.svg'
]

let imagesRow2 = [
  'angular.svg','aws.svg','css.svg','figma.svg','git.svg','html.svg',
  'nodejs.svg','postgresql.svg','react.svg','typescript.svg'
]

const Logos = ({arr = []}) => {
    if(arr.length === 4){
      imagesRow1 = arr[0];
      imagesRow2 = arr[1];
   }
    const settingsToLeft = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        pauseOnHover: false,
        responsive: [
          {
              breakpoint: 900,
              settings: {
                  slidesToShow: 6,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1
              }
          },
          {
            breakpoint: 400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }
      ]
    }
    const settingsToRight = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1500,
      arrows: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 1,
      pauseOnHover: false,
      rtl: true,
      responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
          breakpoint: 400,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 1
          }
      }
    ]
  }
  return (
    <div className='logosContainer'>
        <div>
            <Slider {...settingsToLeft} className='sliderImagesContainer'>
              {imagesRow1.map((x,i) => {
                return (
                  <div className="logoImgContainer" key={i}>
                  <img src={"/images/icons/" + x} alt={x.split('.')[0]} className="LogosImg" />
                  </div>
                )
              })}
            </Slider>
            <Slider {...settingsToRight} className='sliderImagesContainer'>
              {imagesRow2.map((x,i) => {
               return (
                  <div className="logoImgContainer" key={i}>
                    <img src={"/images/icons/" + x} alt={x.split('.')[0]} className="LogosImg" />
                  </div>
                )
              })}
            </Slider>
          </div>
    </div>
  );
}

export default Logos;