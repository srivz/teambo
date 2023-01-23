import { ref, set } from "firebase/database"
import { db } from "../../firebase-config"

export default function notifyNewTask(teamRequest, managerId, teammateIndex, newTask) {
    if (teamRequest === undefined) {
        let newArr = { 0: { type: "new", client: newTask.client, text: " New Task is added." } }
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
            let newArr2 = [{ type: "new", client: newTask.client, text: " New Task is added." }, ...newArr]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}

export function notifySwitchToTask(teamRequest, managerId, teammateIndex, newTask) {
    if (teamRequest === undefined) {
        let newArr = { 0: { type: "switchTo", client: newTask, text: " Task is switched to you!!" } }
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
            let newArr2 = [{ type: "switchTo", client: newTask, text: " Task is switched to you!!" }, ...newArr]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}

export function notifySwitchFromTask(teamRequest, managerId, teammateIndex, newTask) {
    if (teamRequest === undefined) {
        let newArr = { 0: { type: "switchFrom", client: newTask, text: " Task is assigned to someone else." } }
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
            let newArr2 = [...newArr, { type: "switchFrom", client: newTask, text: " Task is assigned to someone else." }]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}
export function notifyDeleteTask(teamRequest, managerId, teammateIndex, newTask) {
    if (teamRequest === undefined) {
        let newArr = { 0: { type: "deleted", client: newTask, text: " Task is deleted. " } }
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
            let newArr2 = [{ type: "deleted", client: newTask, text: " Task is deleted. " }, ...newArr]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}

export function notifyCompleteTask(teamRequest, managerId, teammateIndex, newTask) {

    if (teamRequest === undefined) {
        let newArr = { 0: { type: "new", client: newTask, text: " Task is marked complete." } }
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
            let newArr2 = [{ type: "new", client: newTask, text: " Task is marked complete." }, ...newArr]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
        }
    }
}

// export function notifyCorrectionTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " Task has a new correction" } }
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
//             let newArr2 = [{ type: "new", client: newTask.client, text: " Task has a new correction"}, ...newArr]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }
// export function notifyAdditionalCorrectionTask(teamRequest, managerId, teammateIndex, newTask) {

//     if (teamRequest === undefined) {
//         let newArr = { 0: { type: "new", client: newTask.client, text: " Task has an additional correction"} }
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
//             let newArr2 = [{ type: "new", client: newTask.client, text: "  Task has an additional correction"}, ...newArr]
//             set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications/`), newArr2)
//         }
//     }
// }