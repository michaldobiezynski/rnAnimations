import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App() {
const position = new Animated.ValueXY({x:0, y:0})
Animated.timing(position,{useNativeDriver: true, toValue:{x:200, y:500}, duration:3000}).start()

  return (
    <View style={styles.container}>
      <Animated.View style={{height:80, width: 80, alignItems: 'center',
        justifyContent: 'center',backgroundColor: 'red',transform:[
          {translateX:position.x},
          {translateY:position.y}
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
