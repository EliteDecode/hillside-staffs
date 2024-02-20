import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Grid, Typography, Box } from "@mui/material";
import imglyRemoveBackground from "@imgly/background-removal";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  removeBg,
  reset,
  singleStaff,
  update,
} from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import domtoimage from "dom-to-image";
import ClipLoader from "react-spinners/ClipLoader";

const ViewID = () => {
  const [loading, setLoading] = useState(false);
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const qrCode = `https://online.hust.edu.ng/OESWebApp/images/code/${user?.data?.qrcode}`;
  const img = `https://backend.hust.edu.ng/hust/api/v1/uploads/staffProfile/${user?.data?.profilePicture}`;

  const [loader, setLoader] = useState(false);

  const pdfRef = useRef();

  const downloadPDF = () => {
    const node = pdfRef.current;

    var options = {
      quality: 0.99,
      width: 700,
      height: 700,
    };

    domtoimage.toPng(node, options).then(function (imgData) {
      const pdf = new JsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Create a temporary image element to get its dimensions
      const tempImg = new Image();
      tempImg.src = imgData;
      tempImg.onload = function () {
        const imgWidth = tempImg.width;
        const imgHeight = tempImg.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const newImgWidth = imgWidth * ratio;
        const newImgHeight = imgHeight * ratio;
        const imgX = (pdfWidth - newImgWidth) / 2;
        const imgY = (pdfHeight - newImgHeight) / 2;

        pdf.addImage(imgData, "JPEG", imgX, imgY, newImgWidth, newImgHeight);
        pdf.save("id.pdf");
      };
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    dispatch(singleStaff(user?.data?.id));
  }, []);

  console.log(user);

  return (
    <>
      <Box className="mt-3 sm:mb-48 mb-48">
        {isLoading ? (
          <Card>
            <Card.Body>
              <ClipLoader
                color="#5e0001"
                loading={true}
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                  borderColor: "red",
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Card.Body>{" "}
          </Card>
        ) : (
          <>
            {user?.data?.Approved == 0 ? (
              <Card>
                <Card.Header>
                  {" "}
                  <Link to="/dashboard">
                    <buuton className="py-1 px-6 bg-[#5e0001] rounded-md text-white text-[12px] mt">
                      Go Back
                    </buuton>
                  </Link>
                </Card.Header>
                <Card.Body>
                  <img src={require("../../assets/img/loading.png")} alt="" />
                </Card.Body>
                <Card.Footer>
                  <Typography sx={{ fontSize: "12px" }}>
                    {" "}
                    <span className="text-red-600"> (*)</span> Your ID card is
                    currently undergoing processing. You will receive a
                    notification once it is ready for collection. Thank you for
                    your patience.{" "}
                  </Typography>
                </Card.Footer>
              </Card>
            ) : (
              <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                  <Grid container>
                    <Grid item sm={12} md={12} className=""></Grid>
                    <Grid item sm={12} md={12} className="bg-white">
                      <div
                        id="idpdf"
                        ref={pdfRef}
                        className="bg-white flex items-center justify-center mb-4">
                        <div className=" space-x-4">
                          <Grid container spacing={2}>
                            <Grid item sm={12} md={6} className="bg-white">
                              <div className="idcard border">
                                <div className="faintLogo">
                                  <img
                                    src={require("../../assets/img/faintLogo.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="front">
                                  <div className="header">
                                    <div className="logo">
                                      <img
                                        src={require("../../assets/img/logo.png")}
                                        alt=""
                                      />
                                    </div>
                                    <div className="text">
                                      <h1>
                                        HILLSIDE UNIVERSITY OF SCIENCE &
                                        TECHNOLOGY
                                      </h1>
                                      <h6>Oke-Mesi, Ekiti, Nigeria.</h6>
                                    </div>
                                  </div>
                                  <div className="middle">
                                    <div className="img">
                                      <img src={img} alt="" />
                                    </div>
                                    <div className="staff">
                                      <p>STAFF</p>
                                    </div>
                                  </div>
                                  <div className="details">
                                    <div className="right-details -mt-5">
                                      <div className="names surname ">
                                        <h5>SURNAME</h5>
                                        <h6>{user?.data?.lastname}</h6>
                                      </div>
                                      <div className="names">
                                        <h5>OTHER NAMES</h5>
                                        <h6>{user?.data?.firstname}</h6>
                                      </div>

                                      <div className="namess">
                                        <h5>ID NUMBER</h5>
                                        <h6>{user?.data?.staffId}</h6>
                                      </div>
                                      <div className="namess">
                                        <h5>ISSUED DATE</h5>
                                        <h6> {user?.data?.createdAt}</h6>
                                      </div>
                                      <div className="namess">
                                        <h5>BLOOD GROUP</h5>
                                        <h6> {user?.data?.bloodGroup}</h6>
                                      </div>
                                      <div className="sign">
                                        <h6>.......................</h6>
                                        <h5>Staff Signature</h5>
                                      </div>
                                    </div>
                                    <div className="left-details">
                                      <span className="rotate">
                                        {user?.data?.currentPosition.toUpperCase()}
                                      </span>
                                      <img
                                        src={require("../../assets/img/leaf.png")}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            {/* Back of card */}
                            <Grid item sm={12} md={6} className="bg-white">
                              <div className="flex items-center justify-center relative">
                                <div className="h-[470px] w-[280px] border p-3">
                                  {/* Header */}
                                  <div className="absolute h-[450px] w-[270px] top-[100px]">
                                    <img
                                      src={require("../../assets/img/faintLogo.png")}
                                      alt=""
                                    />
                                  </div>

                                  <div>
                                    <h3 className="text-[12px] font-semibold">
                                      This card is the property of
                                    </h3>
                                    <h3 className="text-[15px] text-[#5e0001] font-bold ">
                                      HILLSIDE UNIVERSITY <br /> OF SCIENCE &
                                      TECHNOLOGY <br />
                                      <span className="font-semibold text-gray-900 text-[15px]">
                                        Oke-Mesi, Ekiti, Nigeria.
                                      </span>
                                    </h3>
                                    <h3 className="text-[12px]  font-semibold">
                                      If found, please return to the above
                                      institution.
                                    </h3>
                                    <h3 className="text-[12px] font-semibold ">
                                      Visit us at www.hust.edu.ng
                                    </h3>
                                  </div>
                                  <div className="">
                                    <h3 className="text-[12px] font-bold mt-4">
                                      Disruptive Innovation Capacity Building
                                      in:
                                    </h3>

                                    <p className="font-semibold text-[13px] -mt-2 ">
                                      <span className="font-black text-black">
                                        S
                                      </span>
                                      ciences/Security
                                    </p>
                                    <p className="font-semibold text-[13px] -mt-4 ">
                                      <span className="text-[#5e0001] font-black">
                                        T
                                      </span>
                                      echnology/Engineering
                                    </p>
                                    <p className="font-semibold text-[13px] -mt-4 ">
                                      <span className="font-black text-[#75a2d6]">
                                        E
                                      </span>
                                      ducation/Environment
                                    </p>
                                    <p className="font-semibold text-[13px] -mt-4 ">
                                      <span className="font-black text-[#677e56]">
                                        A
                                      </span>
                                      gribusiness/Vocational
                                    </p>
                                    <p className="font-semibold text-[13px] -mt-4 ">
                                      <span className="font-black text-[#c1203b]">
                                        M
                                      </span>
                                      edicine/Management
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center w-[100%] mt-2">
                                    <div></div>
                                    <div className="border p-2 bg-[#5e0001] w-[45%] rounded-md">
                                      <img
                                        src={qrCode}
                                        alt=""
                                        className="w-[100%]"
                                      />
                                    </div>
                                  </div>

                                  <div className="sign2">
                                    <h6>.......................</h6>
                                    <h5>President/Vice-Chancellor</h5>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card.Body>
                <Card.Footer>
                  <button
                    className="py-2 px-6 bg-[#5e0001] text-white rounded-md"
                    onClick={downloadPDF}>
                    {loader ? "Please wait" : "Download ID Card"}
                  </button>
                </Card.Footer>
              </Card>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ViewID;
