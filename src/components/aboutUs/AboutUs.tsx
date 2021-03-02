import react, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ParagraphStoreContext } from "../../stores/AboutUsStore";

export interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = () => {
  const storeParagraph = useContext(ParagraphStoreContext);
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h4">About us</Typography>
      </Grid>
      {storeParagraph.getParagraph().map((paragraph) => (
        <Grid item key={paragraph.id}>
          {paragraph.title ? (
            <Typography variant="h5">{paragraph.title}</Typography>
          ) : null}
          <Typography>{paragraph.content}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default AboutUs;
