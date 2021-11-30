import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router";
import { userContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { Logout, ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { authContext } from "../contexts/AuthContext";
import SignUpModal from "./auth/SignUpModal";
import SignInModal from "./auth/SignInModal";
// import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Logo from "../image/Logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center"  ,
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  let uuId = localStorage.getItem("uuId");
  const navigate = useNavigate();
  
  const { getRooms, roomsCountInCart } = React.useContext(userContext);
  const { user, logOut, adminEmail } = React.useContext(authContext);
  let obj = new URLSearchParams(window.location.search)
  function filterRooms (key, value){
    obj.set(key, value)
    let newUrl = `${window.location.pathname}?${obj.toString()}`
    navigate(newUrl)
    getRooms()
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = React.useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
      <MenuItem onClick={handleMenuClose}>Мой аккаунт</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      
      
        <IconButton size="large" aria-label="countCart" color="inherit">
          <Badge badgeContent={roomsCountInCart} color="error">
            <BookmarksIcon />
            
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem></MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      
    </Menu>
    
  );
  let profile;
  if (user) {
    profile = (
      <Button onClick={() => logOut()}>LOGOUT</Button>
    );
  } else {
    profile = (
      <>
        <Button
          color="inherit"
          onClick={handleShowLogin}
          style={{
            fontFamily: "Francois One, sans-serif",
            letterSpacing: "1px",
            fontSize: "16px",
          }}
        >
          Sign In
        </Button>
        <Button
          color="inherit"
          onClick={handleShow}
          style={{
            fontFamily: "Francois One, sans-serif",
            letterSpacing: "1px",
            fontSize: "16px",
          }}
        >
          Sign Up
        </Button>
      </>
    );
  }

  let temp;
  if (user.email === adminEmail) {
    temp = (
      <Link to="/admin">
        <Button variant="contained">Admin</Button>
      </Link>
    );
  }

  return (
    <Box className="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={() => {
              navigate("/");
              getRooms();
            }}
          >
            <img
              className="logo"
              style={{ width: "190px" }}
              src={Logo}
              alt=""
            />
          </Typography>

          <Search>
            <SearchIconWrapper>
              <ScreenSearchDesktopOutlinedIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => filterRooms("q", e.target.value)}
            />
          </Search>
          {temp}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/cart">
              <IconButton size="large" aria-label="countCart" color="inherit">
                <Badge badgeContent={roomsCountInCart} color="error">
                  <BookmarksIcon style={{ color: "#0a2ea3" }} />
                </Badge>
              </IconButton>
            </Link>
            {profile}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <SignUpModal handleClose={handleClose} show={show} />
      <SignInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
    </Box>
  );
}
