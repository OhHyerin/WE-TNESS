import styled from "styled-components";
import { useSelector } from "react-redux";
import FollowingList from "./FollowingList"
import FollowerList from "./FollowerList"

const FollowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export default function FollowForm() {
  const followerList = useSelector(state => state.user.followList?.followerList)
  const followingList =  useSelector(state => state.user.followList?.followingList)
  return (
    <FollowBox>
      <FollowingList followingList={followingList}/>
      <FollowerList followerList={followerList}/>
    </FollowBox>
  )
}