import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import ClassCard from '@/components/Teachers/ClassCard';
import Interval from '@/components/Interval';
import { timetableData } from '@/components/Teachers/Data';

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function Group() {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
    setSelectedTime(null); 
    setSelectedInterval(null); 
  };

  const handleCardPress = (time: string) => {
    setSelectedTime(prevTime => prevTime === time ? null : time); 
  };

  const handleIntervalPress = (time: string) => {
    setSelectedInterval(prevTime => prevTime === time ? null : time); 
  };

  const hasClasses = timetableData[selectedDay] && timetableData[selectedDay].length > 0;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.daysContainer}
      >
        {daysOfWeek.map((day) => (
          <TouchableOpacity 
            key={day} 
            onPress={() => handleDayPress(day)} 
            style={[
              styles.dayButton, 
              { backgroundColor: currentColors.darkDetails }, 
              selectedDay === day && { backgroundColor: currentColors.secondaryDetails } 
            ]}
          >
            <Text 
              style={[
                styles.dayText, 
                selectedDay === day && { color: currentColors.alternativeText, fontWeight: 'bold' } 
              ]}
            >
              {day} 
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.cardsContainer}>
        {hasClasses ? (
          <>
            {timetableData[selectedDay].map((card, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => handleCardPress(card.time)}>
                  <ClassCard 
                    name={card.name} // Turma
                    subject={card.subject} // Matéria
                    time={card.time} 
                    isSelected={selectedTime === card.time} 
                  />
                </TouchableOpacity>
                {card.time === '8:20' && (
                  <Interval 
                    time="9:10" 
                    isSelected={selectedInterval === "9:10"} 
                    onPress={() => handleIntervalPress("9:10")} 
                  />
                )}
              </View>
            ))}
          </>
        ) : (
          <View style={styles.noClassesContainer}>
            <Text style={[styles.noClassesText, { color: currentColors.subtextTextInputAndSvg, fontSize: 18 }]}>
              Você não têm aulas nesse dia...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    marginLeft: '2%'
  },
  daysContainer: {
    padding: '1%'
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
    paddingHorizontal: 28,
    marginRight: 12,
    borderRadius: 8, 
    overflow: 'hidden'
  },
  dayText: {
    color: Colors.dark.text,
    fontSize: 16,
    textTransform: 'uppercase'
  },
  cardsContainer: {
    padding: '4%',
    height: '92%'
  },
  noClassesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noClassesText: {
    color: Colors.dark.subtextTextInputAndSvg,
    fontSize: 18,
    marginBottom: '25%'
  }
});