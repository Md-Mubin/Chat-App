import React, { useEffect, useState } from 'react'
import CommonUsersList from '../../Commons/CommonUsersList'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllFriends = () => {

    const usersFromSlices = useSelector((state) => state.userData.value)

    const [allFriends, setAllFriends] = useState([])

    const db = getDatabase()

    useEffect(() => {
        const starCountRef = ref(db, 'allFriends/');
        onValue(starCountRef, (snapshot) => {
            let array = []
            snapshot.forEach((datas) => {
                if(datas.val().currentUserId == usersFromSlices.uid){
                    array.push({friendName: datas.val().acceptUserName, friendImage: datas.val().acceptUserImg, friendUID: datas.val().acceptUserId, key: datas.key})
                }else if(datas.val().acceptUserId == usersFromSlices.uid){
                    array.push({friendName: datas.val().currentUserName, friendImage: datas.val().currentUserImg, friendUID: datas.val().currentUserId, key: datas.key})
                }
            })
            setAllFriends(array)
        });
    }, [])

    const handleFrienRemove=(unfriend)=>{
        remove(ref(db, 'allFriends/') , unfriend)
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
                                <CommonUsersButton_v1 commonclick={()=>handleFrienRemove(items.key)} buttonName={"Remove"} customDesign={"bg-red-300 hover:bg-red-600 duration-200"}/>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllFriends