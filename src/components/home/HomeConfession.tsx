import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import { ConfessionStoreContext } from "../../stores/ConfessionStore";

export interface HomeConfessionsProps {}

const HomeConfessions: React.FC<HomeConfessionsProps> = observer(() => {
  const storeConfessions = useContext(ConfessionStoreContext);

  useEffect(() => {
    storeConfessions.fetch();
  }, []);
  return (
    <>
      {storeConfessions.confessions.map((confessions) => (
        <Typography color="textPrimary">
          {confessions.fromTime} - {confessions.toTime} {confessions.priest}
        </Typography>
      ))}
    </>
  );
});

export default HomeConfessions;
