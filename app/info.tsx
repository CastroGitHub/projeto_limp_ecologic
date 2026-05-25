import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fakeDatabase } from "../database";

export default function InfoScreen() {
  const { id } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    const encontrado = fakeDatabase.clientes.find((c) => c.id == id);
    setCliente({ ...encontrado });
  }, []);

  const handleSave = () => {
    const index = fakeDatabase.clientes.findIndex((c) => c.id == id);

    if (index !== -1) {
      fakeDatabase.clientes[index] = cliente;
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert("Excluir", "Deseja excluir este cliente?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: () => {
          fakeDatabase.clientes = fakeDatabase.clientes.filter(
            (c) => c.id != id
          );
          router.back();
        },
      },
    ]);
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

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={cliente.nome}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, nome: text })
            }
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={cliente.telefone}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, telefone: text })
            }
          />

          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            value={cliente.cidade}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, cidade: text })
            }
          />

          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            value={cliente.bairro}
            editable={isEditing}
            onChangeText={(text) =>
              setCliente({ ...cliente, bairro: text })
            }
          />

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

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <MaterialIcons name="delete" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
});