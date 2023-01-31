import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export async function readTeammate(mail) {
    let teammate = null
    const q = query(collection(firestoreDB, "teammates"), where("teammateEmail", "==", mail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teammate = { id: doc.id, data: doc.data() };
    });
    return teammate;
}