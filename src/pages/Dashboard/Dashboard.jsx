import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom"

//hooks 
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  //post do usuario
  const { documents: posts } = useFetchDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")  

  // if(loading) return <p>Loading...</p>


  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Posts didnt find</p>
          <Link to="/post/create" className="btn">Create your first post</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Title</span>
            <span>Action</span>
          </div>
          {posts && posts.map((post) =>
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">See</Link>
                <Link to={`/post/edit/${post.id}`} className="btn btn-outline">Edit</Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
                  Delete
                </button>
              </div>
            </div>)}
        </>
      )}


    </div>
  )
}

export default Dashboard