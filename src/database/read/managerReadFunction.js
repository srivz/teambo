import { query } from "firebase/database";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export default async function readManagers(user) {
    let manager = null
    const q = doc(firestoreDB, "managers", "" + user);
    const docSnap = await getDoc(q);
    if (docSnap.exists()) {
        manager = { id: docSnap.id, data: docSnap.data() };
    }
    return manager;
}

export async function readTeammates(mail) {
    let teammate = null
    const q = query(collection(firestoreDB, "teammates"), where("teammateEmailId", "==", mail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teammate = { id: doc.id, data: doc.data() };
        console.log(doc.id, " => ", doc.data());
    });
    return teammate;
}