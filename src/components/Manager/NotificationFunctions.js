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

    if (teamRequest === undefined) {
        alert(managerId)
        let newArr = [newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
        set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications`), newArr)
    }
    else {
        alert(managerId)
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
        })
        if (exists) {
            let newArr2 = [...newArr, newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
            set(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/notifications`), newArr2)
        }
    }
}
