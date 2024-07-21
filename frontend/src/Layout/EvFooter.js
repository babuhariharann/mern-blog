/** npm import */

import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";


/** local files import */

import logo from '../assets/evolvex/images/logo.png'


/** code start */

const EvFooter = () => {
  return (
    <footer className='ev-footer'>
      <div className='container container-width'>
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4 ">
            <div className='ev-footer__left'>
              <img src={logo} alt="logo" className='ev-footer__left--logo' />

              <p className='ev-footer__left--content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ducimus eveniet laudantium beatae eaque obcaecati sint ex impedit aliquid illo molestiae odit, facere vel quod autem placeat veritatis tempora perspiciatis.</p>

              <div className='ev-footer__social'>
                <a href="www.facebook.com">
                  <div className='ev-footer__link-bg'>
                    <FaFacebookF fill='#fff' fontSize={20} />
                  </div>
                </a>
                <a href="www.facebook.com">
                  <div className='ev-footer__link-bg'>
                    <FaTwitter fill='#fff' fontSize={20} />
                  </div>
                </a>
                <a href="www.facebook.com">
                  <div className='ev-footer__link-bg'>
                    <FaLinkedinIn fill='#fff' fontSize={20} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 col-xl-2 d-flex justify-content-start justify-content-md-center mt-5 mt-md-0">
            <nav className='ev-footer__mid ev-footer__mid-left'>
              <h5 className='ev-footer__nav-title'>Links</h5>
              <ul>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>

              </ul>
            </nav>
          </div>
          <div className="col-6 col-md-3 col-xl-2 d-flex justify-content-start justify-content-md-center mt-5 mt-md-0">
            <nav className='ev-footer__mid ev-footer__mid-right'>
              <h5 className='ev-footer__nav-title'>Links</h5>
              <ul>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
                <li>
                  <Link>All Nft</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-12 col-md-6 col-xl-4 d-flex justify-content-end  mt-4 mt-md-5 mt-xl-0">
            <div className="ev-footer__right">
              <h4>Stay in The Loop</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto neque unde hic molestias odit eligendi quod enim ex, quibusdam dolore dignissimos quaerat. Laudantium fugiat illum doloremque ad nemo, laboriosam corporis!
              </p>
              <div className='ev-footer__search'>
                <input type="text" placeholder='Enter your email address' />
                <button>Subscribe Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default EvFooter