import React, { useState } from "react";
import "./user.css";

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

const CreateUserForm = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const CreateUser = async () => {
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
      let name = email.slice(0, 6);
      let dd = 7;
      const { data1, error1 } = await supabase
        .from("userlist")
        .insert([{ dd, name, email, role }]);

      console.log("====", data1);
      console.log("-====", error1);
      alert("Account Created. Please verify your Email");
    } else {
      // console.log(data, error);
      alert(error.message);
    }
  };

  return isOpen ? (
    <div className="__form-overlay">
      <div className="__form-modal">
        <div className="__form-right">
          <div className="__form-inputBox">
            <input
              type="email"
              className="__form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="__form-inputBox">
            <input
              type="password"
              className="__form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div>
            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
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

          <button className="__form-btn" onClick={CreateUser}>
            Create
          </button>
        </div>
        <div className="__form-close" onClick={() => setIsOpen(false)}>
          <RxCross2 />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateUserForm;
