import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";

const Postcode = () =>{
    // state 추가
    const [zipCode, setZipcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [showCode, setShowCode] = useState(false)

    const completeHandler = data =>{
        console.log(data);
        setZipcode(data.zonecode); // 추가
        setRoadAddress(data.roadAddress); // 추가
    }
    function showCodeHandler (e) {
        e.preventDefault()
        setShowCode(!showCode)
    }
    return(
    <div>
        <button
            onClick={showCodeHandler}
        >
            우편번호 찾기
        </button>
        <p>우편번호 : {zipCode} </p>
        <p>주소 : {roadAddress}</p>
        { showCode ? (
            <DaumPostcode
                onComplete={completeHandler}
            />
        ) : null }
    </div>
    );
}

export default Postcode;