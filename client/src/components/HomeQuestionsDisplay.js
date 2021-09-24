import React, { useEffect, useState } from 'react'
import axios from "axios";
import Home from './Home';
function HomeQuestionsDisplay() {
    const [questions , setQuestions] = useState([])
     const [response, setResponse] = useState("");

    const getQuestions = async ()=>{
        try{
        const res =await axios.get("http://localhost:3001/post/getQuestions");
            setQuestions(res.data.posts)
        }catch (err) {
         console.log(err);
         setResponse("sorry for inconvinience, try again later");
         setTimeout(() => {
           setResponse(null);
         }, 2000);
    }
}
    useEffect(()=>{
        getQuestions()
    },[])
    return (
        <div>
            {questions.map((q,index)=> <Home key={index}  q = {q} /> )  }
        </div>
    )

}

export default HomeQuestionsDisplay
