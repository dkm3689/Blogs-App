// import './App.css';
// import UpperSection from './components/blogForm/blogForm';
// import BlogsList from "./components/blogs/blogs";
// import { useState, useEffect, useRef } from 'react';
// import {getDocs, setDoc, collection, doc, deleteDoc} from "firebase/firestore";
// import db from "./firebaseinit";


// function App() {

//   const [ blogs, setBlogs ] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "blogs"));
//         const blogs = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setBlogs(blogs); // Ensure we're setting resolved data
//          console.log("blogs", blogs);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);


//   const addBlog = async (newBlog) => {

//     try{
//       // const id = Math.random().toString();

//     const docRef = doc(collection(db, "blogs"));
//     await setDoc(docRef, newBlog);
//     } catch (error) {
//         console.error("Error adding document:", error);
//     }

//     // setBlogs([ newBlog, ...blogs]);

//   };


//   const deleteBlog = async (id) => {
//     try {
//       const blogDoc = doc(db, 'blogs', id); // Locate the document in Firestore by ID
//       await deleteDoc(blogDoc); // Delete the document
//       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id)); // Remove the blog from state
//     } catch (error) {
//       console.error('Error deleting blog:', error); // Error handling
//     }
//   };

//   return (
//     <>
//       <UpperSection blogs={blogs} addBlog={addBlog} />
//       {console.log(blogs)}
//       <BlogsList blogs={blogs} deleteBlog={deleteBlog} />
//     </>
//   );
// }

// export default App;


import './App.css';
import UpperSection from './components/blogForm/blogForm';
import BlogsList from "./components/blogs/blogs";
import { useState, useEffect } from 'react';
import { getDocs, setDoc, collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import db from "./firebaseinit";

function App() {
  const [blogs, setBlogs] = useState([]);
  console.log("Blogs", typeof(blogs));

  useEffect(() => {
    console.log("Fetching blogs 81");
    const fetchBlogs = async () => {

      console.log("Fetching before");
      try {
        console.log("fetcing blog");
        // const querySnapshot = await getDocs(collection(db, "blogs"));


        const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
          const blogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
         setBlogs(blogs);
          // toast.success("Blogs retrieved successfully.");
      
        });


        
        // Log querySnapshot to see its structure
        // console.log("QuerySnapshot:", querySnapshot);
        
        // const blogsList = querySnapshot.docs.map((doc) => {
        //   return {
        //     id: doc.id,
        //    ...doc.data(),
        //   }
        // })


        // console.log("blogsList:", blogsList);  // Log the blogsList to confirm it's an array of objects

        // Check if blogsList is an array before setting it
        // if (Array.isArray(blogsList)) {
        //   console.log("Setting blogs state with:", blogsList);
        //   console.log("blog List App", typeof(blogsList), typeof(blogs));

        //   setBlogs(blogsList);  // Set the state with the fetched data
        // } else {
        //   console.error("blogsList is not an array:", blogsList);
        // }

        // console.log("blogsList:", blogsList);
        // setBlogs(blogsList);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Log blogs after state change
  useEffect(() => {
    console.log("Updated blogs state:", blogs);
  }, [blogs]);

  const addBlog = async (newBlog) => {
    try {
      // Firestore auto-generates an ID, so no need to manually generate one
      const docRef = doc(collection(db, "blogs"));
      await setDoc(docRef, newBlog);
      console.log("New blog added:", newBlog);
      
      // You could add the new blog directly to state here:
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };


  const deleteBlog = async (id) => {

    try{
      const docRef = doc(db, "blogs", id); // Locate the document in Firestore by ID
      await deleteDoc(docRef); // Delete the document
      console.log("Blog deleted:", id);
      
      // Update the state after deletion
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error); // Error handling
    }

  }










  // const deleteBlog = async (id) => {
  //   try {
  //     const blogDoc = doc(db, 'blogs', id); // Locate the document in Firestore by ID
  //     await deleteDoc(blogDoc); // Delete the document
  //     console.log("Blog deleted:", id);
      
  //     // Update the state after deletion
  //     setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting blog:', error); // Error handling
  //   }
  // };

  // console.log("blogs App", typeof(blogs));

  return (
    <>
      <UpperSection blogs={blogs} addBlog={addBlog} />
      <BlogsList blogs={blogs} deleteBlog={deleteBlog}/>
    </>
  );
}

export default App;