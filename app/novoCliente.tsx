import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { fakeDatabase } from "../database";

export default function NovoClienteScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [obs, setObs] = useState("");

  const [status, setStatus] = useState("Pendente");
  const [ano, setAno] = useState("2026");

  const handleCreate = () => {
    if (!nome) return;

    const novoCliente = {
      id: Date.now().toString(), // 🔥 id único
      nome,
      telefone,
      cidade,
      bairro,
      endereco,
      status,
      ano,
      obs,
    };

    fakeDatabase.clientes.push(novoCliente);

    router.back(); // volta pra lista
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Criando um novo cliente</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Dona Maria"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 11912345678"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: São Paulo"
            value={cidade}
            onChangeText={setCidade}
          />

          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Barueri"
            value={bairro}
            onChangeText={setBairro}
          />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Travessa um violeiro..."
            value={endereco}
            onChangeText={setEndereco}
            multiline
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Status</Text>
              <Picker selectedValue={status} onValueChange={setStatus}>
                <Picker.Item label="Pendente" value="Pendente" />
                <Picker.Item label="Agendado" value="Agendado" />
                <Picker.Item label="Realizado" value="Realizado" />
              </Picker>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Ano</Text>
              <Picker selectedValue={ano} onValueChange={setAno}>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((a) => (
                  <Picker.Item key={a} label={String(a)} value={String(a)} />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Observações:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Cachorro bravo"
            value={obs}
            onChangeText={setObs}
            multiline
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
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Text style={styles.createText}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    justifyContent: "space-between",
  },

  topBar: {
    height: 15,
    backgroundColor: "#0099ff",
  },

  bottomBar: {
    height: 15,
    backgroundColor: "#0099ff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5aa2e6",
    padding: 15,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    marginTop: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#0099ff",
    borderRadius: 8,
    padding: 8,
    marginTop: 3,
    backgroundColor: "#fff",
  },

  textArea: {
    height: 60,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  backButton: {
    backgroundColor: "#3b7bbf",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  backText: {
    color: "#fff",
    fontWeight: "bold",
  },

  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  createText: {
    color: "#fff",
    fontWeight: "bold",
  },
});