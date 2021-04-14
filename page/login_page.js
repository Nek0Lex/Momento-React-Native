import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import {
  Button,
  Flex,
  WhiteSpace,
  WingBlank,
  Card,
} from "@ant-design/react-native";

const axios = require("axios").default;

export default function Login_page({ navigation }) {
  const [username, onChangeUsername] = useState("username");
  const [password, onChangePassword] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function login() {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    axios
      .post("https://api.homing.dev/v1/login", params)
      .then(function (response) {
        console.log("response: " + JSON.stringify(response.data));

        if (response.data.is_success == true) {
          storeData(response.data.data.token);
          navigation.navigate("Home");
        }
      }).then;
  }

  const storeData = async (value) => {
      console.log("write");
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.image}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text style={{ marginLeft: 20 }}>Note.js</Text>
      </View>
      <WhiteSpace />
      <View>
        {/* {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            )}
          />
        )} */}
        <WingBlank size="lg">
          <Card>
            <Card.Header title="Login" />
            <Card.Body>
              <View>
                <WingBlank>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    placeholder="Username"
                    // value={inputText}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                  <View
                    flexDirection="row"
                    style={{
                      marginLeft: 10,
                      marginEnd: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onPress={() => navigation.navigate("Home")}>
                      Register
                    </Button>
                    <Button onPress={login}>Login</Button>
                  </View>
                </WingBlank>
              </View>
            </Card.Body>
          </Card>
        </WingBlank>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// export default Login_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 40,
    width: 40,
  },
  logo: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    borderRadius: 4,
    height: 40,
    margin: 12,
    paddingStart: 10,
    borderWidth: 1,
  },
});
