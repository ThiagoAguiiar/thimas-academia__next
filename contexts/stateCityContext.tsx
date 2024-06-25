"use client";

import React from "react";

interface IStateData {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

interface ICityData {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

interface IOptions {
  label: string;
  value: string;
}

interface IChildren {
  children: React.ReactNode;
}

interface IStateCityContext {
  states: IOptions[];
  cities: IOptions[];
  selectCity: string;
  setSelectedCity: (city: string) => void;
  selectState: string;
  setSelectedState: (state: string) => void;
}

const StateCityContext = React.createContext<IStateCityContext | null>(null);

export const StateCityProvider = ({ children }: IChildren) => {
  const [selectCity, setSelectedCity] = React.useState<string>("");
  const [selectState, setSelectedState] = React.useState<string>("");

  const [states, setStates] = React.useState<IOptions[]>([]);
  const [cities, setCities] = React.useState<IOptions[]>([]);

  React.useEffect(() => {
    const fetchEstados = async () => {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const json: IStateData[] = await response.json();

      json.sort((a, b) => a.nome.localeCompare(b.nome));

      const aux: IOptions[] = json.map(({ nome, id }) => ({
        label: nome,
        value: id.toString(),
      }));

      setStates(aux);
    };

    fetchEstados();
  }, []);

  React.useEffect(() => {
    if (selectState) {
      const fetchCidades = async () => {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectState}/municipios`
        );

        const json: ICityData[] = await response.json();

        json.sort((a, b) => a.nome.localeCompare(b.nome));

        const aux: IOptions[] = json.map(({ nome, id }) => ({
          label: nome,
          value: id.toString(),
        }));

        setCities(aux);
      };

      fetchCidades();
    } else {
      setCities([]);
    }

    setSelectedCity("");
  }, [selectState]);

  return (
    <StateCityContext.Provider
      value={{
        states,
        cities,
        setSelectedCity,
        selectCity,
        selectState,
        setSelectedState,
      }}
    >
      {children}
    </StateCityContext.Provider>
  );
};

export const useStateCityContext = () => {
  const context = React.useContext(StateCityContext);
  if (!context) {
    throw new Error("Erro ao usar StateCityContext");
  }
  return context;
};
