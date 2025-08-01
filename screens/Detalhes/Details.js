import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Share, ActivityIndicator, Alert } from 'react-native';

// Importa todos os componentes estilizados
import {
  Container,
  PokemonHeaderArea,
  PokemonImage,
  BadgeContainer,
  BadgeLeft,
  BadgeRight,
  BadgeText,
  ContentScroll,
  ContentInner,
  InfoRow,
  InfoItem,
  InfoValue,
  InfoLabel,
  VerticalDivider,
  StatsContainer,
  SectionTitle,
  StatRow,
  StatLabel,
  ProgressBarContainer,
  ProgressBarFill,
  StatValue,
  ShareButton,
  ButtonText,
  LoadingContainer,
  LoadingText
} from './DetailsStyles'; // Ajuste o caminho conforme necessário

const PokemonDetailsScreen = () => {
  const route = useRoute();
  const { pokemonId, pokemonName } = route.params;

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (err) {
        setError('Falha ao carregar detalhes do Pokemon.');
        console.error("Erro ao buscar detalhes do Pokemon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  const handleShare = async () => {
    if (!pokemonDetails) {
      Alert.alert('Erro', 'Detalhes do Pokemon não carregados para compartilhar.');
      return;
    }

    let message = `Conheça o ${pokemonDetails.name.toUpperCase()}!\n\n`;
    message += `Tipo(s): ${pokemonDetails.types.map(t => t.type.name).join(', ')}\n`;
    message += `Altura: ${(pokemonDetails.height / 10).toFixed(1)} m\n`;
    message += `Peso: ${(pokemonDetails.weight / 10).toFixed(1)} kg\n\n`;

    message += `Estatísticas Base:\n`;
    pokemonDetails.stats.forEach(stat => {
      const statNameFormatted = stat.stat.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      message += `- ${statNameFormatted}: ${stat.base_stat}\n`;
    });

    try {
      await Share.share({
        message: message,
        title: `Detalhes de ${pokemonDetails.name}`,
      });
    } catch (error) {
      Alert.alert(`Erro ao compartilhar: ${error.message}`);
    }
  };

  const getStatPercentage = (statValue) => {
    const maxStatValue = 150;
    return Math.min((statValue / maxStatValue) * 100, 100);
  };

  // Renderização Condicional
  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#478070" />
        <LoadingText>Carregando detalhes do Pokemon...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <LoadingText style={{ color: '#E74C3C' }}>{error}</LoadingText>
      </LoadingContainer>
    );
  }

  if (!pokemonDetails) {
    return (
      <LoadingContainer>
        <LoadingText>Nenhum detalhe encontrado para este Pokemon.</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* ÁREA DO CABEÇALHO */}
      <PokemonHeaderArea>
        {/* Badges de tipo */}
        <BadgeContainer>
        {pokemonDetails.types.map((typeInfo, index) => (
          index === 0 ? (
            <BadgeLeft key={index}>
            <BadgeText>{typeInfo.type.name.toUpperCase()}</BadgeText>
            </BadgeLeft>
            ) : (
              <BadgeRight key={index}>
              <BadgeText>{typeInfo.type.name.toUpperCase()}</BadgeText>
              </BadgeRight>
              )
              ))}
        </BadgeContainer>

        {/* Imagem do Pokémon */}
        <PokemonImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          }}
        />
      </PokemonHeaderArea>

      {/* CONTEÚDO PRINCIPAL */}
      <ContentScroll>
        <ContentInner>
          {/* Altura e Peso */}
          <InfoRow>
            <InfoItem>
              <InfoValue>{(pokemonDetails.height / 10).toFixed(1)} m</InfoValue>
              <InfoLabel>HEIGHT</InfoLabel>
            </InfoItem>
            
            <VerticalDivider />
            
            <InfoItem>
              <InfoValue>{(pokemonDetails.weight / 10).toFixed(1)} kg</InfoValue>
              <InfoLabel>WEIGHT</InfoLabel>
            </InfoItem>
          </InfoRow>

          {/* Estatísticas Base */}
          <StatsContainer>
            <SectionTitle>Base Stats</SectionTitle>
            {pokemonDetails.stats.map((statInfo, index) => {
              const statNameFormatted = statInfo.stat.name
                .replace('-', ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <StatRow key={index}>
                  <StatLabel>{statNameFormatted}</StatLabel>
                  <ProgressBarContainer>
                    <ProgressBarFill percentage={getStatPercentage(statInfo.base_stat)} />
                  </ProgressBarContainer>
                  <StatValue>{statInfo.base_stat}</StatValue>
                </StatRow>
              );
            })}
          </StatsContainer>

          {/* Botão Compartilhar */}
          <ShareButton onPress={handleShare}>
            <ButtonText>Compartilhar</ButtonText>
          </ShareButton>
        </ContentInner>
      </ContentScroll>
    </Container>
  );
};

export default PokemonDetailsScreen;