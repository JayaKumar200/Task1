export const contractAddress = "0xefe3ab3eff23bdff0e2f4cb910cdd88813a2234c"
export const contractABI = [
  {
     name: "name",
     inputs: [], outputs: 
     [{ type: "string" }],
      stateMutability: "view", 
      type: "function" 
    },
  {
     name: "symbol", 
    inputs: [],
     outputs: [{ type: "string" }],
      stateMutability: "view",
       type: "function"
       },
  { 
    name: "balanceOf",
     inputs: [{ type: "address" }],
      outputs: [{ type: "uint256" }],
       stateMutability: "view", 
       type: "function"
       }
];

