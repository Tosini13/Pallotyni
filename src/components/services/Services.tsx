import React, { useContext, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { DATE_FORMAT, Day } from "../../models/Global";
import { ServiceStoreContext } from "../../stores/ServiceStore";
import { ConfessionStoreContext } from "../../stores/ConfessionStore";
import ServiceMenu from "./ServiceMenu";

export enum E_SERVICE_TAB {
  "SERVICES" = "SERVICES",
  "CONFESSIONS" = "CONFESSIONS",
}

export interface ServicesProps {}

const Services: React.FC<ServicesProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);
  const storeConfession = useContext(ConfessionStoreContext);

  const [currentTab, setCurrentTab] = useState<E_SERVICE_TAB>(
    E_SERVICE_TAB.SERVICES
  );

  const servicesNextWeek = storeServices.getServicesByDate({
    toDate: moment().add(7, "days").format(DATE_FORMAT),
  });

  return (
    <>
      <ServiceMenu setCurrentTab={setCurrentTab} />
      {currentTab === E_SERVICE_TAB.SERVICES ? (
        <div>
          <div>
            {Object.values(Day).map((day) => (
              <div key={day}>
                <h5>{day}</h5>
                {storeServices.getServicesByDay(day).map((service) => (
                  <p key={service.id}>
                    {service.time} - {service.title}
                  </p>
                ))}
              </div>
            ))}
          </div>
          {servicesNextWeek ? (
            <>
              <p>Next week</p>
              {servicesNextWeek.map((service) => (
                <p>
                  {moment(service.date).format(DATE_FORMAT)}
                  {service.time} - {service.title}
                </p>
              ))}
            </>
          ) : null}
        </div>
      ) : null}
      {currentTab === E_SERVICE_TAB.CONFESSIONS ? (
        <div>
          <div>
            {Object.values(Day).map((day) => (
              <div key={day}>
                <h5>{day}</h5>
                {storeConfession.getConfessionsByDay(day).map((confession) => (
                  <p key={confession.id}>
                    {confession.fromTime} - {confession.toTime} :{" "}
                    {confession.title}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p>Next week</p>
          {storeConfession.getConfessionsNextWeek().map((confession) => (
            <p>
              {moment(confession.date).format(DATE_FORMAT)}{" "}
              {confession.fromTime} - {confession.toTime}: {confession.title}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
});

export default Services;
