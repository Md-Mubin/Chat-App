import React, { useEffect, useState } from 'react'
import CommonUsersList from '../../Commons/CommonUsersList'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, onValue, ref } from 'firebase/database'
import { chatUserDataReducers } from '../../Slices/ChatSlice'

const ChatUserBox = () => {

    // ========== All Hooks
    const [chatUsers, setChatUsers] = useState([])

    const usersFromSlices = useSelector((state) => state.userData.value)

    const dispatch = useDispatch()

    // ========== firebase real time Database
    const db = getDatabase()

    // ========== Rendering the data coming from firebase
    useEffect(() => {
        onValue(ref(db, 'allFriends/'), (snapshot) => {
            let array = []
            snapshot.forEach((datas) => {
                if (datas.val().currentUserId == usersFromSlices.uid) {
                    array.push({
                        friendName: datas.val().acceptUserName,
                        friendImage: datas.val().acceptUserImg,
                        friendUID: datas.val().acceptUserId,
                        key: datas.key
                    })
                } else if (datas.val().acceptUserId == usersFromSlices.uid) {
                    array.push({
                        friendName: datas.val().currentUserName,
                        friendImage: datas.val().currentUserImg,
                        friendUID: datas.val().currentUserId,
                        key: datas.key
                    })
                }
            })
            setChatUsers(array)
        })
    }, [])

    const handleChatUser=(chatUser)=>{
        localStorage.setItem("chatUser" , JSON.stringify(chatUser))
        dispatch(chatUserDataReducers(chatUser))
    }

    return (
        <>
            <section className='pt-20'>
                <h1 className='text-4xl text-center mb-10'>Chat Users</h1>
                <ul className='w-[600px] h-[700px] bg-slate-300 rounded-2xl p-6'>
                    {
                        chatUsers.map((items) => (
                            <li onClick={()=>handleChatUser(items)} className='mt-4 hover:shadow-lg duration-200 rounded-xl'>
                                <CommonUsersList mainImage={items.friendImage} mainName={items.friendName} />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    )
}

export default ChatUserBox