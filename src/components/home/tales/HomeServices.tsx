import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import { ServiceStoreContext } from "../../../stores/ServiceStore";

export interface HomeServicesProps {}

const HomeServices: React.FC<HomeServicesProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);

  useEffect(() => {
    storeServices.fetch();
  }, [storeServices]);
  return (
    <>
      {storeServices.getTodayServices.map((service) => (
        <Typography color="textPrimary">
          {service.time} - {service.title}
        </Typography>
      ))}
      {storeServices.getTodayServices.length === 0 ? (
        <Typography color="textPrimary">No Services today</Typography>
      ) : null}
    </>
  );
});

export default HomeServices;
