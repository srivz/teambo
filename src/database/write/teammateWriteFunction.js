import { addDoc, arrayRemove, arrayUnion, collection, deleteField, doc, updateDoc } from "firebase/firestore";
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
export async function takeTask(task_id, teammate_id) {
    const task = doc(firestoreDB, "tasks", task_id);
    updateDoc(task, {
        status: "ON_GOING"
    })
    pauseTask(teammate_id)
}

async function pauseTask(id) {
    const teammate_task = doc(firestoreDB, "tasks", id);
    updateDoc(teammate_task, {
        status: "PAUSED"
    })
}

export async function pausingTask(task_id, teammate_id) {
    const task = doc(firestoreDB, "tasks", task_id);
    updateDoc(task, {
        status: "PAUSED"
    })
}

export async function taskDone(task_id) {
    const task = doc(firestoreDB, "tasks", task_id);
    updateDoc(task, {
        status: "DONE"
    })
}



