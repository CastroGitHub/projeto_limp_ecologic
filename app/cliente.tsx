import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { fakeDatabase } from "../database";

export default function ClienteScreen() {
  const [ano, setAno] = useState("2026");
  const [mes, setMes] = useState("Abril");
  const [status, setStatus] = useState("Pendente");

  // 🔥 AGORA VEM DO BANCO
const [clientes, setClientes] = useState(fakeDatabase.clientes);

  useFocusEffect(
  useCallback(() => {
    // 🔥 sempre que voltar pra tela, atualiza
    setClientes([...fakeDatabase.clientes]);
  }, [])
);

  const anos = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const statusList = ["Pendente", "Agendado", "Realizado"];

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.bairro}>Bairro: {item.bairro}</Text>
        <Text style={styles.desc}>{item.obs || "-"}</Text>
      </View>

      {/* 🔥 AGORA PASSA O ID CORRETO */}
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => router.push(`/info?id=${item.id}`)}
      >
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>Meus clientes</Text>

      {/* Dropdowns */}
      <View style={styles.filters}>
        <Picker selectedValue={ano} style={styles.picker} onValueChange={setAno}>
          {anos.map((a) => (
            <Picker.Item key={a} label={a} value={a} />
          ))}
        </Picker>

        <Picker selectedValue={mes} style={styles.picker} onValueChange={setMes}>
          {meses.map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>

        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={setStatus}
        >
          {statusList.map((s) => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </View>

      {/* Lista */}
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => router.push("/novoCliente")}>
          <Text style={styles.newButtonText}>+ Novo cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  picker: {
    flex: 1,
    height: 50,
  },

  listContent: {
    paddingBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#dfeaf5",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5aa2e6",
    marginBottom: 12,
  },

  cardText: {
    flex: 1,
  },

  nome: {
    fontWeight: "bold",
    color: "#1e6bb8",
    marginBottom: 2,
  },

  bairro: {
    fontSize: 12,
  },

  desc: {
    fontSize: 12,
  },

  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1e6bb8",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  infoText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonsContainer: {
    marginTop: 10,
    marginBottom: 100,
    width: "100%",
  },

  newButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },

  newButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  backButton: {
    backgroundColor: "#2f6ea5",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },

  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});