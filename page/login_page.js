import React, {useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TextInput } from "react-native";
import {
  Button,
  Flex,
  WhiteSpace,
  WingBlank,
  Card,
} from "@ant-design/react-native";


const Login_page = ({ navigation }) => {
  const [inputText, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


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
        {isLoading ? (
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
        )}
        <WingBlank size="lg">
          <Card>
            <Card.Header title="Login" />
            <Card.Body>
              <View>
                <WingBlank>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder="Username"
                    // value={inputText}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
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
                    <Button>Login</Button>
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
};

export default Login_page;

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
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
