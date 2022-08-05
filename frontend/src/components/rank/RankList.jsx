import { useSelector } from 'react-redux';

export default function RankList() {
  const ranks = useSelector(state => state.rank.ranks);
  const ranksLength = ranks.length;

  return <div>{ranksLength ? ranks.map((user, i) => <RankItem key={i} user={user} />) : <p>하이룽</p>}</div>;
}
function RankItem({ user }) {
  return (
    <div>
      <p>{user.rank}</p>
      <p>{user.nickname}</p>
      <p>{user.calories}</p>
      <p>하이</p>
    </div>
  );
}
