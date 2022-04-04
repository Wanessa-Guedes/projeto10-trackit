// Ponto de entrada -- define o contexto - os valores que vão ter nele
import { createContext } from 'react';

const AppContext = createContext({
    avatar: null,
    setImgProfile: () => {},
    status: 0,
    setStatusFooter: () => {},
});

export default AppContext;