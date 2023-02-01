import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";


export default async function readCompanies() {
    let company = []
    const q = query(collection(firestoreDB, "companies"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        company.push({ id: doc.id, data: doc.data() });
    });
    return company;
}
