import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

interface IntervalProps {
  time: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const Interval: React.FC<IntervalProps> = ({ time, isSelected, onPress }) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: currentColors.intervalAndOtherDetails },
        isSelected && { borderColor: currentColors.generalDetails, borderWidth: 2 }
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.intervalText, 
          { color: currentColors.secondaryDetails }
        ]}
      >
        INTERVALO
      </Text>
      <Text 
        style={[
          styles.time, 
          { color: currentColors.subtextTextInputAndSvg }
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', 
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: '5%',
    marginTop: '5%',
    marginRight: '4%',
    borderRadius: 8
  },
  intervalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  time: {
    fontSize: 14
  },
});

export default Interval;