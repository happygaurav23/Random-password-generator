/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useCallback,useEffect,useRef } from 'react';
//import './App.css';
function App() {

  const [length,setLength] = useState(8);
  const [numbersAllowed,setNumbersAllowed] = useState(false);
  const [charactersAllowed,setCharactersAllowed] = useState(false);

  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{

    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbersAllowed === true){
      letters += "0123456789";
    }

    if(charactersAllowed === true){
      letters += "@#$&*~^";
    }

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * letters.length + 1);
      pass += letters.charAt(charIndex);
      
    }

    setPassword(pass);






  },[length,numbersAllowed,charactersAllowed,setPassword]);

  useEffect(()=>{
    passwordGenerator();

  },[length,numbersAllowed,charactersAllowed,passwordGenerator]);

  function copyPasswordToClipboard(){
    passwordRef.current ?.select();
    passwordRef.current ?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-800">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passwordRef}
          
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min={8}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e)=> {setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked = {numbersAllowed}
           id='numberInput'
           onChange={()=>{
            setNumbersAllowed((prev)=> !prev);
           }} 
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked = {charactersAllowed}
           id='characterInput'
           onChange={()=>{
            setCharactersAllowed((prev)=> !prev);
           }} 
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
