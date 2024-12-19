import React, { useState } from 'react';
import { Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VStack, Text, ScrollView, NativeBaseProvider, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

// Defina os tipos para suas rotas
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Password: undefined;
};

// Tipo de navegação que define a rota 'Login' e sua associação com a pilha de navegação
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Componente que cria um fundo com gradiente usando cores passadas como props
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

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [accessCodeError, setAccessCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Pegando as dimensões da tela
  const screenHeight = Dimensions.get('window').height;

  // Use useFocusEffect para redefinir os estados de erro e os valores dos inputs ao voltar para a tela
  useFocusEffect(
    React.useCallback(() => {
      setAccessCode(''); // Limpa o código de acesso
      setPassword(''); // Limpa a senha
      setAccessCodeError(''); // Limpa o alerta do código
      setPasswordError(''); // Limpa o alerta da senha
    }, [])
  );

  // Verificação da quantidade de caracteres que tem que ser trocada depois para a verificação se senha e o código estão corretos...
  const handleLogin = () => {
    if (accessCode.length !== 5) {
      setAccessCodeError('O código precisa ter cinco caracteres. Tente novamente.');
    } else {
      setAccessCodeError('');
    }

    if (password.length < 8) {
      setPasswordError('A senha está muito curta.');
    } else {
      setPasswordError('');
    }

    if (accessCode.length === 5 && password.length >= 8) {
      navigation.navigate('Main');
    }
  };

  return (
    <NativeBaseProvider>
      <StatusBar 
        translucent={true} 
        backgroundColor='transparent' 
        barStyle={currentColors.statusBarContent as 'light-content' | 'dark-content'}
      />
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <VStack flex={1} bg={currentColors.background}>
            <BackgroundGradient colors={[currentColors.linearGradient, currentColors.linearGradient2]} />
            
            <View
              style={{
                flex: 1,
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '20%',   
              }}
            >
              <Image 
                source={require('@/assets/images/logo.png')} 
                style={[styles.image, { height: screenHeight * 0.25 }]} // A altura da imagem é definida como 25% da altura da tela
              />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: '5%' }}>
              <Text 
                color={currentColors.text} 
                fontSize={18} 
                fontWeight={'bold'}
                mb='2%'
              >
                Código de acesso:
              </Text>

              <Input
                backgroundColor={currentColors.background}
                color={currentColors.subtextTextInputAndSvg}
                placeholder='Digite os cinco primeiros dígitos do seu CPF...'
                placeholderTextColor={currentColors.subtextTextInputAndSvg}
                keyboardType='numeric'
                maxLength={5} 
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setAccessCode(numericText); // Atualiza o valor do código de acesso
                }}
                value={accessCode}
              />

              {accessCodeError ? (
                <Text 
                  color={currentColors.modalButtonRed} 
                  fontSize={14} 
                  fontWeight={'bold'}
                  m='2%'
                >
                  {accessCodeError}
                </Text>
              ) : null}

              <Text 
                color={currentColors.text}
                fontSize={18} 
                fontWeight={'bold'}
                mt='2%' 
                mb='5%'
              >
                Senha:
              </Text>

              <Input
                backgroundColor={currentColors.background}
                color={currentColors.subtextTextInputAndSvg}
                placeholder='Digite sua senha...'
                placeholderTextColor={currentColors.subtextTextInputAndSvg}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />

              {passwordError ? (
                <Text 
                  color={currentColors.modalButtonRed} 
                  fontSize={14} 
                  fontWeight={'bold'}
                  m='2%'
                >
                  {passwordError}
                </Text>
              ) : null}

              <Button
                title='Entrar'
                color={currentColors.secondaryDetails}
                mt={2}
                onPress={handleLogin}
              />

              <Text
                color={currentColors.generalDetails}
                fontSize={16}
                fontWeight="bold"
                mt={4}
                onPress={() => navigation.navigate('Password')}
              >
                Esqueceu a sua senha?
              </Text>
            </ScrollView>
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '60%',
    marginTop: '20%',
    resizeMode: 'contain', // Mantém o aspecto da imagem dentro dos limites
  },
});