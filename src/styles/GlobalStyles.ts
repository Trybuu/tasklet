import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        font-family: 'Inter', sans-serif;
    }

    input, select{
        font-family: 'Inter', sans-serif;
    }
    
    h2,h3,h4,h5,h6{
        font-weight: 600;
    }

    input:focus, button:focus, select:focus {
    outline: none; 
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }

    ul, ol{
        list-style: none;
    }
`
