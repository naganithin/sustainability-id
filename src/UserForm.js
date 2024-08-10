import React, { useState } from "react";
import { getContract } from "./MyDApp";
import './UserForm.css'; 

const UserForm = ({ provider }) => {
    const [name, setName] = useState("");
    const [scope1, setScope1] = useState("");
    const [scope2, setScope2] = useState("");
    const [scope3, setScope3] = useState("");
    const [document1, setDocument1] = useState("");
    const [document2, setDocument2] = useState("");
    const [CCBought, setCCBought] = useState(0);
    const [CCRetired, setCCRetired] = useState(0);
    const [userWallet, setUserWallet] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signer = provider.getSigner();
        const contract = getContract(signer);

        try {
            const tx = await contract.createUser(
                name,
                scope1,
                scope2,
                scope3,
                document1,
                document2,
                CCBought,
                CCRetired,
                userWallet
            );
            await tx.wait();
            alert("User created successfully!");
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`form-container ${darkMode ? 'dark-mode' : ''}`}>
            <button className="toggle-dark-mode" onClick={toggleDarkMode}>
                Toggle Dark Mode
            </button>
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Scope 1</label>
                        <input
                            type="text"
                            className="form-control"
                            value={scope1}
                            onChange={(e) => setScope1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Scope 2</label>
                        <input
                            type="text"
                            className="form-control"
                            value={scope2}
                            onChange={(e) => setScope2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Scope 3</label>
                        <input
                            type="text"
                            className="form-control"
                            value={scope3}
                            onChange={(e) => setScope3(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Document 1</label>
                        <input
                            type="text"
                            className="form-control"
                            value={document1}
                            onChange={(e) => setDocument1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Document 2</label>
                        <input
                            type="text"
                            className="form-control"
                            value={document2}
                            onChange={(e) => setDocument2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Carbon Credits Bought</label>
                        <input
                            type="number"
                            className="form-control"
                            value={CCBought}
                            onChange={(e) => setCCBought(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Carbon Credits Retired</label>
                        <input
                            type="number"
                            className="form-control"
                            value={CCRetired}
                            onChange={(e) => setCCRetired(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>User Wallet</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userWallet}
                            onChange={(e) => setUserWallet(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
