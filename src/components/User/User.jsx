import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./user.css";

import { useSelector } from "react-redux";
import CreateUserForm from "./CreateUserForm";

const User = () => {
  const user = useSelector((state) => state.userData.user);

  const [userlist, setUserList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchuser = async () => {
    let { data: userlist, error } = await supabase.from("userlist").select("*");
    setUserList(userlist);
    console.log("USERS========>", userlist);
    console.log("error", error);
  };
  useEffect(() => {
    fetchuser();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", Width: 50 },
    {
      field: "username",
      headerName: "User name",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
    },
    {
      field: "roles",
      headerName: "Role",
      minWidth: 50,
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "date",
      minWidth: 150,
    },
  ];

  return (
    <div>
      <div className="__user-container">
        {user?.user_metadata?.roles == "Admin" ? (
          <button className="__user-btn" onClick={() => setIsOpen(true)}>
            + Create New User
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <CreateUserForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="__user-DGcontainer">
        <Box sx={{ height: 400, width: "70%" }}>
          <DataGrid
            rows={userlist}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </div>
  );
};

export default User;
