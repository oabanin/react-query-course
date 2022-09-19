import {useQuery, useMutation} from 'react-query'
import {fetchPosts} from "./Posts";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
    const updateMutation = useMutation((postId)=>updatePost(postId));

    const deleteMutation = useMutation((postId)=>deletePost(postId));
    const {data,isLoading, isError} = useQuery(['comments', post.id], ()=>fetchComments(post.id), {enabled:!!post.id});

  if(isLoading) return <>Loading</>
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>


        <button onClick={()=>updateMutation.mutate(post.id)}>Update title</button>
        {deleteMutation.isError && <p style={{color:"red"}}>Error</p>}
        {deleteMutation.isLoading && <p style={{color:"purple"}}>Loading</p>}
        {deleteMutation.isSuccess && <p style={{color:"green"}}>Succes</p>}

        <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
