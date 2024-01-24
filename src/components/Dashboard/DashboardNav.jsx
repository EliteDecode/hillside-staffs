import { Box, Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/img/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

function NavScrollExample() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar
      expand="lg"
      className="bg-[#fafafa] sticky top-0 z-10"
      style={{ position: "sticky", top: "0px" }}>
      <Box className="container">
        <Navbar.Brand href="/" className="font-bold">
          Staff <span className="text-[#5e0001]">Info-Desk.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link
              href="/dashboard"
              active={location.pathname === "/dashboard" ? true : false}>
              Applications
            </Nav.Link>
            <Nav.Link
              href="/dashboard/id_application"
              active={
                location.pathname === "/dashboard/id_application" ? true : false
              }>
              Staff ID Card
            </Nav.Link>
            <Nav.Link
              href="#action2"
              active={location.pathname.includes("/request") ? true : false}>
              Request
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button
              onClick={handleLogout}
              variant="contained"
              size="medium"
              disableElevation
              sx={{
                background: "#5e0001",
                fontSize: "10px",
                fontWeight: "bold",
                "&:hover": {
                  background: "#5e10001 !important",
                },
              }}
              className="text-[13px]">
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Box>
    </Navbar>
  );
}

export default NavScrollExample;
