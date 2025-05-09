import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export function App(){
  const payload = {Name : "rahul"}


  async function post_api_function() {
    const post_api:any = await axios.post("https://jsonplaceholder.typicode.com/users", payload)
    console.log(post_api)
   }
   useEffect(()=> {
    async function get_api_function() {
      const get_api: any = await axios.get("https://jsonplaceholder.typicode.com/users")
      console.log(get_api.data)
  }get_api_function()})
  
  return (
    <>
     <button onClick={post_api_function}>submit</button>  
    </>
  )

}