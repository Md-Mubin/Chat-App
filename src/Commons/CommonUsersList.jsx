import React from 'react'

const CommonUsersList = ({mainImage, mainName}) => {
    return (
        <>
            <ul>

                {/* =========== user infos  ===========*/}
                <li className='flex items-center gap-10'>
                    <img src={mainImage} alt="user_image" className='w-[80px]'/>
                    <h6 className='text-lg text-black dark:text-white'>{mainName}</h6>
                </li>
            </ul>
        </>
    )
}

export default CommonUsersList