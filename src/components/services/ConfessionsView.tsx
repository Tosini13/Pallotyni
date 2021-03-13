import { useContext } from "react";
import moment from "moment";
import { DATE_FORMAT, Day } from "../../models/Global";
import { ConfessionStoreContext } from "../../stores/ConfessionStore";

export interface ConfessionsViewProps {}

const ConfessionsView: React.FC<ConfessionsViewProps> = () => {
  const storeConfession = useContext(ConfessionStoreContext);
  return (
    <div>
      <div>
        {Object.values(Day).map((day) => (
          <div key={day}>
            <h5>{day}</h5>
            {storeConfession.getConfessionsByDay(day).map((confession) => (
              <p key={confession.id}>
                {confession.fromTime} - {confession.toTime} : {confession.title}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p>Next week</p>
      {storeConfession.getConfessionsNextWeek().map((confession) => (
        <p>
          {moment(confession.date).format(DATE_FORMAT)} {confession.fromTime} -{" "}
          {confession.toTime}: {confession.title}
        </p>
      ))}
    </div>
  );
};

export default ConfessionsView;
