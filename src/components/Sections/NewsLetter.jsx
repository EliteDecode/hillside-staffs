import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import AddImage2 from "../../assets/img/request.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Newsletter() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <Wrapper id="newsletter">
      <div className="lightBg sm:mt-72 mt-0">
        <div className="container">
          <Advertising className="flexSpaceCenter2">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img className="radius8" src={AddImage2} alt="add" />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">Stay Informed Firsthand</h4>
              <h2 className="font40 extraBold">Newsletter Updates</h2>
              <p className="font14">
                Keep yourself updated with the latest news and important
                announcements by subscribing to our staff newsletter. We provide
                firsthand information to ensure you stay informed about
                developments, events, and opportunities within our community.
                Join our newsletter to stay connected and engaged.
              </p>

              {user ? (
                <Link to="/dashboard">
                  <ButtonsRow
                    className="flexNullCenter"
                    style={{ margin: "30px 0" }}>
                    <div style={{ width: "190px" }}>
                      <FullButton title=" Subscription Active" />
                    </div>
                  </ButtonsRow>
                </Link>
              ) : (
                <Link to="/login">
                  <ButtonsRow
                    className="flexNullCenter"
                    style={{ margin: "30px 0" }}>
                    <div style={{ width: "190px" }}>
                      <FullButton title="Sign Up Now" border />
                    </div>
                  </ButtonsRow>
                </Link>
              )}
            </AddRight>
          </Advertising>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
