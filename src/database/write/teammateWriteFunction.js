import { addDoc, arrayRemove, arrayUnion, collection, deleteField, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() {
}

export async function requestAcceptTeammate(managerId, id) {
    const teammateRef = doc(firestoreDB, "teammates", id);
    await updateDoc(teammateRef, {
        managerId: arrayUnion(managerId),
        requests: deleteField(),
        currentManagerId: managerId
    });
}

export async function requestRejectTeammate(managerId, name, id) {
    const teammateRef = doc(firestoreDB, "teammates", id);
    await updateDoc(teammateRef, {
        requests: arrayRemove({ managerId: managerId, managerName: name })
    });
}

export async function markTeammateAttendance(companyId, teammateId, managerId, teammateName, managerName, companyName, date, timeStamp) {
    await addDoc(collection(firestoreDB, "attendance"), {
        companyId: companyId,
        teammateId: teammateId,
        managerId: managerId,
        teammateName: teammateName,
        managerName: managerName,
        companyName: companyName,
        attendanceMarkedDate: date,
        attendanceMarked: timeStamp,
        isApproved: false
    });
    await updateDoc(doc(firestoreDB, "teammates", `${teammateId}`), {
        attendanceMarkedDate: date
    });
}
const diff_hours = (dt2, dt1) => {
    var diff = (new Date("" + dt2).getTime() - new Date("" + dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}

export async function takeTask(task_id, teammate_id, timeStamp) {
    const task = doc(firestoreDB, "tasks", task_id);
    updateDoc(task, {
        status: "ON_GOING",
        startTimeStamp: timeStamp
    })
    pauseTask(teammate_id)
}

async function pauseTask(id) {
    var today = new Date()
    const q = query(collection(firestoreDB, "tasks"), where("status", "==", "ON_GOING"), where("isLive", "==", true), where("teammateId", "==", id));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        let now = docA.data().totalHours || 0
        if (docA.data().startTimeStamp !== null)
            now += diff_hours(today, docA.data().startTimeStamp)
        const attendanceRef = doc(firestoreDB, 'tasks', docA.id)
        updateDoc(attendanceRef, {
            status: "PAUSED",
            totalHours: now,
            startTimeStamp: null
        })
    })
}

export async function taskDone(task_id) {
    var today = new Date()
    const q = doc(firestoreDB, "tasks", task_id);
    const docSnap = await getDoc(q);
    if (docSnap.exists()) {
        let now = docSnap.data().totalHours || 0
        if (docSnap.data().startTimeStamp !== null)
            now += diff_hours(today, docSnap.data().startTimeStamp)
        const attendanceRef = doc(firestoreDB, 'tasks', docSnap.id)
        updateDoc(attendanceRef, {
            status: "PAUSED",
            totalHours: now,
            startTimeStamp: null
        })
    }
}



