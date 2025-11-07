import { Tarjeta, theme, TabsComponent } from "rick-morty-card";
import { ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/material";
import "rick-morty-card/dist/styles.css";

import "./App.css";
import { useState } from "react";
import { useDeviceType } from "./hooks/useIsMobile";
import { useFavorite } from "./hooks/useFavorite";
import { tabs } from "./helpers/tabs";

interface AppProps {
  characters?: any[];
  favorites?: any[];
  setFavorites?: React.Dispatch<React.SetStateAction<any[]>>;
}

function App({ characters, favorites, setFavorites }: AppProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  const deviceType = useDeviceType();

  const { onFavoriteChange } = useFavorite({characters: characters || [], favorites: favorites || [], setFavorites: setFavorites!});

  const visibleList = selectedTab === "all" ? characters : favorites;


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: deviceType === "mobile" ? "center" : "start",
          justifyContent: "start",
          position: "relative",
          maxWidth: "1024px",
          width: "100%",
          backgroundColor: 'red',
          mx: '4px'
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={(value: string | number) => setSelectedTab(String(value))}
        />
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "32px",
            color: theme.palette.secondary[600] ?? "#000",
            top: "100px",
            display: "flex",
            columnGap: "8px",
            right: '16px',
            position: "absolute",
          }}
        >
          <Box fontWeight={600} fontSize={24}>
            {visibleList?.length}
          </Box>
          characters
        </Typography>
        <Box
          className="container-card-main"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            padding: 2,
            mt: "96px",
          }}
        >
          {visibleList?.length ? (
            visibleList.map((char: any) => (
              <Tarjeta
                key={char.id}
                id={char.id}
                name={char.name}
                species={char.species}
                status={char.status}
                location={char.location}
                gender={char.gender}
                image={char.image}
                variant={
                    deviceType === "mobile"
                        ? "vertical-small"
                        : deviceType === "tablet"
                        ? "vertical-normal"
                        : "horizontal-normal"
                }
                onFavoriteChange={onFavoriteChange}
              />
            ))
          ) : (
            <Box
              sx={{
                position: "absolute",
                bottom: -114,
                left: 0,
                right: 0,
                textAlign: "center",
                width: "100%",
                color: "#999",
                fontFamily: "Montserrat",
              }}
            >
              <Typography sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "100%",
                color: theme.palette.secondary[800],
              }}>Oh no!</Typography>
              <Typography sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "2%",
                top: "16px",
                position: "relative",
                color: theme.palette.secondary[600] ?? "#000",
              }}>There are no characters in {selectedTab === "all" ? "All" : "Favorites"}!</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
