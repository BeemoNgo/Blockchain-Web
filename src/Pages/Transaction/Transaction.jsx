import React, { useState, useEffect, useCallback, useRef } from 'react';
import Introduction from "../About/Introduction";
import axios from 'axios';

import { FaSearch } from "react-icons/fa"
import { AiFillDollarCircle, AiOutlineStar, AiFillDelete } from "react-icons/ai"
import { RxCrossCircled, RxCross1 } from "react-icons/rx"
import { FiTrendingDown } from "react-icons/fi"
import { FiTrendingUp } from "react-icons/fi"
import { BiRupee } from "react-icons/bi"
import { useToast } from '@chakra-ui/react'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

import { useDisclosure } from '@chakra-ui/react';
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { Tooltip } from '@chakra-ui/react'
import { Link } from "@nextui-org/react";

const Transaction = () => {
    // Define state variables
    const [cryptoData, setCryptoData] = useState([]);  // all coins
    const [filteredArray, setFilteredArray] = useState([]); // all coins
    const [seacrhTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [currencyModal, setCurrecnyModal] = useState(false);
    const [currency, setCurrency] = useState("usd");
    const [metaverseCoins, setMetavserseCoins] = useState([]) // metaverse coins
    const [metaverseFilter, setMetaverseFilter] = useState([]); // metaverse coins

    const [originalARR, setOriginalARR] = useState([]);
    const [tabState, setTabState] = useState("all coins");

    const pages = [1, 2, 3, 4];

    const toast = useToast();


    //fetching data
    useEffect(() => {
        // all coins
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data)
                setOriginalARR(data);
                setFilteredArray(data);
            })
            .catch((error) => {
                // Handle error
                throw new Error('Error fetching all coins: ' + error);
            });

        // metaverse
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&category=metaverse&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setMetavserseCoins(data)
                setMetaverseFilter(data)
            })
            .catch((error) => {
                // Handle error
                throw new Error('Error fetching metaverse coins: ' + error);
            });

    }, [currency]);

    // Handle search input
    const searchHandler = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        // search for all coins
        if (tabState === "all coins") {

            if (filteredArray.length > 0) {
                const mutateArr = filteredArray.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }

        // search for metaverse

        else if (tabState === "metaverse") {

            if (metaverseFilter.length > 0) {
                const mutateArr = metaverseFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }
    }
    // // currecny modal
    // const currencyModalToggle = () => {
    //     setCurrecnyModal(!currencyModal)
    // }


    // tabs change
    const metaVerseCategrotyHandler = () => {
        setCryptoData(metaverseCoins)
        setTabState("metaverse")
    }

    // Handle click to update state to show all coins
    const allCoinsHandler = () => {
        setCryptoData(originalARR)
        setTabState("all coins")
    }

    // Sort by price low to high
    const lowTOhighHanler = () => {

        const sortedData = [...cryptoData].sort((a, b) => a.current_price - b.current_price);
        setCryptoData(sortedData);
    }

    // Sort by price high to low
    const highTOlowHandler = () => {
        const sortedData = [...cryptoData].sort((a, b) => b.current_price - a.current_price);
        setCryptoData(sortedData);
    }

    return (
        <>
            <Introduction/>
            <div id="graph-section">
                <div className="flex flex-wrap items-center justify-center">

                    <div className='flex items-center gap-8 tableHeaderChild1 md:justify-center'>

                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={seacrhTerm}
                                onChange={searchHandler}
                                className="px-4 py-2 pl-7 boxsh rounded-md relative z-50 bg-transparent border-2 border-gray-200 text-gray-600 focus:outline-none"
                            />
                            <FaSearch className="search-icon relative -top-7 ml-2 text-gray-400 text-sm w-3 -z-1" />
                        </div>

                    </div>

                    { /* FLTER TABS */}
                    <div className='flex gap-8 flex-wrap items-center ml-2 md:justify-center justify-around mt-5 md:mt-0 text-white'>
                        <p className={`${tabState === "all coins" ? "flex justify-center items-center w-24 h-9 rounded-md border border-white cursor-pointer interFont scalee" : "flex justify-center items-center w-24 h-9 rounded-md greyBackground cursor-pointer interFont scalee"}`} onClick={allCoinsHandler}> All Coins </p>
                        <p className={`${tabState === "metaverse" ? "flex justify-center items-center w-24 h-9 rounded-md border border-white cursor-pointer interFont scalee" : "flex justify-center items-center w-24 h-9 rounded-md greyBackground cursor-pointer interFont scalee"}`} onClick={metaVerseCategrotyHandler}> Metaverse </p>
                    </div>

                </div>

                <br />

                {  /* MAIN CRYPTO TABLE  */}

                <div className="overflow-x-auto">
                    {cryptoData.length === 0 ?
                        <p className=' font-semibold flex justify-center items-center mb-4 gap-2'>
                            No Results Found  <RxCrossCircled className=' font-bold align-middle text-2xl text-red-600' />
                        </p>
                        :
                        <table className="table cryptoDataMainTable mx-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='metaverse-table text-white text-lg'>COIN</th>
                                    <th>
                                        <Tooltip label='Low To High' className='md:mr-20'>
                                            <span id='lowTOhigh' className='flex items-center gap-1 cursor-pointer text-white text-lg' onClick={lowTOhighHanler}>PRICE
                                                <HiOutlineArrowsUpDown className='text-xl' />
                                            </span>
                                        </Tooltip>
                                    </th>

                                    <th className='text-white text-lg'>TOTAL VOLUME</th>

                                    <th>
                                        <Tooltip label='High To Low' className='md:mr-28'>
                                            <span id='highTOlow' className='flex items-center gap-1 cursor-pointer text-white text-lg' onClick={highTOlowHandler}>MARKET CAP
                                                <HiOutlineArrowsUpDown className='text-xl rotate-180' />
                                            </span>
                                        </Tooltip>
                                    </th>
                                    <th className='text-white text-lg'>PRICE CHANGE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* rows */}
                                {cryptoData.slice(page * 20 - 20, page * 20).map((coin, index) => (
                                    <tr key={coin.id}>
                                        <th>
                                            <div className='w-8 h-8 cursor-pointer'>
                                                <AiOutlineStar className='sm:text-xl text-xl text-gray-500 hover:text-yellow-500 transition-all ease-in'

                                                />
                                            </div>
                                        </th>
                                        <td className='py-6 cursor-pointer'>
                                                <img src={coin.image} className="sm:w-12 sm:h-12 w-9 h-9 inline-block mr-2" alt="ada" />
                                                <span className='font-semibold inline-block align-middle uppercase sm:text-base text-sm mr-4 text-white'>{coin.id.substring(0, 18)}</span>
                                        </td>
                                        <td className=' font-semibold py-6 sm:text-base text-sm text-white'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.current_price.toLocaleString()}</td>
                                        <td className=' font-semibold pl-6 sm:text-base text-sm text-white'>{coin.total_volume.toLocaleString()}</td>
                                        <td className=' font-semibold text-gray-500 py-6 sm:text-base text-sm text-white'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.market_cap.toLocaleString()}</td>
                                        <td className={coin.price_change_percentage_24h > 0 ? "text-green-600 sm:text-base text-sm font-semibold py-6 inline-block align-middle" : "text-red-600 font-semibold py-6 inline-block align-middle"}> <span className=' inline-block align-middle'> {coin.price_change_percentage_24h > 0 ? <FiTrendingUp className='text-semibold text-xl text-green-600' /> : <FiTrendingDown className='text-semibold text-xl text-red-600' />} </span>  {coin.price_change_percentage_24h.toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    }
                </div>

                <div className="w80 mx-auto bg-gray-100 mt-4"></div>
                <br />
                <br />
                <br />

                {  /* PAGINATION */}
                <div className='flex gap-4 flex-wrap justify-center'>
                    {pages.map((item) => {

                        return (
                            <p key={item} className={active == item ? "bg-black text-white text-lg indivitualPage2 font-semibold cursor-pointer" : "text-stone-600 text-lg indivitualPage font-semibold cursor-pointer"} onClick={(e) => {
                                if (e.target instanceof HTMLParagraphElement) {
                                    setPage(parseInt(e.target.innerText) || 0);
                                    setActive(parseInt(e.target.innerText) || 0);

                                }

                            }}>
                                {item}
                            </p>
                        )

                    })}
                </div>

            </div>
        </>
    )
}

export default Transaction;
