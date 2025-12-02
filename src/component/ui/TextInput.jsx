import React from "react";
import "./TextInput.css";
// import styled from "styled-components";

// const StyledTextarea = styled.textarea`
//     width: calc(100% - 32px);
//     ${(props) =>
//         props.height &&
//     `
//     height: ${props.height}px;
// `}
//     padding: 16px;
//     font-size: 16px;
//     line-height: 20px;
//     `;

function TextInput(props) {
    const { height, value, onChange } = props;

    return (
        <textarea
            className="text-input"
            style={height ? { height: `${height}px` } : {}}    //height는 inline-style로 처리해야 동적 제어 가능
            value={value}
            onChange={onChange}
        />
    );
}

export default TextInput;