import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import Header from '@/components/HeaderTimetable'; 

import { Group } from '@/components/Teachers/Group';

export default function Timetable() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); 
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const handleToggleBottomSheet = () => {
    if (isSheetOpen) {
      bottomSheetRef.current?.close(); 
    } else {
      bottomSheetRef.current?.expand(); 
    }
    setIsSheetOpen(!isSheetOpen); 
  };

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      setIsSheetOpen(false); 
    } else if (index === 0) {
      setIsSheetOpen(true); 
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: currentColors.background }]}>
        <Header />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={styles.button} 
            onPress={handleToggleBottomSheet}
          >
            <Text style={[styles.buttonText, { color: currentColors.secondaryDetails }]}>Confira Calendário Completo</Text>
          </TouchableOpacity>

          <Group />
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1} 
          snapPoints={['45%']} 
          enablePanDownToClose={true} 
          enableOverDrag={false}
          handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: currentColors.bottomSheet }]} 
          handleStyle={[styles.handleContainer, { backgroundColor: currentColors.secondaryDetails }]} 
          style={[styles.bottomSheet, { backgroundColor: currentColors.darkDetails }]} 
          onChange={handleSheetChange}
        >
          <View style={[styles.bottomSheetContent, { backgroundColor: currentColors.bottomSheet }]}>
            {/* Cabeçalho da tabela */}
            <View style={[styles.rowDays, { borderBottomColor: currentColors.alternativeDetails }]}>
              <View style={[styles.cell, styles.emptyCell]} />
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>seg</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>ter</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>qua</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>qui</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>sex</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>sáb</Text>
              </View>
            </View>

            {/* Linhas da tabela com horários */}
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <View key={rowIndex} style={[styles.row, { backgroundColor: currentColors.bottomSheet }]}>
                <View style={[styles.cell, styles.timeCell, { backgroundColor: currentColors.bottomSheet }]}>
                  <Text style={[styles.cellText, { color: rowIndex === 2 ? currentColors.secondaryDetails : currentColors.text }]}>
                    {['7:30', '8:20', '09:10', '09:30', '10:20', '11:10', '12:00'][rowIndex]}
                  </Text>
                </View>
                {[...Array(6)].map((_, dayIndex) => {
                  if (rowIndex === 2) {
                    return (
                      <View key={dayIndex} style={styles.cell}>
                        <Text style={[styles.cellText, { color: currentColors.secondaryDetails, fontSize: 10 }]}>Intervalo</Text>
                      </View>
                    );
                  }
                  return (
                    <View key={dayIndex} style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                      <Text style={[styles.cellText, { color: currentColors.text }]}>-</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    padding: '5%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  handleContainer: {
    paddingTop: '2%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  handleIndicator: {
    width: '50%', 
    height: 8, 
    alignSelf: 'center', 
    marginVertical: '2%', 
    borderRadius: 8 
  },
  bottomSheet: {
    margin: '2%', 
    marginRight: '3%', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  bottomSheetContent: {
    flex: 1,
    padding: '2%'
  },
  rowDays: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10
  },
  emptyCell: {
    borderRightWidth: 0
  },
  cellTextDays: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  cellText: {
    fontWeight: 'bold'
  },
  timeCell: {
    backgroundColor: 'transparent' 
  },
});