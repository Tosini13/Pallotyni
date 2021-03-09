import { useContext, useState } from "react";

import { IconButton, Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { ParagraphStoreContext, TParagraph } from "../../stores/AboutUsStore";
import ParagraphForm from "./ParagraphForm";
import SpeedDialComponent from "../SpeedDial";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";

const HoverStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;
const EditButtonStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.8);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridEditStyled = styled(Grid)<{ edition?: string }>`
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  ${(props) =>
    props.edition
      ? `
      margin-bottom: 5px;
      border-radius: 3px;
      background-color: ${mainTheme.palette.secondary.dark};
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      &:hover{
        cursor: pointer;
      }`
      : ""}
`;

export interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = () => {
  const storeParagraph = useContext(ParagraphStoreContext);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [selectedParagraph, setSelectedParagraph] = useState<
    TParagraph | undefined
  >();
  const actions = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
  ];
  return (
    <>
      <Grid container spacing={3} style={{ position: "relative" }}>
        <Grid item>
          <Typography variant="h4">About us</Typography>
        </Grid>
        <SpeedDialComponent
          actions={actions}
          blocked={Boolean(edition || openForm)}
          unBlock={() => {
            setEdition(false);
            setOpenForm(false);
            setSelectedParagraph(undefined);
          }}
        />
        {storeParagraph.getParagraph().map((paragraph) => (
          <GridEditStyled
            item
            key={paragraph.id}
            edition={parseStyledBoolean(edition)}
            onClick={() => (edition ? setSelectedParagraph(paragraph) : null)}
          >
            {paragraph.title ? (
              <Typography variant="h5">{paragraph.title}</Typography>
            ) : null}
            <Typography>{paragraph.content}</Typography>
            {edition ? (
              <HoverStyled>
                <EditButtonStyled>
                  <EditIcon fontSize="large" />
                </EditButtonStyled>
              </HoverStyled>
            ) : null}
          </GridEditStyled>
        ))}
      </Grid>
      <ParagraphForm
        open={Boolean(openForm || selectedParagraph)}
        selectedParagraph={selectedParagraph}
        handleClose={() => {
          setOpenForm(false);
          setSelectedParagraph(undefined);
          setEdition(false);
        }}
      />
    </>
  );
};

export default AboutUs;
