import './Ielts.css';
import Counter from './Counter';

let scores = [
    {score: 7, name: "Listening", half: true},
    {score: 7, name: "Reading", half: false},
    {score: 6, name: "Writing", half: true},
    {score: 7, name: "Speaking", half: false},
]

const Ielts = () => {
  return (
    <div className='Ielts'>
        <h1 data-aos="fade-up">IELTS</h1>
        <h2><i data-aos="flip-left">7</i> Overall</h2>
        <div className="scoreContainer">
            {scores.map((x, i) => {
                return(
                    <div className="score" key={i}>
                        <Counter num={x.score} half={x.half} />
                        <h4>{x.name}</h4>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Ielts;