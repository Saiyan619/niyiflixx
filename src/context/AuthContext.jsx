import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/Firebase";
import { doc, setDoc } from 'firebase/firestore';



const getAuthContext = createContext();

export  function AuthProvider({children}) {
    const [user, setuser] = useState({});

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
          setuser(currentUser)
      })
    
      return () => {
          unsuscribe();
      }
    }, [])
    

    const login = (email ,password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
 
    const signUp = (email ,password) => {
         createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, "users", email),{
            favMovies: [],
        })
    
    }
    const logOut = () => {
        return signOut(auth);
    }



    return (
        <getAuthContext.Provider value={{ user, signUp, login, logOut }}>{children}</getAuthContext.Provider>
        )

}

export function UserAuth() {
   return useContext(getAuthContext);
}
