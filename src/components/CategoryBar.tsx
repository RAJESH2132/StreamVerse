// components/CategoryBar.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { categories } from '../constants/categories';
import { Colors } from '../constants/colors';

export default function CategoryBar({ onSelect }: { onSelect?: (cat: string) => void }) {
  const [selected, setSelected] = useState('All');

  const handleSelect = (cat: string) => {
    setSelected(cat);
    onSelect?.(cat);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        paddingVertical: 8,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => handleSelect(cat)}
            style={{ marginRight: 14 }}
          >
            <Text
              style={{
                color: selected === cat ? Colors.tabActive : Colors.tabInactive,
                fontWeight: selected === cat ? 'bold' : 'normal',
                fontSize: 18,
              }}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
