import { arrayRemove, arrayUnion, deleteField, doc, updateDoc, getDocs, query, collection, where } from "firebase/firestore";
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
    pauseAllTask(teammate_id)
    setTimeout(() => { 
        const task = doc(firestoreDB, "tasks", task_id);
        updateDoc(task, {
            status: "ON_GOING"
        })
    }, 1000)


}

async function pauseAllTask(id) {
    const q = query(collection(firestoreDB, "tasks"), where("teammateId", "==", id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        // console.log(docA.data().status)
        const teammateRef = doc(firestoreDB, "tasks", docA.id);
        updateDoc(teammateRef, {
            status: "PAUSED"
        })
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



