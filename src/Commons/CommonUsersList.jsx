import React from 'react'

const CommonUsersList = ({mainImage, mainName}) => {
    return (
        <>
            <ul className='w-full flex justify-between items-center mt-6'>
                <li className='flex items-center gap-10'>
                    <img src={mainImage} alt="user_image" className='w-[80px]'/>
                    <h6 className='text-lg text-black dark:text-white'>{mainName}</h6>
                </li>
                <li className='flex gap-6'>
                    <button className='px-6 py-2 bg-slate-400 rounded-xl text-white hover:scale-110 hover:bg-slate-500 duration-200 will-change-transform'>Send Request</button>
                    <button className='px-6 py-2 bg-slate-400 rounded-xl text-white hover:scale-110 hover:bg-slate-500 duration-200 will-change-transform'>Block</button>
                </li>
            </ul>
        </>
    )
}

export default CommonUsersList