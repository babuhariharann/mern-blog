
/** npm start */

import React from 'react'
import Countdown, { zeroPad } from "react-countdown";

/** local files import */

import auctionOne from '../assets/evolvex/images/auction1.png'

const AuctionCard = () => {


    const renderer = ({ days, hours, minutes, seconds }) => {
        return (
            <div className={`countdownRenderer d-flex justify-content-center align-items-center`}>
                <p >{days < 10 ? `0${days}` : days}</p>
                <p>D</p> <p>:</p>
                <p >{hours < 10 ? `0${hours}` : hours}</p>
                <p>H</p> <p>:</p>
                <p >{minutes < 10 ? `0${minutes}` : minutes}</p>
                <p>M</p> <p>:</p>
                <p >{seconds < 10 ? `0${seconds}` : seconds}</p>
                <p>s</p>
            </div>
        )
    }


    return (
        <div className='ev-auctioncard'>
            <div className='ev-auctioncard__profile'>
                <img src={auctionOne} alt='auction' />
            </div>
            <div className='ev-auction__content'>
                <h5 >Auction Ends In</h5>
                <Countdown date={Date.now() + 245006600} renderer={renderer} />
            </div>
        </div>
    )
}

export default AuctionCard