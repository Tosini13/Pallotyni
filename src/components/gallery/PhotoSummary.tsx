import React, { useState } from "react";
import styled from "styled-components";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Photograph } from "../../stores/PhotographsStore";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { GALLERY_PATH } from "../../models/const";

const ImgStyled = styled.img<{ action?: string; hovered?: string }>`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    ${(props) =>
      props.action
        ? `filter: grayscale(1);`
        : `
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translate(-3px, -3px);`}
  }
  ${(props) => (props.hovered ? `filter: grayscale(1);` : ``)}
`;

const ActionButtonStyled = styled.div<{ show?: string }>`
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.show ? `opacity: 1;` : `opacity: 0;`)}
`;

export interface PhotoSummaryProps {
  photo: Photograph;
  edition: boolean;
  removal: boolean;
}

const PhotoSummary: React.FC<PhotoSummaryProps> = ({
  photo,
  edition,
  removal,
}) => {
  const [mouseOverPhoto, setMouseOverPhoto] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseOver={() => setMouseOverPhoto(true)}
        onMouseLeave={() => setMouseOverPhoto(false)}
      >
        <ImgStyled
          src={`${GALLERY_PATH}/${photo.path}`}
          alt={photo.path}
          action={parseStyledBoolean(edition || removal)}
          hovered={parseStyledBoolean((edition || removal) && mouseOverPhoto)}
        />
        {edition ? (
          <ActionButtonStyled show={parseStyledBoolean(mouseOverPhoto)}>
            <EditIcon />
          </ActionButtonStyled>
        ) : null}
        {removal ? (
          <ActionButtonStyled show={parseStyledBoolean(mouseOverPhoto)}>
            <DeleteIcon />
          </ActionButtonStyled>
        ) : null}
      </div>
    </>
  );
};

export default PhotoSummary;
