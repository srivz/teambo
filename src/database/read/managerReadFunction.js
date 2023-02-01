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