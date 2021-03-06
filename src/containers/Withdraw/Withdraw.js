import React, {useState} from 'react';
import './Withdraw.css';

import {Link, withRouter} from "react-router-dom";
import swapIcon from '../../images/swap_icon-blue.png';
import StdButton from "../../components/buttons/standardButton";
import walletIcon from '../../images/walletIcon.png';
import cyrcle from "../../images/cyrcle-icon.png";
import close from "../../images/close-icon.png";
import number from "../../images/number-icon.png";
import Quantity from "../../components/Quantity/quantity"
import orange from "../../images/wallet-orange.png";
import withdrowIcon from "../../images/withdrow-icon.png";




const WithdrawPage = () => {

    return (
        <div className="container ">
            <div className="Body withdraw">
                <div className="swap-header">
                    <h2 className="WalletAmount">
                        <img src={walletIcon} alt="walletIcon"/>
                        Withdraw Statecoins
                    </h2>
                    <div>
                        <Link className="nav-link" to="/">
                            <StdButton
                                label="Back"
                                className="Body-button transparent"/>
                        </Link>
                    </div>
                </div>
                <h3 className="subtitle">
                    Withdraw Statecoin UTXO’s back to Bitcoin. <br/>
                   <b> 2.55 BTC</b> available as <b>13</b> Statecoins
                </h3>


            </div>

            <div className="withdraw content">
                <div className="Body left ">
                    <div>
                        <h3 className="subtitle">Select Statecoin UTXO’s to withdraw</h3>
                        <span className="sub">Click to select UTXO’s below</span>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="content">
                                        <img src={cyrcle} alt="swapIcon"/>

                                        <div className="txt">
                                            <span className="">0.0005 BTC</span>
                                            <div className="line">
                                                <img src={close} alt="swapIcon"/>
                                                <span>No Privacy Score</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <img src={number} alt="swapIcon"/>
                                    <span>15kje…398hj</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="Body right">
                    <div className="header">
                        <h3 className="subtitle">Transaction Details</h3>
                        <div>
                            <select name="1" id="1">
                                <option value="1">Low 7sat/B</option>
                            </select>
                            <span className="small">Transaction Fee</span>
                        </div>

                    </div>
                    <div>
                       <div className="inputs">
                           <input type="text" placeholder="Destination Address for withdrawal"/>

                           <span className="smalltxt">Your Bitcoin Address</span>
                       </div>
                        <div className="inputs">
                           <Quantity label="Value (BTC)" />
                        </div>
                    </div>
                    <div>
                        <p className="table-title">Use Only:</p>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        name="isGoing"
                                        type="checkbox"
                                        />
                                </td>
                                <td>
                                    <img src={orange} alt="walletIcon"/>
                                    <span>UTXO’s with a High Privacy Score <br/> Balance: <b>0.55 BTC</b></span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <button type="button" className="btn">
                             <img src={withdrowIcon} alt="withdrowIcon"/>
                            Withdraw btc</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default withRouter(WithdrawPage);
