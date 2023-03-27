import React, { createContext, useState, useEffect, useContext } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  GoogleSignin.configure({
    webClientId:
      "596221088121-08hfauu9kprqftfpdb4oq12qsrjslb51.apps.googleusercontent.com",
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    setLoading(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(googleCredential);
    if (user) setLoading(false);
    return user;
  }

  signOut = async () => {
    auth()
      .signOut()
      .then(() => setUser(null));
  };
  return (
    <AuthContext.Provider
      value={{
        initializing,
        user,
        loading,
        setUser,
        setInitializing,
        onGoogleButtonPress,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
