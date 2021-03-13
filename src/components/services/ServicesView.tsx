import { useContext } from "react";
import moment from "moment";
import { DATE_FORMAT, Day } from "../../models/Global";
import { ServiceStoreContext, Service } from "../../stores/ServiceStore";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { Typography } from "@material-ui/core";
import ServiceForm from "./forms/ServiceForm";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";

const DayContainerStyled = styled.div<{ serviceSelectable?: string }>``;

const ServiceContainerStyled = styled(Typography)<{ selectable?: string }>`
  padding: 3px;
  transition: all 0.3s;
  width: fit-content;
  ${(props) =>
    props.selectable
      ? `
        margin-bottom: 5px;
        border-bottom: 1px solid ${mainTheme.palette.secondary.dark};
        &:hover{
          cursor: pointer;
          box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
        }`
      : ""}
`;

export interface ServicesViewProps {
  openForm: boolean;
  edition: boolean;
  removal: boolean;
  selectedService?: Service;
  selectService: (s: Service) => void;
  handleClearActionsSD: () => void;
}

const ServicesView: React.FC<ServicesViewProps> = ({
  openForm,
  edition,
  removal,
  selectedService,
  selectService,
  handleClearActionsSD,
}) => {
  console.log(selectedService);

  const storeServices = useContext(ServiceStoreContext);
  const servicesNextWeek = storeServices.getServicesByDate({
    toDate: moment().add(7, "days").format(DATE_FORMAT),
  });

  const handleSelectService = (service: Service) => {
    if (edition || removal) {
      selectService(service);
    }
  };

  return (
    <>
      <div>
        <div>
          {Object.values(Day).map((day) => (
            <DayContainerStyled
              key={day}
              serviceSelectable={parseStyledBoolean(edition || removal)}
            >
              <h5>{day}</h5>
              {storeServices.getServicesByDay(day).map((service) => (
                <ServiceContainerStyled
                  key={service.id}
                  selectable={parseStyledBoolean(edition || removal)}
                  onClick={() => handleSelectService(service)}
                >
                  {service.time} - {service.title}
                </ServiceContainerStyled>
              ))}
            </DayContainerStyled>
          ))}
        </div>
        {servicesNextWeek ? (
          <>
            <p>Next week</p>
            {servicesNextWeek.map((service) => (
              <ServiceContainerStyled
                key={service.id}
                selectable={parseStyledBoolean(edition || removal)}
                onClick={() => handleSelectService(service)}
              >
                {moment(service.date).format(DATE_FORMAT)}
                {service.time} - {service.title}
              </ServiceContainerStyled>
            ))}
          </>
        ) : null}
      </div>
      <ServiceForm
        open={Boolean((openForm || selectedService) && !removal)}
        selectedService={removal ? undefined : selectedService}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedService && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedService) {
              storeServices.removeService(selectedService);
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
};

export default ServicesView;
