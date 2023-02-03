import { arrayRemove, arrayUnion, deleteField, doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() {
}

export async function requestAcceptTeammate(managerId, id) {
    console.log(managerId, "=>", id)
    const teammateRef = doc(firestoreDB, "teammates", id);
    updateDoc(teammateRef, {
        managerId: arrayUnion(managerId),
        requests: deleteField(),
        currentManagerId: managerId
    });
}

export async function requestRejectTeammate(managerId, name, id) {
    const teammateRef = doc(firestoreDB, "teammates", id);
    updateDoc(teammateRef, {
        requests: arrayRemove({ managerId: managerId, managerName: name })
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



