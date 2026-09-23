import React from 'react'
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav>
        DevCon

        <div>
            <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
            <Link to="/profile">profile</Link>
        </div>
    </nav>
  );
};

export default navbar;
