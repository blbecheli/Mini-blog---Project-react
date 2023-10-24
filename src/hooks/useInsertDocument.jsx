import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial com 'loading' e 'error' como nulos.
const initialState = { loading: null, error: null };

// Reducer para atualizar o estado com base em ações.
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Função hook personalizada que facilita a inserção de documentos no Firebase Firestore.
export const useInsertDocument = (docCollection) => {
  // Criação do estado usando useReducer com o reducer insertReducer.
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Lida com o vazamento de memória com 'cancelled'.
  const [cancelled, setCancelled] = useState(false);

  // Função para despachar ação após verificar o status 'cancelled'.
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para inserir um documento no Firestore.
  const insertDocument = async (document) => {
    // Verifica se o hook não foi cancelado antes de começar a operação.
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      // Adiciona um timestamp de criação ao documento.
      const newDocument = { ...document, createdAt: Timestamp.now() };

      // Usa addDoc para adicionar o documento à coleção especificada.
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      // Despacha ação indicando que o documento foi inserido com sucesso.
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      // Despacha ação indicando que ocorreu um erro durante a inserção.
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Efeito para definir 'cancelled' como verdadeiro quando o componente é desmontado.
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função para inserir documentos e o estado de resposta.
  return { insertDocument, response };
};


// Esse código é um hook personalizado do React chamado `useInsertDocument` que facilita a inserção de documentos em uma coleção do Firebase Firestore. Vou explicar linha por linha, abordando cada elemento importado e sua função no código.

// 1. `import { useState, useEffect, useReducer } from "react";`
// - Aqui, você está importando os hooks do React que serão usados neste componente personalizado. `useState` é usado para gerenciar estados locais, `useEffect` é usado para lidar com efeitos colaterais e `useReducer` é usado para gerenciar estados complexos com base em ações.

// 2. `import { db } from "../firebase/config";`
// - Você está importando o objeto `db` de um arquivo chamado `config` localizado na pasta `firebase`. Este objeto provavelmente contém a configuração para se conectar ao Firebase Firestore.

// 3. `import { collection, addDoc, Timestamp } from "firebase/firestore";`
// - Aqui, você está importando alguns recursos específicos do Firebase Firestore:
//   - `collection` é uma função que representa uma coleção no Firestore.
//   - `addDoc` é uma função para adicionar um documento a uma coleção.
//   - `Timestamp` é uma classe que fornece timestamps do Firestore para marcar quando um documento foi criado.

// 4. `const initialState = { loading: null, error: null };`
// - Este é o estado inicial do hook. Ele possui duas propriedades, `loading` e `error`, que serão usadas para rastrear o estado da inserção do documento.

// 5. `const insertReducer = (state, action) => { ... }`
// - Aqui, você está definindo um reducer chamado `insertReducer`. O reducer é responsável por atualizar o estado com base em ações. Ele lida com três tipos de ações: "LOADING" (indicando que a operação de inserção está em andamento), "INSERTED_DOC" (indicando que o documento foi inserido com sucesso) e "ERROR" (indicando que ocorreu um erro durante a inserção).

// 6. `export const useInsertDocument = (docCollection) => { ... }`
// - Você está exportando uma função chamada `useInsertDocument` que é o seu hook personalizado. Ela recebe um parâmetro `docCollection`, que é o nome da coleção Firestore onde o documento será inserido.

// 7. `const [response, dispatch] = useReducer(insertReducer, initialState);`
// - Aqui, você está usando o `useReducer` para criar um estado `response` que será gerenciado pelo reducer `insertReducer`. `dispatch` é uma função usada para despachar ações que irão atualizar o estado.

// 8. `const [cancelled, setCancelled] = useState(false);`
// - Você está usando `useState` para criar uma variável de estado `cancelled` que controla se o hook foi cancelado para evitar vazamentos de memória.

// 9. `const checkCancelBeforeDispatch = (action) => { ... }`
// - Esta função verifica se o hook foi cancelado antes de despachar uma ação. Isso evita que ações sejam despachadas após o componente ter sido desmontado.

// 10. `const insertDocument = async (document) => { ... }`
//  - Esta função assíncrona `insertDocument` é o principal ponto de inserção do documento no Firestore. Ela cria um novo documento com um timestamp de criação e usa `addDoc` para adicioná-lo à coleção especificada.

// 11. `useEffect(() => { ... }, []);`
//  - Este efeito colateral é usado para definir `cancelled` como `true` quando o componente é desmontado, garantindo que nenhuma ação seja despachada após a desmontagem.

// 12. `return { insertDocument, response };`
//  - Por fim, o hook retorna duas coisas: a função `insertDocument` que pode ser usada para iniciar a inserção de documentos e o estado `response` que contém informações sobre o estado da inserção.

// Em resumo, esse hook personalizado facilita a inserção de documentos em uma coleção Firestore, gerencia o estado do processo e lida com vazamentos de memória. Ele é útil quando você deseja adicionar documentos de forma assíncrona em um aplicativo React que usa o Firebase Firestore como banco de dados.