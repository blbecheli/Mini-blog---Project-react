//CSS
import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
       <h2>About the Mini <span>Blog</span></h2>
       <p>This is a project developed with React in the Front-End and Firebase in the Back End</p>
       <Link to="/post/create" className="btn">Create a post</Link>
    </div>
  )
}

export default About