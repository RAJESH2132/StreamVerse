import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

const dummyMovies = [
  { id: "1", title: "Movie 1", poster: "https://via.placeholder.com/300x450" },
  { id: "2", title: "Movie 2", poster: "https://via.placeholder.com/300x450" },
  { id: "3", title: "Movie 3", poster: "https://via.placeholder.com/300x450" },
  { id: "4", title: "Movie 4", poster: "https://via.placeholder.com/300x450" },
];

export default function WatchlistScreen() {
  const [activeTab, setActiveTab] = useState<"watching" | "wishlist" | "watched">("watching");

  const renderMovieItem = ({ item }: { item: typeof dummyMovies[0] }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.poster }} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  const tabs = ["watching", "wishlist", "watched"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab as any)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Movies List */}
        <FlatList
          data={dummyMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceDark,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.tabInactive,
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.tabActiveText,
    fontWeight: "bold",
  },
  listContent: {
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
  },
  movieContainer: {
    width: "48%",
    marginBottom: 16,
  },
  moviePoster: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
  movieTitle: {
    color: Colors.textPrimary,
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },
});
