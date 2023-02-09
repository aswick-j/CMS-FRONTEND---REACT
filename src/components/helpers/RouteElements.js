import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const USER_TYPES = {
  PUBLIC: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;

export const PublicElement = ({ children }) => {
  return <>{children}</>;
};

export const UseElement = ({ children }) => {
  const user = useSelector((state) => state.userData.user);
  console.log(user?.user_metadata?.roles);

  if (
    user?.user_metadata?.roles === "Admin" ||
    user?.user_metadata?.roles === "User"
  ) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
    // return <div>Oops! You Dont have Access</div>;
  }
};

export const AdminElement = ({ children }) => {
  const user = useSelector((state) => state.userData.user);

  if (user?.user_metadata?.roles === "Admin") {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
    // return <div>Oops! You Dont have Access</div>;
  }
};

export const TaskElement = ({ children }) => {
  const user = useSelector((state) => state.userData.user);

  if (
    user?.user_metadata?.roles === "Admin" ||
    user?.user_metadata?.roles === "User"
  ) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
    // return <div>Oops! You Dont have Access</div>;
  }
};
