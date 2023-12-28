import './Ieee.css';

const Ieee = () => {
  return (
    <div className='IeeeParent'>
        <h1 data-aos="fade-up">IEEE</h1>
        <p className='IeeeDate' data-aos="zoom-in" data-aos-duration="3000">22/23</p>
        <div className="IeeeContainer">
            <div className="IeeeInfo" data-aos="fade-right">
                <h2>IEEE TU Member</h2>
            </div>
            <div className="IeeeInfo IeeeSecond" data-aos="fade-left">
                <h2>IEEEXtreme Competitor</h2>
            </div>
        </div>
    </div>
  )
}

export default Ieee;