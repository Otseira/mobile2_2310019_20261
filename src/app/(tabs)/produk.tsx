import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProdukItem {
  id: string;
  nama: string;
  kategori: string;
  stok: number;
  harga: number;
}

const INITIAL_PRODUK: ProdukItem[] = [
  { id: "1", nama: "Minyak Goreng 2L", kategori: "Sembako", stok: 45, harga: 38000 },
  { id: "2", nama: "Beras Premium 5kg", kategori: "Sembako", stok: 18, harga: 72500 },
  { id: "3", nama: "Gula Pasir 1kg", kategori: "Sembako", stok: 30, harga: 17500 },
  { id: "4", nama: "Air Mineral 600ml", kategori: "Minuman", stok: 60, harga: 4000 },
  { id: "5", nama: "Kopi Hitam Sachet", kategori: "Minuman", stok: 120, harga: 2500 },
  { id: "6", nama: "Biskuit Cokelat", kategori: "Snack", stok: 25, harga: 11000 },
];

export default function ProdukScreen() {
  const [produkList, setProdukList] = useState<ProdukItem[]>(INITIAL_PRODUK);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [namaInput, setNamaInput] = useState("");
  const [kategoriInput, setKategoriInput] = useState("Sembako");
  const [hargaInput, setHargaInput] = useState("");
  const [stokInput, setStokInput] = useState("");

  const handleTambahProduk = () => {
    if (!namaInput.trim() || !hargaInput.trim() || !stokInput.trim()) {
      Alert.alert("Form Belum Lengkap", "Silakan lengkapi semua kolom produk.");
      return;
    }

    const hargaNum = parseInt(hargaInput.replace(/[^0-9]/g, ""), 10);
    const stokNum = parseInt(stokInput.replace(/[^0-9]/g, ""), 10);

    if (isNaN(hargaNum) || isNaN(stokNum)) {
      Alert.alert("Input Salah", "Harga dan stok harus berupa angka valid.");
      return;
    }

    const newProduk: ProdukItem = {
      id: Date.now().toString(),
      nama: namaInput.trim(),
      kategori: kategoriInput,
      harga: hargaNum,
      stok: stokNum,
    };

    setProdukList([newProduk, ...produkList]);
    setNamaInput("");
    setHargaInput("");
    setStokInput("");
    setIsFormOpen(false);
    Alert.alert("Sukses", `Produk "${newProduk.nama}" berhasil ditambahkan!`);
  };

  const handleHapusProduk = (id: string, nama: string) => {
    Alert.alert("Konfirmasi", `Hapus "${nama}" dari daftar?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          setProdukList((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const filteredProduk = produkList.filter((item) => {
    const matchSearch = item.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchKategori =
      selectedKategori === "Semua" || item.kategori === selectedKategori;
    return matchSearch && matchKategori;
  });

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Kartu Header & Tombol Tambah */}
      <View style={tabStyles.card}>
        <View style={tabStyles.cardHeaderRow}>
          <View style={tabStyles.badgeBlue}>
            <Ionicons name="cube" size={13} color="#2563EB" />
            <Text style={tabStyles.badgeBlueText}>Katalog Inventaris</Text>
          </View>
          <Text style={{ fontSize: 12, color: "#64748B", fontWeight: "600" }}>
            {filteredProduk.length} Barang
          </Text>
        </View>

        <Text style={tabStyles.sectionTitle}>Kelola Produk</Text>
        <Text style={tabStyles.sectionSubtitle}>
          Cari barang atau input produk baru ke dalam database minimarket.
        </Text>

        <TouchableOpacity
          style={[tabStyles.primaryBtn, { marginTop: 14 }]}
          activeOpacity={0.8}
          onPress={() => setIsFormOpen(!isFormOpen)}
        >
          <Ionicons
            name={isFormOpen ? "close-circle" : "add-circle"}
            size={18}
            color="#FFFFFF"
          />
          <Text style={tabStyles.primaryBtnText}>
            {isFormOpen ? "Tutup Form Input" : "Input Produk Baru"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Formulir Input Produk Baru (Bisa Diinput) */}
      {isFormOpen && (
        <View style={tabStyles.card}>
          <Text style={[tabStyles.sectionTitle, { fontSize: 15, marginBottom: 12 }]}>
            Formulir Tambah Produk
          </Text>

          {/* Input Nama Produk */}
          <View style={tabStyles.formInputGroup}>
            <Text style={tabStyles.formLabel}>Nama Produk</Text>
            <TextInput
              style={tabStyles.formTextInput}
              placeholder="Contoh: Susu UHT 1L"
              placeholderTextColor="#94A3B8"
              value={namaInput}
              onChangeText={setNamaInput}
            />
          </View>

          {/* Kategori Selector */}
          <View style={tabStyles.formInputGroup}>
            <Text style={tabStyles.formLabel}>Kategori Produk</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {["Sembako", "Minuman", "Snack"].map((kat) => (
                <TouchableOpacity
                  key={kat}
                  style={[
                    tabStyles.secondaryBtn,
                    {
                      flex: 1,
                      height: 38,
                      backgroundColor:
                        kategoriInput === kat ? "#EFF6FF" : "#F8FAFC",
                      borderColor:
                        kategoriInput === kat ? "#2563EB" : "#E2E8F0",
                    },
                  ]}
                  onPress={() => setKategoriInput(kat)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: kategoriInput === kat ? "#2563EB" : "#64748B",
                    }}
                  >
                    {kat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Row Harga & Stok */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
              <Text style={tabStyles.formLabel}>Harga (Rp)</Text>
              <TextInput
                style={tabStyles.formTextInput}
                placeholder="15000"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={hargaInput}
                onChangeText={setHargaInput}
              />
            </View>
            <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
              <Text style={tabStyles.formLabel}>Jumlah Stok</Text>
              <TextInput
                style={tabStyles.formTextInput}
                placeholder="50"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={stokInput}
                onChangeText={setStokInput}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[tabStyles.primaryBtn, { backgroundColor: "#059669", marginTop: 4 }]}
            activeOpacity={0.8}
            onPress={handleTambahProduk}
          >
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            <Text style={tabStyles.primaryBtnText}>Simpan ke Database</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bar Pencarian */}
      <View style={tabStyles.searchWrapper}>
        <Ionicons name="search" size={18} color="#94A3B8" />
        <TextInput
          style={tabStyles.searchInput}
          placeholder="Cari nama produk..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Kategori Chips */}
      <View style={{ flexDirection: "row", gap: 6 }}>
        {["Semua", "Sembako", "Minuman", "Snack"].map((kategori) => {
          const isSelected = selectedKategori === kategori;
          return (
            <TouchableOpacity
              key={kategori}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: isSelected ? "#2563EB" : "#FFFFFF",
                borderWidth: 1,
                borderColor: isSelected ? "#2563EB" : "#E2E8F0",
              }}
              onPress={() => setSelectedKategori(kategori)}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: isSelected ? "#FFFFFF" : "#64748B",
                }}
              >
                {kategori}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Daftar Produk */}
      {filteredProduk.length === 0 ? (
        <View style={[tabStyles.card, { alignItems: "center", paddingVertical: 28 }]}>
          <Ionicons name="cube-outline" size={36} color="#94A3B8" />
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#64748B", marginTop: 8 }}>
            Tidak ada produk yang cocok
          </Text>
          <Text style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
            Coba ubah kata kunci pencarian atau kategori
          </Text>
        </View>
      ) : (
        filteredProduk.map((item) => (
          <View key={item.id} style={tabStyles.listItemCard}>
            <View style={tabStyles.listItemLeft}>
              <View style={tabStyles.iconBox}>
                <Ionicons name="cube-outline" size={20} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={tabStyles.listItemTitle}>{item.nama}</Text>
                <Text style={tabStyles.listItemMeta}>
                  {item.kategori} • Stok: {item.stok} pcs
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <Text style={tabStyles.listItemPrice}>
                Rp {item.harga.toLocaleString("id-ID")}
              </Text>
              <TouchableOpacity
                onPress={() => handleHapusProduk(item.id, item.nama)}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
