import logo from "./logo.svg";
import "@progress/kendo-theme-default";
import "@progress/kendo-theme-material";
import "@progress/kendo-theme-bootstrap";
import "./App.css";
import React, { useEffect, useReducer } from "react";
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

  const [testAttr, set_testAttr] = React.useState(0);

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
        pplId: item.pplId,
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
    return newResourceData;
  };
  const [dataToShow, set_DataToShow] = React.useState(adddate(customData));
  const [resource_data, set_resource_data] = React.useState(
    // configCustomResourceData(customResourceData)
    customResourceData
  );
  const [dragItem, set_dragItem] = React.useState("");
  const [ddswitch, set_ddswitch] = React.useState(true);
  const [dragIndex, set_dragIndex] = React.useState(false);

  const dateChangeHandler = (date) => {
    set_currentDate(dateToString(date.value));
  };

  const mappplId = (arr) => {
    for (var i = 0; i < resource_data.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].caseId == resource_data[i].value) {
          arr[j].pplId = resource_data[i].id;
        }
      }
    }
    return arr;
  };

  const assignResourceId = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      arr[i].id = i;
    }
    return arr;
  };

  const addNewSchedule = (index, item, caseId, addDate = true) => {
    // console.log(index);
    dataToShow.push({
      id: dataToShow.length,
      start: item.start, //"10:00",
      end: item.end, //"18:00",
      title: item.title,
      caseId: caseId, //"New People (Extra)",
      pplId: index,
    });

    const newDataToShow = mappplId(dataToShow);

    if (addDate) {
      set_DataToShow(adddate(newDataToShow));
    } else {
      set_DataToShow(newDataToShow);
    }
    // set_DataToShow(adddate(newDataToShow));
  };

  const addNewResourceData = (index, caseId, targetPpl) => {
    console.log("splice in ");
    console.log(index);
    resource_data.splice(index, 0, {
      id: index, //will change afterward
      text: caseId,
      ppl: targetPpl,
      value: caseId,
      removable: true,
    });

    const newResourceData = assignResourceId(resource_data);

    set_resource_data(newResourceData);

    // set_xxx("sss");
  };

  const hasSchedule = React.useCallback(
    (targetId) => {
      for (var i = 0; i < dataToShow.length; i++) {
        if (dataToShow[i].pplId == targetId) {
          return true;
        }
      }
      return false;
    },
    [dataToShow]
  );
  const moveSchedule = async (oldId, newId) => {
    var ppl;
    for (var j = 0; j < resource_data.length; j++) {
      if (resource_data[j].id == newId) {
        ppl = resource_data[j].value;
      }
    }
    var newDataToShow = dataToShow;
    for (var i = 0; i < newDataToShow.length; i++) {
      if (newDataToShow[i].pplId == oldId) {
        console.log("moved");
        newDataToShow[i].pplId = parseInt(newId);
        newDataToShow[i].caseId = ppl;
        newDataToShow[i].casuallyUselessAttr = 0;
      }
    }
    // console.log("everything ready");
    console.log(newDataToShow);
    set_DataToShow(newDataToShow);
    // var newRD = resource_data;
    // set_resource_data(newRD);
    console.log("set already");
  };

  const moveDataToShow = (oldId, newId) => {
    // case 1: oldid has schedule, newid empty
    if (hasSchedule(newId) == false) {
      moveSchedule(oldId, newId);
    }
    // case 2: drag on same ppl
    else if (newId == oldId) {
      return console.log("Dragged on same ppl");
    }
    // case 3: drag on ppl who already has schedule
    else {
      const targetPpl = resource_data[newId].ppl;
      const caseId = newExistingName(targetPpl);
      if (caseId == "die") {
        return;
      }
      addNewResourceData(parseInt(newId) + 1, caseId, targetPpl);

      var dataToPush = [];
      for (var i = 0; i < dataToShow.length; i++) {
        if (dataToShow[i].pplId == oldId) {
          dataToPush.push(dataToShow[i]);
        }
      }
      for (const serviceItem of dataToPush) {
        addNewSchedule(parseInt(newId) + 1, serviceItem, caseId, false);
      }
    }

    // case 2: oldid has schedule, newid has schedule
  };

  const dropHandler = (ev, target) => {
    // console.log(dragIndex);

    var ele = target;
    var index;
    if (dragIndex !== false) {
      console.log("it is dragged from scheduler");
      set_testAttr(testAttr + 1);

      while (
        !ele.hasAttribute("data-resource-index") &&
        !ele.hasAttribute("data-group-index")
      ) {
        ele = ele.parentElement;
      }

      if (ele.hasAttribute("data-resource-index")) {
        index = ele.getAttribute("data-resource-index");
      } else {
        index = ele.getAttribute("data-group-index");
      }
      // console.log(index);
      moveDataToShow(dragIndex, index);
    } else {
      // console.log("Dropped on:");
      // console.log(target);
      set_ddswitch(true);

      console.log(ele.classList);
      if (
        ele.classList.contains("k-event-template") ||
        ele.classList.contains("k-event")
      ) {
        while (!ele.classList.contains("k-event")) {
          ele = ele.parentElement;
        }
        index = parseInt(ele.getAttribute("data-group-index"));
      } else if (!ele.classList.contains("k-slot-cell")) {
        return;
      } else {
        while (!ele.classList.contains("k-resource-row")) {
          ele = ele.parentElement;
        }
        index = parseInt(ele.getAttribute("data-resource-index"));
      }
      const targetPpl = resource_data[index].ppl;
      const targetId = resource_data[index].id;
      console.log("Dropped on:  " + targetPpl);
      var caseId;
      const item = dragItem;
      // const caseId =
      //   targetPpl + item.ServivceOrderNumber + "#" + taskCounter.toString();
      // set_taskCounter(taskCounter + 1);

      if (hasSchedule(targetId) == false) {
        console.log("no schedule for this id", targetId);
        caseId = targetPpl;
      } else {
        index = index + 1;
        caseId = newExistingName(targetPpl);
        if (caseId == "die") {
          return console.log("cannot handle more than 2 item");
        }
        // console.log(caseId);
        addNewResourceData(index, caseId, targetPpl);
      }

      for (const serviceItem of item.ServiceItems) {
        addNewSchedule(index, serviceItem, caseId);
      }
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
        // console.log(child.nodeType);
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
    console.log("called useEffect");
    document.addEventListener("dragover", function (ev) {
      ev.preventDefault();
    });
    document.addEventListener("mousedown", function (ev) {
      var ele = ev.target;
      while (
        !ele.hasAttribute("data-resource-index") &&
        !ele.hasAttribute("data-group-index")
      ) {
        ele = ele.parentElement;
      }
      var index;
      if (ele.hasAttribute("data-resource-index")) {
        index = ele.getAttribute("data-resource-index");
      } else {
        index = ele.getAttribute("data-group-index");
      }
      if (hasSchedule(index) == false) {
        return console.log("nothing in this row");
      }
      ele.setAttribute("draggable", true);

      set_dragIndex(index);
    });
    document.addEventListener("mouseup", function () {
      console.log("you release");
      set_dragIndex(false);
    });
  }, [hasSchedule]);
  console.log("render App.js");
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
