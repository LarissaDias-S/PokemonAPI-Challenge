// screens/Lista/ListStyles.js

import styled from 'styled-components/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// --- REUTILIZAÇÃO DE ESTILOS COMUNS ---
const ShadowStyles = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

// --- COMPONENTES ESTILIZADOS ---
export const Container = styled(View)`
  flex: 1;
  padding-top: 5px;
  background-color: #f0f0f0;
`;

export const PokemonCard = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  margin-horizontal: 10px;
  margin-vertical: 5px;
  background-color: #fff;
  border-radius: 8px;
  ${ShadowStyles.shadowColor ? `shadow-color: ${ShadowStyles.shadowColor};` : ''}
  ${ShadowStyles.shadowOffset ? `shadow-offset: ${ShadowStyles.shadowOffset.width}px ${ShadowStyles.shadowOffset.height}px;` : ''}
  ${ShadowStyles.shadowOpacity ? `shadow-opacity: ${ShadowStyles.shadowOpacity};` : ''}
  ${ShadowStyles.shadowRadius ? `shadow-radius: ${ShadowStyles.shadowRadius}px;` : ''}
  ${ShadowStyles.elevation ? `elevation: ${ShadowStyles.elevation};` : ''}
  overflow: hidden;
  position: relative;
`;

export const PokemonName = styled(Text)`
  font-family: 'Overpass_600SemiBold';
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: #333;
`;

export const PokemonImage = styled(Image)`
  width: 60px;
  height: 60px;
  resize-mode: contain;
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  margin-top: 16px;
  font-family: 'OpenSans_600SemiBold';
  color: #555;
`;

// Componente para a lista vazia
export const EmptyListContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyListText = styled(Text)`
  font-family: 'OpenSans_600SemiBold';
  font-size: 16px;
  color: #666;
  text-align: center;
`;

// Componente para separadores na lista
export const Separator = styled(View)`
  height: 1px;
  background-color: #e0e0e0;
  margin-vertical: 5px;
`;

// NOVO ESTILO: Rodapé do FlatList para o carregamento de mais itens
export const FooterLoading = styled(View)`
  padding-vertical: 20px;
`;