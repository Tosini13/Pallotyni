import { Grid, Typography } from "@material-ui/core";

export interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h4">About us</Typography>
      </Grid>
      <Grid item>
        <Typography>{paragraphs.first}</Typography>
      </Grid>
      <Grid item>
        <Typography>{paragraphs.second}</Typography>
      </Grid>
      <Grid item>
        <Typography>{paragraphs.third}</Typography>
      </Grid>
    </Grid>
  );
};

export default AboutUs;

const paragraphs = {
  first:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
  second:
    "Libero enim sed faucibus turpis in eu mi bibendum. Molestie a iaculis at erat pellentesque adipiscing commodo. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Sit amet cursus sit amet dictum. Odio morbi quis commodo odio aenean sed adipiscing diam. Elementum nisi quis eleifend quam adipiscing. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Faucibus scelerisque eleifend donec pretium vulputate sapien. Ante metus dictum at tempor commodo. Dolor sit amet consectetur adipiscing elit pellentesque. In arcu cursus euismod quis viverra nibh cras. In fermentum posuere urna nec tincidunt. Ultrices eros in cursus turpis massa tincidunt. Habitant morbi tristique senectus et. Etiam sit amet nisl purus in. Pharetra vel turpis nunc eget lorem dolor. Quam lacus suspendisse faucibus interdum posuere lorem.",
  third:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
};
