import { View, Text, StyleSheet, Image } from 'react-native';
import styled from '@emotion/native';

export const Container = styled(View)`
  background-color: ${(props) => props.color ?? 'white'};
  align-self: ${(props) => props.me ?? 'flex-start'};
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
`;

export const TimeText = styled(Text)`
  color: gray;
  align-self: flex-end;
`;

export const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
