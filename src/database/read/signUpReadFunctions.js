import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export default async function readCompanies() {
    const q = query(collection(firestoreDB, "companies"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
export async function readClients() {
    const q = query(collection(firestoreDB, "clients"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
