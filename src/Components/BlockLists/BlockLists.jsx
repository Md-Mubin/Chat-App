import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonUsersList from '../../Commons/CommonUsersList'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'

const BlockLists = () => {

    // ========== All Hooks
    const usersFromSlices = useSelector((state) => state.userData.value)

    const [blockList, setBlockList] = useState([])

    const db = getDatabase() // database call variable

    // ========== Rendering the data coming from firebase
    useEffect(() => {
        onValue(ref(db, `blockLists/`), (snapshot) => {
            let blockArray = []
            snapshot.forEach((mainDatas) => {
                mainDatas.forEach((datas) => {
                    if (datas.val().currentUserID == usersFromSlices.uid) {
                        blockArray.push({ ...datas.val(), key: datas.key })
                    }
                })
            })
            setBlockList(blockArray)
        })
    }, [])

    // ========= Unblock Someone from Block List
    const handleUnblock=(unblock)=>{
        remove(ref(db, `blockLists/${usersFromSlices.uid}/${unblock.key}`))

        set(ref(db, `allFriends/${usersFromSlices.uid}/${unblock.key}`),{
            currentUserId: usersFromSlices.uid,
            currentUserImg: usersFromSlices.photoURL,
            currentUserName: usersFromSlices.displayName,
            acceptUserId: unblock.blockfriendid,
            acceptUserName: unblock.blockfriendName,
            acceptUserImg: unblock.blockfriendImg
        })
    }

    return (
        <>
            <section className='pt-20'>
                <div className="container">
                    <h1 className='text-center text-5xl mb-10 text-black dark:text-white'>Block List</h1>
                    {
                        blockList.map((item) => (
                            <ul key={item.key} className='w-[800px] flex justify-between items-center'>
                                <CommonUsersList mainName={item.blockfriendName} mainImage={item.blockfriendImg} />
                                <li className='flex gap-4'>
                                    <CommonUsersButton_v1 commonclick={()=>handleUnblock(item)} buttonName={"Unblock"} customDesign={"bg-green-400 hover:bg-green-500"} />
                                </li>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default BlockLists