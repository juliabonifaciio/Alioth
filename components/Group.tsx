import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import TeacherCard from '@/components/TeacherCard';
import Interval from '@/components/Interval';
import { timetableData } from '@/components/Data';

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function Group() {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);

  // Função chamada quando o usuário seleciona um dia da semana
  const handleDayPress = (day: string) => {
    setSelectedDay(day); // Atualiza o dia selecionado
    setSelectedTime(null); // Reseta a seleção ao mudar o dia
    setSelectedInterval(null); // Reseta a seleção do intervalo
  };

  // Função chamada quando o usuário clica em uma aula
  const handleCardPress = (time: string) => {
    setSelectedTime(prevTime => prevTime === time ? null : time); 
  };

  // Função chamada quando o usuário clica no intervalo
  const handleIntervalPress = (time: string) => {
    setSelectedInterval(prevTime => prevTime === time ? null : time); 
  };

  // Verifica se há aulas para o dia selecionado
  const hasClasses = timetableData[selectedDay] && timetableData[selectedDay].length > 0;

  return (
    <View style={styles.container}>
      {/* Exibe os dias da semana em uma barra rolável horizontal */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.daysContainer}
      >
        {/* Mapeia os dias da semana para gerar os botões de seleção de dias */}
        {daysOfWeek.map((day) => (
          <TouchableOpacity 
            key={day} 
            onPress={() => handleDayPress(day)} // Chama a função quando um dia é pressionado
            style={[
              styles.dayButton, 
              { backgroundColor: currentColors.darkDetails }, // Aplica a cor padrão
              selectedDay === day && { backgroundColor: currentColors.secondaryDetails } // Aplica cor diferente se o dia estiver selecionado
            ]}
          >
            <Text 
              style={[
                styles.dayText, 
                selectedDay === day && { color: currentColors.alternativeText, fontWeight: 'bold' } // Estilo de texto para o dia selecionado
              ]}
            >
              {day} {/* Exibe o nome do dia */}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Container para exibir os cards de aula */}
      <View style={styles.cardsContainer}>
        {/* Verifica se há aulas no dia selecionado */}
        {hasClasses ? (
          <>
            {/* Mapeia as aulas do dia selecionado para exibir os cards */}
            {timetableData[selectedDay].map((card, index) => (
              <View key={index}>
                {/* Quando o card de aula é pressionado, seleciona/desseleciona a aula */}
                <TouchableOpacity onPress={() => handleCardPress(card.time)}>
                  <TeacherCard 
                    name={card.name} // Nome do professor
                    subject={card.subject} // Matéria
                    time={card.time} // Horário da aula
                    isSelected={selectedTime === card.time} // Marca o card como selecionado se o horário for o mesmo
                  />
                </TouchableOpacity>
                {/* Se o horário for '8:20', exibe um intervalo */}
                {card.time === '8:20' && (
                  <Interval 
                    time="9:10" 
                    isSelected={selectedInterval === "9:10"} // Seleciona o intervalo
                    onPress={() => handleIntervalPress("9:10")} // Alterna a seleção do intervalo ao clicar
                  />
                )}
              </View>
            ))}
          </>
        ) : (
          // Caso não haja aulas, exibe uma mensagem de que não haverá aulas no dia selecionado
          <View style={styles.noClassesContainer}>
            <Text style={[styles.noClassesText, { color: currentColors.subtextTextInputAndSvg, fontSize: 18 }]}>
              Não haverá aulas hoje...
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