import styled from 'styled-components';

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 125px;
  color: white;
  background-color: ${props => props.deactive? "gray" : "#233142"};
  box-sizing: content-box;
  border-radius: 5px;
  :hover {
    cursor: ${props => props.deactive ? null : "pointer"};
  }
`

export default SubmitBtn;