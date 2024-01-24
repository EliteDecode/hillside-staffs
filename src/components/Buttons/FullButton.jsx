import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}>
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#1d6400" : "#5e0001")};
  background-color: ${(props) => (props.border ? "transparent" : "#5e0001")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#1d6400" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#8c0002")};
    border: 1px solid #5e0001;
    color: ${(props) => (props.border ? "#5e0001" : "#fff")};
  }
`;
