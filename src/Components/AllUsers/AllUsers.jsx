import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllUsers = () => {

    // ========== All Hooks
    const [allUsers, setAllUsers] = useState([])
    const usersFromSlices = useSelector((state)=>state.userData.value)

    // ========== firebase real time Database
    const db = getDatabase()

    // ========== Rendering the data coming from firebase
    useEffect(() => {
        onValue(ref(db, 'allUsers/'), (snapshot) => {
            const arr = []
            snapshot.forEach((items) => {
                if(items.key != usersFromSlices.uid){
                    arr.push({...items.val(), userKeys: items.key})
                }
            })
            setAllUsers(arr)
        });
    }, [])

    return (
        <>
            <section className='allUsersSection'>
                <div className="container">
                    <h1>All Users</h1>
                    {
                        allUsers.map((userDatas) => (
                            <ul key={userDatas.userKeys} className='w-[800px]'>
                                <CommonUsersList mainName={userDatas.userName} mainImage={userDatas.userImage}/>
                            </ul>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default AllUsers