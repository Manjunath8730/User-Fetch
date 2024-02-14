import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import "./FetchUser.css";

interface UserData {
  name: { title: string; first: string; last: string };
  email: string;
}

const FetchUser: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const { name, email } = response.data.results[0];
      const userData = { name, email };
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return (
    <div className="container">
      <div className="content">
        <Typography variant="h4" gutterBottom>
          User Information
        </Typography>
        {userData && (
          <div className="details">
            <Typography variant="body1">
              <strong>Name:</strong> {userData.name.first} {userData.name.last}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {userData.email}
            </Typography>
          </div>
        )}
        <Button
          variant="contained"
          onClick={refreshData}
          className="refresh-button"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default FetchUser;
