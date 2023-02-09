import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../supabase";
import { removeUser } from "../../redux/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          {user?.user_metadata?.roles == "User" ||
          user?.user_metadata?.roles == "Admin" ||
          user?.user_metadata?.roles == "Public" ? (
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
          ) : (
            <div> </div>
          )}
          {user?.user_metadata?.roles == "User" ||
          user?.user_metadata?.roles == "Admin" ? (
            <li className="nav-items">
              <Link
                to="/user"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Users
              </Link>
            </li>
          ) : (
            <div> </div>
          )}

          <li className="nav-items">
            {user ? <li>@{user.email.slice(0, 6)}</li> : <div></div>}
          </li>

          {user ? (
            <li className="nav-items">
              <button onClick={signOut}>sign out</button>
            </li>
          ) : (
            <li className="nav-items">
              <button onClick={() => setIsOpen(true)}>Login</button>
            </li>
          )}
          <Login isOpen={isOpen} setIsOpen={setIsOpen} />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
