import React from 'react';
import {LineChart} from 'react-native-svg-charts';
import {Path} from 'react-native-svg';
import {curveNatural} from 'd3-shape';

interface LineProps {
  line: string;
}

const Shadow = (props: Partial<LineProps>) => {
  const {line} = props as LineProps;
  return (
    <Path
      key={'shadow'}
      y={2}
      x={1}
      d={line}
      fill={'none'}
      strokeWidth={4}
      stroke={'rgba(134, 65, 244, 0.2)'}
    />
  );
};

const LineChartComponent = () => {
  const data2 = [80, 10, 95, 48, 24, 67, 51, 12, 33, 0, 24, 20, 50];

  return (
    <LineChart
      style={{height: 200}}
      gridMin={-20}
      gridMax={120}
      curve={curveNatural}
      data={data2}
      svg={{stroke: 'black'}}
      contentInset={{top: 20, bottom: 20}}>
      <Shadow />
    </LineChart>
  );
};

export default LineChartComponent;
