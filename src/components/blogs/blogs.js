import React from "react";
import "./blogs.css";
import {collection, query, where, getDocs} from "firebase/firestore";

export default function BlogsList( props ) {
// console.log("blogs", typeof(blogs));
console.log("props", props);
console.log( "blogs proto" ,props.blogs.__proto__);
if( props.blogs.length === 0 ) {
    return(
        <div className="mainBlogsContainer" >
            <h1> No Blogs </h1>
        </div>
    );
}
    return(
        <div className="mainBlogsContainer" >
            <h1> Blogs </h1>
            {
                // querySnapshot.map((blog) => {
                //     return (
                //         <div key={blog.id} className="blogContainer">
                //             <h2 className="blogHeading"> {blog.title} </h2>
                //             <p className="blogContent" > {blog.content} </p>
                //             <button className="deleteButton" onClick={ () => deleteBlog(blog.id) }> Delete </button>
                //         </div>
                //     )
                // })
                
                props.blogs.map((blog) => (
                    <div key={blog.id} className="blogContainer">
                        <h2 className="blogHeading"> {blog.title} </h2>
                        <p className="blogContent" > {blog.content} </p>
                        <button className="deleteButton" onClick={ () => props.deleteBlog(blog.id) }> Delete </button>
                    </div>
                )
            )
            }
        </ div>

    );

}