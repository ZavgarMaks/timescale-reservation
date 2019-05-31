import React from "react";
import styled from "styled-components";
import { HourData } from "../../../../Models";
import Tippy from "@tippy.js/react";

const Wrapper = styled.div<{
  height: number;
  width: number;
  backColor?: string;
}>`
  background-color: ${p => p.backColor};
  height: ${p => p.height+'px'};
  width: ${p => p.width+'px'};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatusHead = styled.div<{ height: number; color: string }>`
  height: ${p => p.height+'px'};
  background: ${p => p.color};
`;

const Time = styled.div<{ color: string, top: number }>`
  color: ${p => p.color};
  position: absolute;
  top: ${p => p.top+'px'};
  right: 22px;
  z-index: 1600;
`;

const Scale = styled.div<{ height: number; color: string }>`
  height: ${p => p.height+'px'};
  border-right: ${p => "1px solid " + p.color};
`;

const HoverWrapper = styled.button<{
  color: string;
  height: number;
  width: number;
}>`
  position: absolute;
  height: ${p => p.height+'px'};
  width: ${p => p.width+'px'};
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:disabled {
    cursor: inherit;
  }
  &:hover {
    background-color: ${p => p.color};
  }
`;

interface HourBlockProps {
  hour: HourData;
  height: number;
  width: number;
  statusBlockHeight: number;
  scaleHeight: number;
  scaleColor: string;
  backColor: string;
  time: string;
  timeColor: string;
  statusColor: string;
  hoverColor: string;
  notAvailable: boolean;
  tooltipContent: string;
  onClick: (hour: HourData) => void;
}

const OneHourBlock: React.FC<HourBlockProps> = ({
  hour,
  height,
  width,
  statusBlockHeight,
  statusColor,
  scaleHeight,
  scaleColor,
  time,
  hoverColor,
  backColor,
  onClick,
  notAvailable,
  timeColor,
  tooltipContent
}) => {
  return (
    <Tippy content={tooltipContent} arrow delay={[0, 0]}>
      <Wrapper height={height} width={width} backColor={backColor}>
        <StatusHead height={statusBlockHeight} color={statusColor} />
        <Time color={timeColor} top={height-scaleHeight*2-20}>{time}</Time>
        <Scale height={scaleHeight} color={scaleColor} />
        <HoverWrapper
          color={hoverColor}
          height={height}
          width={width}
          disabled={notAvailable}
          onClick={() => onClick(hour)}
        />
      </Wrapper>
    </Tippy>
  );
};

export default OneHourBlock;
