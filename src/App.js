import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import { getOwner } from "./MyDApp";

function App() {
    const [provider, setProvider] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");

    useEffect(() => {
        if (window.ethereum) {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(_provider);
            checkOwner(_provider);
            _provider.listAccounts().then(accounts => setCurrentAddress(accounts[0]));
        } else {
            alert("Please install MetaMask!");
        }
    }, []);

    const checkOwner = async (_provider) => {
        const owner = await getOwner(_provider);
        const signer = _provider.getSigner();
        const signerAddress = await signer.getAddress();
        setIsOwner(owner.toLowerCase() === signerAddress.toLowerCase());
    };

    return (
        <div className="container">
            <h1>Sustainbility ID</h1>
            {provider && (
                <>
                    {isOwner ? (
                        <>
                            <h2>Create User</h2>
                            <UserForm provider={provider} />
                        </>
                    ) : (
                        <>
                            <h2>Get User Details</h2>
                            <UserDetails provider={provider} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
