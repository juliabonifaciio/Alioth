import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

import { Colors } from '@/constants/Colors';

type Props = IButtonProps & {
    title: string;
};

export function Button({ title, ...rest }: Props) {
    return (
        <NativeBaseButton 
            bg={Colors.dark.generalDetails}
            w='full'
            h={12}
            rounded={8}
            _pressed={{
                bg: Colors.dark.secondaryDetails
            }}
            {...rest}
        >
            <Text
                color={Colors.dark.text}
                fontSize={18}
            >
                {title}
            </Text>
        </NativeBaseButton>
    );
}