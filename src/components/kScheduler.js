import "@progress/kendo-theme-default";
import "@progress/kendo-theme-material";
import "@progress/kendo-theme-bootstrap";
import {
  Scheduler,
  TimelineView,
  SchedulerItem,
} from "@progress/kendo-react-scheduler";
import React, { useEffect } from "react";
import { Day } from "@progress/kendo-date-math";

import { ProportionalViewItem } from "./proportional-view-port";

function KScheduler(props) {
  const [orientation, set_orientation] = React.useState("vertical");

  const { dataToShow, dateChangeHandler, resource_data, displayDate } = props;

  const dataChangeHandler = () => {
    console.log("changes");
    console.log();
  };

  const itemDropHandler = (event) => {
    console.log("dropped");
  };

  const CustomItem = (props) => {
    return (
      <SchedulerItem
        {...props}
        editable={{ drag: true }}
        onRelease={() => itemDropHandler()}
      />
    );
  };

  return (
    <Scheduler
      onDateChange={(date) => {
        dateChangeHandler(date);
      }}
      onDataChange={() => dataChangeHandler()}
      data={dataToShow}
      group={{
        resources: ["Rooms"],
        orientation,
      }}
      resources={[
        {
          name: "Rooms",
          data: resource_data,
          field: "caseId",
          valueField: "value",
          textField: "text",
          colorField: "color",
        },
      ]}
      defaultDate={displayDate}
      onRelease={() => {
        console.log("dropped");
      }}

      // editable={{
      //   drag: true,
      //   remove: true,
      // }}
      // item={CustomItem}
    >
      <TimelineView
        title="Hour-By-Hour"
        numberOfDays={1}
        slotDuration={30} //in minutes
        slotDivisions={1}
        startTime={"08:00"}
        endTime={"19:00"}
        workDayStart={"09:00"}
        workDayEnd={"19:00"}
        workWeekStart={Day.Sunday}
        workWeekEnd={Day.Monday}
        showWorkHours={true}
        viewItem={ProportionalViewItem}
      />
    </Scheduler>
  );
}
export default KScheduler;
