import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import Header from '@/components/Teachers/HeaderEdit';

export default function EditProfile({ navigation }: { navigation: any }) {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [degree, setDegree] = useState('');
  const [complement, setComplement] = useState('');
  const [isImageUpdated, setIsImageUpdated] = useState(false);

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
      setIsImageUpdated(true);
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

  const handleUpdateProfile = () => {
    setIsUpdateModalVisible(true);
  };

  // Função para verificar se pelo menos um campo foi preenchido
  const isAnyFieldFilled = () => {
    return (
      isImageUpdated || // Se a imagem foi atualizada
      name.trim() !== '' ||
      phone.trim() !== '' ||
      address.trim() !== '' ||
      degree.trim() !== '' ||
      complement.trim() !== ''
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <View style={styles.header}>
        <Header/>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={currentColors.text} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.innerContainer}>
        <TouchableOpacity onPress={handleEditProfilePicture} style={styles.avatarWrapper}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle" size={150} color={currentColors.lightDetails} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.editButton]} onPress={handleEditProfilePicture}>
          <Ionicons name="create-outline" size={20} color={currentColors.alternativeDetails} />
          <Text style={[styles.editButtonText, { color: currentColors.alternativeDetails }]}>Alterar Perfil</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          {[ 
            { label: 'Nome:', value: name, setter: setName, placeholder: 'Nayara' },
            { label: 'Telefone:', value: phone, setter: setPhone, keyboardType: 'numeric', placeholder: '(11) 9 8033-6967' },
            { label: 'Endereço:', value: address, setter: setAddress, placeholder: 'Rua Alegre, 35' },
            { label: 'Complemento:', value: complement, setter: setComplement, placeholder: 'Bloco 35A Apto 20B' },
            { label: 'Grau Acadêmico:', value: degree, setter: setDegree, placeholder: 'Mestrado' },
          ].map(({ label, value, setter, keyboardType, placeholder }: any) => (
            <View key={label} style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: currentColors.text }]}>{label}</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: currentColors.headerMenuAndDetails, color: currentColors.text }]}
                value={value}
                onChangeText={(text) => {
                  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
                  setter(capitalizedText);
                }}
                placeholder={placeholder}
                placeholderTextColor={currentColors.subtextTextInputAndSvg}
                keyboardType={keyboardType}
              />
            </View>
          ))}

          {/* Botão Mudar Senha */}
          <TouchableOpacity 
              style={styles.changePasswordButton} 
              onPress={() => navigation.navigate('Password')}
          >
              <Ionicons name="lock-closed-outline" size={20} color={currentColors.secondaryDetails} />
              <Text style={[styles.changePasswordText, { color: currentColors.secondaryDetails }]}>
                Alterar Senha
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.updateButton,
              {
                borderColor: isAnyFieldFilled() ? currentColors.secondaryDetails : currentColors.generalDetails
              }
            ]}
            onPress={handleUpdateProfile}
            disabled={!isAnyFieldFilled()}
          >
            <Text style={[
              styles.updateButtonText,
              {
                color: isAnyFieldFilled() ? currentColors.secondaryDetails : currentColors.generalDetails
              }
            ]}>
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

      <Modal isVisible={isUpdateModalVisible} style={styles.modal}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.intervalAndOtherDetails }]}>
          <Text style={[styles.modalTitle, { color: currentColors.text }]}>
            Perfil Atualizado!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsUpdateModalVisible(false);
              navigation.goBack();
            }}
            style={[styles.modalStyleOk, { backgroundColor: currentColors.secondaryDetails }]}
          >
            <Text style={[styles.modalButtonText, { color: currentColors.text }]}>
              Ok
            </Text>
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
  header: {
    flexDirection: 'row'
  },
  backButton: {
    padding: '2%'
  },
  innerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%'
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: '2%'
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    paddingVertical: '2%',
    paddingHorizontal: '2%'
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  formContainer: {
    width: '100%',
    marginTop: '2%'
  },
  inputWrapper: {
    width: '100%',
    marginBottom: '5%'
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '2%'
  },
  textInput: {
    height: 55,
    fontSize: 16,
    paddingHorizontal: '2%',
    borderWidth: 0,
    borderRadius: 8
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%'
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: '2%'
  },
  updateButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    paddingHorizontal: '2%',
    borderRadius: 8,
    borderWidth: 2
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  modalContent: {
    width: '70%',
    height: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
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
    marginTop: '5%'
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
    marginTop: '6%',
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
  modalStyleOk: {
    width: 70,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 8
  }
});