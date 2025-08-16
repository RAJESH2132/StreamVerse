import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import HeroSlider from "../components/HeroSlider";

const { width } = Dimensions.get("window");

interface Movie {
  id: string;
  title: string;
  poster: string;
}
interface Movies {
  id: string;
  title: string;
  poster: string;
  description: string;
}

// Placeholder data
const featured: Movie[] = [
  { id: "f1", title: "Featured 1", poster: "https://via.placeholder.com/500x200" },
  { id: "f2", title: "Featured 2", poster: "https://via.placeholder.com/500x200" },
];

const trending: Movie[] = [
  { id: "t1", title: "Trending 1", poster: "https://via.placeholder.com/150" },
  { id: "t2", title: "Trending 2", poster: "https://via.placeholder.com/150" },
  { id: "t3", title: "Trending 3", poster: "https://via.placeholder.com/150" },
];

const popular: Movie[] = [
  { id: "p1", title: "Popular 1", poster: "https://via.placeholder.com/150" },
  { id: "p2", title: "Popular 2", poster: "https://via.placeholder.com/150" },
];

const topRated: Movie[] = [
  { id: "r1", title: "Top Rated 1", poster: "https://via.placeholder.com/150" },
  { id: "r2", title: "Top Rated 2", poster: "https://via.placeholder.com/150" },
];

const nowPlaying: Movie[] = [
  { id: "n1", title: "Now Playing 1", poster: "https://via.placeholder.com/150" },
  { id: "n2", title: "Now Playing 2", poster: "https://via.placeholder.com/150" },
];

const upcoming: Movie[] = [
  { id: "u1", title: "Upcoming 1", poster: "https://via.placeholder.com/150" },
  { id: "u2", title: "Upcoming 2", poster: "https://via.placeholder.com/150" },
];

const hero: Movies[] = [
  {
    id: "f1",
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    description: "The story of the creation of the atomic bomb.",
  },
  {
    id: "f2",
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    description: "A magical adventure in the world of Barbie.",
  },
  {
    id: "f3",
    title: "John Wick 4",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    description: "John Wick returns for more action-packed fights.",
  },
];

export default function HomeScreen() {

  const renderHorizontalSection = (data: Movie[], title: string) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: item.poster }} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        scrollEventThrottle={16}
      >
        {/* App Header (initially visible at top) */}
          <View style={styles.header}>
            <Text style={styles.title}>StreamVerse</Text>
          </View>

        {/* Featured Slider */}
        <HeroSlider data={hero} autoPlayInterval={5000} />

        {/* All Sections */}
        {renderHorizontalSection(trending, "Trending Now")}
        {renderHorizontalSection(popular, "Popular")}
        {renderHorizontalSection(topRated, "Top Rated")}
        {renderHorizontalSection(nowPlaying, "Now Playing")}
        {renderHorizontalSection(upcoming, "Upcoming")}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    zIndex: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 5,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "bold",
  },
  heroImage: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    marginBottom: 10,
  },
  itemContainer: {
    width: 120,
    marginHorizontal: 8,
  },
  itemImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  itemTitle: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 5,
  },
});
