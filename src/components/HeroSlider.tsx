import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/colors";

const { width } = Dimensions.get("window");

interface Movie {
  id: string;
  title: string;
  poster: string;
  description: string;
}

interface HeroSliderProps {
  data: Movie[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  data,
  autoPlayInterval = 4000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Movie>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  const onViewRef = useRef(({ changed }: any) => {
    if (changed.length > 0) {
      setCurrentIndex(changed[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity activeOpacity={0.9}>
      <Image
        source={{ uri: item.poster }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textOverlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  image: {
    width: width - 20,
    height: 220,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 8,
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
});
