import React, { useContext, useState, ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Vector2 from "../assets/Vector2.png";
import { UserContext } from "../context/userContext";
import { submitNumber, verifyOtp, createUser } from "../api/signup";
import LinearGradient from "react-native-linear-gradient";
const SignUp = () => {
  const { user, setUser, setUserToken, userToken } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [ph, setPh] = useState(null);

  const PhoneInput = ({ setSubmitted }) => {
    const [phoneNo, setPhoneNo] = useState(0);
    const [error, setError] = useState(false);
    const [networkErr, setNetworkErr] = useState(false);
    const validateNumber = () => {
      if (!Number(phoneNo) || Number(phoneNo) < 1e9 || Number(phoneNo) > 1e10) {
        return false;
      }
      return true;
    };
    const handleSubmit = () => {
      if (!validateNumber()) {
        setError(true);
        return;
      }
      setError(false);
      setNetworkErr(false);
      submitNumber(Number(phoneNo))
        .then(() => {
          setPh(Number(phoneNo));
          setSubmitted(true);
        })
        .catch(() => {
          setNetworkErr(true);
        });
    };
    return (
      <View style={styles.box}>
        <Text style={styles.phone}>Phone</Text>
        <TextInput
          style={styles.phn}
          inputMode="numeric"
          onChangeText={setPhoneNo}
        />
        {error && (
          <Text style={styles.error}>
            Invalid Phone number. Please enter a 10 digit number
          </Text>
        )}
        {networkErr && <Text style={styles.error}>Some error occured</Text>}
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnTxt}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const OtpInput = () => {
    const [err, setErr] = useState(false);
    const [otp, setOtp] = useState(0);

    const handleSubmit = () => {
      if (!Number(otp)) {
        setErr(true);
        return;
      }
      setErr(false);
      verifyOtp(Number(otp))
        .then((data) => {
          setUser({ ...user, phoneNo: ph });
          setUserToken(data.data.token);
        })
        .catch(() => {
          setErr(true);
        });
    };
    return (
      <View style={styles.box}>
        <Text style={styles.phone}>OTP</Text>
        <TextInput
          style={styles.phn}
          inputMode="numeric"
          onChangeText={setOtp}
        />
        {err && <Text style={styles.error}>Unable to verify</Text>}
        <TouchableOpacity onPress={() => setSubmitted(false)}>
          <Text style={styles.change}>Change number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const NameInput = () => {
    const [name, setName] = useState("");
    const [err, setErr] = useState(false);
    const [networkErr, setNetworkError] = useState(false);
    const submitName = () => {
      if (name.trim() == "") {
        setErr(true);
        return;
      }
      setErr(false);
      setNetworkError(false);
      createUser(userToken, name)
        .then(() => {
          setUser({ ...user, name });
        })
        .catch(() => {
          setNetworkError(true);
        });
    };
    return (
      <View style={styles.box}>
        <Text style={styles.phone}>What is you Name?</Text>
        <TextInput style={styles.phn} inputMode="text" onChangeText={setName} />
        {err && <Text style={styles.error}>Please enter name</Text>}
        {networkErr && <Text style={styles.error}>Some error occured</Text>}
        <TouchableOpacity style={styles.btn} onPress={submitName}>
          <Text style={styles.btnTxt}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#868BFE", "#FFFFFF"]} style={styles.container}>
      <Text style={styles.txt}>Sign UP</Text>
      <ImageBackground
        source={Vector2}
        style={styles.imgContainer}
        imageStyle={{
          resizeMode: "cover",
        }}
      >
        {!user ? (
          submitted ? (
            <OtpInput />
          ) : (
            <PhoneInput setSubmitted={setSubmitted} />
          )
        ) : (
          <NameInput />
        )}
        <Text style={styles.bottomTxt}>
          By signing up you agree to the{" "}
          <Text style={styles.txtLink}>Terms and Conditions</Text> of Taskoo
        </Text>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#868BFE",
  },
  imgContainer: {
    marginTop: "15%",
    height: "100%",
  },
  top: {
    height: "50%",
    width: "100%",
    // backgroundColor: "green",
  },
  txt: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#fff",
    position: "relative",
    top: "10%",
    left: "10%",
  },
  box: {
    marginTop: "40%",
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  phone: {
    color: "#18306D",
    fontWeight: "bold",
    fontSize: 20,
    width: "60%",
    marginBottom: "5%",
    paddingLeft: "2%",
  },
  phn: {
    backgroundColor: "#EAF0FF",
    width: "60%",
    fontSize: 20,
    borderRadius: 40,
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  btn: {
    backgroundColor: "#868BFE",
    width: "60%",
    borderRadius: 40,
    paddingVertical: "3%",
    alignItems: "center",
    marginTop: "5%",
  },
  btnTxt: {
    fontWeight: "bold",
    fontSize: 22.5,
  },
  bottomTxt: {
    fontWeight: "400",
    textAlign: "center",
    fontSize: 17,
    alignSelf: "center",
    width: "60%",
    color: "#CDCFF6",
  },
  txtLink: {
    color: "#A3A6FF",
  },
  error: {
    color: "red",
    fontSize: 15,
    marginTop: "2%",
    width: "60%",
    textAlign: "center",
  },
  change: {
    fontSize: 15,
    marginTop: "2%",
    width: "60%",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default SignUp;
