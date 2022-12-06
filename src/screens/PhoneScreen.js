import { Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import styled from '@emotion/native';
import { Body } from '../components/common/Body';
import { Button, TextInput, Title } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';

const CenterBody = styled(Body)`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
const StyledTextInput = styled(TextInput)`
  width: 100%;
  margin: 20px 0;
`;

const PhoneScreen = () => {
  const [phone, setPhone] = useState('');
  const { login } = useContext(AuthContext);

  const onLogin = () => {
    if (phone.length !== 8) return;
    login();
  };

  return (
    <CenterBody onTouchStart={() => Keyboard.dismiss()}>
      <Title>Ingresa un número de teléfono</Title>
      <StyledTextInput
        label="Teléfono"
        value={phone}
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
        left={<TextInput.Affix text="+56 9 " />}
        maxLength={8}
      />

      <Button icon="key" mode="contained" onPress={onLogin}>
        Ingresar
      </Button>
    </CenterBody>
  );
};

export default PhoneScreen;
