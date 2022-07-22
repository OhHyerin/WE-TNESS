import { useSelector } from 'react-redux';
import styled from 'styled-components'
import AwardImg from './AwardImg'

const AwardBox = styled.div`
  
`

export default function AwardList() {
  const awardList = useSelector(state => state.user.history?.getAwardList)
  return (
    <div>
      <h2>도전과제</h2>
      <AwardBox>
        {awardList.map(
          award => <AwardImg key={award} award={award}></AwardImg>
        )}
      </AwardBox>
    </div>
  );
}
