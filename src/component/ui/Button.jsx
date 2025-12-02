import React from "react";
// 외부 CSS 파일 import
import "./Button.css";
// import styled from "styled-components";



function Button(props) {
    const {title, onClick} = props;

    return (
        <button className="styled-button" onClick={onClick}>
            {title || "button"}
        </button>
    );
}
export default Button;