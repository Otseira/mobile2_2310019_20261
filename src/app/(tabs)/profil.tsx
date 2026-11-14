import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilScreen() {
  // Form State yang bisa diinput & diedit
  const [nama, setNama] = useState("Luthfi Ariesto Prayoga");
  const [email, setEmail] = useState("luthfi.ariesto@kampus.ac.id");
  const [noHp, setNoHp] = useState("081234567890");
  const [nim, setNim] = useState("2310019");

  // Setting Switches
  const [soundNotif, setSoundNotif] = useState(true);
  const [autoPrint, setAutoPrint] = useState(false);

  const handleSimpanProfil = () => {
    if (!nama.trim() || !email.trim()) {
      Alert.alert("Validasi Gagal", "Nama dan Email wajib diisi.");
      return;
    }

    Alert.alert(
      "Profil Disimpan",
      `Data profil ${nama.trim()} berhasil diperbarui secara lokal.`,
    );
  };

  const handleLogout = () => {
    Alert.alert("Konfirmasi Keluar", "Apakah Anda yakin ingin keluar dari akun?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Kartu Profil & Avatar */}
      <View style={[tabStyles.card, { alignItems: "center" }]}>
        <View style={tabStyles.profileAvatar}>
          <Ionicons name="person" size={32} color="#2563EB" />
        </View>
        <Text style={tabStyles.sectionTitle}>{nama || "Pengguna"}</Text>
        <Text style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
          {email || "email@kampus.ac.id"}
        </Text>
        <View style={[tabStyles.badgeBlue, { marginTop: 8 }]}>
          <Text style={tabStyles.badgeBlueText}>Kasir Aktif • Mobile 2</Text>
        </View>
      </View>

      {/* Formulir Edit Profil (Bisa Diinput) */}
      <View style={tabStyles.card}>
        <View style={tabStyles.cardHeaderRow}>
          <Text style={[tabStyles.sectionTitle, { fontSize: 15 }]}>
            Informasi Akun
          </Text>
          <Ionicons name="create-outline" size={18} color="#2563EB" />
        </View>

        {/* Input Nama */}
        <View style={tabStyles.formInputGroup}>
          <Text style={tabStyles.formLabel}>Nama Lengkap</Text>
          <TextInput
            style={tabStyles.formTextInput}
            value={nama}
            onChangeText={setNama}
            placeholder="Masukkan nama lengkap"
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Input Email */}
        <View style={tabStyles.formInputGroup}>
          <Text style={tabStyles.formLabel}>Alamat Email</Text>
          <TextInput
            style={tabStyles.formTextInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="nama@kampus.ac.id"
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Input NIM & No HP */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
            <Text style={tabStyles.formLabel}>NIM / ID Kasir</Text>
            <TextInput
              style={tabStyles.formTextInput}
              value={nim}
              onChangeText={setNim}
              keyboardType="numeric"
              placeholder="NIM"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
            <Text style={tabStyles.formLabel}>No. Handphone</Text>
            <TextInput
              style={tabStyles.formTextInput}
              value={noHp}
              onChangeText={setNoHp}
              keyboardType="phone-pad"
              placeholder="08..."
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Tombol Simpan Perubahan */}
        <TouchableOpacity
          style={[tabStyles.primaryBtn, { marginTop: 6 }]}
          activeOpacity={0.8}
          onPress={handleSimpanProfil}
        >
          <Ionicons name="save-outline" size={17} color="#FFFFFF" />
          <Text style={tabStyles.primaryBtnText}>Simpan Perubahan Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Pengaturan Aplikasi & Perangkat */}
      <View style={tabStyles.card}>
        <Text style={[tabStyles.sectionTitle, { fontSize: 15, marginBottom: 12 }]}>
          Preferensi Kasir
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#0F172A" }}>
              Suara Notifikasi Transaksi
            </Text>
            <Text style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>
              Mainkan suara "beep" saat pembayaran berhasil
            </Text>
          </View>
          <Switch
            value={soundNotif}
            onValueChange={setSoundNotif}
            trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
            thumbColor={soundNotif ? "#2563EB" : "#94A3B8"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#0F172A" }}>
              Cetak Struk Otomatis
            </Text>
            <Text style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>
              Kirim perintah cetak nota ke printer bluetooth
            </Text>
          </View>
          <Switch
            value={autoPrint}
            onValueChange={setAutoPrint}
            trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
            thumbColor={autoPrint ? "#2563EB" : "#94A3B8"}
          />
        </View>
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity
        style={tabStyles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={19} color="#DC2626" />
        <Text style={tabStyles.logoutButtonText}>Keluar dari Akun</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
