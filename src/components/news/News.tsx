import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import SpeedDialComponent from "../SpeedDial";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { SpeedDialContainer } from "../../style/SpeedDial";
import { NewStoreContext } from "../../stores/NewsStore";
import {
  GridActionStyled,
  HoverStyled,
  ActionButtonStyled,
} from "../aboutUs/AboutUs";
import { TNews } from "../../models/News";
import NewsSummary from "./NewsSummary";
import NewsForm from "./NewsForm";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/church_cross.png";

export interface NewsProps {}

const News: React.FC<NewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<TNews | undefined>();

  useEffect(() => {
    newsStore.fetch();
  }, []);

  const actionsSD = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
    { icon: <DeleteIcon onClick={() => setRemoval(true)} />, name: "Delete" },
  ];

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedNews(undefined);
  };

  const handleAction = (n: TNews) => {
    if (edition) {
      setSelectedNews(n);
      setOpenForm(true);
    } else if (removal) {
      setSelectedNews(n);
    }
  };

  return (
    <MainLayout img={BackgroundImg} title="Aktualności">
      <Grid container spacing={3} style={{ position: "relative" }}>
        <SpeedDialContainer>
          <SpeedDialComponent
            actions={actionsSD}
            blocked={Boolean(edition || removal || openForm)}
            unBlock={handleClearActionsSD}
          />
        </SpeedDialContainer>
        {newsStore.getAllNews().map((news) => (
          <GridActionStyled
            item
            key={news.id}
            edition={parseStyledBoolean(edition || removal)}
            onClick={() => handleAction(news)}
          >
            <NewsSummary news={news} />
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
      <NewsForm
        open={Boolean((openForm || selectedNews) && !removal)}
        selectedNews={openForm ? selectedNews : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedNews && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedNews) {
              newsStore.deleteNews(selectedNews);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </MainLayout>
  );
});

export default News;
