import { Grid, Typography } from "@material-ui/core";
import { TNews } from "../../models/News";

export interface NewsSummaryProps {
  news: TNews;
}

const NewsSummary: React.FC<NewsSummaryProps> = ({ news }) => {
  return (
    <>
      <Grid container justify="space-between" alignItems="flex-start">
        {news.title ? (
          <Grid item>
            <Typography variant="h5">{news.title}</Typography>{" "}
          </Grid>
        ) : null}
        <Grid item>
          <Typography variant="body2">{news.createdAt}</Typography>
        </Grid>
      </Grid>
      <Typography>{news.content}</Typography>
    </>
  );
};

export default NewsSummary;
