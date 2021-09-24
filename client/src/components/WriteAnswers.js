import React, { useContext, useEffect, useState } from "react";
import "../styles/writeAnswer.css";
import AuthContext from "../context/authContext";
import avatar from "../assets/img_avatar.png";
import axios from "axios";
const initialState = {
  answer: "",
};
function WriteAnswers() {
  const { userName, getLoggedIn } = useContext(AuthContext);
  const [post, setPost] = useState(initialState);
  const [response, setResponse] = useState("");
  const handleAnswerSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('clclcl');
      const res = await axios.post(
        "http://localhost:3001/post/addAnswer",
        post
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setResponse("sorry for inconvinience, try again later");
      setTimeout(() => {
        setResponse(null);
      }, 2000);
    }
  };
  return (
    <div>
      <div className="conatiner" style={{ padding: 20 }}>
        <div className="card">
          <div className="card-head">
            <h4>
              <i className="fa fa-star pr-2" />
              Questions for you
            </h4>
            
          </div>
          <hr />
          <div>
            <div className="card-body" id="question">
              <div className="question">
                <a href style={{ color: "black" }}>
                  <p className>
                    How do I make a blank page open when a link is clicked in
                    HTML?
                  </p>
                </a>
                {/* <span class="close">&times;</span> */}
              </div>
            </div>
            {/* <div id="undo">
      <button onclick="showclose()" style="margin-right: 16px">
        Undo
      </button>
    </div> */}
            <div className="card-content">
              <a href style={{ marginRight: 5 }}>
                No answer yet.
              </a>
              <p>Last followed timestamp</p>
            </div>
            <div className="card-footer">
              <div className="d-flex">
                <div className="col-6">
                  <button type="button" onclick="showeditor()">
                    <i className="fa fa-edit">Answers</i>
                  </button>
                  <button type="button">
                    <i className="fa fa-rss">Follow</i>
                  </button>
                </div>
                <div className="col-6 share">
                  <div className="dropdown" style={{ justifyContent: "right" }}>
                    <button className="dropbtn">
                      <i className="fa fa-share" />
                    </button>
                    <div className="dropdown-content">
                      <a href="#">
                        <i className="fa fa-facebook pr-3" />
                        facebook
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter pr-3" />
                        twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div id="editor_div">
                <div className="row p-2">
                  <img
                    src={avatar}
                    alt
                    style={{ borderRadius: "50%", height: 40 }}
                  />
                  <a href className="pl-3" style={{ marginTop: 10 }}>
                    {userName}
                  </a>
                </div>
                <textarea
                  id="text_editor"
                  placeholder="write your Answer Here "
                  name="text_editor"
                  defaultValue={""}
                  value={post.answer}
                  onChange={(e) => setPost({ answer: e.target.value })}
                />
                <div className="row">
                  <button onclick={handleAnswerSubmit} type="submit" style={{ margin: 10 }}>

                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteAnswers;
