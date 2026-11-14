import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ReportScreen() {
  const [period, setPeriod] = useState<"hari" | "minggu" | "bulan">("hari");

  const getMetrics = () => {
    switch (period) {
      case "minggu":
        return {
          omset: "Rp 12.450.000",
          transaksi: "148 Nota",
          rerata: "Rp 84.120",
          topItem: "Beras Premium 5kg",
        };
      case "bulan":
        return {
          omset: "Rp 48.200.000",
          transaksi: "592 Nota",
          rerata: "Rp 81.400",
          topItem: "Minyak Goreng 2L",
        };
      default:
        return {
          omset: "Rp 1.850.000",
          transaksi: "24 Nota",
          rerata: "Rp 77.080",
          topItem: "Minyak Goreng 2L",
        };
    }
  };

  const metrics = getMetrics();

  const handleExport = (type: string) => {
    Alert.alert(
      "Unduh Laporan",
      `Laporan penjualan periode ${period.toUpperCase()} format ${type} berhasil disiapkan untuk diunduh.`,
    );
  };

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card */}
      <View style={tabStyles.card}>
        <View style={tabStyles.cardHeaderRow}>
          <View style={tabStyles.badgeBlue}>
            <Ionicons name="bar-chart" size={13} color="#2563EB" />
            <Text style={tabStyles.badgeBlueText}>Analitik Toko</Text>
          </View>
          <Text style={{ fontSize: 12, color: "#64748B" }}>Tahun 2026</Text>
        </View>

        <Text style={tabStyles.sectionTitle}>Laporan Penjualan</Text>
        <Text style={tabStyles.sectionSubtitle}>
          Pantau omset, total transaksi, dan performa keuangan kasir secara rapi.
        </Text>

        {/* Filter Periode */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F5F9",
            borderRadius: 10,
            padding: 3,
            gap: 4,
            marginTop: 14,
          }}
        >
          {(
            [
              { key: "hari", label: "Hari Ini" },
              { key: "minggu", label: "Minggu Ini" },
              { key: "bulan", label: "Bulan Ini" },
            ] as const
          ).map((item) => (
            <TouchableOpacity
              key={item.key}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: period === item.key ? "#FFFFFF" : "transparent",
                alignItems: "center",
              }}
              onPress={() => setPeriod(item.key)}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: period === item.key ? "#2563EB" : "#64748B",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Grid Statistik 4 Metrik */}
      <View style={tabStyles.statGrid}>
        <View style={tabStyles.statCard}>
          <Text style={tabStyles.statLabel}>Total Omset</Text>
          <Text style={[tabStyles.statValue, { color: "#2563EB" }]}>
            {metrics.omset}
          </Text>
        </View>
        <View style={tabStyles.statCard}>
          <Text style={tabStyles.statLabel}>Volume Nota</Text>
          <Text style={tabStyles.statValue}>{metrics.transaksi}</Text>
        </View>
      </View>

      <View style={tabStyles.statGrid}>
        <View style={tabStyles.statCard}>
          <Text style={tabStyles.statLabel}>Rata-Rata Nota</Text>
          <Text style={tabStyles.statValue}>{metrics.rerata}</Text>
        </View>
        <View style={tabStyles.statCard}>
          <Text style={tabStyles.statLabel}>Produk Terlaris</Text>
          <Text
            style={[tabStyles.statValue, { fontSize: 13.5, color: "#059669" }]}
            numberOfLines={1}
          >
            {metrics.topItem}
          </Text>
        </View>
      </View>

      {/* Ringkasan Distribusi Kategori */}
      <View style={tabStyles.card}>
        <Text style={[tabStyles.sectionTitle, { fontSize: 15, marginBottom: 10 }]}>
          Distribusi Penjualan Kategori
        </Text>

        {[
          { label: "Sembako (Minyak, Beras, Gula)", pct: "65%", color: "#2563EB" },
          { label: "Minuman Kemasan", pct: "22%", color: "#059669" },
          { label: "Snack & Makanan Ringan", pct: "13%", color: "#D97706" },
        ].map((item) => (
          <View key={item.label} style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: "#334155", fontWeight: "600" }}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "700", color: item.color }}>
                {item.pct}
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: "#F1F5F9",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: item.pct as any,
                  backgroundColor: item.color,
                  borderRadius: 999,
                }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Tombol Ekspor Laporan */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[tabStyles.secondaryBtn, { flex: 1 }]}
          activeOpacity={0.8}
          onPress={() => handleExport("PDF")}
        >
          <Ionicons name="document-text-outline" size={17} color="#334155" />
          <Text style={tabStyles.secondaryBtnText}>Ekspor PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tabStyles.secondaryBtn, { flex: 1 }]}
          activeOpacity={0.8}
          onPress={() => handleExport("Excel")}
        >
          <Ionicons name="download-outline" size={17} color="#334155" />
          <Text style={tabStyles.secondaryBtnText}>Ekspor Excel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
