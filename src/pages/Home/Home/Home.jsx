import React from 'react';
import AllCategory from '../../../components/AllCategory';
import HomeBanner from '../../../components/HomeBanner';
import HorizontalProductCard from '../../../components/HorizontalProductCard';
import VerticalProductCard from '../../../components/VerticalProductCard';


const Home = () => {
    return (
        <div className='container p-4 mx-auto'>
            <AllCategory></AllCategory>
            <HomeBanner></HomeBanner>

            <HorizontalProductCard category={'earphones'} heading={"Bluetooth Earphone's"}></HorizontalProductCard>

            <VerticalProductCard category={"mobile"} heading={"Mobile"}></VerticalProductCard>
            <HorizontalProductCard category={"airpodes"} heading={"Top's Airpodes"}></HorizontalProductCard>
            <VerticalProductCard category={"watches"} heading={"Watches"}></VerticalProductCard>
            <VerticalProductCard category={"trimmers"} heading={"Trimmers"}></VerticalProductCard>
            <VerticalProductCard category={"mouse"} heading={"Mouse"}></VerticalProductCard>
            <VerticalProductCard category={"processor"} heading={"Processor"}></VerticalProductCard>
            <VerticalProductCard category={"tv"} heading={"Television"}></VerticalProductCard>
            <VerticalProductCard category={"camera"} heading={"Camera & Photography"}></VerticalProductCard>
            <VerticalProductCard category={"printers"} heading={"Printer's"}></VerticalProductCard>
            <VerticalProductCard category={"refrigerator"} heading={"Refrigerator's"}></VerticalProductCard>
            <VerticalProductCard category={"speakers"} heading={"Speakers's"}></VerticalProductCard>
        </div>
    );
};

export default Home;