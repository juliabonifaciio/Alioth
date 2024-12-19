import { Input as NativeBaseInput, IInputProps } from 'native-base';

import { Colors } from '@/constants/Colors';

export function Input({...rest}: IInputProps) {
    return (
        <NativeBaseInput
            bg={Colors.dark.background}
            w='full'
            h={12}
            mb={4}
            px={4}
            fontSize={16}
            borderWidth={0}
            rounded={8}
            placeholderTextColor={Colors.dark.subtextTextInputAndSvg}
            _focus={{
                bg: 'transparent',
                borderWidth: 2,
                borderColor: Colors.dark.generalDetails
            }}
            {...rest}
        />
    );
}