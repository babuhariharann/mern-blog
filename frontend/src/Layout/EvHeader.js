import React, { useContext } from 'react'
import { GlobalContext } from '../context/context';

import logo from '../assets/images/evolvex/logo.png'
import { Link } from 'react-router-dom';

const EvHeader = () => {

    const { enableHeader, enableHeaderLogo } = useContext(GlobalContext);

    console.log('headerr', enableHeader)

    return (
        enableHeader && <header className='ev-header d-none d-xl-block' >
            <div className='ev-container h-100'>
                <nav className='ev-header__nav'>

                    <Link to='/landing'>
                        <img src={logo} className={`${enableHeaderLogo ? 'ev-header__logo--view' : 'ev-header__logo--hide'}`} />
                    </Link>
                    <div className='ev-header__menus'>
                        <ul>
                            <li>
                                Explore
                            </li>
                            <li>
                                Create
                            </li><li>
                                FAQ
                            </li>
                            <li>
                                Profile
                            </li>
                        </ul>
                    </div>
                    <div className='ev-header__button'>
                        <button className='ev-header__connectButton'>
                            Connect
                        </button>
                    </div>
                </nav>
            </div>
        </header>

    )
}

export default EvHeader