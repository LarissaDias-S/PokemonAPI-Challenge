// screens/Lista/List.js

import React, { useState, useEffect } from 'react';
// Certifique-se de importar todos os componentes nativos que você usa no seu JSX
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native';

// Importa os componentes estilizados que você definiu em ListStyles.js
import { Container, PokemonCard, PokemonName, PokemonImage, LoadingContainer } from './ListStyles';

export default function ListScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // NOVO ESTADO: Controla o ponto de partida da busca
  const [offset, setOffset] = useState(0); 
  // NOVO ESTADO: Para o indicador de carregamento no rodapé
  const [loadingMore, setLoadingMore] = useState(false); 
  // NOVO ESTADO: Para saber quando parar de buscar
  const [allPokemonsLoaded, setAllPokemonsLoaded] = useState(false); 

  // A constante para o número de Pokemons por página
  const POKEMONS_PER_PAGE = 20;

  useEffect(() => {
    const fetchPokemons = async () => {
      // Se já estiver carregando mais ou todos os pokemons já foram carregados, não faz nada
      if (loadingMore || allPokemonsLoaded) return;
      
      try {
        // Se for a primeira busca, mostra o indicador principal. Senão, o do rodapé.
        if (offset === 0) setLoading(true); else setLoadingMore(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMONS_PER_PAGE}&offset=${offset}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Verifica se há mais Pokemons para carregar
        if (data.results.length === 0) {
            setAllPokemonsLoaded(true);
            return;
        }

        const pokemonsWithDetails = data.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return {
            ...pokemon,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });

        // NOVO: Adiciona os novos pokemons à lista existente, em vez de substituí-los
        setPokemons(prevPokemons => [...prevPokemons, ...pokemonsWithDetails]);

      } catch (err) {
        setError('Falha ao carregar Pokemons. Por favor, verifique sua conexão ou tente novamente mais tarde.');
        console.error("Erro ao buscar Pokemons:", err);
      } finally {
        if (offset === 0) setLoading(false); else setLoadingMore(false);
      }
    };

    fetchPokemons();
  }, [offset]); // NOVO: O useEffect agora roda sempre que o 'offset' muda

  // NOVO: Função para carregar mais pokemons quando o usuário chega ao final da lista
  const handleLoadMore = () => {
    // Só carrega mais se não estiver em processo de carregamento e se ainda houver pokemons para carregar
    if (!loadingMore && !allPokemonsLoaded) {
      setOffset(prevOffset => prevOffset + POKEMONS_PER_PAGE);
    }
  };

const renderItem = ({ item }) => (
  // AQUI: Usar a tag <PokemonCard> que é o componente estilizado
  <PokemonCard
    onPress={() => navigation.navigate('PokemonDetails', { pokemonId: item.id, pokemonName: item.name })}
  >
    {/* AQUI: Usar a tag <PokemonImage> */}
    <PokemonImage source={{ uri: item.imageUrl }} />
    {/* AQUI: Usar a tag <PokemonName> */}
    <PokemonName>{item.name.toLowerCase()}</PokemonName>
  </PokemonCard> // <-- FECHAMENTO CORRETO da tag <PokemonCard>
);

  // NOVO: Função para renderizar o rodapé do FlatList
  const renderFooter = () => {
    if (!loadingMore) return null; // Se não estiver carregando mais, não mostra nada
    return (
      <View style={{paddingVertical: 20}}> {/* Estilo inline para o footer */}
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando Pokemons...</Text>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        // NOVAS PROPS para a paginação
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Dispara a função quando o usuário rola até 50% do final da lista
        ListFooterComponent={renderFooter} // Adiciona o indicador de carregamento ao final da lista
      />
    </Container>
  );
}