import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 32,
    gap: 16,
  },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  welcomeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#059669",
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  greetingEmail: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 2,
  },

  // Overview Stats on Home
  overviewGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  overviewItem: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  overviewItemLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  overviewItemValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },

  // Menu Section
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  menuHeader: {
    marginBottom: 16,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  menuSectionSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 2,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  menuItem: {
    width: "30%",
    alignItems: "center",
  },
  menuIconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 6,
  },
  menuLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  // Subtle pastel variants for icons
  iconBgBlue: {
    backgroundColor: "#EFF6FF",
    borderColor: "#DBEAFE",
  },
  iconBgGreen: {
    backgroundColor: "#ECFDF5",
    borderColor: "#D1FAE5",
  },
  iconBgAmber: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
  },
  iconBgTeal: {
    backgroundColor: "#F0FDFA",
    borderColor: "#CCFBF1",
  },
  iconBgRose: {
    backgroundColor: "#FFF1F2",
    borderColor: "#FFE4E6",
  },
  iconBgPurple: {
    backgroundColor: "#FAF5FF",
    borderColor: "#F3E8FF",
  },
});
