import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

interface TeacherCardProps {
  name: string;
  subject: string;
  time: string;
  isSelected?: boolean;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, subject, time, isSelected }) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <View 
      style={[
        styles.card, 
        { backgroundColor: currentColors.darkDetails },
        isSelected && { backgroundColor: currentColors.secondaryDetails }
      ]}
    >
      <View style={styles.content}>
        <View>
          <Text 
            style={[
              styles.subject, 
              { color: currentColors.alternativeDetails },
              isSelected && { color: currentColors.text }
            ]}
          >
            {subject}
          </Text>
          <Text 
            style={[
              styles.name, 
              { color: currentColors.text },
              isSelected && { color: currentColors.text }
            ]}
          >
            {name}
          </Text>
        </View>
        <Text 
          style={[
            styles.time, 
            { color: currentColors.subtextTextInputAndSvg },
            isSelected && { color: currentColors.text }
          ]}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 70,
    justifyContent: 'center',
    marginTop: '5%',
    marginRight: '4%',
    padding: '5%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 16
  },
  time: {
    fontSize: 14
  }
});

export default TeacherCard;