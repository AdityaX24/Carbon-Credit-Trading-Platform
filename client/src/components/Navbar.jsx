// import {useState } from 'react';
// import { HiMenuAlt4 } from 'react-icons/hi';
// import { AiOutlineClose } from 'react-icons/ai';

// import logo from '../../images/logo.png';

// const NavbarItem =({title, classProps}) => {
//     return  (
//         <li className={`mx-4 cursor-pointer ${classProps}`}>
//             {title}
//         </li>
//     )
// }

// const Navbar = () => {
//     const [toggleMenu, setToggleMenu]=useState(false);
//     return ( 
//         <nav className="w-full flex md:justify-center justify-between items-center p-4">
//             <div className="md:flex=[0.5] flex-initial justify-center items-center">
//                 <img src={logo} alt="logo" className="w-32 cursor-pointer" />
//             </div>
//             <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
//                 {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
//                     <NavbarItem key={item+index} title={item}/>
//                 ))}
//                 <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
//                     Login
//                 </li>
//             </ul>
//             <div className="flex relative">
//                 {toggleMenu
//                 ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
//                 : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
//                 }
//                 {toggleMenu && (
//                     <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
//                     flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
//                         <li className="text-xl w-full my-2">
//                             <AiOutlineClose onClick={() => setToggleMenu(false)} />
//                         </li>
//                         {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
//                             <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar

import React, { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarItem = ({ title, classProps, index }) => {
    return (
        <motion.li
            className={`mx-4 cursor-pointer ${classProps}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {title}
        </motion.li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const logoStyle = {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '1.2rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        padding: '0.3rem 0.5rem',
        border: '2px solid #4CAF50',
        borderRadius: '6px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: 'fit-content',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return ( 
        <motion.nav 
            className="w-full flex md:justify-center justify-between items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="md:flex-[0.5] flex-initial justify-center items-center"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div style={logoStyle}>
                    Carbon Credit <span style={{ color: 'white', textShadow: 'none' }}>X-Change</span>
                </div>
            </motion.div>
            <motion.ul 
                className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavbarItem key={item+index} title={item} index={index}/>
                ))}
                <motion.li 
                    className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login
                </motion.li>
            </motion.ul>
            <div className="flex relative">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                    }
                </motion.div>
                <AnimatePresence>
                    {toggleMenu && (
                        <motion.ul 
                            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <motion.li 
                                className="text-xl w-full my-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <AiOutlineClose onClick={() => setToggleMenu(false)} />
                            </motion.li>
                            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                                <NavbarItem key={item+index} title={item} classProps="my-2 text-lg" index={index}/>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

export default Navbar;