import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Movie {
  id: string;
  title: string;
  poster: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Avengers", "Breaking Bad", "Inception"]);
  const [trending, setTrending] = useState<Movie[]>([
    { id: "1", title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg" },
    { id: "2", title: "Barbie", poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
    { id: "3", title: "John Wick 4", poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
  ]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setSearchResults([]);
    } else {
      // Dummy search results for now
      setSearchResults([
        { id: "101", title: "Dummy Movie 1", poster: "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg" },
        { id: "102", title: "Dummy Movie 2", poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="#ccc" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies, shows..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        {/* Recent Searches */}
        {query.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentList}>
              {recentSearches.map((item, index) => (
                <TouchableOpacity key={index} style={styles.recentItem}>
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Trending Section */}
        {query.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <FlatList
              data={trending}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.trendingItem}>
                  <Image source={{ uri: item.poster }} style={styles.trendingImage} />
                  <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {/* Search Results */}
        {query.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Results for "{query}"</Text>
            <View style={styles.resultsGrid}>
              {searchResults.map((item) => (
                <TouchableOpacity key={item.id} style={styles.resultItem}>
                  <Image source={{ uri: item.poster }} style={styles.resultImage} />
                  <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // To match theme
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  recentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  recentItem: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  recentText: {
    color: "#ccc",
    fontSize: 14,
  },
  trendingItem: {
    marginRight: 12,
    width: 100,
  },
  trendingImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  trendingTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  resultsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  resultItem: {
    width: "47%",
  },
  resultImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});
