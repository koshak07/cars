import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MediaCard from "../components/MediaCard";

const AdminPage = () => {
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
