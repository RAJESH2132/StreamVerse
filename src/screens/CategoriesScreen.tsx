// src/screens/CategoriesScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

const genresData = [
  { id: "1", name: "Action" },
  { id: "2", name: "Comedy" },
  { id: "3", name: "Drama" },
  { id: "4", name: "Horror" },
  { id: "5", name: "Romance" },
  { id: "6", name: "Sci-Fi" },
  { id: "7", name: "Documentary" },
  { id: "8", name: "Thriller" },
  { id: "9", name: "Animation" },
  { id: "10", name: "Fantasy" },
];

const languagesData = [
  { id: "1", name: "English" },
  { id: "2", name: "Hindi" },
  { id: "3", name: "Telugu" },
  { id: "4", name: "Tamil" },
  { id: "5", name: "Malayalam" },
  { id: "6", name: "Kannada" },
  { id: "7", name: "Bengali" },
  { id: "8", name: "Marathi" },
  { id: "9", name: "Gujarati" },
  { id: "10", name: "Punjabi" },
];

const CategoriesScreen: React.FC = () => {
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const displayedGenres = showAllGenres ? genresData : genresData.slice(0, 6);
  const displayedLanguages = showAllLanguages ? languagesData : languagesData.slice(0, 6);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainHeading}>Categories</Text>

        {/* Genres Section */}
        <Text style={styles.sectionHeading}>Genres</Text>
        <View style={styles.grid}>
          {displayedGenres.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => setShowAllGenres(!showAllGenres)} style={styles.showMoreBtn}>
          <Text style={styles.showMoreText}>
            {showAllGenres ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>

        {/* Languages Section */}
        <Text style={styles.sectionHeading}>Languages</Text>
        <View style={styles.grid}>
          {displayedLanguages.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => setShowAllLanguages(!showAllLanguages)} style={styles.showMoreBtn}>
          <Text style={styles.showMoreText}>
            {showAllLanguages ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2; // two columns with margins

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 15,
    backgroundColor: "#000",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1c1c1c",
    width: cardWidth,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  showMoreBtn: {
    alignItems: "center",
    marginBottom: 20,
  },
  showMoreText: {
    color: "#1e90ff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CategoriesScreen;
