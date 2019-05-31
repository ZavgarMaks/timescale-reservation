import React from 'react';
import styled from 'styled-components';
import OneHourBlock  from './Components/OneHourBlock';
import {HourData} from '../../Models';

const Wrapper = styled.div<{color: string}>`
  border: ${p => '1px solid' + p.color};
  display: flex;
  width: max-content;
`;

export interface State {
  allHours: HourData[];
}

export interface Props {
  borderColor: string;
  height: number;
  width: number;
  statusBlockHeight: number;
  scaleHeight: number;
  scaleColor: string;
  backColor: string;
  statusColor: string;
  hoverColor: string;
  timeColor: string;
  hoursData: HourData[];
}

class Timescale extends React.PureComponent<Props, State> {

  static defaultProps = {
    borderColor: '#e1e1e1',
    height: 120,
    width: 40,
    statusBlockHeight: 20,
    scaleColor: '#e1e1e1',
    scaleHeight: 30,
    statusColor: '#fff',
    hoverColor: '#ebeff3',
    backColor: '#fff',
    timeColor: '#444'
  };

  state = {
    allHours: this.props.hoursData
  }

  onClick = (hour: HourData) => {
    let copyHoursData = JSON.parse(JSON.stringify(this.state.allHours));
    let clickedHour = copyHoursData.find(item => item.hour === hour.hour);
    clickedHour.chosen = !clickedHour.chosen;
    this.setState({
      allHours: copyHoursData
    })

    let chosenHours = copyHoursData.filter(hour => hour.chosen);
    console.log('chosenHours :', chosenHours);
    // this.props.onClick (chosenHours);
  }

  renderHourBlock = () => {
    const { allHours } = this.state;
    const { height, width, statusBlockHeight, scaleHeight, scaleColor, statusColor, hoverColor, backColor, timeColor } = this.props;
    return allHours.map((hour, i) => {
      let time = '';
      let checkStatusColor = statusColor;
      let checkBackColor = backColor;
      let checkHoverColor = hoverColor;
      let checkScaleHeight = scaleHeight;
      let checkTooltipContent = 'Это время можно забронировать';
      let checkTimeColor = timeColor;
      let notAvailable = false;
      if(hour.hour % 2 === 0) {
        time = hour.hour+':00';
        checkScaleHeight = scaleHeight/2;
      }
      if(!hour.available) {
        checkStatusColor = 'repeating-linear-gradient(65deg, #c7cdd5, #c7cdd5 3px, #abaeb6 0px, #abaeb6 9px)';
        checkHoverColor = 'initial';
        checkTimeColor = '#999';
        checkTooltipContent = 'Это время недоступно';
        notAvailable = true;
      } else if (hour.chosen) {
        checkStatusColor = '#375db5';
        checkBackColor='#c4d0e8';
        checkHoverColor = 'initial';
        checkTooltipContent = 'Выбранное вами время';
      }
      return <OneHourBlock
                key={i}
                hour={hour}
                time={time}
                scaleHeight={checkScaleHeight}
                height={height}
                width={width}
                statusBlockHeight={statusBlockHeight}
                statusColor={checkStatusColor}
                scaleColor={scaleColor}
                hoverColor={checkHoverColor}
                backColor={checkBackColor}
                notAvailable={notAvailable}
                timeColor={checkTimeColor}
                tooltipContent={checkTooltipContent}
                onClick={this.onClick}
              />
    })
  }

  render() {
    const { borderColor } = this.props;
    return (
      <Wrapper color={borderColor}>
        {this.renderHourBlock()}
      </Wrapper>
    )
  }
} 

export default Timescale;