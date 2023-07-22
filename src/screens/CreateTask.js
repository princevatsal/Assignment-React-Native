import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Avatar from "../assets/Avatar.png";
import Timer from "../assets/Timer.png";
import Person from "../assets/Person.png";
import Suitcase from "../assets/Suitcase.png";
import TimerActive from "../assets/TimerActive.png";
import PersonActive from "../assets/PersonActive.png";
import SuitcaseActive from "../assets/SuitcaseActive.png";
import LinearGradient from "react-native-linear-gradient";
import { UserContext } from "../context/userContext";
import { createTask } from "../api/utility";
import DateTimePicker from "@react-native-community/datetimepicker";
import { taskType } from "../types/state";
import { fetchTasks } from "../api/utility";

function CreateTask({ navigation }) {
  const { tasks, userToken, setTasks } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [fontType, setFontType] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());

  const [error, setError] = useState(null);
  const [category, setCategory] = useState("personal");
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    setError(null);
    if (title.trim() == "" || title.trim().length <= 2) {
      setError("Please enter title of more than 2 letters");
      return;
    }
    if (description.trim() == "") {
      setError("Please enter description");
      return;
    }

    const localTask = {
      category,
      details: description,
      expiry_date: time,
      name: title,
    };
    console.log(localTask, "sdss");
    createTask(localTask, userToken)
      .then(() => {
        fetchTasks(userToken).then((taskList: taskType) => {
          taskList && setTasks(taskList);
        });
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Some error occured");
      });
  };
  return (
    <LinearGradient colors={["#07B594", "#FFFFFF"]} style={styles.container}>
      <View style={styles.top}>
        <Image source={Avatar} style={styles.avatar} />
        <Text style={styles.homeTxt}>New Task</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleInputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.fontTypeSelectContainer}>
          <TouchableOpacity
            onPress={() => {
              setFontType("bold");
            }}
          >
            <Text
              style={[
                styles.fontTypeSelectText,
                {
                  fontWeight: "bold",
                },
              ]}
            >
              B
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFontType("italic");
            }}
          >
            <Text
              style={[
                styles.fontTypeSelectText,
                {
                  fontStyle: "italic",
                },
              ]}
            >
              I
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFontType("underline");
            }}
          >
            <Text
              style={[
                styles.fontTypeSelectText,
                {
                  textDecorationLine: "underline",
                },
              ]}
            >
              U
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hamburger}>
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.taskInputContainer}>
          <TextInput
            style={[
              styles.descriptionInput,
              {
                fontWeight: fontType === "bold" ? "bold" : "normal",
                fontStyle: fontType === "italic" ? "italic" : "normal",
                textDecorationLine:
                  fontType === "underline" ? "underline" : "none",
              },
            ]}
            placeholder="Enter description"
            multiline={true}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Image style={styles.option} source={Timer} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory("work")}>
            <Image
              source={category == "work" ? SuitcaseActive : Suitcase}
              style={styles.option}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCategory("personal")}>
            <Image
              source={category == "personal" ? PersonActive : Person}
              style={styles.option}
            />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={"date"}
            is24Hour={true}
            display=""
            onChange={(e) => {
              setTime(new Date(e.nativeEvent.timestamp));
              setShowPicker(false);
            }}
          />
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
          <Text style={styles.createBtnTxt}>Create</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#07B594",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: "5%",
  },
  avatar: {
    height: 60,
    width: 60,
  },
  homeTxt: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "2%",
    color: "#fff",
  },
  content: {
    marginTop: "3%",
    backgroundColor: "#fff",
    height: "100%",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  titleInputContainer: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 35,
    padding: "3%",
    marginTop: "10%",
    elevation: 5,
    backgroundColor: "#ffffff",
    height: "8%",
    justifyContent: "center",
  },
  titleInput: {
    fontSize: 18,
    marginLeft: "3%",
    color: "gray",
  },
  fontTypeSelectContainer: {
    alignSelf: "center",
    width: "50%",
    borderRadius: 35,
    padding: "3%",
    elevation: 5,
    backgroundColor: "#ffffff",
    height: "8%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "-8%",
    zIndex: 2,
    marginTop: "5%",
  },
  fontTypeSelectText: {
    fontSize: 22,
  },
  hamburger: {
    width: 25,
    height: 15,
    justifyContent: "space-between",
  },
  dash: {
    height: 1.5,
    width: "70%",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  taskInputContainer: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 35,
    padding: "3%",
    elevation: 3,
    backgroundColor: "#ffffff",
    height: "35%",
  },
  descriptionInput: {
    fontSize: 18,
    marginLeft: "3%",
    color: "gray",
    marginTop: "12%",
  },
  options: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 35,
    padding: "3%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "6%",
    elevation: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  createBtn: {
    alignSelf: "center",
    width: "45%",
    backgroundColor: "#ed5858",
    borderRadius: 25,
    padding: "3%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "6%",
  },
  createBtnTxt: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
});
export default CreateTask;
