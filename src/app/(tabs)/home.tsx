import { homeStyles } from "@/styles/homeStyles";
import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();

  const handleMenuPress = (menuName: string, targetRoute?: string) => {
    if (targetRoute) {
      router.push(targetRoute as never);
    } else {
      Alert.alert(
        menuName,
        `Fitur ${menuName} aktif dan siap digunakan untuk pencatatan operasional.`,
      );
    }
  };

  return (
    <SafeAreaView style={homeStyles.safeArea} edges={[]}>
      <ScrollView
        style={homeStyles.scrollContainer}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Kartu Sambutan & Status */}
        <View style={homeStyles.welcomeCard}>
          <View style={homeStyles.welcomeTopRow}>
            <View style={homeStyles.statusBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={homeStyles.statusBadgeText}>Kasir Aktif</Text>
            </View>
            <Text style={{ fontSize: 12, color: "#94A3B8" }}>
              Sesi: Mobile 2
            </Text>
          </View>

          <Text style={homeStyles.greetingTitle}>Selamat Datang!</Text>
          <Text style={homeStyles.greetingEmail}>
            {email || "luthfi.ariesto@kampus.ac.id"}
          </Text>

          {/* Quick Stats Overview */}
          <View style={homeStyles.overviewGrid}>
            <View style={homeStyles.overviewItem}>
              <Text style={homeStyles.overviewItemLabel}>Total Produk</Text>
              <Text style={homeStyles.overviewItemValue}>24 Item</Text>
            </View>
            <View style={homeStyles.overviewItem}>
              <Text style={homeStyles.overviewItemLabel}>Transaksi Hari Ini</Text>
              <Text style={homeStyles.overviewItemValue}>18 Nota</Text>
            </View>
            <View style={homeStyles.overviewItem}>
              <Text style={homeStyles.overviewItemLabel}>Omset Harian</Text>
              <Text style={[homeStyles.overviewItemValue, { color: "#2563EB" }]}>
                Rp 1.45M
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Cepat Layanan */}
        <View style={homeStyles.menuCard}>
          <View style={homeStyles.menuHeader}>
            <Text style={homeStyles.menuSectionTitle}>Layanan &amp; Navigasi</Text>
            <Text style={homeStyles.menuSectionSubtitle}>
              Pintasan cepat modul operasional kasir &amp; inventaris
            </Text>
          </View>

          <View style={homeStyles.menuGrid}>
            {/* 1. Produk */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Katalog Produk", "/produk")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgBlue]}>
                <Ionicons name="cube" size={24} color="#2563EB" />
              </View>
              <Text style={homeStyles.menuLabel}>Produk</Text>
            </TouchableOpacity>

            {/* 2. Kasir / Transaksi */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Transaksi Kasir", "/transaksi")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgGreen]}>
                <Ionicons name="cart" size={24} color="#059669" />
              </View>
              <Text style={homeStyles.menuLabel}>Kasir</Text>
            </TouchableOpacity>

            {/* 3. Laporan */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Laporan Keuangan", "/report")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgAmber]}>
                <Ionicons name="stats-chart" size={24} color="#D97706" />
              </View>
              <Text style={homeStyles.menuLabel}>Laporan</Text>
            </TouchableOpacity>

            {/* 4. Pelanggan */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Pelanggan Tetap")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgTeal]}>
                <Ionicons name="people" size={24} color="#0D9488" />
              </View>
              <Text style={homeStyles.menuLabel}>Pelanggan</Text>
            </TouchableOpacity>

            {/* 5. Supplier */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Distributor & Supplier")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgRose]}>
                <Ionicons name="business" size={24} color="#E11D48" />
              </View>
              <Text style={homeStyles.menuLabel}>Supplier</Text>
            </TouchableOpacity>

            {/* 6. Profil */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress("Profil Saya", "/profil")}
            >
              <View style={[homeStyles.menuIconWrapper, homeStyles.iconBgPurple]}>
                <Ionicons name="person" size={24} color="#9333EA" />
              </View>
              <Text style={homeStyles.menuLabel}>Profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kartu Ringkasan Aktivitas Terkini */}
        <View style={tabStyles.card}>
          <View style={tabStyles.cardHeaderRow}>
            <Text style={tabStyles.sectionTitle}>Aktivitas Kasir Terkini</Text>
            <View style={tabStyles.badgeGreen}>
              <Text style={tabStyles.badgeGreenText}>Real-time</Text>
            </View>
          </View>
          <Text style={tabStyles.sectionSubtitle}>
            Transaksi terakhir diproses pada 12:45 WIB oleh akun kasir utama.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
