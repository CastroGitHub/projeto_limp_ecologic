import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

export default function AgendaScreen() {

  const currentYear = 2025;

  const months = [
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

  const [selectedMonth, setSelectedMonth] = useState(3);

  // Quantidade de dias do mês
  const daysInMonth = new Date(
    currentYear,
    selectedMonth + 1,
    0
  ).getDate();

  // Dia da semana do primeiro dia
 const firstDay = new Date(
  currentYear,
  selectedMonth,
  1
).getDay();

  // Cria array do calendário
  const calendarDays = [];

  // Espaços vazios
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topBar} />

      <View style={styles.content}>

        <Text style={styles.title}>
          Calendário <Text style={styles.highlight}>LimpApp!</Text>
        </Text>

        {/* Dropdown mês */}
        <View style={styles.monthContainer}>

          <Text style={styles.monthLabel}>
            Mês:
          </Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) =>
                setSelectedMonth(itemValue)
              }
            >
              {months.map((month, index) => (
                <Picker.Item
                  key={index}
                  label={month}
                  value={index}
                />
              ))}
            </Picker>
          </View>

        </View>

        {/* Calendário */}
        <View style={styles.calendar}>

          {/* Dias da semana */}
          <View style={styles.weekDays}>
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
              <Text key={index} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dias */}
          <View style={styles.daysContainer}>

            {calendarDays.map((day, index) => (

              <View
                key={index}
                style={[
                  styles.dayCircle,
                  day === null && styles.emptyDay,
                ]}
              >

                {day !== null && (
                  <Text style={styles.dayText}>
                    {day}
                  </Text>
                )}

              </View>

            ))}

          </View>

        </View>

        {/* Criar evento */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>
            + Criar evento
          </Text>
        </TouchableOpacity>

        {/* Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.bottomBar} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  highlight: {
    color: "#52c41a",
  },

  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  monthLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },

  pickerContainer: {
    width: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },

  calendar: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0099ff",
    borderRadius: 15,
    padding: 15,
  },

  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },

  weekText: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },

  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0099ff",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },

  emptyDay: {
    backgroundColor: "transparent",
  },

  dayText: {
    color: "#fff",
    fontWeight: "bold",
  },

  createButton: {
    marginTop: 35,
    backgroundColor: "#52c41a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  backButton: {
    marginTop: 25,
    backgroundColor: "#3b7bbf",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 25,
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});