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
                documents: {
                    report1: `https://sapphire-cautious-crab-180.mypinata.cloud/ipfs/${data[2].document1}`,
                    report2: `https://sapphire-cautious-crab-180.mypinata.cloud/ipfs/${data[2].document2}`
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
                        <h4>Emissions</h4>
                        <p>Scope 1: {userData.accounting.scope1} tCO<sub>2</sub></p>
                        <p>Scope 2: {userData.accounting.scope2} tCO<sub>2</sub></p>
                        <p>Scope 3: {userData.accounting.scope3} tCO<sub>2</sub></p>

                    </div>
                    <div className="card-section">
                        <h4>Documents</h4>
                        <p>Report 1: <a href={userData.documents.report1} target="_blank" rel="noopener noreferrer">View Report 1</a></p>
                        <p>Report 2: <a href={userData.documents.report2} target="_blank" rel="noopener noreferrer">View Report 2</a></p>
                    </div>
                    <div className="card-section">
                        <h4>Carbon Credits</h4>
                        <p>Bought: {userData.carbonCredits.CCBought*(10*(10**18))}</p>
                        <p>Retired: {userData.carbonCredits.CCRetired*(10*(10**18))}</p>
                    </div>
                </div>
            )}
        </div>
    );
}; 

export default UserDetails;
