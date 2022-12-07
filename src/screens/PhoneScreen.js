import { Keyboard, View } from 'react-native';
import React, { useContext, useState } from 'react';
import styled from '@emotion/native';
import { useForm, Controller } from 'react-hook-form';
import { Body } from '../components/common/Body';
import { Button, HelperText, TextInput, Title } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';

const CenterBody = styled(Body)`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
const StyledTextInput = styled(TextInput)`
  width: 100%;
  margin: 10px 0;
`;

const StyledView = styled(View)`
  width: 100%;
`;

const PhoneScreen = () => {
  const { control, handleSubmit, formState } = useForm();
  const { login } = useContext(AuthContext);

  const onLogin = handleSubmit((data) => {
    console.log({ data });
    login();
  });

  return (
    <CenterBody onTouchStart={() => Keyboard.dismiss()}>
      <Title>Ingresa un número de teléfono</Title>

      <Controller
        control={control}
        rules={{
          required: 'Ingresa un número',
          pattern: { value: /^\d{8}$/i, message: 'Formato inválido' },
        }}
        name="phone"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <StyledView>
            <StyledTextInput
              label="Teléfono"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              keyboardType="phone-pad"
              left={<TextInput.Affix text="+56 9 " />}
              maxLength={8}
              error={error}
            />
            <HelperText type="error" visible={Boolean(error)}>
              {error?.message}
            </HelperText>
          </StyledView>
        )}
      />

      <Button
        icon="key"
        mode="contained"
        onPress={onLogin}
        disabled={formState.isSubmitted && !formState.isValid}
      >
        Ingresar
      </Button>
    </CenterBody>
  );
};

export default PhoneScreen;
