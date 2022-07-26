import styled from 'styled-components';

const SubmitBtn = styled.button`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  padding: 12px 130px;
  background-color: ${props => props.deactive? "gray" : "violet"};
  box-sizing: content-box;
  border: violet;
  border-radius: 5px;
  :hover {
    cursor: ${props => props.deactive ? null : "pointer"};
  }
`

export default SubmitBtn;