import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

import Header from '@/components/HeaderHomepage';

import Banner from '@/assets/images/banner.png';
import Ilustration from '@/assets/images/ilustration.png';
import Class from '@/assets/svg/Class.svg';
import Semester from '@/assets/svg/Semester.svg';
import Years from '@/assets/svg/Years.svg';
import Situation from '@/assets/svg/Situation.svg';

type RootTabParamList = {
  Index: undefined;
  Timetable: undefined;
  Profile: undefined;
};

type HomepageNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Index'>;

export default function Index() {
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  
  const navigation = useNavigation<HomepageNavigationProp>();

  const navigateToTimetable = () => {
    navigation.navigate('Timetable');
  };

  return (
    <>
      <Header />
      <View style={[styles.container, { backgroundColor: currentColors.background }]}>
        <Image source={Banner} style={styles.banner} />

        <Text style={[styles.title, { color: currentColors.text }]}>Nayara</Text>

        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Class width={20} height={20} />
            </View>
            <Text style={[styles.infoText, { color: currentColors.text }]}>
              <Text style={[styles.label, { color: currentColors.text }]}>Matéria(s): </Text>
              <Text style={[styles.value, { color: currentColors.subtextTextInputAndSvg }]}>Matemática e Física</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Semester style={styles.icon} />
            </View>
            <View style={styles.flexRow}>
              <Text style={[styles.infoText, { color: currentColors.text }]}>
                <Text style={[styles.label, { color: currentColors.text }]}>Semestre: </Text>
                <Text style={[styles.value, { color: currentColors.subtextTextInputAndSvg }]}>1°</Text>
              </Text>
              <View style={styles.flexSpacer} />
              <Text style={[styles.infoText, { color: currentColors.text }]}>
                <Text style={[styles.label, { color: currentColors.text }]}>Bimestre: </Text>
                <Text style={[styles.value, { color: currentColors.subtextTextInputAndSvg }]}>2°</Text>
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Years style={styles.icon} />
            </View>
            <View style={styles.flexRow}>
              <Text style={[styles.infoText, { color: currentColors.text }]}>
                <Text style={[styles.label, { color: currentColors.text }]}>Entrada: </Text>
                <Text style={[styles.value, { color: currentColors.subtextTextInputAndSvg }]}>2022</Text>
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Situation style={styles.icon} />
            </View>
            <Text style={[styles.infoText, { color: currentColors.text }]}>
              <Text style={[styles.label, { color: currentColors.text }]}>Grau Acadêmico: </Text>
              <Text style={[styles.value, { color: currentColors.subtextTextInputAndSvg }]}>Mestrado</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.line, { backgroundColor: currentColors.generalDetails }]} />

        <View style={styles.containerIlustration}>
          <Image source={Ilustration} style={styles.ilustration} />
          <Text style={[styles.text, { color: currentColors.subtextTextInputAndSvg }]}>
            Descubra a Perfeição em segurança e design com nossa nova grade horária automática!
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { borderColor: currentColors.secondaryDetails }]} onPress={navigateToTimetable}>
          <Text style={[styles.buttonText, { color: currentColors.text }]}>Conheça sua Grade!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '5%',
    textTransform: 'uppercase'
  },
  banner: {
    width: '100%',
    height: '25%',
    marginTop: '2%',
    marginBottom: '5%',
    borderRadius: 8
  },
  infoContainer: {
    width: '90%',
    padding: '2%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2%'
  },
  containerIcon: {
    width: '15%',
    height: 15,
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '20%',
    height: '20%',
  },
  infoText: {
    fontSize: 18,
    marginVertical: '2%'
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    // Customizando com o currentColors
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexSpacer: {
    flex: 1
  },
  line: {
    width: '100%',
    height: 2,
    marginTop: '10%',
  },
  containerIlustration: {  
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%',
    marginTop: '20%',
    marginBottom: '20%'
  },
  ilustration: {  
    width: '50%',
    height: '200%',
    marginRight: '10%'
  },
  text: {
    flex: 1, 
    textAlign: 'justify',
    fontSize: 14,
    marginTop: '10%',
    marginRight: '2%'
  },
  button: {
    alignItems: 'center',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderWidth: 1,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});