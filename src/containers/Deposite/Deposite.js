import React, {useState} from 'react';
import './Deposite.css';

import {Link, withRouter} from "react-router-dom";
import plus from "../../images/plus-deposit.png";
import points from "../../images/points.png";
import StdButton from "../../components/buttons/standardButton";
import MultiStep from "react-multistep";
import CreateStatecoin from "../../components/createStatecoin/createStatecoin";
import TransactionsBTC from "../../components/transactionsBTC/transactionsBTC";
import {Button, Modal} from "react-bootstrap";
import walleticon from "../../images/walletIcon.png";
import utx from "../../images/UTX.png";
import time from "../../images/time-grey.png";
import calendar from "../../images/calendar.png";
import privacy from "../../images/privacy.png";
import question from "../../images/question-grey.png";
import swapNumber from "../../images/swap-number.png";
import pluseIcon from "../../images/pluseIcon.png";

const DepositePage = () => {

    const steps = [
        { component: <CreateStatecoin /> },
        { component: <TransactionsBTC /> }
    ];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="container deposit">
            <div className="Body ">
               <div className="deposit-header">
                   <h2 className="WalletAmount">
                       <img src={plus} alt="plus"/>
                       Deposit BTC
                   </h2>
                   <div>
                       <Link className="nav-link" to="/">
                           <StdButton
                               label="Back"
                               className="Body-button transparent"/>
                           <img onClick={handleShow} src={points} alt="points"/>
                       </Link>



                   </div>
               </div>
                <h3 className="subtitle">Deposite BTC to create new Statecoins</h3>
            </div>
            <div className="wizard">
                <MultiStep steps={steps} />
            </div>
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header>
                    <h6>Display Settings</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="selected-item">
                        <span>Sort By</span>
                        <select>
                            <option value="HighestLiquidity">Highest Liquidity</option>
                            <option value="HighestLiquidity1">Highest Liquidity1</option>
                        </select>
                    </div>
                    <div className="selected-item">
                        <span>Smallest Value</span>
                        <select>
                            <option value="0.0005">0.0005 BTC</option>
                            <option value="0.0001">0.0001 BTC</option>
                        </select>
                    </div>
                    <div className="selected-item">
                        <span>Number of Picks</span>
                        <select>
                            <option value="6">6 options</option>
                            <option value="2">2 options</option>
                        </select>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withRouter(DepositePage);
