'use client'
import React, { use, useState } from 'react'
import { contractFunction, transfer } from './lib/contract'
import './page.css'

const Page = () => {
  const [userName, setUserName] = useState<string>()
  const [userSymbol, setUserSymbol] = useState<string>()
  const [userBalance, setUserBalance] = useState<number>()
  const [userAddress , setUserAddress] = useState<string>()
  const [show, setShow] = useState<boolean | null>(null)
  const [amount,setAmount] = useState<number>()
  const [transferToken,setTransferToken] = useState<boolean>();

  const callSmart = async () => {
    if (!window.ethereum) {
      alert("Please install the MetaMask Chrome extension")
      return;
    }

    try {
      const { contract, name, symbol, rawBalance, userAddress } = await contractFunction()

      setUserName(name)
      setUserSymbol(symbol)
      setUserBalance(rawBalance)
      setUserAddress(userAddress)
      setShow(true)

      console.log("Token Name:", name)
      console.log("Symbol:", symbol)
      console.log("Balance:", rawBalance)

    } catch (err: any) {
      console.log("Error:", err.message)
      alert("Error connecting to smart contract, check console")
      setShow(false)
    }
  }

const transferAmount = async()=>{
  const {message} = await transfer(amount)
  alert(message)
  console.log(message)
}

  return (
    <main>
      <div className='container'>
        <h1>Welcome to Smart Contract</h1>
        <button onClick={callSmart}>Click to View the Account Balance</button>

        {show === true && (
          <>
           <br/> <strong>Token Name:</strong> <p>{userName}</p>
            <strong>Token Balance:</strong> <p>{userBalance}</p>
            <strong>Token Symbol:</strong> <p>{userSymbol}</p>
            
            <button onClick={(e) => setTransferToken(true)}>Click to Tranfer the Token</button>

           

          </>
         
        )}

        {show === false && (
          <p style={{ color: 'red' }}>Error connecting to the smart contract</p>
        )}

        {
          transferToken === true && ( 
          
  <>      
  <br/>
          <input 
            type='number'
            placeholder='Enter the amount'
            value={amount ?? ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <button onClick={transferAmount} className='btn'>
            Click to Transfer
          </button>
        
</>
          )}
      </div>
    </main>
  )
}

export default Page

