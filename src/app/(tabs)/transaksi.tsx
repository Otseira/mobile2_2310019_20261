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

interface TransaksiItem {
  id: string;
  pelanggan: string;
  produk: string;
  qty: number;
  total: number;
  waktu: string;
}

const INITIAL_TRANSAKSI: TransaksiItem[] = [
  {
    id: "TRX-001",
    pelanggan: "Umum / Walk-in",
    produk: "Minyak Goreng 2L x 2",
    qty: 2,
    total: 76000,
    waktu: "10:15 WIB",
  },
  {
    id: "TRX-002",
    pelanggan: "Ibu Rahma",
    produk: "Beras Premium 5kg x 1",
    qty: 1,
    total: 72500,
    waktu: "11:02 WIB",
  },
  {
    id: "TRX-003",
    pelanggan: "Pak Joko",
    produk: "Gula Pasir 1kg x 3",
    qty: 3,
    total: 52500,
    waktu: "13:20 WIB",
  },
];

const PRODUK_PILIHAN = [
  { nama: "Minyak Goreng 2L", harga: 38000 },
  { nama: "Beras Premium 5kg", harga: 72500 },
  { nama: "Gula Pasir 1kg", harga: 17500 },
  { nama: "Air Mineral 600ml", harga: 4000 },
  { nama: "Kopi Sachet Pack", harga: 15000 },
];

