import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import ArrowCircleRight from "../assets/ArrowCircleRight.png";
import DataAnalysis from "../assets/DataAnalysis.png";
import Vector from "../assets/Vector1.png";
import LinearGradient from "react-native-linear-gradient";

const Landing = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#EAF0FF", "#868BFE"]}
      style={styles.container}
    >
      <ImageBackground
        source={Vector}
        style={styles.vector}
        imageStyle={{
          resizeMode: "stretch",
        }}
      >
        <View style={styles.upperContainer}>
          <Text style={styles.taskoo}>TASKOO</Text>
          <Image source={DataAnalysis} style={styles.mainIng} />
          <Text style={styles.heading}>Manage every Task</Text>
          <Text style={styles.para}>
            Balance work, life and everything in between with Taskoo
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.arrowCover}
        >
          <Image source={ArrowCircleRight} style={styles.arrow} />
        </TouchableOpacity>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  vector: {
    width: "100%",
    height: "95%",
    justifyContent: "center",
  },
  upperContainer: {
    height: "80%",
  },
  taskoo: {
    backgroundColor: "#CCCBFF",
    width: "25%",
    padding: "2%",
    borderRadius: 10,
    textAlign: "center",
    marginLeft: "10%",
    fontWeight: "bold",
    elevation: 1,
  },
  mainIng: {
    marginTop: "20%",
    height: "35%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#18306D",
    fontSize: 27,
    marginTop: "10%",
  },
  para: {
    textAlign: "center",
    color: "#1B21B5",
    width: "55%",
    alignSelf: "center",
    marginTop: "3%",
    fontWeight: "600",
    lineHeight: 25,
    fontSize: 17,
  },
  arrowCover: {
    alignSelf: "center",
    position: "relative",
    bottom: "1%",
    backgroundColor: "#FB4949",
    borderRadius: 50,
    padding: "2%",
  },
  arrow: {},
});

export default Landing;
