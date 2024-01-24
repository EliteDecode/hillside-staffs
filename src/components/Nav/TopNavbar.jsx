import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as LinkScroll } from "react-scroll";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/img/logo.png";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TopNavbar({ path }) {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          {path ? (
            <Link to="/" className="pointer flexNullCenter" smooth={true}>
              <img src={LogoIcon} className="sm:w-[23%] w-[20%] " />
            </Link>
          ) : (
            <LinkScroll
              className="pointer flexNullCenter"
              to={"home"}
              smooth={true}>
              <img src={LogoIcon} className="sm:w-[23%] w-[20%] " />
            </LinkScroll>
          )}

          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              {path ? (
                <Link
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px", color: "#000" }}
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Home
                </Link>
              ) : (
                <LinkScroll
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px" }}
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Home
                </LinkScroll>
              )}
            </li>
            <li className="semiBold font15 pointer">
              {path ? (
                <Link
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px", color: "#000" }}
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Services
                </Link>
              ) : (
                <LinkScroll
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px" }}
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Services
                </LinkScroll>
              )}
            </li>
            <li className="semiBold font15 pointer">
              {path ? (
                <Link
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px", color: "#000" }}
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Newsletter
                </Link>
              ) : (
                <LinkScroll
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px" }}
                  to="newsletter"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Newsletter
                </LinkScroll>
              )}
            </li>

            <li className="semiBold font15 pointer">
              {path ? (
                <Link
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px", color: "#000" }}
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Contact
                </Link>
              ) : (
                <LinkScroll
                  activeClass={path === "login" ? "null" : "active"}
                  style={{ padding: "10px 15px" }}
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}>
                  Contact
                </LinkScroll>
              )}
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <>
              {user ? (
                <li className="semiBold font15 pointer text-dark flexCenter">
                  <a
                    href="/dashboard"
                    className="radius8 lightBg"
                    style={{ padding: "10px 15px", color: "#000" }}>
                    Dashboard
                  </a>
                </li>
              ) : (
                <>
                  {path === "login" ? (
                    <li className="semiBold font15 pointer text-dark">
                      <a
                        href="/register"
                        style={{ padding: "10px 30px 10px 0", color: "#000" }}>
                        Register
                      </a>
                    </li>
                  ) : (
                    <li className="semiBold font15 pointer text-dark">
                      <a
                        href="/login"
                        style={{ padding: "10px 30px 10px 0", color: "#000" }}>
                        Log in
                      </a>
                    </li>
                  )}

                  <li className="semiBold font15 pointer text-dark flexCenter">
                    <a
                      href="/register"
                      className="radius8 lightBg"
                      style={{ padding: "10px 15px", color: "#000" }}>
                      Get Started
                    </a>
                  </li>
                </>
              )}
            </>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 50px 0px;
  background: #f7f7f7f;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;

  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
    margin-top: -10px;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
