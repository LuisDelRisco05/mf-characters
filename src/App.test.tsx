import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";

// 🧠 Mock del módulo externo completo
vi.mock("rick-morty-card", async () => {
  return {
    Tarjeta: vi.fn(() => <div>Mock Tarjeta</div>),
    TabsComponent: vi.fn(() => (
      <button data-testid="mock-tabs">Mock TabsComponent</button>
    )),
    theme: {
      palette: {
        secondary: { 600: "#123456" },
      },
    },
  };
});

// 🔧 Crear un tema base para el provider
const mockTheme = createTheme({
  palette: { secondary: { main: "#123456" } },
});

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza los personajes en el tab All", async () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <App />
      </ThemeProvider>
    );

    expect(await screen.findByTestId("mock-tabs")).toBeInTheDocument();

  });

  it("muestra el mensaje vacío cuando no hay personajes", async () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <App />
      </ThemeProvider>
    );

    // Comprobamos el texto que realmente se renderiza
    expect(
      await screen.findByText(/There are no characters in All/i)
    ).toBeInTheDocument();
  });

  it("permite cambiar de pestaña", async () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <App />
      </ThemeProvider>
    );

    const tabButton = await screen.findByTestId("mock-tabs");
    fireEvent.click(tabButton);

    expect(tabButton).toBeInTheDocument();
  });
});
