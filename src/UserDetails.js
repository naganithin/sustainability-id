import React, { useState } from "react";
import { getContract } from "./MyDApp";
import { ethers } from "ethers";
import './UserDetails.css'; // Ensure you have this CSS file

const UserDetails = ({ provider }) => {
    const [userWallet, setUserWallet] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        const contract = getContract(provider);

        try {
            const data = await contract.getUserDetails(userWallet);
            // Convert BigNumber values to strings
            const convertedData = {
                name: data[0],
                accounting: {
                    scope1: data[1].scope1,
                    scope2: data[1].scope2,
                    scope3: data[1].scope3
                },
                reporting: {
                    document1: data[2].document1,
                    document2: data[2].document2
                },
                carbonCredits: {
                    CCBought: ethers.utils.formatUnits(data[3].CCBought, 18), // Adjust decimals as needed
                    CCRetired: ethers.utils.formatUnits(data[3].CCRetired, 18) // Adjust decimals as needed
                }
            };
            setUserData(convertedData);
            setError(null);
        } catch (err) {
            setError("User data does not exist.");
            setUserData(null);
        }
    };

    return (
        <div className="user-details-container">
            <div className="form-group">
                <label>User Wallet</label>
                <input
                    type="text"
                    className="form-control"
                    value={userWallet}
                    onChange={(e) => setUserWallet(e.target.value)}
                />
            </div>
            <button onClick={fetchUserDetails} className="btn btn-primary">
                Get User Details
            </button>

            {error && <p className="error-message">{error}</p>}
            {userData && (
                <div className="user-details-card">
                    <h3>{userData.name}</h3>
                    <div className="card-section">
                        <h4>Accounting</h4>
                        <p>Scope 1: {userData.accounting.scope1}</p>
                        <p>Scope 2: {userData.accounting.scope2}</p>
                        <p>Scope 3: {userData.accounting.scope3}</p>
                    </div>
                    <div className="card-section">
                        <h4>Reporting</h4>
                        <p>Document 1: {userData.reporting.document1}</p>
                        <p>Document 2: {userData.reporting.document2}</p>
                    </div>
                    <div className="card-section">
                        <h4>Carbon Credits</h4>
                        <p>Bought: {userData.carbonCredits.CCBought}</p>
                        <p>Retired: {userData.carbonCredits.CCRetired}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
