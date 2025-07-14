import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../constant/abi';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const contractFunction = async () => {
  if (!window.ethereum) throw new Error("Please install MetaMask!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();
    console.log(userAddress)
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const rawBalance = await contract.balanceOf(userAddress);
  

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Token Balance:", rawBalance);

  return {
    contract,
    name,
    symbol,
    rawBalance,
    userAddress
  };
};




export const transfer = async (amount: any) => {
  if (!window.ethereum) throw new Error("Please install MetaMask!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const balance = await contract.balanceOf(address);
  const to = 0xdF588b4758866200751771a75E8c388e71b8A5A2; // my walletAddress
  
  console.log(amount)
    if (!amount || isNaN(amount)) {
    throw new Error("Invalid amount to transfer.");
  }

  // const amount1 = ethers.parseUnits(amount.toString(), 18);
  let errorMessage ;

  if (balance >= amount) {
    const tx = await contract.transfer(to, amount); 
    console.log("Transfer initiated!", tx.hash);
    await tx.wait();
    console.log("Transfer successfully completed!");
  } else {
    console.log("Insufficient balance. Transfer rejected!");
    errorMessage="Insufficient balance. Transfer rejected!"
  }

  return {
    contract,
    message:errorMessage
  };
};
