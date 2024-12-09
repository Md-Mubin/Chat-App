import React, { useEffect, useState } from 'react'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllRequest = () => {

    // ========== All Hooks
    const usersFromSlices = useSelector((state) => state.userData.value)

    const [allRequest, setAllRequest] = useState([])

    const db = getDatabase() // database call variable

    // ========== Rendering the data coming from firebase
    useEffect(() => {

        onValue(ref(db, "friendRequest/"), (snapshot) => {
            let reqArray = []
            snapshot.forEach((items) => {
                if (items.val().receverId === usersFromSlices.uid) {
                    reqArray.push({ ...items.val(), key: items.key })
                }
            })
            setAllRequest(reqArray)
        })
    }, [])

    // ========= Removing Friend Request
    const handleRemove = (removeRequest) => {
        remove(ref(db, "friendRequest/" + removeRequest.key))
    }

    // ========= Accepting Friend Request
    const requestAccept = (confirmUser) => {
        console.log(confirmUser)
        set(push(ref(db, "allFriends/")), {
            currentUserId: usersFromSlices.uid,
            currentUserImg: usersFromSlices.photoURL,
            currentUserName: usersFromSlices.displayName,
            acceptUserId: confirmUser.senderId,
            acceptUserName: confirmUser.senderName,
            acceptUserImg: confirmUser.senderPhoto,
        })
        remove(ref(db, "friendRequest/" + confirmUser.key))
    }

    return (
        <>
            <section className='pt-20'>
                <div className="container">
                    <h1 className='text-center text-5xl mb-10 text-black dark:text-white'>All Friends Request</h1>
                    {
                        allRequest.map((item) => (
                            <ul key={item.key} className='w-[800px] mt-4 flex justify-between items-center'>
                                <CommonUsersList mainName={item.senderName} mainImage={item.senderPhoto} />
                                <li className='flex gap-4'>
                                    <CommonUsersButton_v1 commonclick={() => requestAccept(item)} buttonName={"Accept"} customDesign={"bg-green-400 hover:bg-green-500"} />
                                    <CommonUsersButton_v1 commonclick={() => handleRemove(item)} buttonName={"Cancel"} customDesign={"bg-red-400 hover:bg-red-500"} />
                                </li>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllRequest