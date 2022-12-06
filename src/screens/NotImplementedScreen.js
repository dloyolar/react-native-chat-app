import styled from '@emotion/native';
import { View, Text, Image } from 'react-native';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: gray;
`;

const ImageStyled = styled(Image)`
  width: 80%;
  height: 320px;
`;

const NotImplementedScreen = () => {
  return (
    <Container>
      <Title>Estamos trabajando para traerte esta funcionalidad</Title>
      <ImageStyled
        source={{
          uri: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-faro_114360-667.jpg?w=826&t=st=1670265024~exp=1670265624~hmac=c80bcbb9f89ec0e2eabae2ca539bc689e8f2f59c4d45b07dee3c9965f1c8195a',
        }}
        resizeMode="contain"
      />
    </Container>
  );
};

export default NotImplementedScreen;
