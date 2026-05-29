import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const YEAR = 2026;

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Função que gera os dias do calendário
function gerarCalendario(mes: number) {
  const primeiroDia = new Date(YEAR, mes, 1).getDay(); // 0 = domingo
  const totalDias = new Date(YEAR, mes + 1, 0).getDate();

  let dias: (number | null)[] = [];

  // espaços vazios no começo
  for (let i = 0; i < primeiroDia; i++) {
    dias.push(null);
  }

  // dias do mês
  for (let i = 1; i <= totalDias; i++) {
    dias.push(i);
  }

  return dias;
}

export default function Agenda() {
  const navigation = useNavigation();

  const [mesSelecionado, setMesSelecionado] = useState(3); // Abril

  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth();
  const anoHoje = hoje.getFullYear();

  const dias = gerarCalendario(mesSelecionado);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Calendário <Text style={{ color: "green" }}>LimpApp!</Text> 
      </Text>

      {/* Dropdown */}
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

      {/* Dias da semana */}
      <View style={styles.semana}>
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <Text key={i} style={styles.diaSemana}>
            {d}
          </Text>
        ))}
      </View>

      {/* Calendário */}
      <FlatList
        data={dias}
        numColumns={7}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const isHoje =
            item === diaHoje &&
            mesSelecionado === mesHoje &&
            anoHoje === YEAR;

          return (
            <View style={styles.diaContainer}>
              {item && (
                <View
                  style={[
                    styles.bolinha,
                    isHoje && { backgroundColor: "#4CAF50" },
                  ]}
                >
                  <Text style={{ color: "white" }}>{item}</Text>
                </View>
              )}
            </View>
          );
        }}
      />

      {/* Botões */}
      <TouchableOpacity style={styles.btnCriar}>
        <Text style={{ color: "white" }}>+ Criar evento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={() => navigation.navigate("home" as never)}
      >
        <Text style={{ color: "white" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    marginTop: 70,
    fontSize: 18,
    marginBottom: 70,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  semana: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    
  },
  diaSemana: {
    width: 30,
    textAlign: "center",
    color: "#555",

  },
  diaContainer: {
    width: "14.2%",
    alignItems: "center",
    marginVertical: 5,
  },
  bolinha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCriar: {
    position: 'absolute',
    marginTop: 650,
    backgroundColor: "green",
    padding: 13,
    borderRadius: 20,
  },
  btnVoltar: {
    position:'absolute',
    marginTop: 720,
    backgroundColor: "#5c7ea5",
    padding: 13,
    borderRadius: 20,
  },
});