import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'

const AllUsers = () => {

    // ========== All Hooks
    const [allUsers, setAllUsers] = useState([])

    const [sentRequest, setSentRequest] = useState([])

    const [friend, setFriend] = useState([])

    const usersFromSlices = useSelector((state) => state.userData.value)

    // ========== firebase real time Database
    const db = getDatabase()

    // ========== Rendering the data coming from firebase
    useEffect(() => {

        // ========= to ptint all the users 
        onValue(ref(db, 'allUsers/'), (snapshot) => {
            let arr = []
            snapshot.forEach((items) => {
                if (items.key != usersFromSlices.uid) {
                    arr.push({ ...items.val(), userKeys: items.key })
                }
            })
            setAllUsers(arr)
        });

        // ========= to check if the request has been send 
        onValue(ref(db, "friendRequest/"), (snapshot) => {
            let reqArray = []
            snapshot.forEach((items) => {
                if (items.val().receverId == usersFromSlices.uid) {
                    reqArray.push(items.val().senderId)
                }else if(items.val().senderId == usersFromSlices.uid){
                    reqArray.push(items.val().receverId)
                }
            })
            setSentRequest(reqArray)
        })

        // ========= to check if any users is my friend
        onValue(ref(db, `allFriends/`), (snapshot) => {
            let friendArray = []
                snapshot.forEach((datas) => {
                    if (datas.val().currentUserId == usersFromSlices.uid) {
                        friendArray.push({ friendUID: datas.val().acceptUserId })
                    } else if (datas.val().acceptUserId == usersFromSlices.uid) {
                        friendArray.push({ friendUID: datas.val().currentUserId })
                    }
                })
            setFriend(friendArray)
        })
    }, [])

    // ========= Sending Friend Request 
    const handelAdd = (addUser) => {
        set(push(ref(db, "friendRequest/")), {
            senderId: usersFromSlices.uid,
            senderPhoto: usersFromSlices.photoURL,
            senderName: usersFromSlices.displayName,
            receverId: addUser.userKeys,
            receverName: addUser.userName,
            reveverPhoto: addUser.userImage
        });

        setSentRequest((prev) => [...prev, addUser.userKeys])
    }

    // ========= Removing Friend Request
    const handleRemoveRequest = (cancelRequest) => {
        remove(ref(db, "friendRequest/" , cancelRequest))
            .then(() => {
                setSentRequest((prev) => prev.filter((key) => key !== cancelRequest))
            })
    }

    return (
        <>
            <section className='allUsersSection'>
                <div className="container">
                    <h1>All Users</h1>
                    {
                        allUsers.map((userDatas) => (
                            <ul key={userDatas.userKeys} className='w-[800px] flex justify-between items-center mt-6'>
                                <CommonUsersList mainName={userDatas.userName} mainImage={userDatas.userImage} />

                                <CommonUsersButton_v1 // button

                                    commonclick={friend.some(fr => fr.friendUID === userDatas.userKeys)
                                        ? null
                                        : (sentRequest.includes(userDatas.userKeys)
                                            ? () => handleRemoveRequest(userDatas.userKeys)
                                            : () => handelAdd(userDatas))}

                                    buttonName={friend.some(fr => fr.friendUID === userDatas.userKeys)
                                        ? "Friend"
                                        : (sentRequest.includes(userDatas.userKeys)
                                            ? "Cancel request"
                                            : "Send Request")}

                                    customDesign={friend.some(fr => fr.friendUID === userDatas.userKeys)
                                        ? "bg-green-600 opacity-80 pointer-events-none"
                                        : (sentRequest.includes(userDatas.userKeys)
                                            ? "bg-red-400 hover:bg-red-500"
                                            : "bg-slate-400 hover:bg-slate-500")} />
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllUsers