import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VStack, Text, ScrollView, NativeBaseProvider, View, IconButton, Icon, Modal, Button as NBButton } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import { Input } from '@/components/Input';

type RootStackParamList = {
  Login: undefined;
  Password: undefined
};

type PasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Password'>;

const BackgroundGradient = ({ colors }: { colors: string[] }) => {
  return (
    <LinearGradient
      colors={colors}
      style={{ 
        flex: 1, 
        position: 'absolute', 
        width: '100%', 
        height: '100%' 
      }}
    />
  );
};

export default function Password() {
  const navigation = useNavigation<PasswordScreenNavigationProp>();

  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const [accessCode, setAccessCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Verifica se o botão deve ser habilitado
  const isButtonDisabled = !(accessCode.length === 5 && newPassword.length >= 8 && confirmPassword.length >= 8 && newPassword === confirmPassword);

  const handleUpdatePassword = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <NativeBaseProvider>
      <StatusBar 
        translucent={true} 
        backgroundColor="transparent" 
        barStyle={currentColors.statusBarContent as 'light-content' | 'dark-content'}
      />

      <VStack 
        flex={1} 
        bg={currentColors.background} 
        alignItems='center' 
        justifyContent='center'
      >
        <BackgroundGradient colors={[currentColors.linearGradient, currentColors.linearGradient2]} />

        <IconButton
          icon={
            <Icon 
              as={Ionicons} 
              name='arrow-back' 
              color={currentColors.text} 
              size={'lg'}
            />
          }
          position='absolute'
          top='5%'
          left='0%'
          backgroundColor='transparent'  
          onPress={() => navigation.goBack()}
          _pressed={{ backgroundColor: 'transparent' }}  
        />

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '5%'
          }}
        >
          <Text 
            color={currentColors.text} 
            fontSize={24} 
            fontWeight="bold" 
            mb='5%' 
            textTransform='uppercase'
          >
            Atualizar Senha
          </Text>

          <ScrollView width='100%'>
            <Text 
              color={currentColors.text} 
              fontSize={18} 
              fontWeight='bold'
              mt='5%'
              mb='2%'
            >
              Código de Acesso:
            </Text>

            <Input
              backgroundColor={currentColors.background}
              color={currentColors.subtextTextInputAndSvg}
              placeholder='Digite os cinco primeiros digitos do seu CPF...'
              placeholderTextColor={currentColors.subtextTextInputAndSvg}
              keyboardType='numeric'
              maxLength={5} 
              onChangeText={(text) => setAccessCode(text)}
              value={accessCode}
              width='100%'
              height='50%'
            />

            <Text 
              color={currentColors.text} 
              fontSize={18} 
              fontWeight='bold'
              mt='4%'
              mb='2%'
            >
              Nova Senha:
            </Text>

            <Input
              backgroundColor={currentColors.background}
              color={currentColors.subtextTextInputAndSvg}
              placeholder='Digite sua nova senha...'
              placeholderTextColor={currentColors.subtextTextInputAndSvg}
              secureTextEntry
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              width='100%'
              height='50%'
            />

            <Text 
              color={currentColors.text} 
              fontSize={18} 
              fontWeight='bold'
              mt='4%'
              mb='2%'
            >
              Repetir Nova Senha:
            </Text>

            <Input
              backgroundColor={currentColors.background}
              color={currentColors.subtextTextInputAndSvg}
              placeholder="Repita sua nova senha..."
              placeholderTextColor={currentColors.subtextTextInputAndSvg}
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              width='100%'
              height='50%'
            />

            <NBButton
              isDisabled={isButtonDisabled} // Verifica se o botão deve ser habilitado
              bg={currentColors.secondaryDetails} // Cor de fundo
              width='100%'
              height={50}
              mt='6%'
              borderRadius={8}
              onPress={handleUpdatePassword}
              _pressed={{ bg: currentColors.generalDetails }} 
            >
              <Text color={currentColors.alternativeText} fontWeight='bold'>
                Atualizar Senha
              </Text>
            </NBButton>

          </ScrollView>
        </View>

        {/* Modal para confirmação de atualização de senha */}
        <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content bg={currentColors.intervalAndOtherDetails} borderRadius={8}>
            {/* Removido o Modal.CloseButton */}
            <Modal.Body>
              <VStack alignItems='center' space={4}>
                <Text color={currentColors.text} fontSize={18}>
                  Senha atualizada com sucesso!
                </Text>
                <NBButton 
                  onPress={handleModalOk}
                  bg={currentColors.secondaryDetails} 
                  _pressed={{ bg: currentColors.generalDetails }} 
                  borderRadius={8}
                  width="50%"
                >
                  <Text color={currentColors.alternativeText} fontWeight='bold'>
                    Ok
                  </Text>
                </NBButton>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </VStack>
    </NativeBaseProvider>
  );
}