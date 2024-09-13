import logo from '../../images/Logo.png';


const Footer = () => {
    return ( 
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src={logo} alt="logo" className="w-32" />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-4">
                    <p className="text-white text-base text-center mx-2 cousor-pointer">Market</p>
                    <p className="text-white text-base text-center mx-2 cousor-pointer">Exchange</p>
                    <p className="text-white text-base text-center mx-2 cousor-pointer">Tutorials</p>
                    <p className="text-white text-base text-center mx-2 cousor-pointer">Wallets</p>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-small text-center"> Come Join Us! </p>
                <p className="text-white text-small text-center"> poddar.aditya2014@gmail.com </p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
            <p className="text-white text-small text-center"> @Capstone2025 </p>
            <p className="text-white text-small text-center"> Not All rights reserved </p>
            </div>
        </div>
    );
}

export default Footer