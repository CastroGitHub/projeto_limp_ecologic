import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// Importa o banco fake
import { fakeDatabase } from "../database"; // ajuste o caminho se necessário

export default function HomeScreen() {
  // Pega o nome do usuário logado de forma dinâmica. 
  // Se por acaso estiver nulo, exibe "Visitante" por segurança.
  const userName = fakeDatabase.currentUser ? fakeDatabase.currentUser.nome.toUpperCase() : "VISITANTE";

  const handleLogout = () => {
    fakeDatabase.currentUser = null; // Limpa a sessão
    router.replace("/"); // Volta para o index / login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Seja bem vindo(a), <Text style={styles.userName}>{userName}</Text>!
          </Text>
          <Text style={styles.subText}>O que você quer ver agora?</Text>
        </View>

        <View style={styles.gridContainer}>
          {/* Linha 1 */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.menuButton, styles.activeButton]}>
              <FontAwesome5 name="calendar-alt" size={40} color="#0099ff" />
              <Text style={[styles.buttonText, styles.activeText]}>Agenda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, styles.activeButton]}>
              <FontAwesome5 name="user-alt" size={40} color="#0099ff" />
              <Text style={[styles.buttonText, styles.activeText]}>Clientes</Text>
            </TouchableOpacity>
          </View>

          {/* Linhas 2 e 3 (En breve) mantidas iguais... */}
          <View style={styles.row}>
            <View style={[styles.menuButton, styles.disabledButton]}>
              <MaterialCommunityIcons name="clock-fast" size={40} color="#333" />
              <Text style={styles.buttonText}>Em{"\n"}breve</Text>
            </View>
            <View style={[styles.menuButton, styles.disabledButton]}>
              <MaterialCommunityIcons name="clock-fast" size={40} color="#333" />
              <Text style={styles.buttonText}>Em{"\n"}breve</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.menuButton, styles.disabledButton]}>
              <MaterialCommunityIcons name="clock-fast" size={40} color="#333" />
              <Text style={styles.buttonText}>Em{"\n"}breve</Text>
            </View>
            <View style={[styles.menuButton, styles.disabledButton]}>
              <MaterialCommunityIcons name="clock-fast" size={40} color="#333" />
              <Text style={styles.buttonText}>Em{"\n"}breve</Text>
            </View>
          </View>
        </View>

        {/* Botão Sair agora funcional */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

// Estilização com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Corrigido: 'space-between' é o termo correto no React Native
    justifyContent: 'space-between', 
  },
  topBar: {
    height: 15,
    backgroundColor: '#0099ff',
    width: '100%',
  },
  bottomBar: {
    height: 15,
    backgroundColor: '#0099ff',
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center', // Centraliza o bloco do menu verticalmente
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40, // Espaço abaixo da saudação
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  userName: {
    color: '#0099ff',
  },
  subText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
    color: '#000',
  },
  gridContainer: {
    width: '100%',
    maxWidth: 320, 
    marginBottom: 30, // Espaço antes do botão sair
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  activeButton: {
    backgroundColor: '#fff',
    // Sombras tratadas de forma segura para iOS e Android
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#dbdbdb', 
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555', // Tom de cinza escuro para os desativados
  },
  activeText: {
    color: '#0099ff',
  },
  logoutButton: {
    backgroundColor: '#3b7bbf',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});