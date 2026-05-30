import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

const YEAR = 2026;

const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

function gerarCalendario(mes: number) {
  const primeiroDia = new Date(YEAR, mes, 1).getDay();
  const totalDias = new Date(YEAR, mes + 1, 0).getDate();

  let dias: (number | null)[] = [];

  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);

  return dias;
}

export default function Agenda() {
  const [mesSelecionado, setMesSelecionado] = useState(3);

  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth();

  const dias = gerarCalendario(mesSelecionado);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Calendário <Text style={{ color: "green" }}>LimpApp!</Text>
      </Text>

      <View style={styles.dropdown}>
        <Text>Mês:</Text>
        <Picker
          selectedValue={mesSelecionado}
          style={{ width: 150 }}
          onValueChange={(itemValue) => setMesSelecionado(itemValue)}
        >
          {meses.map((mes, index) => (
            <Picker.Item key={index} label={mes} value={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.semana}>
        {["D","S","T","Q","Q","S","S"].map((d, i) => (
          <Text key={i} style={styles.diaSemana}>{d}</Text>
        ))}
      </View>

      <FlatList
        data={dias}
        numColumns={7}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const isHoje =
            item === diaHoje && mesSelecionado === mesHoje;

          return (
            <View style={styles.diaContainer}>
              {item && (
                <TouchableOpacity
                  style={[
                    styles.bolinha,
                    isHoje && { backgroundColor: "#4CAF50" },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/agendamentos",
                      params: { dia: item },
                    })
                  }
                >
                  <Text style={{ color: "white" }}>{item}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={() => router.back()}
      >
        <Text style={{ color: "white" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eee", padding: 20, alignItems: "center" },

  titulo: { marginTop: 70, fontSize: 18, marginBottom: 70 },

  dropdown: { flexDirection: "row", alignItems: "center", marginBottom: 60 },

  semana: { flexDirection: "row", width: "100%", justifyContent: "space-between" },

  diaSemana: { width: 30, textAlign: "center", color: "#555" },

  diaContainer: { width: "14.2%", alignItems: "center", marginVertical: 5 },

  bolinha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },

  btnVoltar: {
    position: "absolute",
    marginTop: 720,
    backgroundColor: "#5c7ea5",
    padding: 13,
    borderRadius: 20,
  },
});