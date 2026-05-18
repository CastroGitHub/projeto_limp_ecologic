import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// Importa o banco fake
import { fakeDatabase } from "../database"; // ajuste o caminho se necessário

export default function Cadastro() {
  // Estados para capturar os inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = () => {
    // Validação básica de campos vazios
    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação de senha
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    // Verifica se o usuário já existe
    const usuarioExiste = fakeDatabase.users.some(u => u.usuario.toLowerCase() === usuario.toLowerCase());
    if (usuarioExiste) {
      Alert.alert("Erro", "Este nome de usuário já está sendo usado.");
      return;
    }

    // Salva no array global
    fakeDatabase.users.push({ nome, email, usuario, senha });

    Alert.alert("Sucesso!", "Conta criada com sucesso!", [
      { text: "OK", onPress: () => router.back() } // Volta para a tela de login sozinha
    ]);
  };

  return (
    <ImageBackground
      source={require("../assets/images/gotas.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Crie sua conta!</Text>

            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo:</Text>
              <TextInput
                placeholder="Ex: Gabriel Souza Reis"
                placeholderTextColor="#999"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                placeholder="Ex: gabrielreis@gmail.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Usuário */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuário:</Text>
              <TextInput
                placeholder="Ex: GabrielR"
                placeholderTextColor="#999"
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
              />
            </View>

            {/* Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                placeholder="Ex: 123456"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            {/* Confirmar senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar senha:</Text>
              <TextInput
                placeholder="Ex: 123456"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,140,255,0.72)",
  },

  safe: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 35,
    paddingTop: 20,
    paddingBottom: 60,
  },

  backButton: {
    marginBottom: 40,
  },

  backText: {
    color: "#fff",
    fontSize: 42,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 55,
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#f1f1f1",
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#000",
  },

  button: {
    backgroundColor: "#7ED321",
    width: 170,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 35,
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});