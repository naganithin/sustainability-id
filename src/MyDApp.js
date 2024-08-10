import { ethers } from "ethers";

// Replace this with your contract's ABI
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "AdminRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_scope1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_scope2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_scope3",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_document1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_document2",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_CCBought",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_CCRetired",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_userWallet",
				"type": "address"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userWallet",
				"type": "address"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "scope1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "scope2",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "scope3",
						"type": "string"
					}
				],
				"internalType": "struct MyDApp.Accounting",
				"name": "accounting",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "document1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "document2",
						"type": "string"
					}
				],
				"internalType": "struct MyDApp.Reporting",
				"name": "reporting",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "CCBought",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "CCRetired",
						"type": "uint256"
					}
				],
				"internalType": "struct MyDApp.CarbonCredits",
				"name": "carbonCredits",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "usersData",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "scope1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "scope2",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "scope3",
						"type": "string"
					}
				],
				"internalType": "struct MyDApp.Accounting",
				"name": "accounting",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "document1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "document2",
						"type": "string"
					}
				],
				"internalType": "struct MyDApp.Reporting",
				"name": "reporting",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "CCBought",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "CCRetired",
						"type": "uint256"
					}
				],
				"internalType": "struct MyDApp.CarbonCredits",
				"name": "carbonCredits",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "userWallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Replace with your contract's deployed address
const contractAddress = "0xe78FDbe54E46DF719d0817C4E95549d2c31CF2c3";

export const getContract = (provider) => {
    return new ethers.Contract(contractAddress, contractABI, provider);
};

// Add a function to get the owner
export const getOwner = async (provider) => {
    const contract = getContract(provider);
    return await contract.owner();
};

