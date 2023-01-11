import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useState } from 'react'
import { auth, db } from '../../firebase-config'
import Loader from '../Loader/Loader'
import NavBar from '../Navs/NavBar'

export default function Analytics() {
    const [manager, setManager] = useState({})
    const [once, setOnce] = useState(true)
    const [loading, setLoading] = useState(true)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (once) {
                setLoading(true)
                onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
                    if (snapshot.exists()) {
                        let data = snapshot.val()
                        setManager(data)
                    } else {
                        console.log('No data available')
                    }
                    setLoading(false)
                })
                setOnce(false)
            }
        } else {
            window.location.href = '/'
        }
    })
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <NavBar
                        user="MANAGER"
                        user2="ANALYTICS"
                        name={manager.name}
                        role={manager.designation}
                    />
                </div>
            )}
        </>
    )
}
