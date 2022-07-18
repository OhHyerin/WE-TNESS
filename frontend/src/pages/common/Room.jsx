import { useParams } from "react-router-dom"

export default function Room () {
  const params = useParams()
  const roomNumber = parseInt(params.roomId)
  return (
    <div>
      <h1>{roomNumber}번 방입니다.</h1>
    </div>
  )
}