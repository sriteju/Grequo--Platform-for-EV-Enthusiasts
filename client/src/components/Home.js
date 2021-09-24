import React from "react";
import "../styles/home.css";
import avatar from "../assets/img_avatar.png";
import { NavLink } from "react-router-dom";
function Home({q}) {
  return (
    <div className=" homecontainer">
      <div className="post">
        <div className="post_info ">
          <div className="avatar ">
            <img
              className="image"
              src=" https://png.pngitem.com/pimgs/s/421-4212780_escudo-de-cerro-azul-caete-hd-png-download.png "
              width="60px "
            />
          </div>
          <h5>username</h5>
          <button className="button-1 ">Follow</button>
          <br />
        </div>
        <div className="time_stamp">
          <p>
            {" "}
            Answered by
            <small>name of user </small>. <small>Timestamp</small>
          </p>
        </div>
        <div className="share_icon">
          <i className="material-icons"></i>
          <button className="button-2" type="share">
            {" "}
            share
          </button>
          <NavLink to="/writeAnswer" >Add Answer</NavLink>
        </div>
      </div>
      <div className=" post_body ">
        <div className="post_question ">
          <h1> Question:  {q.question}</h1>
        </div>
        <div className="post_answer ">
          <p> </p>
        </div>
      </div>
      <div className="post_image">
        <h2 style={{marginLeft:"20px"}} >Answers:</h2>
        {q.answers.map((ans,inx)=>{
          <h1>{ans}</h1>
        })}
        {/* <img
          src="https://cache.careers360.mobi/media/presets/860X430/presets/860X430/article_images/2020/4/5/what-is-engineering.webp "
          width="100%"
          height="100%"
        /> */}
      </div>
    </div>
  );
}

export default Home;
