import Typewriter from 'typewriter-effect';
import './Typer.css'

const Typer = ({ words }) => {
  return (
    <div className='typer'>
        <Typewriter

        options={{
            strings: words,
            autoStart: true,
            loop: true,
        }}
        
        onInit={(typewriter)=> {

        typewriter
        
        
        .deleteAll()
        .start();
        }}
        />
    </div>
  )
}

export default Typer;