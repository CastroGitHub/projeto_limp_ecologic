// @ts-ignore
import { fakeDatabase } from "../database";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function CriarAgendamento() {
  const { dia } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [hora, setHora] = useState("10:00");
  const [descricao, setDescricao] = useState("");

  function criar() {
    if (!nome) return;

    const novo = {
      id: Date.now().toString(),
      dia: Number(dia),
      nome,
      hora,
      descricao,
      concluido: false,
    };

    fakeDatabase.agendamentos.push(novo);

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criando um novo evento</Text>

      <View style={styles.card}>
        <Text>Nome do evento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dona Maria"
          value={nome}
          onChangeText={setNome}
        />

        <Text>Horário:</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
        />

        <Text>Descrição:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Ex: 1 sofá grande"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => router.back()}
          >
            <Text style={{ color: "white" }}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCriar} onPress={criar}>
            <Text style={{ color: "white" }}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },

  titulo: { marginBottom: 20, fontWeight: "bold" },

  card: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2196F3",
  },

  input: {
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 8,
    padding: 8,
    height: 80,
    marginBottom: 20,
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnVoltar: {
    backgroundColor: "#5c7ea5",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },

  btnCriar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },
});