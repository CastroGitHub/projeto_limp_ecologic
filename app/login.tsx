import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// Importa o banco fake
import { fakeDatabase } from "../database"; // ajuste o caminho se necessário

export default function Login() {
  const [usuarioInput, setUsuarioInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");

  const handleLogin = () => {
    // Procura o usuário na lista do fakeDatabase
    const usuarioEncontrado = fakeDatabase.users.find(
      (u) => u.usuario.toLowerCase() === usuarioInput.toLowerCase() && u.senha === senhaInput
    );

    if (usuarioEncontrado) {
      // Guarda o usuário atual para a Home saber quem logou
      fakeDatabase.currentUser = usuarioEncontrado;
      
      // Limpa os campos antes de navegar (boa prática)
      setUsuarioInput("");
      setSenhaInput("");

      // Navega para a Home
      router.replace("/home"); // Use replace para o usuário não voltar pro login ao apertar o botão "voltar" do celular
    } else {
      // Se der errado, joga o alerta na tela
      Alert.alert("Erro de Autenticação", "Usuário ou senha incorretos.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/gotas.png")}
      style={styles.background}
      blurRadius={2}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.avatar} />

        <Text style={styles.title}>Faça seu login!</Text>

        <TextInput
          placeholder="Digite o seu usuário"
          placeholderTextColor="#3b6ea5"
          style={styles.input}
          value={usuarioInput}
          onChangeText={setUsuarioInput}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#3b6ea5"
          secureTextEntry
          style={styles.input}
          value={senhaInput}
          onChangeText={setSenhaInput}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Caso necessite, você pode:</Text>
          <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/cadastro")}>
            <Text style={styles.registerButtonText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1696f5",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,140,255,0.75)",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#d9d9d9",
    marginBottom: 30,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },

  loginButton: {
    backgroundColor: "#7ED321",
    width: 140,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 120,
    alignItems: "center",
  },

  footerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
  },

  registerButton: {
    backgroundColor: "#4c79a8",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },

  registerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});