/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub,
} from 'react-native-reanimated';
import {onGestureEvent, useValues} from 'react-native-redash';

import data from './data.json';
import Chart, {size} from './src/Components/Chart';
import Values from './src/Components/Values';
import Line from './src/Components/Line';
import Label from './src/Components/Label';
import {Candle} from './src/Components/Candle';
import LineChart from './src/Components/LineChart';

const candles = data.slice(0, 20);

const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({high, low}) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

const domain = getDomain(candles);

const styles = StyleSheet.create({
  lineChart: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const App = () => {
  const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    x,
    y,
    state,
  });
  const caliber = size / candles.length;
  const translateY = diffClamp(y, 0, size);
  const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
  const opacity = eq(state, State.ACTIVE);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.lineChart}>
          <LineChart />
        </View>
        <View style={styles.container}>
          <View>
            <Animated.View style={{opacity}} pointerEvents="none">
              <Values {...{candles, translateX, caliber}} />
            </Animated.View>
          </View>
          <View>
            <Chart {...{candles, domain}} />
            <PanGestureHandler minDist={0} {...gestureHandler}>
              <Animated.View style={StyleSheet.absoluteFill}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                    opacity,
                    ...StyleSheet.absoluteFillObject,
                  }}>
                  <Line x={size} y={0} />
                </Animated.View>
                <Animated.View
                  style={{
                    transform: [{translateX}],
                    opacity,
                    ...StyleSheet.absoluteFillObject,
                  }}>
                  <Line x={0} y={size} />
                </Animated.View>
                <Label y={translateY} {...{size, domain, opacity}} />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
