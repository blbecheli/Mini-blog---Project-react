import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memoru leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfisCancelled() {
        if (cancelled) {
            return
        }
    }

    //register
    const createUser = async (data) => {
        checkIfisCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            setError(systemErrorMessage)
        }
        setLoading(false)
    }

    //logout - sign-out
    const logout = () => {
        checkIfisCancelled()

        signOut(auth)
    }

    //login - sign-in
    const login = async (data) => {
        checkIfisCancelled();
    
        setLoading(true);
        setError(false);
    
        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
          console.log(error.message);
          console.log(typeof error.message);
          console.log(error.message.includes("user-not"));
    
          let systemErrorMessage;
    
          if (error.message.includes("invalid")) {
            systemErrorMessage = "User / password incorrect. Try again.";          
          } else {
            systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
          }
    
          console.log(systemErrorMessage);
    
          setError(systemErrorMessage);
        }
    
        console.log(error);
    
        setLoading(false);
      }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout, 
        login
    }
}