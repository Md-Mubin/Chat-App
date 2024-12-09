import React, { useEffect, useState } from 'react'
import CommonUsersList from '../../Commons/CommonUsersList'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'
import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllFriends = () => {

    // ========== All Hooks
    const usersFromSlices = useSelector((state) => state.userData.value)

    const [allFriends, setAllFriends] = useState([])

    const db = getDatabase() // database call variable

    // ========== Rendering the data coming from firebase
    useEffect(() => {
        onValue(ref(db, 'allFriends/'), (snapshot) => {
            let array = []
                snapshot.forEach((datas)=>{
                    if(datas.val().currentUserId == usersFromSlices.uid){
                        array.push({
                            friendName: datas.val().acceptUserName, 
                            friendImage: datas.val().acceptUserImg, 
                            friendUID: datas.val().acceptUserId, 
                            key: datas.key
                        })
                    }else if(datas.val().acceptUserId == usersFromSlices.uid){
                        array.push({
                            friendName: datas.val().currentUserName, 
                            friendImage: datas.val().currentUserImg, 
                            friendUID: datas.val().currentUserId, 
                            key: datas.key
                        })
                    }
                })
            setAllFriends(array)
        })
    }, [])
    
    // ========= Unfriend Someone from Friend List
    const handleFrienRemove=(unfriend)=>{
        remove(ref(db, "allFriends/" + unfriend.key))
    }

    // ========= Block Someone from Friend List
    const handleBlock=(blockUser)=>{
        set(ref(db, "blockLists/" + blockUser.key),{
            blockfriendid: blockUser.friendUID,
            blockfriendName: blockUser.friendName,
            blockfriendImg: blockUser.friendImage,
            currentUserID : usersFromSlices.uid
        })

        remove(ref(db, "allFriends/" + blockUser.key))
    }

    return (
        <>
            <section className='pt-20'>
                <div className="container">
                    <h1 className='text-center text-5xl mb-10 text-black dark:text-white'>All Friends</h1>
                    {
                        allFriends.map((items) => (
                            <ul key={items.key} className='w-[800px] flex justify-between items-center'>
                                <CommonUsersList mainImage={items.friendImage} mainName={items.friendName} />
                                <div className="flex gap-6">
                                <CommonUsersButton_v1 commonclick={()=>handleFrienRemove(items)} buttonName={"Unfriend"} customDesign={"bg-red-300 hover:bg-red-600 duration-200"}/>
                                <CommonUsersButton_v1 commonclick={()=>handleBlock(items)} buttonName={"Block"} customDesign={"bg-slate-300 hover:bg-red-600 duration-200"}/>
                                </div>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllFriends