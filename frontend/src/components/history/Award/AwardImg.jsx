export default function AwardImg(props) {
  return (
    <div>
      <h2>
        <img src={props.img} alt="" />
        <p>{props.id}번째 뱃지사진</p>
      </h2>
    </div>
  );
}
