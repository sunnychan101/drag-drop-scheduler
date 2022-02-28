import "@progress/kendo-theme-default";
import "@progress/kendo-theme-material";
import "@progress/kendo-theme-bootstrap";
import React from "react";
import { customGridData } from "../myevent";

function KDraggable(props) {
  const { dragHandler } = props;

  const rendersmallItem = (service, idCounter) => {
    return (
      <div
        className="service-item"
        id={idCounter}
        data-start={service.TimeFrom}
        data-end={service.TimeTo}
        data-title={service.ServiceType}
      >
        <div className="service-item-time">
          {service.TimeFrom} - {service.TimeTo}
        </div>
        {service.ServiceType}
      </div>
    );
  };

  const renderService = (item) => {
    var idCounter = 0;
    return (
      <div
        id={item.ServiceOrderNumber}
        className="service-row"
        draggable
        onDrag={(ev) => dragHandler(ev)}
      >
        {item.CaseNumber}
        {item.ServiceItems.map((service) => {
          return rendersmallItem(service, idCounter++);
        })}
      </div>
    );
  };

  return (
    <div className="service-group">
      {customGridData.map((item) => {
        return renderService(item);
      })}
    </div>
  );
}

export default KDraggable;
