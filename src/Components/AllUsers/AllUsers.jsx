import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import CommonUsersList from '../../Commons/CommonUsersList'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllUsers = () => {

    const usersFromSlices = useSelector((state)=>state.userData.value)

    console.log(usersFromSlices)

    const [allUsers, setAllUsers] = useState([])

    const db = getDatabase()

    useEffect(() => {
        onValue(ref(db, 'allUsers/'), (snapshot) => {
            const arr = []
            snapshot.forEach((items) => {
                console.log(items.key)
                if(items.key != usersFromSlices.uid){
                    arr.push({...items.val(), userKey: items.key})
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
                            <ul key={userDatas.userKey} className='w-[800px]'>
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