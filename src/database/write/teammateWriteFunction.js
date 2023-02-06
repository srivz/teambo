import { addDoc, arrayRemove, arrayUnion, collection, deleteField, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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
    var today = new Date()
    const q = query(collection(firestoreDB, "tasks"), where("status", "==", "ON_GOING"), where("isLive", "==", true), where("teammateId", "==", teammate_id));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        if (docA.id !== task_id) {
            let now = 0
            if (docA.data().totalHours !== undefined) {
                now = docA.data().totalHours
            }
            if (docA.data().startTimeStamp !== null) {
                now += diff_hours(today, new Date(docA.data().startTimeStamp.seconds * 1000))
            }
            const attendanceRef = doc(firestoreDB, 'tasks', docA.id)
            updateDoc(attendanceRef, {
                status: "PAUSED",
                totalHours: now,
                startTimeStamp: null
            })
        }
    })
    const task = doc(firestoreDB, "tasks", task_id);
    await updateDoc(task, {
        status: "ON_GOING",
        startTimeStamp: timeStamp
    })
}


export async function pauseTask(teammateId) {
    var today = new Date()
    const q = query(collection(firestoreDB, "tasks"), where("status", "==", "ON_GOING"), where("isLive", "==", true), where("teammateId", "==", teammateId));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        let now = 0
        if (docA.data().totalHours !== undefined) {
            now = docA.data().totalHours
        }
        if (docA.data().startTimeStamp !== null)
        {
            now += diff_hours(today, new Date(docA.data().startTimeStamp.seconds * 1000))
        }
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
        let now = 0
        if (docSnap.data().totalHours !== undefined) { now = docSnap.data().totalHours }
        if (docSnap.data().startTimeStamp !== null) {
            now += diff_hours(today, new Date(docSnap.data().startTimeStamp.seconds * 1000))
        }
        const attendanceRef = doc(firestoreDB, 'tasks', docSnap.id)
        updateDoc(attendanceRef, {
            status: "DONE",
            totalHours: now,
            completedOn: today,
            startTimeStamp: null
        })
    }
}

export async function addQuery(taskId, createdAt, teammateId, createdByEmail, managerId, query) {
    if (query !== "") {
        await addDoc(collection(firestoreDB, 'tasks', `${taskId}`, 'communications'), {
            isVisible: true,
            createdAt: createdAt,
            createdBy: teammateId,
            createdByEmail: createdByEmail,
            managerId: managerId,
            teammateId: teammateId,
            type: 'QUERY_ADDED',
            query: query,
        })
    }
}