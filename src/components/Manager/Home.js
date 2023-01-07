import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config'
import NavBar from '../Navs/NavBar'
import HomeBlock from './HomeBlock'
import HomeList from './HomeList'
import { onChildChanged, onValue, ref, set } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from '../Loader/Loader'

export default function Home() {
  const [view, setView] = useState(true)
  const [manager, setManager] = useState({})
  const [once, setOnce] = useState(true)
  const [loading, setLoading] = useState(true)
  const [once1, setOnce1] = useState(true)
  const [managerId, setManagerId] = useState('')
  const [managerName, setManagerName] = useState('')
  const [teamRequest, setTeamRequest] = useState([])
  const [teammateList, setTeammateList] = useState([])
  const [teammateSet, setTeammateSet] = useState([])
  const [allTasks, setAllTasks] = useState([])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true)
        onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val()
            setManager(data)
            setManagerId(user.uid)
            setManagerName(user.displayName)
            setTeammateSet(data.teammates)
            if (data.teammates !== undefined) {
              getTeammates(data.teammates)
            }
            console.log('No')
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

  const getTeammates = (teamList) => {
    if (once1) {
      teamList.forEach((teammate) => {
        onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            setTeammateList((teammateList) => [
              ...teammateList,
              { data, teammate },
            ])
            setAllTasks((oldTasks) => {
              return [...oldTasks, { tasks: data.tasks, teammateEmail: teammate, teammate: data.name, teammateDesignation: data.designation }]
            })
          } else {
            console.log('No data available')
          }
        })
      })
      setOnce1(false)
    }
  }
  onChildChanged(ref(db, `/teammate/`), () => {
    window.location.reload()
  })
  const getTeammatesWithMail = (teammate) => {
    onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setTeamRequest(data.notifications)
        return true
      } else {
        alert('User not available')
      }
    })
  }

  const addNewTeammate = (teammateEmail) => {
    if (teammateEmail === '') {
      alert('Enter email first')
      return
    }
    let id = teammateEmail.split('.')
    let newId = id.join('_')
    getTeammatesWithMail(newId)
    if (teammateSet === undefined) {
      if (teamRequest === undefined) {
        let newArr = [{ managerId, managerName }]
        set(ref(db, `teammate/${newId}/notifications/requests`), newArr)
      } else {
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
          if (element.managerId === managerId) {
            exists = true
          }
          newArr.push(element)
        })
        if (exists) {
          alert('Already requested !')
        } else {
          let newArr2 = [...newArr, { managerId, managerName }]
          set(ref(db, `teammate/${newId}/notifications/requests`), newArr2)
        }
      }
    } else {
      let newArr = []
      teammateSet.forEach((element) => {
        newArr.push(element)
      })
      let exist = newArr.includes(newId)
      if (exist) {
        alert('Already a Teammate !')
      } else {
        if (teamRequest === undefined) {
          let newArr = [{ managerId, managerName }]
          set(ref(db, `teammate/${newId}/notifications/requests`), newArr)
        } else {
          let newArr = []
          let exists = false
          teamRequest.forEach((element) => {
            if (element.managerId === managerId) {
              exists = true
            }
            newArr.push(element)
          })
          if (exists) {
            alert('Already requested !')
          } else {
            let newArr2 = [...newArr, { managerId, managerName }]
            set(ref(db, `teammate/${newId}/notifications/requests`), newArr2)
          }
        }
      }
    }

  }

  function handleChange(newValue) {
    setView(newValue)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <div style={{ backgroundColor: '#FFF' }}>
          <NavBar
              user="MANAGER"
              user2="MANAGER"
            name={manager.name}
            role={manager.designation}
          />

          {view ? (
            <HomeList
              viewType={view}
              team={teammateList}
                onChange={handleChange}
              addTeammate={addNewTeammate}
              manager={manager}
                managerId={managerId}
                allTasks={allTasks}
            />
          ) : (
            <HomeBlock
              viewType={view}
              team={teammateList}
              onChange={handleChange}
            />
          )}
        </div>
      )}
    </>
  )
}
