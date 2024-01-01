import './Blogs.css';
import Typer from '../Typer/Typer.jsx';

const Blog = () => {
  return (
    <div className='blogDetails'>
        <div className="blogText">
          <h1>IBRA - Blog</h1>
          <Typer words={["Stay tuned!", "Coming soon!"]} />
        </div>
    </div>
  )
}

export default Blog