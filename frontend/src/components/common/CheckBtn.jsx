import styled from 'styled-components';

const CheckBtn = styled.div`
  display: flex;
  height: 55.98px;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: -14px;
  padding: 0px 5px;
  background-color: ${props => props.deactive? "gray" : "#233142"};
  border-radius: 5px;
  :hover {
    cursor: ${props => props.deactive ? null : "pointer"};
  }
`

export default CheckBtn;