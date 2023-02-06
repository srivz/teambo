import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export async function readTeammate(mail) {
    let teammate = null;
    const q = query(collection(firestoreDB, "teammates"), where("teammateEmail", "==", mail), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teammate = { id: doc.id, data: doc.data() };
    });
    return teammate;
}
export async function readTask(teammateId) {
    let tasks = []
    const q = query(collection(firestoreDB, "tasks"), where("teammateId", "==", `${teammateId}`), where("isLive", "==", true));
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
