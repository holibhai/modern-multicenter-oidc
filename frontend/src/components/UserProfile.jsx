import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserProfile = () => {
  const { isAuthenticated, getBasicUserInfo } = useAuthContext();
  if (!isAuthenticated) return null;

  const user = getBasicUserInfo();

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username || "N/A"}</p>
      <p>name:{user.name}</p>
      <p>contact number:{user.phone}</p>
      <p>country:{user.country}</p>
    </div>
  );
};

export default UserProfile;
