import React from "react";
import styled from "styled-components";
import formImage from "../badge_image.png";
import BadgeUploader from "./BadgeUploader";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 40%;
`;

const FormContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  max-height: 70vh;
`;

const Form = styled.form`
  background-color: #e3e3dc;
`;

const TextInput = styled.input`
  width: 100%;
  margin-bottom: calc(5px + 2vmin);
  border: 1px solid #ccc;
  border-radius: calc(2px + 2vmin);
`;

const Button = styled.button`
  background-color: #e1ab2c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ParaText = styled.p`
  color: black;
  font-weight: 400;
  font-size: calc(10px + 1vmin);
`;

const UploadForm = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src={formImage} alt="Image" />
      </ImageContainer>
      <FormContainer>
        <Form>
          <ParaText>
            Welcome to PlayMakers Avatar Badge Creator!
            <br />
            You can upload your avatar here to create <br />
            your perfect profile badge.
          </ParaText>
          <BadgeUploader />
          <ParaText>
            <b>Pro Tip:</b>&nbsp; Use an Image of 512x512 dimensions to <br />
            get optimal results.
          </ParaText>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default UploadForm;
