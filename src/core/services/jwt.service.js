const ID_TOKEN_KEY = "id_token";
const ID_USER = "id_user";
const ID_MODE = "id_mode";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const getUser = () => {
  try{
    return JSON.parse(window.localStorage.getItem(ID_USER));
  }catch(e){
    return null;
  }
 
};
export const saveUser = user => {
   window.localStorage.setItem(ID_USER, JSON.stringify(user));
};

export const getLoginMode = () => {
  return window.localStorage.getItem(ID_MODE);
};
export const saveLoginMode = mode => {
   window.localStorage.setItem(ID_MODE, mode);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(ID_USER);
};

export default { getToken, saveToken, destroyToken, getUser, saveUser, getLoginMode, saveLoginMode };
