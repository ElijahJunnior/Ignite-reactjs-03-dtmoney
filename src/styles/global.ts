import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    :root {
        
        --red: #E52E4D;
        --blue: #5429CC;
        
        --blue-light: #6933FF;
        
        --text-title: #363F5F;
        --text-body: #969CB3;
        
        --background: #F0F2F5;
        --shape: #FFFFFF;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    // alterando o tamanho da fonte de acordo com o tamanho da tela
    // como a medida 1 rem é abaseda no tamanho da fonte, todo o código que use a unidade rem será reajustado
    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(---background);
        -webkit-font-smoothing: antialiased;
    }

    button { 
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`