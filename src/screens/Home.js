import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../context/userContext";
import Avatar from "../assets/Avatar.png";
import { LineChart } from "react-native-chart-kit";
import Notebook from "../assets/notebook.png";
import { completeTask } from "../api/utility";
import LinearGradient from "react-native-linear-gradient";

const Task = ({ task }) => {
  const [showFull, setShowFull] = useState(false);
  const { tasks, addCompletedTask, setTasks, userToken } =
    useContext(UserContext);
  const ignoreSubmit = () => {};
  const completeSubmit = () => {
    completeTask(task.item.uniquelink, userToken).then(() => {
      addCompletedTask(task.item.uniquelink);
      setTasks(
        tasks.map((localTask) => {
          if (localTask.uniquelink == task.item.uniquelink) {
            return {
              ...localTask,
              status: "completed",
            };
          } else {
            return localTask;
          }
        })
      );
    });
  };

  return (
    <TouchableOpacity
      style={styles.task}
      onPress={() => setShowFull(!showFull)}
    >
      <View style={styles.taskContainer}>
        <View style={styles.left}>
          {task.item?.name && (
            <Text style={styles.taskHeading}>{task.item.name}</Text>
          )}
          {showFull && task.item?.details && <Text>{task.item.details}</Text>}
          {task.item?.expiry_date && (
            <Text style={styles.taskTime}>{task.item.expiry_date}</Text>
          )}
        </View>
        <Image source={Notebook} style={styles.nb} />
      </View>
      {showFull && (
        <View style={styles.taskButtons}>
          <TouchableOpacity style={styles.ignoreBtn} onPress={ignoreSubmit}>
            <Text style={styles.ignoreBtnTxt}>Ignore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeBtn} onPress={completeSubmit}>
            <Text style={styles.completeBtnTxt}>Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const { user, tasks, completedTasks } = useContext(UserContext);
  const [pending, setPending] = useState("none");

  useEffect(() => {
    let pendingCount = 0;
    tasks.forEach((task) => {
      if (task.status == "active") {
        pendingCount++;
      }
    });
    if (pendingCount == 0) setPending("none");
    else if (pendingCount == tasks.left) setPending("all");
    else setPending("some");
  }, [tasks]);
  return (
    <LinearGradient
      colors={
        pending == "none"
          ? ["#07B594", "#FFFFFF"]
          : pending == "all"
          ? ["#F82323", "#FFFFFF"]
          : ["#F89623", "#FFFFFF"]
      }
      style={styles.container}
    >
      <View style={styles.top}>
        <Image source={Avatar} style={styles.avatar} />
        <Text style={styles.homeTxt}>{user?.name ?? "Home"}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("CreateTask")}
        >
          <Text style={styles.createBtnTxt}>CREATE</Text>
        </TouchableOpacity>
        <View style={styles.chartArea}>
          <LineChart
            data={{
              labels: ["0", "1", "2", "3", "4", "5", "6"],
              datasets: [
                {
                  data: [
                    0,
                    tasks.filter((task) => task?.status == "active").length,
                  ],
                  color: () => "#1B21B5",
                },
                {
                  data: [0, completedTasks.length],
                  color: () => "#FDBA5D",
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.85}
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              fillShadowGradientFrom: "#fff",
              fillShadowGradientTo: "#fff",
              style: {
                borderRadius: 16,
                backgroundColor: "#fff",
              },
              propsForDots: {
                r: "0",
              },
            }}
            withVerticalLines={false}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 0,
            }}
          />
          <View style={styles.chartLabels}>
            <View style={styles.labelLeft}>
              <View style={styles.leftDot}></View>
              <Text style={styles.leftLabelTxt}>Completed</Text>
            </View>
            <View style={styles.labelRight}>
              <View style={styles.rightDot}></View>
              <Text style={styles.rightLabelTxt}>Pending</Text>
            </View>
          </View>
        </View>
        <SafeAreaView style={styles.safeArea}>
          {tasks.filter((item) => item?.status === "active").length == 0 ? (
            <Text style={styles.message}>No Pending Tasks</Text>
          ) : (
            <FlatList
              data={tasks.filter((item) => item?.status === "active")}
              renderItem={(task) => <Task task={task} />}
              keyExtractor={(item, i) => item.uniquelink + " " + i}
            />
          )}
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

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
  createBtn: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#F82626",
    borderRadius: 25,
    padding: "3%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "6%",
  },
  createBtnTxt: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  tasks: {},
  task: {
    padding: "5%",
    margin: "5%",
    elevation: 1.5,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: "2%",
  },
  taskContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  taskHeading: {
    color: "#868BFE",
    fontSize: 22,
    fontWeight: "400",
    marginBottom: "1%",
  },
  left: {
    width: "80%",
  },
  taskTime: {
    marginTop: "4%",
    color: "#D9D9D9",
  },
  safeArea: {
    height: "43%",
  },
  nb: {
    height: 50,
    resizeMode: "contain",
  },
  taskButtons: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-around",
  },
  ignoreBtn: {
    backgroundColor: "#FD3939C9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
    width: "40%",
  },
  completeBtn: {
    borderRadius: 15,
    paddingVertical: "2%",
    backgroundColor: "#8AF9A2",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  ignoreBtnTxt: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  completeBtnTxt: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  chartArea: {
    elevation: 1.5,
    backgroundColor: "#fff",
    width: "95%",
    marginLeft: "2%",
    borderRadius: 20,
    paddingBottom: 15,
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    color: "#07B594",
    marginTop: "20%",
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  labelLeft: {
    flexDirection: "row",
  },
  leftDot: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#FDBA5D",
    marginRight: 10,
  },
  labelRight: {
    flexDirection: "row",
  },
  rightDot: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#1B21B5",
    marginRight: 10,
  },
});

export default Home;
