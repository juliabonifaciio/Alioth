import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

const HeaderEdit: React.FC = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={[
        styles.header,
        { 
          paddingTop: StatusBar.currentHeight || 0, // Adicionar fallback para evitar problemas se StatusBar.currentHeight for undefined
        }
      ]}>
        <Text style={[styles.title, { color: currentColors.text }]}>Editar Perfil</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 95,
    width: '100%',
    marginBottom: -50,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginTop: '4%'
  },
});

export default HeaderEdit;