export default function TransaksiScreen() {
  const [activeTab, setActiveTab] = useState<"input" | "riwayat">("input");
  const [transaksiList, setTransaksiList] =
    useState<TransaksiItem[]>(INITIAL_TRANSAKSI);

  // Form State
  const [pelanggan, setPelanggan] = useState("");
  const [selectedProdukIndex, setSelectedProdukIndex] = useState(0);
  const [jumlah, setJumlah] = useState("1");
  const [diskon, setDiskon] = useState("0");

  const currentProduk = PRODUK_PILIHAN[selectedProdukIndex];
  const qtyNumber = parseInt(jumlah, 10) || 0;
  const diskonNumber = parseInt(diskon, 10) || 0;
  const subtotal = currentProduk.harga * qtyNumber;
  const grandTotal = Math.max(0, subtotal - diskonNumber);

  const handleProsesTransaksi = () => {
    if (qtyNumber <= 0) {
      Alert.alert("Input Salah", "Jumlah beli minimal 1 item.");
      return;
    }

    const now = new Date();
    const jam = String(now.getHours()).padStart(2, "0");
    const menit = String(now.getMinutes()).padStart(2, "0");

    const newTrx: TransaksiItem = {
      id: `TRX-${String(transaksiList.length + 1).padStart(3, "0")}`,
      pelanggan: pelanggan.trim() || "Pelanggan Umum",
      produk: `${currentProduk.nama} x ${qtyNumber}`,
      qty: qtyNumber,
      total: grandTotal,
      waktu: `${jam}:${menit} WIB`,
    };

    setTransaksiList([newTrx, ...transaksiList]);
    setPelanggan("");
    setJumlah("1");
    setDiskon("0");

    Alert.alert(
      "Transaksi Berhasil!",
      `Nota ${newTrx.id}\nPelanggan: ${newTrx.pelanggan}\nTotal: Rp ${grandTotal.toLocaleString("id-ID")}`,
      [
        {
          text: "Lihat Riwayat",
          onPress: () => setActiveTab("riwayat"),
        },
        { text: "OK" },
      ],
    );
  };

  const totalOmset = transaksiList.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Tab Switcher: Input vs Riwayat */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E2E8F0",
          borderRadius: 12,
          padding: 4,
          gap: 4,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: activeTab === "input" ? "#FFFFFF" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setActiveTab("input")}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: activeTab === "input" ? "#2563EB" : "#64748B",
            }}
          >
            Input Transaksi Baru
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: activeTab === "riwayat" ? "#FFFFFF" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setActiveTab("riwayat")}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: activeTab === "riwayat" ? "#2563EB" : "#64748B",
            }}
          >
            Riwayat ({transaksiList.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "input" ? (
        /* Formulir Kasir Transaksi Baru */
        <View style={tabStyles.card}>
          <View style={tabStyles.cardHeaderRow}>
            <View style={tabStyles.badgeGreen}>
              <Ionicons name="cart" size={13} color="#059669" />
              <Text style={tabStyles.badgeGreenText}>Kasir Interaktif</Text>
            </View>
            <Text style={{ fontSize: 12, color: "#64748B" }}>Mode Cepat</Text>
          </View>

          <Text style={tabStyles.sectionTitle}>Formulir Kasir</Text>
          <Text style={tabStyles.sectionSubtitle}>
            Masukkan data pembeli dan barang untuk menghitung total otomatis.
          </Text>

          {/* Input Nama Pelanggan */}
          <View style={[tabStyles.formInputGroup, { marginTop: 14 }]}>
            <Text style={tabStyles.formLabel}>Nama Pelanggan (Opsional)</Text>
            <TextInput
              style={tabStyles.formTextInput}
              placeholder="Contoh: Budi Santoso"
              placeholderTextColor="#94A3B8"
              value={pelanggan}
              onChangeText={setPelanggan}
            />
          </View>

          {/* Pilih Barang */}
          <View style={tabStyles.formInputGroup}>
            <Text style={tabStyles.formLabel}>Pilih Item Belanja</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
            >
              {PRODUK_PILIHAN.map((prod, idx) => {
                const isSelected = selectedProdukIndex === idx;
                return (
                  <TouchableOpacity
                    key={prod.nama}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderRadius: 12,
                      backgroundColor: isSelected ? "#EFF6FF" : "#F8FAFC",
                      borderWidth: 1,
                      borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                    }}
                    onPress={() => setSelectedProdukIndex(idx)}
                  >
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: "700",
                        color: isSelected ? "#2563EB" : "#0F172A",
                      }}
                    >
                      {prod.nama}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11.5,
                        color: isSelected ? "#2563EB" : "#64748B",
                        marginTop: 2,
                      }}
                    >
                      Rp {prod.harga.toLocaleString("id-ID")}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Row Jumlah & Potongan */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
              <Text style={tabStyles.formLabel}>Kuantitas (Qty)</Text>
              <TextInput
                style={tabStyles.formTextInput}
                placeholder="1"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={jumlah}
                onChangeText={setJumlah}
              />
            </View>
            <View style={[tabStyles.formInputGroup, { flex: 1 }]}>
              <Text style={tabStyles.formLabel}>Potongan / Diskon (Rp)</Text>
              <TextInput
                style={tabStyles.formTextInput}
                placeholder="0"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={diskon}
                onChangeText={setDiskon}
              />
            </View>
          </View>

          {/* Ringkasan Perhitungan Real-Time */}
          <View
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              marginVertical: 10,
              gap: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12.5, color: "#64748B" }}>
                Harga Satuan
              </Text>
              <Text style={{ fontSize: 12.5, fontWeight: "600", color: "#0F172A" }}>
                Rp {currentProduk.harga.toLocaleString("id-ID")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12.5, color: "#64748B" }}>Kuantitas</Text>
              <Text style={{ fontSize: 12.5, fontWeight: "600", color: "#0F172A" }}>
                x {qtyNumber} item
              </Text>
            </View>
            {diskonNumber > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12.5, color: "#DC2626" }}>Diskon</Text>
                <Text style={{ fontSize: 12.5, fontWeight: "600", color: "#DC2626" }}>
                  - Rp {diskonNumber.toLocaleString("id-ID")}
                </Text>
              </View>
            )}
            <View
              style={{
                height: 1,
                backgroundColor: "#E2E8F0",
                marginVertical: 4,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#0F172A" }}>
                Total Bayar:
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "800", color: "#059669" }}>
                Rp {grandTotal.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>

          {/* Tombol Simpan Transaksi */}
          <TouchableOpacity
            style={[tabStyles.primaryBtn, { backgroundColor: "#059669" }]}
            activeOpacity={0.8}
            onPress={handleProsesTransaksi}
          >
            <Ionicons name="receipt-outline" size={18} color="#FFFFFF" />
            <Text style={tabStyles.primaryBtnText}>
              Bayar &amp; Cetak Transaksi
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Riwayat Transaksi */
        <View style={{ gap: 12 }}>
          <View style={tabStyles.card}>
            <View style={tabStyles.cardHeaderRow}>
              <Text style={tabStyles.sectionTitle}>Rekap Penjualan Hari Ini</Text>
              <View style={tabStyles.badgeGreen}>
                <Text style={tabStyles.badgeGreenText}>
                  {transaksiList.length} Transaksi
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 22, fontWeight: "800", color: "#2563EB", marginTop: 4 }}>
              Rp {totalOmset.toLocaleString("id-ID")}
            </Text>
          </View>

          {transaksiList.map((trx) => (
            <View key={trx.id} style={tabStyles.listItemCard}>
              <View style={tabStyles.listItemLeft}>
                <View style={tabStyles.iconBoxGreen}>
                  <Ionicons name="receipt" size={20} color="#059669" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={tabStyles.listItemTitle}>{trx.id}</Text>
                  <Text style={tabStyles.listItemMeta}>
                    {trx.pelanggan} • {trx.waktu}
                  </Text>
                  <Text style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 2 }}>
                    {trx.produk}
                  </Text>
                </View>
              </View>
              <Text style={[tabStyles.listItemPrice, { color: "#059669" }]}>
                Rp {trx.total.toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
