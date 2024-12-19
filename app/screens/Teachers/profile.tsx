import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import Header from '@/components/HeaderProfile';

type RootTabParamList = {
  Index: undefined;
  Timetable: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

type ProfileNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Profile'>;

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const currentColors = Colors[theme];

  const navigation = useNavigation<ProfileNavigationProp>();

  const navigateToEdit = () => {
    navigation.navigate('EditProfile');
  };

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImagePicked, setIsImagePicked] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos da permissão para acessar a galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
      setIsImagePicked(true);
    }
  };

  const handleEditProfilePicture = () => {
    if (avatar && isImagePicked) {
      setIsModalVisible(true);
    } else {
      pickImage();
    }
  };

  const handleModalOption = (option: 'alterar' | 'excluir') => {
    setIsModalVisible(false);

    if (option === 'alterar') {
      pickImage();
    } else if (option === 'excluir') {
      setAvatar(null);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <View style={styles.headerWrapper}>
        <Header />
      </View>

      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleEditProfilePicture} style={styles.avatarWrapper}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle" size={150} color={currentColors.lightDetails} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.editButton]} onPress={navigateToEdit}>
          <Ionicons name="create-outline" size={20} color={currentColors.alternativeDetails} />
          <Text style={[styles.editButtonText, { color: currentColors.alternativeDetails }]}>Alterar Perfil</Text>
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: currentColors.text }]}>Nayara</Text>
          <Text style={[styles.role, { color: currentColors.subtextTextInputAndSvg }]}>Professor(a)</Text>
        </View>

        <View style={styles.accountTitleContainer}>
          <View style={styles.accountHeader}>
            <Text style={[styles.accountTitle, { color: currentColors.secondaryDetails }]}>Conta</Text>
            <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
              <Ionicons
                name={theme === 'light' ? 'sunny' : 'moon'}
                size={24}
                color={currentColors.text}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.accountUnderline, { backgroundColor: currentColors.generalDetails }]} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Instituição de Ensino</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>Colégio Atheneu</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Código de Acesso</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>00000</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Quantidade de Turmas</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>Manhã: 8 | Tarde: 4</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Cadastro de Pessoa Física (CPF)</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>123.456.789-0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Telefone</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>(11) 9 8033-6967</Text>
          </View>
        </View>
      </View>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.intervalAndOtherDetails }]}>
          <Text style={[styles.modalTitle, { color: currentColors.text }]}>Você deseja alterar ou excluir sua foto?</Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={() => handleModalOption('alterar')} style={[styles.modalButton, { backgroundColor: currentColors.secondaryDetails }]}>
              <Text style={[styles.modalButtonText, { color: currentColors.intervalAndOtherDetails }]}>Alterar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleModalOption('excluir')} style={[styles.modalButtonRed, { backgroundColor: currentColors.modalButtonRed }]}>
              <Text style={[styles.modalButtonText, { color: currentColors.intervalAndOtherDetails }]}>Excluir</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalCancelButton}>
            <Text style={[styles.modalCancelButtonText, { color: currentColors.text, borderColor: currentColors.alternativeDetails }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    paddingTop: 0
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%'
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: '0%'
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    marginBottom: '2%'
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: '2%'
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '2%'
  },
  role: {
    fontSize: 16
  },
  accountTitleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: '5%'
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  accountUnderline: {
    width: '50%',
    height: 1,
    marginTop: '2%'
  },
  infoContainer: {
    width: '100%',
    marginTop: '5%'
  },
  infoRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: '3%',
    borderBottomColor: Colors.dark.alternativeDetails,
    borderBottomWidth: 2
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  infoSubtitle: {
    fontSize: 14
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    borderRadius: 10,
    maxWidth: '100%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '5%'
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: '6%'
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
    paddingVertical: '5%',
    borderRadius: 8
  },
  modalButtonRed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
    paddingVertical: '5%',
    borderRadius: 8
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalCancelButton: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCancelButtonText: {
    width: 100,
    color: Colors.dark.text,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.dark.alternativeDetails,
    padding: '4%',
    borderRadius: 8
  },
  themeToggleButton: {
    padding: '4%'
  }
});