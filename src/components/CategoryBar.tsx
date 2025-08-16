// components/CategoryBar.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Colors } from '../constants/colors';

export interface Category {
  id: string;
  name: string;
}

interface CategoryBarProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories: Category[] = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Action' },
  { id: '3', name: 'Comedy' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Horror' },
  { id: '6', name: 'Romance' },
  { id: '7', name: 'Sci-Fi' },
  { id: '8', name: 'Thriller' },
];

const CategoryBar: React.FC<CategoryBarProps> = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = selected === item.name;
          return (
            <TouchableOpacity
              style={[styles.categoryButton, isActive && styles.activeButton]}
              onPress={() => onSelect(item.name)}
            >
              <Text style={[styles.categoryText, isActive && styles.activeText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#1c1c1c',
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#333',
  },
  categoryText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
});

export default CategoryBar;
