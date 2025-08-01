import styled from 'styled-components/native';

// Variáveis auxiliares
const POKEMON_IMAGE_HEIGHT = 190;
const POKEMON_IMAGE_TOP_IN_GREEN_AREA = 62;
const POKEMON_IMAGE_OVERLAP_AMOUNT = POKEMON_IMAGE_HEIGHT * 0.30;

// Container principal
export const Container = styled.View`
  flex: 1;
  background-color: #97CBAF;
`;

// Área do fundo verde
export const PokemonHeaderArea = styled.View`
  height: ${POKEMON_IMAGE_TOP_IN_GREEN_AREA + POKEMON_IMAGE_HEIGHT}px;
  overflow: visible;
  position: relative;
  align-items: center;
`;

// Imagem do Pokémon (centralizada corretamente)
export const PokemonImage = styled.Image`
  width: ${POKEMON_IMAGE_HEIGHT}px;
  height: ${POKEMON_IMAGE_HEIGHT}px;
  position: absolute;
  top: ${POKEMON_IMAGE_TOP_IN_GREEN_AREA}px;
  left: 50%;
  transform: translateX(-${POKEMON_IMAGE_HEIGHT / 2}px);
  z-index: 10;
`;

// Container de badges
export const BadgeContainer = styled.View`
  flex-direction: row;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 20;
`;

// Componente base para badges
// Badge esquerdo (verde)
export const BadgeLeft = styled.View`
  height: 32px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  padding: 0 12px;
  background-color: #478070;
`;

// Badge direito (cinza)
export const BadgeRight = styled.View`
  height: 32px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  padding: 0 12px;
  background-color: #565656;
`;
// Texto do badge
export const BadgeText = styled.Text`
  font-family: 'OpenSans_400Regular';
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: white;
`;

// Área de conteúdo principal (rolável)
export const ContentScroll = styled.ScrollView`
  flex-grow: 1;
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  width: 100%;
  margin-top: -${POKEMON_IMAGE_OVERLAP_AMOUNT}px;
`;

// Container interno do conteúdo
export const ContentInner = styled.View`
  padding-top: ${POKEMON_IMAGE_OVERLAP_AMOUNT + 8}px;
  padding-bottom: 20px;
  padding-horizontal: 24px;
`;

// Linha de informações (altura/peso)
export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

// Item de informação
export const InfoItem = styled.View`
  align-items: center;
  flex: 1;
  margin-bottom: 24px;
`;

// Valor da informação
export const InfoValue = styled.Text`
  font-family: 'Overpass_600SemiBold';
  font-size: 32px;
  color: #000;
  margin-bottom: 4px;
`;

// Label da informação
export const InfoLabel = styled.Text`
  font-family: 'OpenSans_400Regular';
  color: #000;
  font-size: 14px;
`;

// Divisor vertical
export const VerticalDivider = styled.View`
  width: 1px;
  height: 60px;
  background-color: #E5E5E5;
  margin-horizontal: 10px;
`;

// Container de estatísticas
export const StatsContainer = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

// Título da seção
export const SectionTitle = styled.Text`
  font-family: 'Overpass_600SemiBold';
  font-size: 18px;
  color: #222;
  margin-bottom: 16px;
`;

// Linha de estatística
export const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

// Label da estatística
export const StatLabel = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  width: 80px;
  font-size: 14px;
  color: #000;
  text-transform: capitalize;
`;

// Container da barra de progresso
export const ProgressBarContainer = styled.View`
  flex: 1;
  height: 6px;
  background-color: #E5E5E5;
  border-radius: 3px;
  overflow: hidden;
  margin-horizontal: 12px;
`;

// Parte preenchida da Barra de progresso
export const ProgressBarFill = styled.View`
  height: 100%;
  background-color: #478070;
  border-radius: 3px;
  width: ${({ percentage }) => percentage}%;
`;

// Valor numérico da estatística
export const StatValue = styled.Text`
  font-family: 'Overpass_700Bold';
  width: 40px;
  font-size: 14px;
  color: #222;
  text-align: right;
`;

// Botão de compartilhamento
export const ShareButton = styled.TouchableOpacity`
  background-color: #478070;
  padding: 9px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 32px;
`;

// Texto do botão
export const ButtonText = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  color: white;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

// Container de loading
export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #97CBAF;
`;

// Texto de loading
export const LoadingText = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  color: white;
  font-size: 18px;
  margin-top: 16px;
`;