import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

let data = [];

export async function readTeammate(mail) {
    let teammate = null
    const q = query(collection(firestoreDB, "teammates"), where("teammateEmail", "==", mail), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teammate = { id: doc.id, data: doc.data() };
    });
    return teammate;
}
export async function readTask(teammateId) {
    const q = query(collection(firestoreDB, "tasks"), where("teammateId", "==", teammateId), where("isLive", "==", true));
    const querySnapshot = await getDocs(q);
    data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() })
    });
    return data
}
