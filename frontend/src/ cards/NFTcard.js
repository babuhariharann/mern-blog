import React from 'react'

import ethImage from '../assets/evolvex/images/eth.png'
import timer from '../assets/evolvex/images/timer.png'
import Countdown, { zeroPad } from "react-countdown";

const NFTcard = () => {

    const renderer = ({ days, hours, minutes, seconds }) => {
        return (
            <div className='ev-nftcard__timer--bg'>
                <img src={timer} className='mr-1' />
                <p >{days < 10 ? `0${days}` : days} d</p>
                <p>:</p>
                <p >{hours < 10 ? `0${hours}` : hours} h</p>
                <p>:</p>
                <p >{minutes < 10 ? `0${minutes}` : minutes} m</p>
                <p>:</p>
                <p >{seconds < 10 ? `0${seconds}` : seconds} s</p>

            </div>
        )
    }
    return (
        <div className='ev-nftcard'>
            <div className='ev-nftcard__profile'>
                <img className='ev-nftcard__profile--image' />
                <div className='ev-nftcard__timer'>
                    <Countdown date={Date.now() + 245006600} renderer={renderer} />
                </div>
            </div>
            <div className='ev-nftcard__images'>
                <div className='ev-nftcard__images--one'>
                    <img />
                </div>
                <div className='ev-nftcard__images--two'>
                    <img />
                </div>
            </div>
            <div className='px-4'>


                <h5 className='ev-nftcard__name'>
                    Space NFT
                </h5>
                <div className='ev-nftcard__details'>
                    <div className='ev-nftcard__details-left'>
                        <img src={ethImage} alt='coin' />
                        <p>0.25 ETH</p>
                    </div>
                    <p className='ev-nftcard__details-right'>1 of 321</p>
                </div>
                <div className='ev-nftcard__border'>
                </div>

                <div className='ev-nftcard__button'>
                    <button className='ev-nftcard__placebid'>
                        <p>Place a bid</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NFTcard