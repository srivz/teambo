import { ref, set } from "firebase/database"
import { db } from "../../firebase-config"

const dateFormatChange = (date) => {
    if (date === '--' || !date) {
        return '--'
    }
    let givenDate = date.split('/')
    let months = [
        '-',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    let dateMonth = months[parseInt(givenDate[1])]
    return dateMonth + ',' + givenDate[0] + ' ' + givenDate[2]
}

const timeFormatChange = (time) => {
    if (time === '--' || !time) {
        return '--'
    }
    let givenTime = time.split(':')
    if (parseInt(givenTime[0]) === 0 || parseInt(givenTime[0]) === 24) {
        let minute =
            parseInt(givenTime[1]) > 9
                ? parseInt(givenTime[1])
                : '0' + parseInt(givenTime[1])
        return '12:' + minute + ' am'
    } else if (parseInt(givenTime[0]) === 12) {
        let minute =
            parseInt(givenTime[1]) > 9
                ? parseInt(givenTime[1])
                : '0' + parseInt(givenTime[1])

        return "12:" + minute + ' pm'
    } else if (parseInt(givenTime[0]) > 12) {
        let hour =
            parseInt(givenTime[0]) % 12 > 9
                ? parseInt(givenTime[0]) % 12
                : '0' + parseInt(givenTime[0] % 12)
        let minute =
            parseInt(givenTime[1]) > 9
                ? parseInt(givenTime[1])
                : '0' + parseInt(givenTime[1])

        return hour + ':' + minute + ' pm'
    } else if (parseInt(givenTime[0]) < 12) {
        let hour =
            parseInt(givenTime[0]) > 9
                ? parseInt(givenTime[0])
                : '0' + parseInt(givenTime[0])
        let minute =
            parseInt(givenTime[1]) > 9
                ? parseInt(givenTime[1])
                : '0' + parseInt(givenTime[1])

        return hour + ':' + minute + ' am'
    }
}


export default function notifyNewTask(teamRequest, managerId, teammateIndex, newTask) {

    if (teamRequest === undefined || teamRequest === null) {
        let newArr = { 0: { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
        set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
    }
    else {
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
        })
        if (exists) {
            let newArr2 = [...newArr, { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}

export function notifySwitchToTask(teamRequest, managerId, teammateIndex, newTask) {

    if (teamRequest === undefined || teamRequest === null) {
        let newArr = { 0: { type: "switchTo", client: newTask.client, text: " Task is switched to you on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
        set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
    }
    else {
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
        })
        if (exists) {
            let newArr2 = [...newArr, { type: "switchTo", client: newTask.client, text: " Task is switched to you on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}
export function notifySwitchFromTask(teamRequest, managerId, teammateIndex, newTask) {

    if (teamRequest === undefined || teamRequest === null) {
        let newArr = { 0: { type: "switchFrom", client: newTask.client, text: " Task is assigned to someone else." } }
        set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
    }
    else {
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
        })
        if (exists) {
            let newArr2 = [...newArr, { type: "switchFrom", client: newTask.client, text: " Task is assigned to someone else." }]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}
// export function notifyDeleteTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
//         set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
//     }
//     else {
//         let newArr = []
//         let exists = false
//         teamRequest.forEach((element) => {
//             exists = true
//             newArr.push(element)
//         })
//         if (exists) {
//             let newArr2 = [...newArr, { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }

// export function notifyCompleteTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
//         set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
//     }
//     else {
//         let newArr = []
//         let exists = false
//         teamRequest.forEach((element) => {
//             exists = true
//             newArr.push(element)
//         })
//         if (exists) {
//             let newArr2 = [...newArr, { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }

// export function notifyCorrectionTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
//         set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
//     }
//     else {
//         let newArr = []
//         let exists = false
//         teamRequest.forEach((element) => {
//             exists = true
//             newArr.push(element)
//         })
//         if (exists) {
//             let newArr2 = [...newArr, { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }
// export function notifyAdditionalCorrectionTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) } }
//         set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr)
//     }
//     else {
//         let newArr = []
//         let exists = false
//         teamRequest.forEach((element) => {
//             exists = true
//             newArr.push(element)
//         })
//         if (exists) {
//             let newArr2 = [...newArr, { type: "new", client: newTask.client, text: " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime) }]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }