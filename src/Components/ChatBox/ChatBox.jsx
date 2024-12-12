import React, { useEffect, useState } from 'react'
import CommonUsersList from '../../Commons/CommonUsersList'
import InputEmoji from "react-input-emoji"
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'

const ChatBox = () => {

    const [text, setText] = useState("")
    
    const [allmsg, setAllMsg] = useState([])

    const db = getDatabase()

    const chatUsers = useSelector((state) => state.chatData.value)

    const currentUsers = useSelector((state) => state.userData.value)

    const handleOnEnter = (msgData) => {
        set(push(ref(db, "allMassage/")), {
            massage: msgData,
            senderID: currentUsers.uid,
            reciverID: chatUsers.friendUID
        })
    }

    // ========= to render the massages
    useEffect(() => {
        onValue(ref(db, "allMassage/"), (snapshot) => {
            let massageArray = []
            snapshot.forEach((items) => {
                if (items.val().senderID == currentUsers.uid && items.val().reciverID == chatUsers.friendUID) {
                    massageArray.push({ ...items.val(), key: items.key })
                }else if(items.val().senderID == chatUsers.friendUID && items.val().reciverID == currentUsers.uid){
                    massageArray.push({...items.val(), key: items.key})
                }
            })
            setAllMsg(massageArray)
        })
    }, [db, chatUsers])

    return (
        <>
            <section className='pt-20'>
                <h1 className='text-4xl text-center italic mb-10'>Chats</h1>
                <ul className='w-[900px] h-[700px] bg-slate-200 rounded-2xl p-6'>
                    <CommonUsersList mainName={chatUsers?.friendName} mainImage={chatUsers?.friendImage} />
                    <ul className='w-full h-[550px] bg-slate-100 rounded-xl mt-4 pt-4 px-4 overflow-y-scroll'>
                        {
                            allmsg.map((items)=>(
                                items.senderID == currentUsers.uid ?
                                <li key={items.key} className='px-3 py-2 my-2 rounded-lg bg-slate-500 text-white w-fit ml-auto'>{items.massage}</li>
                                :
                                <li key={items.key} className='px-3 py-2 my-2 rounded-lg bg-slate-300 w-fit'>{items.massage}</li>
                            ))
                        }
                    </ul>
                </ul>
                <ul>
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                    />
                </ul>
            </section>
        </>
    )
}

export default ChatBox