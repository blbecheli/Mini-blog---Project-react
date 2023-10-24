import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// Estado inicial com 'loading' e 'error' como nulos.
const initialState = { loading: null, error: null };

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // Lida com o vazamento de memória com 'cancelled'.
    const [cancelled, setCancelled] = useState(false);

    // Função para despachar ação após verificar o status 'cancelled'.
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (id) => {
        // Verifica se o hook não foi cancelado antes de começar a operação.
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {            
            const deletedDocument = await deleteDoc(doc(db,docCollection, id));
            
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });
        } catch (error) {            
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
        }
    };

    // Efeito para definir 'cancelled' como verdadeiro quando o componente é desmontado.
    useEffect(() => {
        return () => setCancelled(true);
    }, []);
    
    return { deleteDocument, response };
};

