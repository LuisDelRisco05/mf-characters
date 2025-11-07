import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useFavorite } from "../useFavorite";

const mockCharacters = [
  { id: 1, name: "Rick" },
  { id: 2, name: "Morty" },
];

describe("useFavorite", () => {
  it("debe agregar un personaje a favoritos", () => {
    let favorites: any[] = [];
    const setFavorites: React.Dispatch<React.SetStateAction<any[]>> = (
      newFavs
    ) => {
      if (typeof newFavs === "function") {
        favorites = (newFavs as (prev: any[]) => any[])(favorites);
      } else {
        favorites = newFavs;
      }
    };

    const { result } = renderHook(() =>
      useFavorite({ characters: mockCharacters, favorites, setFavorites })
    );

    act(() => {
      result.current.onFavoriteChange(1, true);
    });

    expect(favorites).toHaveLength(1);
    expect(favorites[0].name).toBe("Rick");
  });

  it("debe eliminar un personaje de favoritos", () => {
    let favorites = [{ id: 1, name: "Rick" }];
    const setFavorites: React.Dispatch<React.SetStateAction<any[]>> = (
      newFavs
    ) => {
      if (typeof newFavs === "function") {
        favorites = (newFavs as (prev: any[]) => any[])(favorites);
      } else {
        favorites = newFavs;
      }
    };

    const { result } = renderHook(() =>
      useFavorite({ characters: mockCharacters, favorites, setFavorites })
    );

    act(() => {
      result.current.onFavoriteChange(1, false);
    });

    expect(favorites).toHaveLength(0);
  });
});
