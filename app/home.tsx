import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { fakeDatabase } from "../database";

export default function HomeScreen() {
  const userName = fakeDatabase.currentUser
    ? fakeDatabase.currentUser.nome.toUpperCase()
    : "VISITANTE";

  const handleLogout = () => {
    fakeDatabase.currentUser = null;
    router.replace("/");
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
          <View style={styles.row}>
            <TouchableOpacity style={[styles.menuButton, styles.activeButton]}>
              <FontAwesome5 name="calendar-alt" size={40} color="#0099ff" />
              <Text style={[styles.buttonText, styles.activeText]}>Agenda</Text>
            </TouchableOpacity>

            {/* ✅ BOTÃO CLIENTES FUNCIONANDO */}
            <TouchableOpacity
              style={[styles.menuButton, styles.activeButton]}
              onPress={() => router.push("/cliente")}
            >
              <FontAwesome5 name="user-alt" size={40} color="#0099ff" />
              <Text style={[styles.buttonText, styles.activeText]}>
                Clientes
              </Text>
            </TouchableOpacity>
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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userName: {
    color: '#0099ff',
  },
  subText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  gridContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 30,
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
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#dbdbdb',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  activeText: {
    color: '#0099ff',
  },
  logoutButton: {
    backgroundColor: '#3b7bbf',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});