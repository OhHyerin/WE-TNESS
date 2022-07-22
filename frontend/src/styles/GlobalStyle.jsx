import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* 컬러 설정 */
:root {
  --primary-color: #4287f5;
}

/* css 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
  color: inherit;
  flex-shrink: 0;
}
`;

export default GlobalStyle;
