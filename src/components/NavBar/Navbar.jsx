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

  let time = new Date().toLocaleTimeString();
  let status = new Date();
  const [currentTime, setCurrentTime] = useState(time);
  const [Greet, setGreeting] = useState("");
  const updateStatus = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
    let s = status.getHours();
    if (s >= 0 && s <= 11) setGreeting("Good Morning");
    else if (s >= 12 && s <= 16) setGreeting("Good Afternoon");
    else if (s > 16 && s <= 20) setGreeting("Good Evening");
    else if (s > 20 && s <= 24) setGreeting("Good Night");
  };

  useEffect(() => {
    const timer = setInterval(updateStatus, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <nav>
        <ul className="nav-list">
          <li className="nav-items">
            <i className="gg-circleci"></i>
          </li>
          {user ? (
            <li className="nav-items" style={{ color: "white" }}>
              {Greet}, {user.email.slice(0, 6)}
            </li>
          ) : (
            <div></div>
          )}
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

          {user ? (
            <li className="nav-items">
              <button className="__nav-btn-signout" onClick={signOut}>
                sign out
              </button>
            </li>
          ) : (
            <li className="nav-items">
              <button
                className="__nav-btn-login"
                onClick={() => setIsOpen(true)}
              >
                Login
              </button>
            </li>
          )}
          <Login isOpen={isOpen} setIsOpen={setIsOpen} />
          <li className="nav-items" style={{ color: "white" }}>
            {currentTime}{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
