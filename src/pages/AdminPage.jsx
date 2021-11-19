import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import MediaCard from "../components/MediaCard";

const AdminPage = () => {
  let navigate = useNavigate();
  let email = localStorage.getItem("email");
  useEffect(() => {
    if (!email || email !== "nochnoibriz@gmail.com") {
      if (!email || email !== "maksatlevsha@gmail.com"){
        if (!email || email !== "sjrjika@gmail.com"){
          navigate("/");
        }
      }
    }
  }, []);

  return (
    <div className="admin-page">
      <div>

      <Link to="/admin/add" style={{textDecoration:"none"}}>
        <Button variant="outlined" color="error" >
          Добавить продукт
        </Button>
      </Link>
      </div>
    <div className="cars">
      <MediaCard />
    </div>
    </div>
  );
};

export default AdminPage;
