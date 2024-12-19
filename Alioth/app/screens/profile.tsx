import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import Header from '@/components/HeaderProfile';

export default function Profile({ navigation }: { navigation: any }) {
  const { theme, toggleTheme } = useTheme();
  const currentColors = Colors[theme];
  
  // Importa o hook useState para gerenciar estado local.
  const [avatar, setAvatar] = useState<string | null>(null); // Armazena a URI da imagem de avatar ou null se nenhuma imagem for selecionada.
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla a visibilidade do modal de opções (alterar ou excluir imagem).
  const [isImagePicked, setIsImagePicked] = useState(false); // Verifica se uma imagem foi selecionada.

  // Função para selecionar uma imagem da galeria.
  const pickImage = async () => {
    // Solicita permissão para acessar a galeria de mídia do dispositivo.
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Exibe um alerta caso a permissão seja negada.
      Alert.alert('Desculpe, precisamos da permissão para acessar a galeria!');
      return;
    }

    // Abre a galeria para que o usuário escolha uma imagem.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Permite apenas imagens.
      allowsEditing: true, // Permite editar a imagem selecionada (recorte).
      aspect: [4, 3], // Define a proporção de aspecto para a edição.
      quality: 1, // Define a qualidade da imagem como a máxima.
    });

    // Verifica se uma imagem foi selecionada e se os dados da imagem estão disponíveis.
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Atualiza o estado com a URI da imagem selecionada.
      setAvatar(result.assets[0].uri);
      setIsImagePicked(true); // Marca que uma imagem foi selecionada.
    }
  };

  // Função chamada ao clicar para editar a foto de perfil.
  const handleEditProfilePicture = () => {
    // Se o avatar já estiver definido e uma imagem tiver sido selecionada:
    if (avatar && isImagePicked) {
      // Exibe o modal para alterar ou excluir a imagem.
      setIsModalVisible(true);
    } else {
      // Caso contrário, chama a função para selecionar uma imagem.
      pickImage();
    }
  };

  // Função para lidar com a escolha feita no modal (alterar ou excluir).
  const handleModalOption = (option: 'alterar' | 'excluir') => {
    setIsModalVisible(false); // Fecha o modal.

    if (option === 'alterar') {
      // Se a opção for alterar, abre novamente a galeria para selecionar uma nova imagem.
      pickImage();
    } else if (option === 'excluir') {
      // Se a opção for excluir, remove a imagem definida, definindo o avatar como null.
      setAvatar(null);
    }
  };

  // Retorna o layout da tela de perfil.
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      {/* Renderiza o cabeçalho da tela */}
      <View style={styles.headerWrapper}>
        <Header />
      </View>

      <View style={styles.innerContainer}>
        {/* Botão para editar a imagem de perfil */}
        <TouchableOpacity onPress={handleEditProfilePicture} style={styles.avatarWrapper}>
          {/* Se houver uma imagem de avatar, ela é exibida; caso contrário, exibe um ícone de pessoa */}
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage}/>
          ) : (
            <Ionicons name="person-circle" size={150} color={currentColors.lightDetails}/>
          )}
        </TouchableOpacity>

        {/* Botão para alterar o perfil */}
        <TouchableOpacity onPress={handleEditProfilePicture} style={[styles.editButton]}>
          <Ionicons name='create-outline' size={20} color={currentColors.alternativeDetails}/>
          <Text style={[styles.editButtonText, { color: currentColors.alternativeDetails }]}>Alterar Perfil</Text>
        </TouchableOpacity>

        {/* Exibe informações do usuário, como nome e papel (ex.: aluno) */}
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: currentColors.text }]}>Raquel</Text>
          <Text style={[styles.role, { color: currentColors.subtextTextInputAndSvg }]}>Aluno(a)</Text>
        </View>

        {/* Seção da conta do usuário */}
        <View style={styles.accountTitleContainer}>
          <View style={styles.accountHeader}>
            <Text style={[styles.accountTitle, { color: currentColors.secondaryDetails }]}>Conta</Text>
            {/* Botão de alternar tema (sol ou lua dependendo do modo atual) */}
            <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
              <Ionicons
                name={theme === 'light' ? 'sunny' : 'moon'}
                size={24}
                color={currentColors.text}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.accountUnderline, { backgroundColor: currentColors.generalDetails }]}/>
        </View>

        {/* Informações adicionais da conta (ex.: instituição, código de acesso e turma) */}
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
            <Text style={[styles.infoTitle, { color: currentColors.text }]}>Turma</Text>
            <Text style={[styles.infoSubtitle, { color: currentColors.subtextTextInputAndSvg }]}>3° A</Text>
          </View>
        </View>

        {/* Botão Mudar Senha */}
        <TouchableOpacity 
          style={styles.changePasswordButton} 
          onPress={() => navigation.navigate('Password')}
        >
          <Ionicons name='lock-closed-outline' size={20} color={currentColors.secondaryDetails}/>
            <Text style={[styles.changePasswordText, { color: currentColors.secondaryDetails }]}>
              Alterar Senha
            </Text>
        </TouchableOpacity>
      </View>

      {/* Modal que exibe opções de alterar ou excluir a imagem de perfil */}
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.intervalAndOtherDetails }]}>
          <Text style={[styles.modalTitle, { color: currentColors.text }]}>
            Você deseja alterar ou excluir sua foto?
          </Text>
          <View style={styles.modalButtonsContainer}>
            {/* Botão para alterar a imagem */}
            <TouchableOpacity onPress={() => handleModalOption('alterar')} style={[styles.modalButton, { backgroundColor: currentColors.secondaryDetails }]}>
              <Text style={[styles.modalButtonText, { color: currentColors.intervalAndOtherDetails }]}>Alterar</Text>
            </TouchableOpacity>
            {/* Botão para excluir a imagem */}
            <TouchableOpacity onPress={() => handleModalOption('excluir')} style={[styles.modalButtonRed, { backgroundColor: currentColors.modalButtonRed }]}>
              <Text style={[styles.modalButtonText, { color: currentColors.intervalAndOtherDetails }]}>Excluir</Text>
            </TouchableOpacity>
          </View>
          {/* Botão para cancelar o modal */}
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
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '2%'
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: '2%'
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