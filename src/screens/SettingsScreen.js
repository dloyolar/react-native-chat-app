import { Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Button } from 'react-native-paper';
import styled from '@emotion/native';
import { Body } from '../components/common/Body';

const CenterBody = styled(Body)`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: gray;
  margin-bottom: 24px;
  text-align: center;
`;

const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <CenterBody>
      <Title>Para ingresar con otro número de teléfono, presiona "Salir".</Title>
      <Button icon="key" mode="outlined" onPress={logout}>
        Salir
      </Button>
    </CenterBody>
  );
};

export default SettingsScreen;
