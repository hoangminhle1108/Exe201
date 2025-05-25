import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  const handleLogin = () => {
    router.replace("/(tabs)/home");
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

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry />

      <View style={styles.rowBetween}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setAgree(!agree)}
            style={[
              styles.checkbox,
              { backgroundColor: agree ? "#72C15F" : "transparent", borderColor: agree ? "#72C15F" : "#ccc" },
            ]}
          >
            {agree && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            <Text style={{ color: "black" }}>Ghi nhớ tài khoản </Text>
          </Text>
          <Text onPress={() => { }}>
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
          onPress={() => router.replace("/(authentication)/register")}
        >
          Đăng ký
        </Text>
      </Text>

      <Text style={styles.orText}>HOẶC</Text>

      <TouchableOpacity style={styles.googleButton} onPress={() => { /* Handle Google login */ }}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" }}
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
    fontWeight: "bold",
  },
  forgot: {
    textAlign: "center",
    color: "#72C15F",
    paddingLeft: 100,
  },
  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#666",
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
