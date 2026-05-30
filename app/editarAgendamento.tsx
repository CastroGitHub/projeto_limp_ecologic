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

export default function EditarAgendamento() {
  const { id } = useLocalSearchParams();

  // 🔥 pega o agendamento pelo ID
  const agendamento = fakeDatabase.agendamentos.find(
    (item) => item.id === id
  );

  // 🔥 estados (campos editáveis)
  const [nome, setNome] = useState(agendamento?.nome || "");
  const [hora, setHora] = useState(agendamento?.hora || "");
  const [descricao, setDescricao] = useState(
    agendamento?.descricao || ""
  );

  // 🔥 salvar edição
  function salvar() {
    const index = fakeDatabase.agendamentos.findIndex(
      (item) => item.id === id
    );

    if (index !== -1) {
      fakeDatabase.agendamentos[index] = {
        ...fakeDatabase.agendamentos[index],
        nome,
        hora,
        descricao,
      };
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar agendamento:</Text>

      <View style={styles.card}>
        {/* Nome */}
        <TextInput
          style={styles.nome}
          value={nome}
          onChangeText={setNome}
        />

        {/* Hora */}
        <TextInput
          style={styles.hora}
          value={hora}
          onChangeText={setHora}
        />

        {/* Descrição */}
        <TextInput
          style={styles.descricao}
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        {/* Botões */}
        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => router.back()}
          >
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnFinalizar} onPress={salvar}>
            <Text style={styles.textoBotao}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2196F3",
  },

  nome: {
    color: "#2196F3",
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  hora: {
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  descricao: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
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

  btnFinalizar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
  },
});