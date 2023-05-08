import { test, expect, describe } from "@jest/globals";
import Movies from "./interfaces/movies";
const availableMovies = require("./index.ts");

const movies: Array<Movies> = [
  { title: "Filme 2", minAge: 0 },
  { title: "Filme 1", minAge: 10 },
  { title: "Filme 3", minAge: 1000 },
];

test("Lista de filmes indisponível", () => {
  expect(() => availableMovies({ movies: [], age: 10 })).toThrowError('Lista de filmes indisponível');
});

describe("Idades extremas", () => {
  test("Idade negativa", () => {
    expect(() => availableMovies(movies, -10)).toThrowError('Idade inválida');
  });

  test("Idade extremamente alta", () => {
    expect(availableMovies( movies, 10000 )).toEqual([
      { title: "Filme 2", minAge: 0 },
      { title: "Filme 1", minAge: 10 },
      { title: "Filme 3", minAge: 1000 }
    ]);
  });
});

describe("Idades realistas", () => {
  test("Filmes para até X anos", () => {
    expect(availableMovies( movies, 9 )).toEqual([{ title: "Filme 2", minAge: 0 }]);
  });

  test("Filmes com idade mínima igual a idade fornecida", () => {
    expect(availableMovies(movies, 10)).toEqual([
      { title: "Filme 2", minAge: 0 },
      { title: "Filme 1", minAge: 10 }
    ]);
  });
});
