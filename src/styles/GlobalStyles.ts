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

    input{
        font-family: 'Inter', sans-serif;
    }
    
    h2,h3,h4,h5,h6{
        font-weight: 600;
    }
`
