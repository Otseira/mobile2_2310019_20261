import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MiniKalkulator() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [hasil, setHasil] = useState<string | number>("-");

  // Fungsi kalkulasi yang lebih ringkas
  const hitung = (op: string) => {
    const n1 = parseFloat(angka1);
    const n2 = parseFloat(angka2);

    if (isNaN(n1) || isNaN(n2)) {
      setHasil("Mohon masukkan kedua angka!");
      return;
    }

    if (op === "+") setHasil(n1 + n2);
    else if (op === "-") setHasil(n1 - n2);
    else if (op === "×") setHasil(n1 * n2);
    else if (op === "÷") setHasil(n2 === 0 ? "Error: Pembagi nol!" : n1 / n2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator Sederhana</Text>

      {/* Input Angka Pertama */}
      <Text style={styles.label}>Angka Pertama</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan angka pertama"
        keyboardType="numeric"
        value={angka1}
        onChangeText={setAngka1}
      />

      {/* Input Angka Kedua */}
      <Text style={styles.label}>Angka Kedua</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan angka kedua"
        keyboardType="numeric"
        value={angka2}
        onChangeText={setAngka2}
      />

      {/* Baris Tombol Operasi dengan Array.map (lebih ringkas) */}
      <View style={styles.buttonRow}>
        {["+", "-", "×", "÷"].map((op) => (
          <TouchableOpacity
            key={op}
            style={styles.button}
            onPress={() => hitung(op)}
          >
            <Text style={styles.buttonText}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kartu Hasil */}
      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Hasil Perhitungan:</Text>
        <Text style={styles.resultValue}>{hasil}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#212529",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#495057",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#0d6efd",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  resultCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
  },
});
