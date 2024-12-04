import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import CommonUsersButton_v1 from '../../Commons/CommonUsersButton_v1'

const AllUsers = () => {

    // ========== All Hooks
    const [allUsers, setAllUsers] = useState([])
    const usersFromSlices = useSelector((state) => state.userData.value)

    // ========== firebase real time Database
    const db = getDatabase()

    // ========== Rendering the data coming from firebase
    useEffect(() => {
        onValue(ref(db, 'allUsers/'), (snapshot) => {
            const arr = []
            snapshot.forEach((items) => {
                if (items.key != usersFromSlices.uid) {
                    arr.push({ ...items.val(), userKeys: items.key })
                }
            })
            setAllUsers(arr)
        });
    }, [])

    // ========= Sending Friend Request Part
    const handelAdd = (addUser)=>{
        set(ref(db, 'friendRequest/' + addUser.userKeys), {
          senderId: usersFromSlices.uid , 
          senderPhoto: usersFromSlices.photoURL , 
          senderName: usersFromSlices.displayName ,
          receverId: addUser.userKeys , 
          receverName: addUser.userName , 
          reveverPhoto: addUser.userImage , 
        });
      }
    
    return (
        <>
            <section className='allUsersSection'>
                <div className="container">
                    <h1>All Users</h1>
                    {
                        allUsers.map((userDatas) => (
                            <ul key={userDatas.userKeys} className='w-[800px] flex justify-between items-center'>
                                <CommonUsersList mainName={userDatas.userName} mainImage={userDatas.userImage} />
                                <CommonUsersButton_v1 commonclick={() => handelAdd(userDatas)} buttonName={"Send Request"} customDesign={"bg-slate-400 hover:bg-slate-500"}/>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllUsers