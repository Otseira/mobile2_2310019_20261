import { authStyles } from "@/styles/authStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState<
    "nama" | "email" | "password" | "confirm" | null
  >(null);

  const handleRegister = () => {
    if (
      !nama.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Form Belum Lengkap", "Semua kolom pendaftaran wajib diisi.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Kata Sandi Lemah",
        "Kata sandi minimal terdiri dari 6 karakter.",
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "Kata Sandi Berbeda",
        "Konfirmasi kata sandi tidak sama dengan kata sandi.",
      );
      return;
    }

    Alert.alert(
      "Pendaftaran Berhasil!",
      `Akun ${nama.trim()} berhasil didaftarkan. Silakan login.`,
      [{ text: "Menuju Login", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Tombol Kembali */}
          <TouchableOpacity
            style={authStyles.topBackButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons name="person-add" size={26} color="#2563EB" />
            </View>
            <Text style={authStyles.title}>Buat Akun Baru</Text>
            <Text style={authStyles.subtitle}>
              Lengkapi data berikut untuk registrasi akun praktikum
            </Text>
          </View>

          <View style={authStyles.card}>
            {/* Input Nama Lengkap */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Nama Lengkap</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "nama" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={focusedField === "nama" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Contoh: Luthfi Ariesto Prayoga"
                  placeholderTextColor="#94A3B8"
                  value={nama}
                  onChangeText={setNama}
                  onFocus={() => setFocusedField("nama")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Input Email */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Alamat Email</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "email" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color={focusedField === "email" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Input Password */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "password" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={19}
                  color={focusedField === "password" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Konfirmasi Password */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Konfirmasi Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "confirm" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={19}
                  color={focusedField === "confirm" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Ulangi kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Ionicons
                    name={showConfirm ? "eye-off-outline" : "eye-outline"}
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tombol Register */}
            <TouchableOpacity
              style={authStyles.primaryButton}
              activeOpacity={0.8}
              onPress={handleRegister}
            >
              <Text style={authStyles.primaryButtonText}>Daftar Sekarang</Text>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={[authStyles.footerRow, { marginTop: 18 }]}>
              <Text style={authStyles.footerText}>Sudah memiliki akun?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={authStyles.footerLink}>Masuk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
