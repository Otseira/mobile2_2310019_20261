import { getAuthSession, UserData } from "@/services/authService";
import { useEffect, useState } from "react";
// ... (import Alert, ScrollView, Text, TouchableOpacity, View, SafeAreaView tetap)
export default function HomeScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    getAuthSession().then((session) => {
      if (session) setUser(session.user);
    });
  }, []);
}
// ...
// Di dalam kartu sambutan (welcomeCard):
//
//  <View style={homeStyles.statusBadge}>
//  <Ionicons name="checkmark-circle" size={15} color="#059669" />
//  <Text style={homeStyles.statusBadgeText}>Terhubung ke Server Laravel 13</Text>
//  </View>
//  <Text style={homeStyles.greetingTitle}>Halo, {user?.name || "Selamat Datang"}!</Text>
//  <Text style={homeStyles.greetingEmail}>{user?.email || "mahasiswa@kampus.ac.id"}</Text>
