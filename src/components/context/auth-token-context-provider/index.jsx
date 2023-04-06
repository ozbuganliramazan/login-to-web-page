import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";


const initialValue = {};

export const AuthTokenContext = createContext(initialValue);

export default function AuthTokenContextProvider(props) {
  const [token, setToken] = useState(null);
  const localStorageToken = localStorage.getItem("token");
  const userState = useSelector((state) => state.userState);
  const api = useApi();

  if (token === null && localStorageToken !== null) {
    console.log("Birinci durum gerçekleşti.");
    setToken(localStorageToken);

    // TODO Api'den user bilgilerini al ve RTK'e gönder.
  } else {
    console.log("Üçüncü durum gerçekleşti.");

    localStorage.setItem("token", token);
  }

  // TODO Reduxa bağlanıp kullanıcı bilgileri olup olmadığını kontrol et,
  // eğer kullanıcı bilgisi reduxta yoksa o zaman API'den bilgiyi alıp
  // redux'a gönder.
  if (token !== null && userState.userData === null) {
    api
      .get("user/appData")
      .then((resp) => {
        console.log(">> App Data Result", resp);
      })
      .catch((err) => {
        console.log(">> App Data Err", err);
      });
  }

  const contextValue = {
    token,
    setToken,
  };

  return (
    <AuthTokenContext.Provider value={contextValue}>
      {props.children}
    </AuthTokenContext.Provider>
  );
}