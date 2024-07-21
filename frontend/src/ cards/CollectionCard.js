import React from 'react'
import { MdVerified } from "react-icons/md";

const CollectionCard = (props) => {
    const { id, profile, name, bg, leftImage, rightImageTop, rightImageBottom } = props.item
    return (
        <div className={`ev-collectioncard ${bg}`}>
            <div className='ev-collecion__header'>
                <div className='ev-collection__profile'>
                    <img src={profile} alt={name} />
                </div>
                <div className='ev-collection__profile--details'>
                    <h5>
                        Owned by
                    </h5>
                    <div className='ev-collection__profile--name'>
                        <p>
                            {name}
                        </p>
                        <MdVerified fill="#3897f0" />
                    </div>
                </div>

            </div>
            <div className='ev-collection__body'>
                <div className='row h-100 mx-auto'>
                    <div className='col-6 ev-collection__col-left'>
                        <div className='ev-collection__body--left'>
                            <img src={leftImage} alt='banner' />
                        </div>

                    </div>
                    <div className='col-6 ev-collection__col-right'>
                        <div className='ev-collection__body--right'>
                            <div className='ev-collection__right--top'>
                                <img src={rightImageTop} alt="collection" />
                            </div>
                            <div className='ev-collection__right--bottom'>
                                <img src={rightImageBottom} alt="collection" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default CollectionCard