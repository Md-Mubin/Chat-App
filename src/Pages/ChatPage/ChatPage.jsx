import React from 'react'
import ChatUserBox from '../../Components/ChatUserBox/ChatUserBox'
import ChatBox from '../../Components/ChatBox/ChatBox'

const ChatPage = () => {
    return (
        <>
            <div className='flex gap-6'>
                <ChatUserBox />
                <ChatBox />
            </div>
        </>
    )
}

export default ChatPage