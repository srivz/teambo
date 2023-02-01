import { arrayRemove, arrayUnion, deleteField, doc, updateDoc } from "firebase/firestore";
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
