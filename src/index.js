import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.css'; //para definir que é a pasta local , tem que informar o caminho relativo ao pacote

ReactDOM.render(<App />, document.getElementById('root'));
//renderiza (componente, local onde eu quero inserir)