import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-family: 'Georgia', serif;
  }

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
