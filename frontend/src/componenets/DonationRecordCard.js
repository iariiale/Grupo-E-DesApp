import React from 'react';
import '../styles/DonationRecordCard.css';
export default function DonationRecordCard(props) {

    return(
        <div className={"card-container"}>
            <div className={"project-name-donationDate-container"}>
                <div className={"project-card-name"}>{props.info.projectName + " "}</div>
                <div className={"project-card-date"}>por una cantidad de {props.info.donatedAmount} pesos</div>
            </div>
            <div className={"align-date"}>{props.info.donationDate + " "}</div>
            
        </div>
    )
}