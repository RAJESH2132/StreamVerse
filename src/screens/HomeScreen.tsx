// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryBar from '../components/CategoryBar';
import { Colors } from '../constants/colors';

const sampleData = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export default function HomeScreen() {
  const handleCategoryChange = (category: string) => {
    console.log('Selected:', category);
    // Later: fetch content based on category
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingBottom: 8, paddingTop: 5 }}>
        <Text style={{ color: Colors.text, fontSize:30, fontWeight: 'bold' }}>
          StreamVerse
        </Text>
      </View>

      <FlatList
        data={sampleData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          >
            <Text style={{ color: Colors.text }}>{item}</Text>
          </View>
        )}
        ListHeaderComponent={
          <CategoryBar onSelect={handleCategoryChange} />
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}
