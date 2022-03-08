import "@progress/kendo-theme-default";
import "@progress/kendo-theme-material";
import "@progress/kendo-theme-bootstrap";
import React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { Checkbox, RadioButton } from "@progress/kendo-react-inputs";

// themeColor: null | "base" | "primary" | "secondary" | "tertiary" | "info" | "success" | "warning" | "error" | "dark" | "light" | "inverse"

function KDialog(props) {
  const { closeHandler, data } = props;
  console.log("render KDialog");
  //   console.log(data);

  const dateFormatter = (dateObject) => {
    try {
      var mm = dateObject.getMonth() + 1;
      var dd = dateObject.getDate();
      console.log(
        [
          dateObject.getFullYear(),
          (mm > 9 ? "" : "0") + mm,
          (dd > 9 ? "" : "0") + dd,
        ].join("-")
      );
      return [
        dateObject.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("-");
    } catch {
      console.log("something wrong");
    }
  };

  const timeFormatter = (dateObject) => {
    var hh = dateObject.getHours();
    var mm = dateObject.getMinutes();
    console.log([hh, mm].join(" : "));
    return [hh, (mm > 9 ? "" : "0") + mm].join(" : ");
  };

  const getTimeInfo = () => {
    try {
      var dateArray = [];
      for (const item of data) {
        dateArray.push(item.start);
        dateArray.push(item.end);
      }
      var maxDate = dateArray.reduce((first, second) =>
        first > second ? first : second
      );
      var minDate = dateArray.reduce((first, second) =>
        first < second ? first : second
      );

      //   console.log((maxDate - minDate) / (1000 * 60 * 60));
      var duration = (maxDate - minDate) / (1000 * 60 * 60);
      var date = dateFormatter(minDate);
      var timeStart = timeFormatter(minDate);
      var timeEnd = timeFormatter(maxDate);
      return { date, timeStart, timeEnd, duration };
    } catch {
      console.log("something wrong");
      return {};
    }
  };

  const renderDetail = () => {
    try {
      const { caseId, caseNo, serviceOrderNumber } = data[0];
      const { date, timeStart, timeEnd, duration } = getTimeInfo();
      //   getTimeInfo();
      return (
        <div>
          <div className="dialog-detail-text">服務日期 : {date}</div>
          <div className="dialog-detail-text">
            服務時間 : {timeStart} - {timeEnd}
          </div>
          <div className="dialog-detail-text">服務時長 : {duration}</div>
          <div className="dialog-detail-text">案主姓名 : XXX</div>
          <div className="dialog-detail-text">
            個案編號 : {caseNo + "/" + serviceOrderNumber}
          </div>
          <div className="dialog-detail-text">地址 : YYY樓</div>
          <div className="dialog-detail-text">負責同工 : {caseId}</div>
          <div className="dialog-detail-text">備註 : </div>
          <div className="dialog-detail-text float-left">服務組合項目 : </div>
          <div className="dialog-detail-text float-right">
            <Button themeColor="primary">新增</Button>
          </div>
        </div>
      );
    } catch {
      return <div>Loading</div>;
    }
  };

  const renderTableItem = () => {
    // console.log(data);
    return (
      <table className="custom-table">
        <tr className="header-row">
          <th className="hedaer-cell">服務內容</th>
          <th className="hedaer-cell">開始時間</th>
          <th className="hedaer-cell">結束時間</th>
          <th className="hedaer-cell">時長(mins)</th>
          <th className="hedaer-cell">收費</th>
          <th className="hedaer-cell">狀態</th>
          <th className="hedaer-cell">行動</th>
        </tr>
        {data.map((item) => {
          return (
            <tr>
              <td>
                <DropDownList
                  data={[item.title]}
                  defaultValue={item.title}
                ></DropDownList>
              </td>
              <td>
                <TimePicker defaultValue={item.start}></TimePicker>
              </td>
              <td>
                <TimePicker defaultValue={item.end}></TimePicker>
              </td>
              <td>{(item.end - item.start) / (1000 * 60)}</td>
              <td>
                <Checkbox defaultChecked={true} />
              </td>
              <td>待定</td>
              <td>
                <RadioButton></RadioButton>
              </td>
            </tr>
          );
        })}
      </table>
    );
  };

  const renderActionButton = () => {
    return (
      <div className="dialog-button-group">
        <div className="float-right">
          <Button themeColor="error" onClick={closeHandler}>
            取消所有服務
          </Button>
          <Button
            themeColor="primary"
            fillMode="outline"
            onClick={closeHandler}
          >
            返回
          </Button>
          <Button themeColor="primary" onClick={closeHandler}>
            確定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      className="custom-modal"
      width="50%"
      title={"服務明細"}
      onClose={closeHandler}
    >
      {renderDetail()}
      {renderTableItem()}
      {renderActionButton()}
    </Dialog>
  );
}
export default KDialog;
