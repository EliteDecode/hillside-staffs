import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/img/logo.png";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <img src={LogoIcon} className="sm:w-[23%] w-[20%] sm:mt-0 mt-5" />
        </div>
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font17 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className=""
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}>
            Home
          </Link>
        </li>
        <li className="semiBold font17 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className=""
            style={{ padding: "10px 15px" }}
            to="services"
            spy={true}
            smooth={true}
            offset={-60}>
            Services
          </Link>
        </li>
        <li className="semiBold font17 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className=""
            style={{ padding: "10px 15px" }}
            to="projects"
            spy={true}
            smooth={true}
            offset={-60}>
            Newsletter
          </Link>
        </li>

        <li className="semiBold font17 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className=""
            style={{ padding: "10px 15px" }}
            to="contact"
            spy={true}
            smooth={true}
            offset={-60}>
            Contact
          </Link>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        <li className="semiBold font17 pointer flexCenter">
          <a
            href="/login"
            className="radius8 bg-[#5e0001] text-white"
            style={{ padding: "10px 15px" }}>
            Log In
          </a>
        </li>
        <li className="semiBold font17 pointer flexCenter">
          <a
            href="/register"
            className="radius8 lightBg"
            style={{ padding: "10px 15px" }}>
            Get Started
          </a>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  background: #fff;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 20px 40px;
  li {
    margin: 20px 0;
  }
`;
