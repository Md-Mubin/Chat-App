import React from 'react'

const CommonUsersButton_v1 = ({commonclick, buttonName, customDesign}) => {
    return (
        <>
            <div>
                <button onClick={commonclick} className={`px-6 py-2 rounded-xl text-white hover:scale-110  duration-200 will-change-transform ${customDesign}`}>{buttonName}</button>
            </div>
        </>
    )
}

export default CommonUsersButton_v1