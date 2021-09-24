import "../styles/contact.css";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import axios from "axios";
const initialState = { name: "", email: "", mobile: "", message: "" };
function Contact() {
  const { loggedIn, getLoggedIn, userName } = useContext(AuthContext);
  const [post, setPost] = useState(initialState);
  const [response, setResponse] = useState("");
  useEffect(() => {
    return () => {
      setPost({});
      setResponse(""); // This worked for me
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/contact", post)
      .then((res) => {
        console.log(res);
        setResponse(res.data.msg);
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setResponse(err);
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      });
    setPost(initialState);
  };
  return (
    <div className="contact-box">
      <form onSubmit={handleSubmit}>
        <h2>CONTACT US</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Your Name"
          value={post.name}
          onChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <input
          type="email"
          className="input-field"
          placeholder="Your Email"
          value={post.email}
          onChange={(e) => setPost({ ...post, email: e.target.value })}
        />
        <input
          type="text"
          name="mobile"
          className="input-field"
          placeholder="Your Mobile Number"
          value={post.mobile}
          onChange={(e) => setPost({ ...post, mobile: e.target.value })}
        />
        <textarea
          name="text"
          id="textarea-field"
          cols={30}
          rows={10}
          placeholder="Your Message"
          defaultValue={""}
          value={post.message}
          onChange={(e) => setPost({ ...post, message: e.target.value })}
        />
        <input type="submit" value="" className="btn" />
      </form>
    </div>
  );
}

export default Contact;
