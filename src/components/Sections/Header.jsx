import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/staff.jpg";
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box className="mt-10">
      <Wrapper id="home" className="container flexSpaceCenter">
        <LeftSide className="flexCenter">
          <div className="mt-10">
            <Typography
              variant="span"
              sx={{
                fontSize: "45px",
                fontWeight: "bolder",
                color: "#0b093b",
                marginTop: -15,

                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "33px",
                },
              }}>
              HUST Staff Information Desk
            </Typography>
            <HeaderP className="font16 semiBold">
              Empowering HUST Staff: Your Premier Destination for First-Point
              Information and Service Requests - Where Your Needs are Heard and
              Solutions Begin.
            </HeaderP>
            <Link to="/login">
              <BtnWrapper>
                <FullButton title="Get Started" />
              </BtnWrapper>
            </Link>
          </div>
        </LeftSide>
        <RightSide>
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
                    Dedicated to Excellence in Education, Inspiring a Passion
                    for Learning and Building a Foundation for Success
                  </em>
                </p>
                <p
                  className="font13 orangeColor textRight"
                  style={{ marginTop: "10px" }}>
                  Our Mission
                </p>
              </div>
            </QuoteWrapper>
            <DotsWrapper>
              <Dots />
            </DotsWrapper>
          </ImageWrapper>
          <GreyDiv className="lightBg"></GreyDiv>
        </RightSide>
      </Wrapper>
    </Box>
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
