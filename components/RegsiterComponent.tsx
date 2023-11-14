import React, { useState, useEffect } from "react";
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

const RegisterComp: React.FC = () => {
  const [Name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmedPasswordChange = (text: string) => {
    setConfirmedPassword(text);
  };

  const handleLoginNavigation = () => {
    // Navigate to the login screen
    router.push("/login"); // You might need to adjust the route path based on your navigation setup
  };

  const handleSubmit = async () => {
    if (password !== confirmedPassword) {
      Alert.alert("Error!", "Password did not match, Bruh!");
    } else {
      setLoading(true);
      try {
        const response = await fetch('YOUR_REGISTER_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: Name,
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          Alert.alert("Well done, Bruh! You did it! You broke the Matrix");
          handleLoginNavigation();
        } else {
          const errorData = await response.json();
          setLoading(false);
          const errorMessage = (errorData as { message?: string })?.message || 'Unknown error';
          Alert.alert("There was an Error", errorMessage);
        }
      } catch (err) {
        setLoading(false);
        const errorMessage = (err as { message?: string })?.message || 'Unknown error';
        Alert.alert("There was an Error", errorMessage);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={Name}
          onChangeText={handleNameChange}
          placeholder="Enter your Name"
        />
      </View>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={confirmedPassword}
          onChangeText={handleConfirmedPasswordChange}
          placeholder="Confirm password"
          secureTextEntry
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </Pressable>
      <Text style={styles.linkText}>
        <Text style={styles.link} onPress={() => router.push("/home")}>
          Home
        </Text>
        <Text> | </Text>
        <Text>Already have an account?</Text>
        <Text style={styles.link} onPress={() => router.push("/login")}>
          {" "}
          Login
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

export default RegisterComp;
