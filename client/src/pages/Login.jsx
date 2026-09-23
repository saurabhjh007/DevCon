import React from 'react'
import { useState } from 'react'
import axios from "axios";

const Login = () => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
         "http://localhost:3000/api/auth/login",
         {
          email ,
          password
         }
      );
      console.log(response.data);
    }
    catch(error){
      console.log(error.response.data);
    }
  }
  
  return (
    <div>
      <h1>login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit'>Login</button>

      </form>

    </div>
  )
}

export default Login
