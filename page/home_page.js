import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View } from "react-native";

export default function Home_Page({ navigation }) {
  const [token, onChangeToken] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("read");
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log("read");
        onChangeToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
