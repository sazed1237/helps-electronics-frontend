import React, { useEffect, useState } from 'react';
// for desktop
import img1 from '../assets/banner/img77.jpg'
import img2 from '../assets/banner/img33.jpg'
import img3 from '../assets/banner/img66.jpg'
import img4 from '../assets/banner/img55.jpg'
import img6 from '../assets/banner/img44.webp'
// for mobile version
import img1_mobile from '../assets/banner/img77.jpg'
import img2_mobile from '../assets/banner/img33.jpg'
import img3_mobile from '../assets/banner/img66.jpg'
import img4_mobile from '../assets/banner/img55.jpg'
import img6_mobile from '../assets/banner/img44.webp'


import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const HomeBanner = () => {

    const [currentImage, setCurrentImage] = useState(2)

    const nextImage = () => {
        if (desktopImage.length - 1 > currentImage) {
            setCurrentImage(previous => previous + 1)
        }
    }
    const previousImage = () => {
        if (currentImage != 0) {
            setCurrentImage(previous => previous - 1)
        }
    }

    // for change image in 5 second
    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImage.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }

        }, 5000)

        return () => clearInterval(interval)

    }, [currentImage])



    const desktopImage = [
        img1,
        img2,
        img3,
        img4,
        img6
    ]
    const mobileImage = [
        img1_mobile,
        img2_mobile,
        img3_mobile,
        img4_mobile,
        img6_mobile,
    ]



    return (
        <div className='w-full h-40 md:h-96 relative'>
            {/* button for slide the image */}
            <div className='absolute z-20 w-full h-full top-1/2 md:block hidden '>
                <div className='flex justify-between px-2 text-2xl text-slate-200'>
                    <button onClick={previousImage} className='transition-all hover:scale-125 hover:text-red-500 ' ><MdArrowBackIos /> </button>
                    <button onClick={nextImage} className='transition-all hover:scale-125 hover:text-red-500 ' ><MdArrowForwardIos /> </button>
                </div>
            </div>

            {/* for desktop version */}
            <div className='w-full h-full  overflow-hidden hidden md:flex'>
                {
                    desktopImage.map((image, index) => (
                        <div key={index} className='w-full h-full min-h-full min-w-full transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img
                                src={image}
                                alt=""
                                className=' w-full h-full rounded'
                            />
                        </div>
                    ))
                }
            </div>

            {/* for mobile version */}
            <div className='w-full h-full flex overflow-hidden md:hidden'>
                {
                    mobileImage.map((image, index) => (
                        <div key={index} className='w-full h-full min-h-full min-w-full transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img
                                src={image}
                                alt=""
                                className=' w-full h-full rounded'
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default HomeBanner;