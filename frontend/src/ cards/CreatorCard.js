
/** npm import */
import React from 'react'
import { MdVerified } from "react-icons/md";

/** local file import */
import copyImage from '../assets/evolvex/images/copy.png'


const CreatorCard = (props) => {
    const { id, profileImage, bannerImage, name, address } = props.item
    console.log(name, 'propsss')
    return (
        <div className='ev-creatorcard'>
            <div className='ev-creatorcard__banner'>
                <img src={bannerImage} alt={name} />
            </div>
            <div className='ev-creatorcard__profile'>
                <div className='ev-creatorcard__profile--wrap'>
                    <img src={profileImage} alt={name} />
                </div>
            </div>
            <div className='ev-creatorcard__content d-flex flex-column align-items-center'>
                <div className='ev-creatorcard__name'>
                    <h5>{name}</h5>
                    <MdVerified fill="#26C5D1" />
                </div>
                <div className='ev-creatorcard__address'>
                    <p>{address}</p>
                    <button className='ev-creatorcard__button--copy'>
                        <img src={copyImage} alt='copy' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatorCard