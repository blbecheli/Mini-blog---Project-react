import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

// Este é um exemplo de um hook personalizado em React criado para lidar com consultas de URL usando a biblioteca "react-router-dom". Vou explicar cada linha do código para você:

// import { useLocation } from "react-router-dom";: Esta linha de código importa a função useLocation da biblioteca "react-router-dom". Essa função é usada para acessar informações sobre a localização atual da URL na sua aplicação.

// import { useMemo } from "react";: Aqui, você está importando a função useMemo da biblioteca "react". O useMemo é um gancho que permite memorizar o resultado de uma função para evitar cálculos desnecessários sempre que o componente for renderizado.

// export const useQuery = () => {: Esta linha define o início do seu hook personalizado chamado useQuery. Hooks personalizados são funções que seguem um padrão específico e podem ser usados em componentes funcionais do React.

// const search = useLocation(): Aqui, você está chamando a função useLocation para obter o objeto de localização atual. O objeto search conterá informações sobre a consulta da URL, como ?param1=value1&param2=value2.

// return useMemo(() => {: Esta linha inicia o uso do useMemo para memorizar o resultado da função. O que isso faz é garantir que a próxima parte do código só seja executada quando search for modificado.

// return new URLSearchParams(search): Dentro da função useMemo, você está criando uma nova instância de URLSearchParams usando o objeto search. O URLSearchParams é uma API que facilita a manipulação de parâmetros de consulta na URL.

// }, [search]): Este array [search] é a lista de dependências para o useMemo. Isso significa que a função dentro do useMemo só será reavaliada quando search mudar. Isso é importante para evitar que a função seja executada desnecessariamente.

// Resumindo, este hook personalizado useQuery usa a função useLocation do "react-router-dom" para obter a consulta da URL atual e a envolve em um useMemo. Isso ajuda a evitar que a consulta da URL seja recalculada toda vez que o componente que utiliza esse hook for renderizado, economizando recursos de computação. O resultado do useQuery será uma instância de URLSearchParams que pode ser usada para acessar e manipular os parâmetros da consulta da URL dentro do seu componente React.