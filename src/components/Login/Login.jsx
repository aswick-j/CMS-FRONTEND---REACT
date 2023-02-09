import React, { useState } from "react";
import "./Login.css";

import { RxCross2 } from "react-icons/rx";

import supabase from "../../supabase";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { removeUser } from "../../redux/userSlice";

const Login = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginType, setLoginType] = useState(true);

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const signup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          roles: role,
        },
      },
    });
    if (data.user) {
      alert("Account Created. Please verify your Email");
    }
    // console.log(data, error);
    alert(error.message);
  };

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
    if (error) {
      alert(error?.message);
      return;
    }
    dispatch(setUser(data.user));
  };

  // const signOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (!error) {
  //     dispatch(removeUser());
  //   }
  // };

  return isOpen ? (
    <div className="__login-overlay">
      <div className="__login-modal">
        <div className="__login-right">
          <div className="__login-inputBox">
            <input
              type="email"
              className="__login-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="__login-inputBox">
            <input
              type="password"
              className="__login-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {!loginType ? (
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  value={role}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Public"}>Public</MenuItem>
                  <MenuItem value={"User"}>User</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : null}

          <button className="__login-btn" onClick={login}>
            Login
          </button>

          {/* {loginType ? (
            <p className="__login-signup" onClick={() => setLoginType(false)}>
              New to CMS? Create an account
            </p>
          ) : (
            <p className="__login-signup" onClick={() => setLoginType(true)}>
              Already an user? Login to an account
            </p>
          )} */}
        </div>
        <div className="__login-close" onClick={() => setIsOpen(false)}>
          <RxCross2 />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Login;
