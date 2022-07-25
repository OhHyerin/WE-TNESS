import styled from "styled-components";
import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { fetchAddressCode } from "../../../features/user/SignupSlice";

const LabelBox = styled.div`
  display: flex;
  justify-content: end;
`

export default function AddressForm() {
  const dispatch = useDispatch();
  // state 추가
  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [showCode, setShowCode] = useState(false)

  const completeHandler = data =>{
    console.log(data);
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    dispatch(fetchAddressCode(data.bcode))
  }

  function showCodeHandler(e) {
    e.preventDefault()
    setShowCode(!showCode)
  }
  return(
  <div>
    <LabelBox>
      <button onClick={showCodeHandler}>
          우편번호 찾기
      </button>
    </LabelBox>
    <p>우편번호 : {zipCode} </p>
    <p>주소 : {roadAddress}</p>
    <div>
      { showCode ? (
        <DaumPostcode onComplete={completeHandler}/>
      ) : null }
    </div>
  </div>
  );
}