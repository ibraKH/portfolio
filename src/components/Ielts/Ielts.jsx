import './Ielts.css';

let scores = [
    {score: 7.5, name: "Listening"},
    {score: 7, name: "Reading"},
    {score: 6.5, name: "Writing"},
    {score: 7, name: "Speaking"},
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
                        <h3 data-aos="flip-left">{x.score}</h3>
                        <h4>{x.name}</h4>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Ielts;