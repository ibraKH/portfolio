import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';



const Counter = ({num, half}) => {
  return (
    <>
        <CountUp end={num} duration={3} redraw={true}>
        {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
                <h3>
                    <span ref={countUpRef} />{half ? ".5" : ""}
                </h3>
            </VisibilitySensor>
        )}
        </CountUp>
    </>
  )
}

export default Counter;