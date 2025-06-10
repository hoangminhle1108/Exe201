import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Eye, EyeOff } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const loadRememberedData = async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      const savedAgree = await AsyncStorage.getItem("agree");

      if (savedEmail && savedPassword && savedAgree === "true") {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setAgree(true);
      }
    };

    loadRememberedData();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (agree) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("agree", "true");
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.setItem("agree", "false");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập thất bại");
      }

      const data = await response.json();
      // await AsyncStorage.setItem("token", data.token);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Thông báo", error.message || "Có lỗi xảy ra.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.tabHeader}>
        <Text style={[styles.tab, styles.activeTab]}>Đăng nhập</Text>
        <Text style={styles.tab}>Đăng ký</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ position: "relative" }}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 12, top: 14 }}
        >
          {showPassword ? (
            <EyeOff size={20} color="#666" />
          ) : (
            <Eye size={20} color="#666" />
          )}
        </TouchableOpacity>
      </View>


      <View style={styles.rowBetween}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setAgree(!agree)}
            style={[
              styles.checkbox,
              {
                backgroundColor: agree ? "#72C15F" : "transparent",
                borderColor: agree ? "#72C15F" : "#ccc",
              },
            ]}
          >
            {agree && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            <Text style={{ color: "black" }}>Ghi nhớ tài khoản </Text>
          </Text>
          <Text onPress={() => router.push("/(authentication)/forget")}>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.loginLink}>
        <Text style={{ color: "black" }}>Chưa có tài khoản? </Text>
        <Text
          style={{ color: "#72C15F", fontWeight: "bold" }}
          onPress={() => router.push("/(authentication)/register")}
        >
          Đăng ký
        </Text>
      </Text>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>HOẶC</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => {
          // Handle Google login
        }}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png",
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#666",
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  loginLink: {
    textAlign: "center",
    color: "#72C15F",
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -50,
  },
  tabHeader: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    borderBottomWidth: 2,
    borderColor: "#72C15F",
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 20,
    paddingBottom: 8,
    color: "#999",
  },
  activeTab: {
    color: "#72C15F",
    fontWeight: "bold",
    borderColor: "#72C15F",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#72C15F",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgot: {
    textAlign: "center",
    color: "#72C15F",
    paddingLeft: 100,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },

  orText: {
    color: "#666",
    fontSize: 14,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

});
