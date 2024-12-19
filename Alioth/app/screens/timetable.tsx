import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import Header from '@/components/HeaderTimetable'; 
import { Group } from '@/components/Group';

export default function Timetable() {
  // Cria uma referência para o BottomSheet, que será usada para controlar sua abertura/fechamento.
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Estado para controlar se o BottomSheet está aberto ou não.
  const [isSheetOpen, setIsSheetOpen] = useState(false); 

  // Hook que busca o tema atual (claro ou escuro) e define as cores atuais com base no tema.
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  // Função para alternar o estado do BottomSheet (abre ou fecha).
  const handleToggleBottomSheet = () => {
    if (isSheetOpen) {
      bottomSheetRef.current?.close(); // Fecha o BottomSheet se estiver aberto.
    } else {
      bottomSheetRef.current?.expand(); // Expande o BottomSheet se estiver fechado.
    }
    setIsSheetOpen(!isSheetOpen); // Atualiza o estado para refletir a ação.
  };

  // Função chamada quando o BottomSheet muda de estado (aberto ou fechado).
  const handleSheetChange = (index: number) => {
    if (index === -1) {
      setIsSheetOpen(false); // Se o índice for -1, o BottomSheet está fechado.
    } else if (index === 0) {
      setIsSheetOpen(true); // Se o índice for 0, o BottomSheet está aberto.
    }
  };

  return (
    // Contêiner principal que usa o GestureHandlerRootView para lidar com gestos.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: currentColors.background }]}>
        {/* Cabeçalho personalizado do componente */}
        <Header/>

        {/* Conteúdo rolável (ScrollView) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Botão para abrir/fechar o BottomSheet */}
          <TouchableOpacity
            style={styles.button} 
            onPress={handleToggleBottomSheet} // Ao pressionar, alterna o BottomSheet
          >
            <Text style={[styles.buttonText, { color: currentColors.secondaryDetails }]}>Confira Calendário Completo</Text>
          </TouchableOpacity>

          {/* Componente que renderiza os cards do grupo */}
          <Group/>
        </ScrollView>

        {/* Componente BottomSheet para exibir uma tabela */}
        <BottomSheet
          ref={bottomSheetRef} // Ref usada para controlar o BottomSheet
          index={-1} // O BottomSheet começa fechado
          snapPoints={['45%']} // Define a altura quando o BottomSheet estiver expandido (45% da tela)
          enablePanDownToClose={true} // Permite fechar o BottomSheet deslizando para baixo
          enableOverDrag={false} // Evita que o BottomSheet seja puxado além do seu limite
          handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: currentColors.bottomSheet }]} // Estiliza o indicador do handle
          handleStyle={[styles.handleContainer, { backgroundColor: currentColors.secondaryDetails }]} // Estiliza o handle
          style={[styles.bottomSheet, { backgroundColor: currentColors.darkDetails }]} // Estiliza o BottomSheet
          onChange={handleSheetChange} // Atualiza o estado quando o BottomSheet é aberto ou fechado
        >
          {/* Conteúdo dentro do BottomSheet */}
          <View style={[styles.bottomSheetContent, { backgroundColor: currentColors.bottomSheet }]}>
            {/* Cabeçalho da tabela com os dias da semana */}
            <View style={[styles.rowDays, { borderBottomColor: currentColors.alternativeDetails }]}>
              {/* Celula vazia no início */}
              <View style={[styles.cell, styles.emptyCell]} />
              {/* Renderiza os dias da semana na tabela */}
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>Seg</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>Ter</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>Qua</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>Qui</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>Sex</Text>
              </View>
              <View style={[styles.cell, { backgroundColor: currentColors.bottomSheet }]}>
                <Text style={[styles.cellTextDays, { color: currentColors.secondaryDetails }]}>SáB</Text>
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
                  // Exibição das aulas no calendário
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