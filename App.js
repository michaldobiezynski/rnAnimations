import React from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

export default function App() {
const position = new Animated.ValueXY({x:0, y:0})
// Animated.timing(position,{useNativeDriver: true, toValue:{x:175, y:250}, duration:4000}).start()

const pan = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: (e, gesture) => {
    position.setValue({x:gesture.dx, y:gesture.dy})
  },
  
  // Animated.event([
  //   null, {dx:position.x,dy:position.y}
  // ]),

  onPanResponderRelease: () => {
    // position.setValue({x:0, y:0})
    Animated.spring(position,{
      toValue:{x:0, y:0}
    }).start()
  }

})

const rotate = position.x.interpolate({
  inputRange:[0,50],
  outputRange:["0deg", "90deg"]
})
  return (
    <View style={styles.container}>
      <Animated.View 
      {...pan.panHandlers}
      style={{height:80, width: 80, alignItems: 'center',
        justifyContent: 'center',backgroundColor: 'red',transform:[
          {translateX:position.x},
          {translateY:position.y},
          {rotate:rotate}
        ]}}>

      <Text>cnq</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
