import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
// @ts-ignore
import { fakeDatabase } from "../database";

export default function Agendamentos() {
  const { dia } = useLocalSearchParams();
  const diaNumero = Number(dia);

  const [agendamentos, setAgendamentos] = useState(
    fakeDatabase.agendamentos
  );

  // 🔥 modal
  const [modalVisible, setModalVisible] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  const [nomeSelecionado, setNomeSelecionado] = useState("");

  useFocusEffect(
    useCallback(() => {
      setAgendamentos([...fakeDatabase.agendamentos]);
    }, [])
  );

  // ✔ concluir / desfazer
  function concluirAgendamento(id: string) {
    const index = fakeDatabase.agendamentos.findIndex(
      (item) => item.id === id
    );

    if (index !== -1) {
      fakeDatabase.agendamentos[index].concluido =
        !fakeDatabase.agendamentos[index].concluido;
    }

    setAgendamentos([...fakeDatabase.agendamentos]);
  }

  // 🗑 confirmar exclusão
  function confirmarExclusao() {
    const novaLista = fakeDatabase.agendamentos.filter(
      (item) => item.id !== idSelecionado
    );

    fakeDatabase.agendamentos = novaLista;
    setAgendamentos([...novaLista]);

    setModalVisible(false);
  }

  function cancelarExclusao() {
    setModalVisible(false);
  }

  const listaFiltrada = agendamentos.filter(
    (item) => item.dia === diaNumero
  );

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.card,
        item.concluido && styles.cardConcluido,
      ]}
    >
      <Text
        style={[
          styles.nome,
          item.concluido && styles.textoConcluido,
        ]}
      >
        {item.nome}
      </Text>

      <Text
        style={[
          styles.hora,
          item.concluido && styles.textoConcluido,
        ]}
      >
        {item.hora}
      </Text>

      <Text
        style={[
          styles.descricao,
          item.concluido && styles.textoConcluido,
        ]}
      >
        {item.descricao}
      </Text>

      <View style={styles.botoes}>
        {!item.concluido ? (
          <>
            {/* ✔ */}
            <TouchableOpacity
              style={styles.btnCheck}
              onPress={() => concluirAgendamento(item.id)}
            >
              <MaterialIcons name="check" size={20} color="white" />
            </TouchableOpacity>

            {/* ✏ */}
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() =>
                router.push({
                  pathname: "/editarAgendamento",
                  params: { id: item.id },
                })
              }
            >
              <MaterialIcons name="edit" size={20} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* 🔄 */}
            <TouchableOpacity
              style={styles.btnUndo}
              onPress={() => concluirAgendamento(item.id)}
            >
              <MaterialIcons name="undo" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}

        {/* 🗑 */}
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => {
            setIdSelecionado(item.id);
            setNomeSelecionado(item.nome);
            setModalVisible(true);
          }}
        >
          <FontAwesome name="trash" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Agendamentos do dia {diaNumero.toString().padStart(2, "0")}
      </Text>

      {listaFiltrada.length === 0 ? (
        <Text style={styles.vazio}>Nenhum agendamento</Text>
      ) : (
        <FlatList
          data={listaFiltrada}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      {/* BOTÃO VOLTAR */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={{ color: "white" }}>Voltar</Text>
      </TouchableOpacity>

      {/* 🔥 MODAL */}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTexto}>
              Você deseja excluir o agendamento de{" "}
              <Text style={{ color: "#2196F3", fontWeight: "bold" }}>
                {nomeSelecionado}
              </Text>
              ?
            </Text>

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.btnNao}
                onPress={cancelarExclusao}
              >
                <Text style={{ color: "white" }}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSim}
                onPress={confirmarExclusao}
              >
                <Text style={{ color: "white" }}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eee", padding: 20 },

  titulo: {
    marginTop: 50,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  vazio: { textAlign: "center", marginTop: 20, color: "#555" },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2196F3",
  },

  cardConcluido: { backgroundColor: "#2f6ea5" },

  nome: { fontWeight: "bold", color: "#2196F3" },
  hora: { marginTop: 5, fontWeight: "bold" },
  descricao: { marginTop: 5, color: "#555" },

  textoConcluido: { color: "#fff" },

  botoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },

  btnCheck: { backgroundColor: "#4CAF50", padding: 6, borderRadius: 5 },
  btnEdit: { backgroundColor: "#2196F3", padding: 6, borderRadius: 5 },
  btnUndo: { backgroundColor: "#f39c12", padding: 6, borderRadius: 5 },
  btnDelete: { backgroundColor: "#888", padding: 6, borderRadius: 5 },

  btnVoltar: {
    marginTop: 20,
    backgroundColor: "#5c7ea5",
    padding: 13,
    borderRadius: 20,
    alignItems: "center",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },

  modalTexto: {
    textAlign: "center",
    marginBottom: 20,
  },

  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btnNao: {
    backgroundColor: "#5c7ea5",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },

  btnSim: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },
});