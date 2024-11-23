import React from "react";
import { useState } from "react";
import "./blogForm.css";
import { useRef } from "react"; //to bring cursor to title after form submit
import { useEffect } from "react";

import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import db from "../../firebaseinit";

// import { useReducer } from "react";

export default function UpperSection({ blogs, addBlog }) {

    // const [title, setTitle] = useState("");

    const [formData, setFormData] = useState({ title:"", content:""});
    const titleRef = useRef(null);

    useEffect(() => {
      titleRef.current.focus();
      document.title = titleRef.current.value;
    }, [])

    //set title only when blog change and there is something in the blogs array
    useEffect(() => {
      
      if(blogs.length && blogs[0].title ) {  
          document.title=blogs[0].title;
        } else {
          document.title="No title specified";
        }

    }, [blogs])

    // const [content, setContent] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
  
// Add a new document with a generated id.
      //   const docRef = await addDoc(collection(db, "blogs"), {
      //     name: formData.title,
      //     content: formData.content,
      //     createdOn: new Date(),
      //   });
      // console.log("Document written with ID: ", docRef.id);

      // const docRef = doc(collection(db, "blogs"));
      // await setDoc(docRef, {
      //   name: formData.title,
      //   content: formData.content,
      //   createdOn: new Date()
      // });

      // console.log("document written with id:", docRef.id);

        const newBlog = {
            title: formData.title,
            content: formData.content,
          
          }

        addBlog( newBlog );
        console.log("newBlog: ",newBlog);
        console.log("blog added");
        setFormData( { title:"", content:"" } );
        titleRef.current.focus()
        // setContent("");
    }

    return (
        <>
          <div className="section"> 
            <form className="upperMain" onSubmit={handleSubmit}>          
                <h1 className="mainHeading"> Write a Blog! </h1>
                <div className="inputs">
                  <label htmlFor="title"> Title </label>
                    <input type="text" placeholder="Title" id="title" className="titleInput"
                    ref={titleRef}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title:e.target.value}) }  />
                  <label htmlFor="content"> Content </label>
                  <textarea placeholder="Content" id="Content" className="contentInput"
                    value={formData.content}
                    required
                    //important to keep the precious key values intact when dealing with obejects in setState
                    onChange={(e) => setFormData({ ...formData, content:e.target.value}) }  />
                  <button> Add </button>
                </div>  
              </form>
            </div>
        </> 
    )

}