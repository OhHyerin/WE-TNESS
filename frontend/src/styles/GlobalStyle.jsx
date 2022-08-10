import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* 컬러 설정 */
:root {
  --primary-color: #009688;
  --prim-bg-color:#FFFFFF;
  --sec-bg-color:#e9e9e9;
}

/* css 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
  color: inherit;
  /* flex-shrink: 0; */
}

#nav {
  position: sticky;
  top: 0px;
  z-index: 10
}

`;

export default GlobalStyle;
