import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const LoginComp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('YOUR_LOGIN_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        Alert.alert("You're logged in successfully!");
        // Redirect logic here if needed
      } else {
        const errorData = await response.json();
        setLoading(false);
        const errorMessage = (errorData as { message?: string })?.message || 'Unknown error';
        Alert.alert("Login failed", errorMessage);
      }
    } catch (err) {
      setLoading(false);
      const errorMessage = (err as { message?: string })?.message || 'Unknown error';
      Alert.alert("Login failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>
      <Text style={styles.linkText}>
        <Text style={styles.link} onPress={() => router.replace("/home")}>
          Home
        </Text>
        <Text> | </Text>
        <Text>Don't have an account?</Text>
        <Text style={styles.link} onPress={() => router.replace("/register")}>
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkText: {
    marginTop: 10,
    fontSize: 16,
  },
  link: {
    color: "blue",
  },
});

export default LoginComp;
