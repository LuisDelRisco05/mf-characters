import { Tarjeta, theme } from "rick-morty-card";
import { ThemeProvider, Box } from "@mui/material";
import type { Character } from "../types/character";
import "rick-morty-card/dist/styles.css";

interface CharactersListProps {
  characters: Character[];
}

export const CharactersList = ({ characters }: CharactersListProps) => {
  console.log("🚀 ~ CharactersList ~ characters:", characters)
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="container-card-main"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          width: '100%', // 👈 importante
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          boxSizing: 'border-box',
        }}
      >
        <Tarjeta
          name="Morty Smith"
          species="Humano"
          status="Vivo"
          lastLocation="Story Train"
          firstEpisode="Never Ricking Morty"
          image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          variant="horizontal-normal"
      />
      </Box>
    </ThemeProvider>
  );
};


// <Box className="container-card-main" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
//       <h1>MF Characters</h1>
      // <Tarjeta
      //   name="Morty Smith"
      //   species="Humano"
      //   status="Vivo"
      //   lastLocation="Story Train"
      //   firstEpisode="Never Ricking Morty"
      //   image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
      // />

//       <Tarjeta
//         name="Rick Sanchez"
//         image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
//         species="Humano"
//         status="Vivo"
//         lastLocation="Citadel of Ricks"
//         firstEpisode="Pilot"
//       />
      
//       <Tarjeta
//         name="Abadango"
//         species="Cronenbergs"
//         status="Muerto"
//         lastLocation="Abadango"
//         firstEpisode="Never Ricking Morty"
//         image="https://rickandmortyapi.com/api/character/avatar/6.jpeg"
//       />

//       <Tarjeta
//         name="Albert Einstein"
//         image="https://rickandmortyapi.com/api/character/avatar/11.jpeg"
//         species="Humano"
//         status="Muerto"
//         lastLocation="Earth"
//         firstEpisode="Pilot"
//       />
//       </Box>