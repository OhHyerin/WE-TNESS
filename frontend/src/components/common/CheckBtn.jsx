import styled from 'styled-components';

const CheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  color: white;
  background-color: ${props => props.deactive? "gray" : "#233142"};
  border-radius: 5px;
  :hover {
    cursor: ${props => props.deactive ? null : "pointer"};
  }
`

export default CheckBtn;