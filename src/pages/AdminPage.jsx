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
      navigate("/");
    }
  }, []);

  return (
    <div className="cars">
      <Link to="/admin/add">
        <Button variant="outlined" color="info">
          Добавить продукт
        </Button>
      </Link>
      <MediaCard />
    </div>
  );
};

export default AdminPage;
