import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Day } from "../../models/Global";
import { ServiceStoreContext } from "../../stores/ServiceStore";

export interface ServicesProps {}

const Services: React.FC<ServicesProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);
  const services = storeServices.getServices();
  return (
    <div>
      <p>Services</p>
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
    </div>
  );
});

export default Services;
