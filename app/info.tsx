import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { fakeDatabase } from "../database";

export default function InfoScreen() {
  const { id } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [cliente, setCliente] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const encontrado = fakeDatabase.clientes.find((c) => c.id == id);
    setCliente({ ...encontrado });
  }, []);

  // ✅ SALVAR
  const handleSave = () => {
    const index = fakeDatabase.clientes.findIndex((c) => c.id == id);

    if (index !== -1) {
      fakeDatabase.clientes[index] = cliente;
    }

    setIsEditing(false);
  };

  // ✅ DELETAR
  const confirmDelete = () => {
    fakeDatabase.clientes = fakeDatabase.clientes.filter(
      (c) => c.id != id
    );

    setShowDeleteModal(false);
    router.back();
  };

  if (!cliente) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {isEditing ? "Editando um cliente" : "Informações do cliente"}
          </Text>

          {/* Nome */}
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={cliente.nome}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, nome: text })
            }
          />

          {/* Telefone */}
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={cliente.telefone}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, telefone: text })
            }
          />

          {/* Cidade */}
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            value={cliente.cidade}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, cidade: text })
            }
          />

          {/* Bairro */}
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            value={cliente.bairro}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, bairro: text })
            }
          />

          {/* Endereço */}
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={cliente.endereco}
            editable={isEditing}
            multiline
            onChangeText={(text) =>
              setCliente({ ...cliente, endereco: text })
            }
          />

          {/* Status + Ano */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Status</Text>
              <Picker
                enabled={isEditing}
                selectedValue={cliente.status}
                onValueChange={(value) =>
                  setCliente({ ...cliente, status: value })
                }
              >
                <Picker.Item label="Pendente" value="Pendente" />
                <Picker.Item label="Agendado" value="Agendado" />
                <Picker.Item label="Realizado" value="Realizado" />
              </Picker>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Ano</Text>
              <Picker
                enabled={isEditing}
                selectedValue={cliente.ano}
                onValueChange={(value) =>
                  setCliente({ ...cliente, ano: value })
                }
              >
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((a) => (
                  <Picker.Item key={a} label={String(a)} value={String(a)} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Observações */}
          <Text style={styles.label}>Observações:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={cliente.obs}
            editable={isEditing}
            multiline
            onChangeText={(text) =>
              setCliente({ ...cliente, obs: text })
            }
          />

          {/* BOTÕES */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            {/* EDITAR / FINALIZAR */}
            <TouchableOpacity
              style={isEditing ? styles.finishButton : styles.editButton}
              onPress={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Finalizar" : "✏️"}
              </Text>
            </TouchableOpacity>

            {/* LIXEIRA */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setShowDeleteModal(true)}
            >
              <MaterialIcons name="delete" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 🔥 MODAL DE CONFIRMAÇÃO */}
      <Modal transparent visible={showDeleteModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Você deseja excluir o(a){"\n"}
              cliente{" "}
              <Text style={{ color: "#0099ff" }}>{cliente.nome}</Text>?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesButton}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#dcdcdc", justifyContent: "space-between" },
  topBar: { height: 15, backgroundColor: "#0099ff" },
  bottomBar: { height: 15, backgroundColor: "#0099ff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    width: "90%",
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5aa2e6",
    padding: 15,
  },

  title: { textAlign: "center", fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 12, marginTop: 6 },

  input: {
    borderWidth: 1,
    borderColor: "#0099ff",
    borderRadius: 8,
    padding: 8,
    marginTop: 3,
    backgroundColor: "#fff",
  },

  textArea: { height: 60 },

  row: { flexDirection: "row", gap: 10 },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },

  backButton: {
    backgroundColor: "#3b7bbf",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  backText: { color: "#fff", fontWeight: "bold" },

  editButton: {
    backgroundColor: "#4da6ff",
    padding: 10,
    borderRadius: 20,
  },

  finishButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
  },

  deleteButton: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 20,
  },

  buttonText: { color: "#fff", fontWeight: "bold" },

  // 🔥 MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalText: {
    textAlign: "center",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 15,
  },

  noButton: {
    backgroundColor: "#3b7bbf",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  yesButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});