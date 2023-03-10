import { query } from "firebase/database";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export default async function readManagers(user) {
    let manager = null
    const q = doc(firestoreDB, "managers", `${user}`);
    const docSnap = await getDoc(q);
    if (docSnap.exists()) {
        manager = { id: docSnap.id, data: docSnap.data() };
    }
    return manager;
}

export async function readTeammatesFromList(id) {
    let teammate = []
    const q = query(collection(firestoreDB, "teammates"), where("currentManagerId", "==", `${id}`), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teammate.push({ id: doc.id, data: doc.data() });
    });
    return teammate;
}

export async function readClients(id) {
    let clients = []
    const q = query(collection(firestoreDB, "clients"), where("managerId", "==", `${id}`), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        clients.push({ id: doc.id, data: doc.data() })
    });
    return clients;
}
export async function readAllLiveTasks(id) {
    let tasks = []
    const q = query(collection(firestoreDB, "tasks"), where("managerId", "==", `${id}`), where("isLive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        let communications = []
        const q = query(collection(firestoreDB, "tasks", doc.id, "communications"), where("isVisible", "==", true));
        const querySnapshot1 = await getDocs(q);
        querySnapshot1.forEach((doc1) => {
            communications.push({ id: doc1.id, data: doc1.data() })
        });
        tasks.push({ id: doc.id, data: doc.data(), communications: communications })
    });
    return tasks;
}
export async function notApprovedTeammate(attendanceMarkedDate, managerId) {
    let attendance = []
    const q = query(
        collection(firestoreDB, 'attendance'),
        where('attendanceMarkedDate', '==', attendanceMarkedDate),
        where('managerId', '==', managerId)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        attendance.push({ id: doc.id, data: doc.data() })
    })
    return attendance;
}