import { useEffect, useState } from "react";
import InfoIcon1 from "@/assets/icons/infored.svg"
import InfoIcon2 from "@/assets/icons/infoyellow.svg"
import InfoIcon3 from "@/assets/icons/infogreen.svg"
import { verifyPassword } from "../utils";

interface infoProps {
  password:string
}

export function InfoButton ({password}:infoProps){
  const [buttonState, setButtonState] = useState(true)
  const [icon,setIcon] = useState(InfoIcon1)

  useEffect(()=>{
    const result = verifyPassword(password)
    if(result <= 1){
      return (setIcon(InfoIcon1))
    }else if(result <= 3 && result > 1){
      return (setIcon(InfoIcon2))
    }else if(result >= 4){
      return (setIcon(InfoIcon3))
    }
  },[password])

  return (
    <div>
      <div className={`${buttonState==true?"hidden":"block"} fixed w-[100%] h-[100%] z-[19] bottom-[0] left-[0] bg-[#000] opacity-50`} onClick={()=>setButtonState(true)}></div>
      <button type="button" onClick={()=>setButtonState(buttonState===true?false:true)} className="w-[25px] z-50 absolute left-[160px] bottom-[8px]">
        <img src={icon} className="w-[25px]"/>
      </button>
      <div className={`${buttonState==true?"hidden":"block"} absolute z-20 ease-in-out delay-150 duration-300 transition-all`}>
        <ul className="w-[200px] h-[180px] bg-red-400 p-1.5 rounded-md">
          <li>- 6 digitos</li>
          <li>- Letra maiúscula</li>
          <li>- Letra minúscula</li>
          <li>- caractere especial</li>
          <li>- Pelo menos um numero</li>
          <li>- Não possuir sequencias ex:"123", "aaa"</li>
        </ul>
      </div>
    </div>
  );
};