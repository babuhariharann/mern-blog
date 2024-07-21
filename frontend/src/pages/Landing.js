/** npm import */

import React, { useContext, useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Countdown, { zeroPad } from "react-countdown";

/** local file import */

import logo from '../assets/images/evolvex/logo.png'
import { GlobalContext } from '../context/context';
// import EvHeader from '../separate/EvHeader';
import AuctionCard from '../ cards/AuctionCard';
import creatorProfileOne from '../assets/evolvex/images/creatorprofile1.png'
import creatorProfileTwo from '../assets/evolvex/images/creatorprofile2.png'
import creatorProfileThree from '../assets/evolvex/images/creatorprofile3.png'
import creatorProfileFour from '../assets/evolvex/images/creatorprofile4.png'
import creatorProfileFive from '../assets/evolvex/images/creatorprofile5.png'
import creatorProfileSix from '../assets/evolvex/images/creatorprofile6.png'
import creatorBannerOne from '../assets/evolvex/images/creatorbanner1.png'
import creatorBannerTwo from '../assets/evolvex/images/creatorbanner2.png'
import creatorBannerThree from '../assets/evolvex/images/creatorbanner3.png'
import creatorBannerFour from '../assets/evolvex/images/creatorbanner4.png'
import creatorBannerFive from '../assets/evolvex/images/creatorbanner5.png'
import creatorBannerSix from '../assets/evolvex/images/creatorbanner6.png'
import CreatorCard from '../ cards/CreatorCard';
import CollectionCard from '../ cards/CollectionCard';
import collectionProfile from '../assets/evolvex/images/collectionprofile.png'
import c1image1 from '../assets/evolvex/images/c1image1.png'
import c1image2 from '../assets/evolvex/images/c1image2.png'
import c1image3 from '../assets/evolvex/images/c1image3.png'
import c2image1 from '../assets/evolvex/images/c2image1.png'
import c2image2 from '../assets/evolvex/images/c2image2.png'
import c2image3 from '../assets/evolvex/images/c2image3.png'
import c3image1 from '../assets/evolvex/images/c3image1.png'
import c3image2 from '../assets/evolvex/images/c3image2.png'
import c3image3 from '../assets/evolvex/images/c3image3.png'
import TrendingCard from '../ cards/TrendingCard';
import NFTcard from '../ cards/NFTcard';
import circleAnimation from '../assets/evolvex/images/2q.gif'
import aigifone from '../assets/evolvex/images/ai-gif-one.gif'
import EvFooter from '../Layout/EvFooter';

/** code start */

/** start of top creators data */


const topCreatorsData = [
  {
    id: 1,
    profileImage: creatorProfileOne,
    bannerImage: creatorBannerOne,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
  {
    id: 2,
    profileImage: creatorProfileTwo,
    bannerImage: creatorBannerTwo,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
  {
    id: 3,
    profileImage: creatorProfileThree,
    bannerImage: creatorBannerThree,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
  {
    id: 4,
    profileImage: creatorProfileFour,
    bannerImage: creatorBannerFour,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
  {
    id: 5,
    profileImage: creatorProfileFive,
    bannerImage: creatorBannerFive,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
  {
    id: 6,
    profileImage: creatorProfileSix,
    bannerImage: creatorBannerSix,
    name: "Gradient NFT’s",
    address: "0xd77b09...df95easd"
  },
]

const collectionCardData = [
  {
    id: 1,
    profile: collectionProfile,
    name: "Robert Fox",
    bg: "yellow-200",
    leftImage: c1image1,
    rightImageTop: c1image2,
    rightImageBottom: c1image3,
  },
  {
    id: 2,
    profile: collectionProfile,
    name: "Robert Fox",
    bg: "blue-200",
    leftImage: c2image1,
    rightImageTop: c2image2,
    rightImageBottom: c2image3,
  },
  {
    id: 3,
    profile: collectionProfile,
    name: "Robert Fox",
    bg: "yellow-300",
    leftImage: c3image1,
    rightImageTop: c3image2,
    rightImageBottom: c3image3,
  },
  {
    id: 3,
    profile: collectionProfile,
    name: "Robert Fox",
    bg: "yellow-300",
    leftImage: c3image1,
    rightImageTop: c3image2,
    rightImageBottom: c3image3,
  },
  {
    id: 3,
    profile: collectionProfile,
    name: "Robert Fox",
    bg: "yellow-300",
    leftImage: c3image1,
    rightImageTop: c3image2,
    rightImageBottom: c3image3,
  },

]

/** end of top creators data */

/** end of top creators data */



const Landing = () => {

  const {
    bannerSectionOnly,
    isZoomOut,
    hideText,
    enableMidLogo,
    enableTopLogo,
    enableContent,
    handleHomeExplore,
    enableHeaderLogo } = useContext(GlobalContext);





  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className='ev-trending__calender'>
        <div className='ev-trending__count'>
          <div className='ev-trending__hours'>
            <div className='ev-trending__count--bg'>
              <p className='ev-trending__time--count'>
                {hours < 10 ? `0${hours}` : hours}
              </p>
              <p className='ev-trending__time--name'>Hours</p>
            </div>
          </div>
          <div className='ev-trending__mins'>
            <div className='ev-trending__count--bg'>
              <p className='ev-trending__time--count'>
                {minutes < 10 ? `0${minutes}` : minutes}
              </p>
              <p className='ev-trending__time--name'>minutes</p>
            </div>
          </div>
          <div className='ev-trending__seconds'>
            <div className='ev-trending__count--bg'>
              <p className='ev-trending__time--count'>
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
              <p className='ev-trending__time--name'>seconds</p>
            </div>
          </div>
        </div>

      </div>
    )
  }

  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      {/* <EvHeader/> */}
      <div className='evolvex'>
        <section className={` ${isZoomOut ? "ev-banner__zoomout" : "ev-banner"}`}>
          <div className={`${isZoomOut ? "ev-banner__explore--zoomout" : "ev-banner__explore"}`} onClick={() => handleHomeExplore()} >
            <div className={` ev-banner__expore-text ${hideText ? 'ev-banner__expore-text--hide' : "ev-banner__expore-text--view"} ${isZoomOut ? 'd-none' : ""}`}>
              <p>Tap to Explore our <b>Evolvex</b> NFT World</p>
            </div>
            <div className={`${enableMidLogo ? "ev-banner__midlogo--view" : "ev-banner__midlogo--hide"} ${enableTopLogo && 'd-none'}`}>
              <img src={logo} />
            </div>
            <div className={`${enableTopLogo && !enableHeaderLogo ? "ev-banner__toplogo--view" : "ev-banner__toplogo--hide"} `}>
              <img src={logo} />
            </div>
            <div className={`${enableContent ? 'ev-banner__opacity' : "d-none"}`}>
            </div>
            <div className={`${enableContent ? "ev-banner__content--view" : "d-none"}`}>

              <div className='ev-banner__content_animation'
              >
                <div className='container ev-container px-0'
                >
                  <div className='row h-100 align-items-center'>
                    <div className='col-12 col-xl-6 ev-col-xxl-6 '>
                      <div className='ev-banner__content--left'>
                        <h5>
                          Buy , Sell NFT's & <br />
                          Get Rewards
                        </h5>
                        <p>NFT Marketplace is the web3 NFT Marketplace Where Traders And collectors earn rewards</p>
                        <div className='d-flex justify-content-center'>
                          <button className='mt-3 mt-xl-5'>Explore</button>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-xl-6 ev-col-xxl-6 mt-5 mt-xl-0 ev-banner__right-col'>
                      <div className='ev-banner__content--right'>
                        <div className='ev-banner__cardwrapper'>
                          <div className='ev-banner__card--left mb-4'>
                            <AuctionCard />
                          </div>
                          <div className='ev-banner__card--center mb-4'>
                            <AuctionCard />
                          </div>
                          <div className='ev-banner__card--right'>
                            <AuctionCard />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>
              </div>



            </div>

          </div>
          <div className='d-none'>
          </div>
        </section>

        {/* <section className='ev-banner__mobile'>
          <div
            data-aos="fade-up"
          >
            <div className='ev-container container px-0'>
              <div className="ev-banner__content--left  ">
                <h5>
                  Buy , Sell NFT's & <br />
                  Get Rewards
                </h5>
                <p>NFT Marketplace is the web3 NFT Marketplace Where Traders And collectors earn rewards</p>
                <button className='mt-5'>Explore</button>
              </div>
              <AuctionCard />
              <AuctionCard />
              <AuctionCard />
            </div>
          </div>

        </section> */}


        <section className='ev-creators'>
          <div className='container ev-container px-0'>
            <div className='ev-creators__head'>
              <h5>Top Creators</h5>
              <p>Lorem ipsum dolor sit amet consectetur. Ornare ac blandit nulla facilisi. Phasellus viverra pretium in bibendum purus. Augue consequat urna sagittis auctor sem in condimentum. Mi ultricies nunc cum neque justo proin et eu mi.</p>
            </div>

            <div className='ev-creators__cards '>
              <div className='row'>
                {
                  topCreatorsData.map((item) => (
                    <div className='col-12 col-sm-6 col-lg-4' key={item.id}>
                      <CreatorCard item={item} />
                    </div>
                  ))
                }
              </div>
            </div>

            <div className='ev-creators__button d-flex justify-content-center'>
              <button className='ev-creators__button--view'>
                View All
              </button>
            </div>
          </div>

        </section>

        <section className='ev-collections'>
          <div className='container ev-container px-0'>
            <div className='ev-collections__head'>
              <h5>Top Collection</h5>
              <p>Lorem ipsum dolor sit amet consectetur. Ornare ac blandit nulla facilisi. Phasellus viverra pretium in bibendum purus. Augue consequat urna sagittis auctor sem in condimentum. Mi ultricies nunc cum neque justo proin et eu mi.</p>
            </div>

            <div className='ev-collections__cards '>
              <div className='row'>
                {
                  collectionCardData.map((item) => (
                    <div className='col-12 col-sm-6 col-lg-4' key={item.id}>
                      <CollectionCard item={item} />
                    </div>
                  ))
                }
              </div>
            </div>

            <div className='ev-creators__button d-flex justify-content-center'>
              <button className='ev-creators__button--view'>
                View All
              </button>
            </div>
          </div>

        </section>
        <section className='ev-trending'>
          {/* <div className='container ev-container px-0'> */}
          <div className='container container-width'>
            <div className='ev-trending__background'>
              <div className='ev-trending__star--anim'>
              </div>
              <div className='row ev-trending__row mx-auto'>
                <div className='col-12 col-lg-6'>
                  <div className='ev-trending__left'>
                    <h5 className='ev-trending__title'>
                      Hot trending on this week
                    </h5>
                    <p className='ev-trending__desc'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    {/* <div className='ev-trending__calender'>
                                            <div className='ev-trending__count'>
                                                <div className='ev-trending__count--bg'>
                                                    12
                                                </div>
                                                <p className='ev-trending__time'>Hours</p>
                                            </div>
                                            <div className='ev-trending__count'>
                                                <div className='ev-trending__count--bg'>
                                                    14
                                                </div>
                                                <p className='ev-trending__time'>Hours</p>
                                            </div>
                                            <div className='ev-trending__count'>
                                                <div className='ev-trending__count--bg'>
                                                    <img />
                                                </div>
                                                <p className='ev-trending__time'>Hours</p>
                                            </div>
                                            <div className='ev-trending__count'>
                                            </div>
                                        </div> */}
                    <Countdown date={Date.now() + 245006600} renderer={renderer} />
                    <div className='ev-trending__button'>
                      <button className='ev-trending__button--placebid'>
                        <p>Place Bid</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-lg-6 ev-trending__right-col'>
                  <div className='ev-trending__cards'>
                    <div className='ev-trending__cards-left'>
                      <TrendingCard />
                    </div>
                    <div className='ev-trending__cards-right'>
                      <TrendingCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        <section className='ev-hotauction'>
          {/* <div className='container ev-container px-0'> */}
          <div className='container container-width'>
            <div className='ev-hotauction__head'>
              <h5>Hot Auction</h5>
              <p>Lorem ipsum dolor sit amet consectetur. Ornare ac blandit nulla facilisi. Phasellus viverra pretium in bibendum purus. Augue consequat urna sagittis auctor sem in condimentum. Mi ultricies nunc cum neque justo proin et eu mi.</p>
            </div>
            <div className='ev-hotauction__cards'>
              <div className='row'>
                {
                  collectionCardData.map((item) => (
                    <div className='d-flex justify-content-center justify-content-md-start col-md-6 col-lg-4 col-xl-3 mb-5'>
                      <NFTcard item={item} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
        <section className='ev-image d-flex align-items-center'>
          <div className='ev-image__gif--bg'>

          </div>
          <div className='container container-width'>
            <div className='row ev-image__row align-items-center'>
              <div className='col-xl-6 d-flex justify-content-center justify-content-xl-start align-items-center order-1 order-xl-0 mt-5'>
                <div className='ev-image__left'>
                  <div className='ev-image__left--start '>
                    <div className='ev-image__start--top'>
                      <img src={aigifone} alt="gif" className='ev-fit__image--cover' />
                    </div>
                    <div className='ev-image__start--bottom'>
                      <img src={c1image2} alt="gif" className='ev-fit__image--cover' />
                    </div>
                  </div>
                  <div className='ev-image__left--end'>
                    <div className='ev-image__end--top'>
                      <img src={c1image2} alt="gif" className='ev-fit__image--cover' />
                    </div>
                    <div className='ev-image__end--bottom'>
                      <img src={circleAnimation} alt="circle" className='ev-image__bg--gif' />
                      <div className='ev-image__bg--wrapper'>
                        <img src={c1image3} alt="nft" className='ev-fit__image--cover' />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='col-xl-6 order-0 order-xl-1 '>
                <div className='ev-image__right'>
                  <h5>AI Image Generator</h5>
                  <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente labore suscipit, optio minus eius, minima debitis repellendus laborum, laboriosam qui odit dolorem ad quaerat quisquam!</p>
                  <p className='mt-2 mt-xl-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente labore suscipit, optio minus eius, minima debitis repellendus laborum, laboriosam qui odit dolorem ad quaerat quisquam!</p>
                  <p className='mt-2 mt-xl-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente labore suscipit, optio minus eius, minima debitis repellendus laborum, laboriosam qui odit dolorem ad quaerat quisquam!</p>
                  <div>
                    <button className='ev-image__button-generate'>Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <EvFooter />
      </div>
    </>
  )
}

export default Landing