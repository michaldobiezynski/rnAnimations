import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App() {
const position = new Animated.ValueXY({x:-100, y:-200})
Animated.timing(position,{useNativeDriver: true, toValue:{x:175, y:250}, duration:4000}).start()

const rotate = position.x.interpolate({
  inputRange:[0,200],
  outputRange:["0deg", "360deg"]
})
  return (
    <View style={styles.container}>
      <Animated.View style={{height:80, width: 80, alignItems: 'center',
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
