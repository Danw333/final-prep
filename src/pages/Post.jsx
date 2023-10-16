import React, {useEffect, useState}from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Post =() => {
    let navigate = useNavigate()
    const {id} = useParams()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState() // loading state
    const [searchId, setSearchId] = useState(id)
   function onSearch(){
    fetchData(searchId)
}
    useEffect(()=>{
        async function fetchData(userId){
            setLoading (true)
        const {data} = await axios.get (`https://jsonplaceholder.typicode.com/posts?userId =${userId || id}`)
        setPost(data)
        setLoading(false)
        }
        fetchData()
    }, [])
  return (
    <>
  <div className="post__search">
    <button onClick={() =>navigate('/')}>← Back</button> 
    
   
    <div className="post__search--container">
      <label className="post__search--label">Search by Id</label>
      <input
        type="number" value = {searchId} onChange={(e)=>setSearchId(e.target.value)} //search by id
        onKeyPress ={(e)=>{
            if(e.key === 'Enter'){
                onSearch()
            }
        } }/>
      <button onClick = {() => onSearch()} >Enter</button> 
    </div>
  </div>
  {
    loading? new Array (10).fill(0).map((element, index) => ( //skeleton loading state
        <div className="post" key ={index}>
    <div className="post__title">
      <div className="post__title--skeleton"></div>
    </div>
    <div className="post__body">
      <p className="post__body--skeleton"></p>
    </div>
  </div>
    ))
    :(
          post.map(post => (
    <div className="post" key = {post.id}>
    <div className="post__title">{post.title}</div>
    <p className="post__body">{post.body}</p>
  </div>
  ))
)}
  
  
  
</>
    
  )
}

export default Post