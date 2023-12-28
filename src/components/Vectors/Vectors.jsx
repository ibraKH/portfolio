import './Vectors.css';

const Vectors = () => {
  return (
    <>
        <div className="RightVector" data-aos="fade-left">
			<div className="circularMovement"></div>
		</div>
		<div className="LeftVector" data-aos="fade-right">
			<div className="circularMovement circularMovementL"></div>
		</div>
		<div id="stars"></div>
		<div id="stars2"></div>
    </>
  )
}

export default Vectors;