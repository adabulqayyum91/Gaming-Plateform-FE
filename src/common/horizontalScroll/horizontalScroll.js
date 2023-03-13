import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import useDrag from "./useDrag";

const HorizontalScroll = ({ children }) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        onWheel={onWheel}
      >
        {/* {Array(8)
          .fill()
          .map((x, i) => {
            return <DummItem itemId={i} key={i} />;
          })} */}
        {children}
      </ScrollMenu>
    </div>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
    </IconButton>
  );
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
    </IconButton>
  );
}

export default HorizontalScroll;
