import logo from "./logo.svg";
import "@progress/kendo-theme-default";
import "@progress/kendo-theme-material";
import "@progress/kendo-theme-bootstrap";
import "./App.css";
import React, { useEffect } from "react";
import { Scheduler, TimelineView } from "@progress/kendo-react-scheduler";
import { Day } from "@progress/kendo-date-math";
import { displayDate, sampleData, sampleDataWithResources } from "./events";
import { customData, customResourceData } from "./myevent";
import KScheduler from "./components/kScheduler";
import KDraggable from "./components/kDraggable";

function App() {
  const stringToDate = (dateString) => {
    // demo format: 2000-01-01T12:00 (yyyy-mm-ddThh:MM)
    const date = dateString.split("T");
    const dateSide = date[0].split("-");
    const year = parseInt(dateSide[0]);
    const month = parseInt(dateSide[1]) - 1;
    const day = parseInt(dateSide[2]);
    const timeSide = date[1].split(":");
    const hour = parseInt(timeSide[0]);
    const minute = parseInt(timeSide[1]);
    return new Date(year, month, day, hour, minute);
  };
  const dateToString = (dateObject) => {
    var year = dateObject.getFullYear();
    var month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    var day = ("0" + dateObject.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  };
  const [currentDate, set_currentDate] = React.useState(
    dateToString(displayDate)
  );

  const configTime = (time) => {
    return currentDate + "T" + time;
  };

  const adddate = (data) => {
    var myData = [];
    var IDCounter = 0;
    for (const item of data) {
      var myitem = {
        id: IDCounter++,
        start:
          item.start.length < 6
            ? stringToDate(configTime(item.start))
            : item.start,
        end:
          item.end.length < 6 ? stringToDate(configTime(item.end)) : item.end,
        title: item.title,
        caseId: item.caseId,
      };
      myData.push(myitem);
    }

    return myData;
  };

  const newExistingName = (ppl) => {
    var texts = [];
    var step = -1;
    for (const data of resource_data) {
      texts.push(data.text);
    }
    console.log(texts);
    while (texts.includes(ppl)) {
      ppl = ppl + " (Extra)";
      step = step + 1;
      if (step == 1) {
        return "die";
      }
    }
    return ppl;
  };

  const configCustomResourceData = (resourceData) => {
    var texts = [];
    var newResourceData = [];
    for (const data of resourceData) {
      var data_text = data.text;
      while (texts.indexOf(data_text) > -1) {
        data_text = data_text + " (Extra)";
      }
      texts.push(data_text);
      newResourceData.push({
        text: data_text,
        ppl: data.text,
        value: data.value,
        removable: data.removable,
      });
    }
    // console.log(newResourceData);
    return newResourceData;
  };
  const [dataToShow, set_DataToShow] = React.useState(adddate(customData));
  const [resource_data, set_resource_data] = React.useState(
    // configCustomResourceData(customResourceData)
    customResourceData
  );
  const [dragItem, set_dragItem] = React.useState("");
  const [ddswitch, set_ddswitch] = React.useState(true);

  const dateChangeHandler = (date) => {
    set_currentDate(dateToString(date.value));
    console.log(currentDate);
  };

  const addNewSchedule = (index, item, caseId) => {
    console.log(index);
    dataToShow.push({
      id: dataToShow.length,
      start: item.start, //"10:00",
      end: item.end, //"18:00",
      title: item.title,
      caseId: caseId, //"New People (Extra)",
      pplId: index,
    });
    set_DataToShow(adddate(dataToShow));
  };

  const addNewResourceData = (index, caseId, targetPpl) => {
    resource_data.splice(index, 0, {
      text: caseId,
      ppl: targetPpl,
      value: caseId,
      removable: true,
    });
    set_resource_data(resource_data);

    // set_xxx("sss");
  };

  const dropHandler = (ev, target) => {
    console.log("Dropped on:");
    console.log(target);
    set_ddswitch(true);
    var childNode;
    var ele = target;
    var index;
    console.log(ele.classList);
    if (
      ele.classList.contains("k-event-template") ||
      ele.classList.contains("k-event")
    ) {
      while (!ele.classList.contains("k-event")) {
        ele = ele.parentElement;
      }
      index = parseInt(ele.getAttribute("data-group-index"));
      console.log("here");
    } else if (!ele.classList.contains("k-slot-cell")) {
      return;
    } else {
      console.log("else");
      while (!ele.classList.contains("k-resource-row")) {
        ele = ele.parentElement;
      }
      index = parseInt(ele.getAttribute("data-resource-index"));
    }
    const targetPpl = resource_data[index].ppl;
    console.log("Dropped on:  " + targetPpl);

    const item = dragItem;
    // const caseId =
    //   targetPpl + item.ServivceOrderNumber + "#" + taskCounter.toString();
    // set_taskCounter(taskCounter + 1);

    const caseId = newExistingName(targetPpl);
    if (caseId == "die") {
      return console.log("cannot handle more than 2 item");
    }
    console.log(caseId);
    addNewResourceData(index + 1, caseId, targetPpl);

    for (const serviceItem of item.ServiceItems) {
      addNewSchedule(index + 1, serviceItem, caseId);
    }
  };

  const dragHandler = (ev) => {
    if (ddswitch) {
      set_ddswitch(false);
      var newItem = {
        CaseName: "",
        CaseNumber: "",
        ServivceOrderNumber: ev.target.getAttribute("id"),
        AssignedTo: "",
        ServiceItems: [],
      };
      for (const child of ev.target.childNodes) {
        console.log(child.nodeType);
        if (child.nodeType != 3) {
          newItem.ServiceItems.push({
            start: child.getAttribute("data-start"),
            end: child.getAttribute("data-end"),
            title: child.getAttribute("data-title"),
          });
        }
      }
      set_dragItem(newItem);
    }
  };

  useEffect(() => {
    document.addEventListener("dragover", function (ev) {
      ev.preventDefault();
    });
    document.addEventListener("mousedown", function (ev) {
      console.log(ev.target);
      console.log(ev.target.parentElement);
    });
  }, []);
  console.log(dataToShow);
  console.log(dragItem);
  console.log(resource_data);

  return (
    <div className="custom-container">
      <div id="scheduler-area" onDrop={(ev) => dropHandler(ev, ev.target)}>
        <KScheduler
          dataToShow={dataToShow}
          dateChangeHandler={dateChangeHandler}
          resource_data={resource_data}
          displayDate={displayDate}
        />
        <KDraggable dragHandler={dragHandler} />
      </div>
    </div>
  );
}

export default App;
