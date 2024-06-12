import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'> 
            <div className="mycontainer flex px-4 justify-between items-center py-5 h-14">
                <div className="logo font-bold text-white">
                    <span className="text-green-500 text-2xl">&lt;</span>
                    Pass
                    <span className="text-green-500 text-2xl">OP/&gt;</span>
                </div>
            <div>
                <img src="/vite.svg" alt="" />
            </div>
            </div>
        </nav>
    )
}

export default Navbar
