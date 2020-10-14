import React, { useState, useEffect } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const data = [
    {
      id: "1",
      uri:
        "https://images.unsplash.com/photo-1587827178882-cda751293c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "2",
      uri:
        "https://images.unsplash.com/photo-1587827178882-cda751293c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "3",
      uri:
        "https://images.unsplash.com/photo-1587827178882-cda751293c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "4",
      uri:
        "https://images.unsplash.com/photo-1587827178882-cda751293c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
  ];

  const [counter, setCounted] = useState(-2);
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

  const currentValue = new Animated.Value(1);

  useEffect(() => {
    if (liked === true) {
      Animated.spring(currentValue, {
        toValue: 2,
        friction: 2,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
        }).start(() => {
          setVisible(false);
        });
      });
    }
  }, [liked]);

  const position = new Animated.ValueXY({ x: 0, y: 0 });
  // Animated.timing(position,{useNativeDriver: true, toValue:{x:175, y:250}, duration:4000}).start()

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },

    // Animated.event([
    //   null, {dx:position.x,dy:position.y}
    // ]),

    onPanResponderRelease: () => {
      // position.setValue({x:0, y:0})
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
      }).start();
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [0, 50],
    outputRange: ["0deg", "90deg"],
  });
  return (
    <View style={styles.container}>
      <Animated.View
        {...pan.panHandlers}
        style={{
          height: 80,
          width: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotate },
          ],
        }}>
        <Text>cnq</Text>
      </Animated.View>

      {visible ? (
        <AnimatedIcon
          style={{
            position: "absolute",
            top: 120,
            left: "40%",
            elevation: 4,
            zIndex: 4,
            transform: [{ scale: currentValue }],
          }}
          name="heart"
          size={50}
          color="red"
        />
      ) : null}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Card>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <AntDesign
                  name={liked && index == counter ? "heart" : "hearto"}
                  size={30}
                  color="red"
                  onPress={() => {
                    if (liked === false) {
                      setVisible(true);
                    }
                    setLiked(!liked);
                    setCounted(index);
                  }}
                />
              </Card.Actions>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
