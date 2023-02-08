import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../supabase";
import { removeUser } from "../../redux/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const user = useSelector((state) => state.userData.user);

  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(removeUser());
    }
  };

  return (
    <div>
      <nav>
        <ul className="nav-list">
          <li className="nav-items">
            <i className="gg-circleci"></i>
          </li>
          <li className="nav-items">
            <Link
              to="/"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
            >
              Home
            </Link>
          </li>
          <li className="nav-items">
            <Link
              to="/user"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
            >
              User
            </Link>
          </li>
          <li className="nav-items">
            <Link
              to="/tasks"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
            >
              Tasks
            </Link>
          </li>
          <li className="nav-items">
            <Link
              to="/admin"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
            >
              Admin
            </Link>
          </li>
          <li className="nav-items">
            {user ? (
              <div>
                <h3>@{user.email.slice(0, 6)}</h3>
              </div>
            ) : (
              <div></div>
            )}
          </li>
          <li className="nav-items">
            {user ? (
              <div>
                <button onClick={signOut}>signOut</button>
              </div>
            ) : (
              <button onClick={() => setIsOpen(true)}>Login</button>
            )}
            <Login isOpen={isOpen} setIsOpen={setIsOpen} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
