import React,{useContext, useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css'
import AuthContext from "../context/authContext";
import avatar from "../assets/img_avatar.png";
import axios from "axios";
import { useHistory } from "react-router";
const initialState = {
  question:''
};
function Modal() {
    const { userName, getLoggedIn } = useContext(AuthContext);
    const [question,setQuestion] = useState(initialState)
     const [response, setResponse] = useState("");
     const history = useHistory();
     useEffect(() => {
       return () => {
         setQuestion(initialState);
         setResponse(""); // This worked for me
       };
     }, []);
     const handleQuestionSubmit = async (e) =>{
       try {
         e.preventDefault();
         const res = await axios.post(
           "http://localhost:3001/post/addQuestion",
           question
         );
         console.log(res.data);
         setResponse(res.data.msg);
         setTimeout(() => {
           setResponse(null);
         }, 1000);
         setQuestion("");
         if (res.data.added) {
           setTimeout(() => {
             history.push("/");
           }, 1000);
         }
       } catch (err) {
         console.log(err);
         setResponse("sorry for inconvinience, try again later");
         setTimeout(() => {
           setResponse(null);
         }, 2000);
       }
     }
    return (
      <div>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <NavLink to="/" className="close">
                ×
              </NavLink>
              <h2>Add question</h2>
            </div>
            <div className="modal-body">
              <div className="row">
                <a href>
                  {" "}
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="avatar"
                  />
                </a>
                <p style={{ float: "left", marginTop: 25 }}>{userName}</p>
                <button style={{ float: "left", marginTop: 20 }}>Public</button>
              </div>
              <div className="text">
                <textarea
                  name="addquestion"
                  id
                  cols={30}
                  rows={10}
                  placeholder="Start your questions with what, How, why, etc."
                  style={{ width: "100%", outline: "none" }}
                  value={question.question}
                  onChange={(e)=>setQuestion({question:e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
               <NavLink to='/' >Cancel</NavLink>
              <button onClick={handleQuestionSubmit} type="submit">Add question</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal
