// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    stats: {
      watching: 12,
      wishlist: 8,
      watched: 30,
    },
  };

  const actionItems = [
    { icon: "create-outline", label: "Edit Profile" },
    { icon: "settings-outline", label: "Settings" },
    { icon: "log-out-outline", label: "Log Out", isDestructive: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Avatar & Name */}
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {Object.entries(user.stats).map(([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text style={styles.statNumber}>{value}</Text>
              <Text style={styles.statLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {actionItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, item.isDestructive && styles.destructiveButton]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={item.isDestructive ? Colors.destructiveText : Colors.textPrimary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={[
                  styles.actionText,
                  item.isDestructive && { color: Colors.destructiveText },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // dark theme
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.text,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  actionsContainer: {
    width: "100%",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  destructiveButton: {
    backgroundColor: Colors.surface,
  },
  actionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  destructiveText: {
    color: "#FF3B30", // can replace with theme color
  },
});
