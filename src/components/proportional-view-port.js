import * as React from "react";
import { SchedulerViewItem } from "@progress/kendo-react-scheduler";

const getRect = (el) => {
  if (!el) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };
  }

  const top = el.offsetTop;
  const left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return {
    top,
    left,
    width,
    height,
  };
};

export const ProportionalViewItem = (props) => {
  console.log("This is Props");
  console.log(props);
  const item = React.createRef();
  const [display, setDisplay] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [lock, setLock] = React.useState(0);

  var itemClass = "normal-item";

  //grey item case:
  if (props.dataItem.isLeave) {
    itemClass = "leave-item";
  }

  const reflow = () => {
    const firstSlot = props.slots && props.slots.length ? props.slots[0] : null;

    if (props.slots.length === 0 || !firstSlot || !firstSlot._ref.current) {
      setDisplay(false);
      return;
    }

    const slotRect = getRect(firstSlot._ref.current.element);
    const pxPerMilisecond =
      (props.vertical ? slotRect.height : slotRect.width) /
      (firstSlot.end.getTime() - firstSlot.start.getTime());
    const offset =
      (props.start.getTime() - firstSlot.start.getTime()) * pxPerMilisecond;
    const total =
      (props.end.getTime() - props.start.getTime()) * pxPerMilisecond;
    const element = item.current && item.current.element;
    const itemRect = getRect(element);

    if (!element) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (props.vertical) {
        element.style.height = `${total + (offset < 0 ? offset : 0)}px`;
        element.style.top = `${itemRect.top + (offset < 0 ? 0 : offset)}px`;
      } else {
        element.style.width = `${total}px`;
        element.style.left = `${itemRect.left + (offset < 0 ? 0 : offset)}px`;
      }

      setVisible(true);
    });
  };

  React.useEffect(() => {
    // reflow();
    const scheduler = document.querySelector(".k-scheduler");
    if (!scheduler) {
      return;
    }
    const observer = new window.ResizeObserver(reflow);
    observer.observe(scheduler);
    return () => {
      observer.disconnect();
    };
  });

  return (
    <SchedulerViewItem
      {...props}
      ref={item}
      className={itemClass}
      style={{
        visibility: visible ? undefined : "hidden",
        display: display ? undefined : "none",

        ...props.style,
      }}
    />
  );
};
