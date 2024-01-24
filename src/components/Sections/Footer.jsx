import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import LogoIcon from "../../assets/img/logo.png";

export default function Contact() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Wrapper>
      <div className="lightBg text-center">
        <div className="container">
          <InnerWrapper className="" style={{ padding: "30px 0" }}>
            {/* <Link
              className="flexCenter animate pointer"
              to="home"
              smooth={true}
              offset={-80}>
              <img src={LogoIcon} className="sm:w-[23%] w-[20%] sm:mt-0 mt-5" />
            </Link> */}
            <StyleP className="font13">
              © {getCurrentYear()} -{" "}
              <span className="purpleColor font13 cursor-pointer">HUST</span>{" "}
              All Right Reserved
            </StyleP>

            <Link
              className=" animate pointer font13"
              to="home"
              smooth={true}
              offset={-80}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;
