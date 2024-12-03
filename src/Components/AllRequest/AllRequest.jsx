import React, { useEffect, useState } from 'react'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllRequest = () => {

    const usersFromSlices = useSelector((state) => state.userData.value)

    const [allRequest, setAllRequest] = useState([])

    const db = getDatabase()


    useEffect(() => {
        const starCountRef = ref(db, 'friendRequest/');
        onValue(starCountRef, (snapshot) => {
            let array = []
            snapshot.forEach((datas) => {
                if (datas.val().receverId == usersFromSlices.uid) {
                    array.push({ ...datas.val(), key: datas.key })
                }
            })
            setAllRequest(array)
        });
    }, [])


    const handleRemove = (removeUser) => {
        remove(ref(db, 'friendRequest/' + removeUser.key))
    }

    const requestAccept = (confirmUser) => {
        set(push(ref(db, 'allFriends/')), {
            currentUserId: usersFromSlices.uid,
            currentUserImg: usersFromSlices.photoURL,
            currentUserName: usersFromSlices.displayName,
            acceptUserId: confirmUser.senderId,
            acceptUserName: confirmUser.senderName,
            acceptUserImg: confirmUser.senderPhoto,
        });
        remove(ref(db, 'friendRequest/' + confirmUser.key))
    }


    return (
        <>
            <section className='pt-20'>
                <div className="container">
                    <h1 className='text-center text-5xl mb-10 text-black dark:text-white'>All Friends Request</h1>
                    {
                        allRequest.map((item) => (
                            <ul key={item.key} className='w-[800px] flex justify-between items-center'>
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