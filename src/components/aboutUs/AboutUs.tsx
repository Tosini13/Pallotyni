import { useContext, useState } from "react";

import { IconButton, Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Paragraph,
  ParagraphStoreContext,
  TParagraph,
} from "../../stores/AboutUsStore";
import ParagraphForm from "./ParagraphForm";
import SpeedDialComponent from "../SpeedDial";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { observer } from "mobx-react";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";

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
const ActionButtonStyled = styled.div`
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

const GridActionStyled = styled(Grid)<{ edition?: string }>`
  position: relative;
  width: 100%;
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

const SpeedDialContainer = styled.div`
  position: fixed;
  right: 25%;
  z-index: 1110;
`;

export interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = observer(() => {
  const storeParagraph = useContext(ParagraphStoreContext);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedParagraph, setSelectedParagraph] = useState<
    TParagraph | undefined
  >();
  const actionsSD = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
    { icon: <DeleteIcon onClick={() => setRemoval(true)} />, name: "Delete" },
  ];

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedParagraph(undefined);
  };

  const handleAction = (p: TParagraph) => {
    console.log("handleAction", p);

    if (edition || removal) {
      setSelectedParagraph(p);
      setOpenForm(true);
    }
  };

  console.log("aboutUs", selectedParagraph, openForm);
  return (
    <>
      <Grid container spacing={3} style={{ position: "relative" }}>
        <Grid item>
          <Typography variant="h4">About us</Typography>
        </Grid>
        <SpeedDialContainer>
          <SpeedDialComponent
            actions={actionsSD}
            blocked={Boolean(edition || removal || openForm)}
            unBlock={handleClearActionsSD}
          />
        </SpeedDialContainer>
        {storeParagraph.getParagraph().map((paragraph) => (
          <GridActionStyled
            item
            key={paragraph.id}
            edition={parseStyledBoolean(edition || removal)}
            onClick={() => handleAction(paragraph)}
          >
            {paragraph.title ? (
              <Typography variant="h5">{paragraph.title}</Typography>
            ) : null}
            <Typography>{paragraph.content}</Typography>
            {edition ? (
              <HoverStyled>
                <ActionButtonStyled>
                  <EditIcon fontSize="large" />
                </ActionButtonStyled>
              </HoverStyled>
            ) : null}
            {removal ? (
              <HoverStyled>
                <ActionButtonStyled>
                  <DeleteIcon fontSize="large" />
                </ActionButtonStyled>
              </HoverStyled>
            ) : null}
          </GridActionStyled>
        ))}
      </Grid>
      <ParagraphForm
        open={Boolean((openForm || selectedParagraph) && !removal)}
        selectedParagraph={openForm ? selectedParagraph : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedParagraph && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedParagraph) {
              storeParagraph.removeParagraph(selectedParagraph);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </>
  );
});

export default AboutUs;
