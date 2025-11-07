// __mocks__/rick-morty-card.tsx
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    secondary: {
      600: "#555",
      main: "#000",
    },
  },
});

export const Tarjeta = ({ name }: { name: string }) => <div>{name}</div>;
export const TabsComponent = () => <button>Mock TabsComponent</button>;
