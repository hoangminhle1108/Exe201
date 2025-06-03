import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import logo from "@/assets/logo.png";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/(authentication)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?cs=srgb&dl=pexels-janetrangdoan-1092730.jpg&fm=jpg",
            }}
            style={styles.cloudImage}
            resizeMode="cover"
          />
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.title}>HealthMate</Text>
          <Text style={styles.subtitle}>
            Ứng dụng giúp bạn theo dõi dinh dưỡng và sức khỏe hàng ngày. Hãy bắt
            đầu hành trình theo dõi sức khỏe cùng chúng tôi!
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#72C15F",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  topSection: {
    height: "70%",
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  cloudImage: {
    width: "100%",
    height: "100%",
  },
  logo: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
