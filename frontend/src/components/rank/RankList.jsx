import { useSelector } from "react-redux"

export default function RankList () {
  const rankList = useSelector(state => state.rank.rankList)

  return (
    <div>
        {rankList.map((user, i) => (
        <RankItem key={i} user={user}/>
      ))}
    </div>
  )
}
function RankItem({user}) {
  return (
    <div>
      <p>{user.rank}</p>
      <p>{user.nickname}</p>
      <p>{user.calories}</p>
    </div>
  )
}