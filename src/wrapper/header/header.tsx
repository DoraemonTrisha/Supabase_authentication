"use client";
import { useState } from "react";
import { Button, AppBar, Toolbar, IconButton, Typography, Drawer } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context"; 

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); 
  const router = useRouter();
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    logout(); 
    router.push("/login"); 
  };

  const handleLogin = () => {
    router.push("/login"); 
  };

  const handleRegister = () => {
    router.push("/register"); 
  };

  return (
    <AppBar position="sticky" className="bg-gradient-to-r from-blue-500 to-indigo-600">
      <Toolbar>
        <IconButton edge="start" className="lg:hidden" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="flex-1" onClick={() => router.push("/")}>
          MyApp
        </Typography>

        <div className="hidden lg:flex space-x-6">
          <Button color="inherit" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push("/about")}>
            About
          </Button>

          {/* Conditional rendering based on auth state from context */}
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => router.push("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                <ExitToApp />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>
                <AccountCircle />
                Login
              </Button>
              <Button color="inherit" onClick={handleRegister}>
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div className="flex flex-col p-4 space-y-4 w-64">
          <Button onClick={() => router.push("/")} color="primary">
            Home
          </Button>
          <Button onClick={() => router.push("/about")} color="primary">
            About
          </Button>

          {/* Conditional rendering based on auth state from context */}
          {isAuthenticated ? (
            <>
              <Button onClick={() => router.push("/profile")} color="primary">
                Profile
              </Button>
              <Button onClick={handleLogout} color="primary">
                <ExitToApp />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin} color="primary">
                <AccountCircle />
                Login
              </Button>
              <Button onClick={handleRegister} color="primary">
                Register
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
