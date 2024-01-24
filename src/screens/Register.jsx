import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../components/Buttons/FullButton";
// Assets
import HeaderImage from "../assets/img/login.jpg";
import QuotesIcon from "../assets/svg/Quotes";
import Dots from "../assets/svg/Dots";
import { Box } from "@mui/material";
import TopNavbar from "../components/Nav/TopNavbar";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";

export default function Register() {
  return (
    <>
      <TopNavbar path="" />
      <Box className="mt-10">
        <Wrapper id="home" className="container flexSpaceCenter">
          <LeftSide2 className="flexCenter">
            <RegisterForm />
          </LeftSide2>
          <RightSide2>
            <ImageWrapper>
              <Img
                className="radius8"
                src={HeaderImage}
                alt="office"
                style={{ zIndex: 9, width: "70%" }}
              />
              <QuoteWrapper className="flexCenter darkBg radius8">
                <QuotesWrapper>
                  <QuotesIcon />
                </QuotesWrapper>
                <div>
                  <p className="font15 whiteColor">
                    <em>
                      To be a prestigious international university that
                      champions innovation, self -reliance, and the development
                      of culturally savvy and disciplined researchers and
                      products.
                    </em>
                  </p>
                  <p
                    className="font13 orangeColor textRight"
                    style={{ marginTop: "10px" }}>
                    Our Vission
                  </p>
                </div>
              </QuoteWrapper>
              <DotsWrapper>
                <Dots />
              </DotsWrapper>
            </ImageWrapper>
            <GreyDiv className="lightBg"></GreyDiv>
          </RightSide2>
        </Wrapper>
      </Box>
    </>
  );
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;

const LeftSide2 = styled.div`
  width: 60%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide2 = styled.div`
  width: 40%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;
