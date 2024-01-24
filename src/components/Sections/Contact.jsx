import React from "react";
import styled from "styled-components";
// Assets
import ContactImg1 from "../../assets/img/contact1.jpg";
import ContactImg2 from "../../assets/img/contact3.jpg";
import ContactImg3 from "../../assets/img/contact2.jpg";
import ContactForm from "../Elements/ContactForm";

export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold text-left">
              Encountering Any Challenges?
            </h1>
            <p className="font14 text-left">
              We understand that challenges can arise. Your satisfaction is our
              priority. If you have any concerns, questions, or feedback, please
              don't hesitate to reach out to our dedicated support team. We are
              here to assist you in any way possible, ensuring that your
              experience with us is smooth and enjoyable.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <ContactForm />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
              <div
                style={{ width: "50%" }}
                className="flexNullCenter flexColumn">
                <ContactImgBox>
                  <img src={ContactImg1} alt="office" className="radius6" />
                </ContactImgBox>
                <ContactImgBox>
                  <img src={ContactImg2} alt="office" className="radius6" />
                </ContactImgBox>
              </div>
              <div style={{ width: "50%" }}>
                <div style={{ marginTop: "100px" }}>
                  <img src={ContactImg3} alt="office" className="radius6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #1d6400;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #5e0001;
  background-color: #5e0001;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #8c0002;
    border: 1px solid #8c0002;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px;
  align-self: flex-end;
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;
