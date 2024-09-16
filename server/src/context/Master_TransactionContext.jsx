import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { masterContractABI, masterContractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(masterContractAddress, masterContractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] =  useState('');
    const [soilCarbonContent, setSoilCarbonContent] =  useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0);

    const handleChange = (e) => {
        setSoilCarbonContent(e.target.value);
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask!");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                //getAllTransactions();
            } else {
                console.log("No accounts Found");
            }
        } catch (error) {
            console.log(error);
            throw new error("No ethereum object in master");
        }
        
    }

    const connectWallet = async() => {
        try {
            if(!ethereum) return alert("Please Install MetaMask!");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);


        } catch (error) {
            console.log(error);
            throw new error("No ethereum object in master");
        }
    }

    const sendTransaction = async (socValue) => {
        try {
            if(!ethereum) return alert("Please Install MetaMask!");

            console.log(socValue);

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther((socValue / 1000000).toFixed(18));

            console.log(parsedAmount);
            

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: '0x859040D70bE1DE48E3a88ec27999cd0E0F8B7f9c',
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain('0x859040D70bE1DE48E3a88ec27999cd0E0F8B7f9c', parsedAmount, "Carbon Credits Awarded", "CC");
            setIsLoading(true);
            console.log(`Sending Carbon Credits to Farmer : ${transactionHash.hahs}`);

            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Successully Sent Carbon Credits to Farmer : ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransationCount();
            setTransactionCount(transactionCount.toNumber());

            
        } catch (error) {
            console.log(error);
            throw new error("No ethereum object in master");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, soilCarbonContent, setSoilCarbonContent, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}