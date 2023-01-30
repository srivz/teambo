import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function defaultFunction() {
}
export function readCompany() {
    const querySnapshot = getDocs(collection(db, "Companies"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
