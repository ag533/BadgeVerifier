import styled from "styled-components";

const ButtonStyle = `outline: 0;
cursor: pointer;
margin: 5px 10px;
padding: 15px;
border-radius: 50px;
min-width: 160px;
font-size: calc(4px + 2vmin);
background-color: #e1ab2c;
font-weight: 700;
color: #191c22;
justify-content: center;
align-items: center;
display: flex;
&:hover {
  background-color: #191c22;
  color: #e1ab2c;
  cursor: pointer;
}`;

export const LinkButton = styled.a`
  ${ButtonStyle}
`;

export const LabelButton = styled.label`
  ${ButtonStyle}
`;
