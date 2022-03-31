// Ponto de entrada -- define o contexto - os valores que vão ter nele
import { createContext } from 'react';

const AppContext = createContext({
    avatar: null,
    setImgProfile: () => {}
});

export default AppContext;