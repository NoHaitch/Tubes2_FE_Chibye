import React from "react";
import logoImg from '../Images/the.png';

export default function Header(){
    return(
        <div className="flex justify-between h-32 items-center bg-gray-100">
            <img src={logoImg} alt="logo-img" className="h-full ml-8"/>

            <div className="flex justify-between gap-16 pr-20 text-xl">
                <h1>Home</h1>
                <h1>About us</h1>
            </div>
        </div>
    )
}