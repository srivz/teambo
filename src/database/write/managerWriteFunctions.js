import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export async function addNewManager(docId, managerName, companyName, companyId, designation, managerEmail, whatsappNumber) {
    await updateDoc(doc(firestoreDB, "managers", `${docId}`), {
        managerName: managerName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        isActive: true,
        managerEmail: managerEmail,
        whatsappNumber: whatsappNumber
    });
}
export async function addNewTeammate(docId, teammateName, companyName, companyId, designation, teammateEmail, whatsappNumber) {
    await updateDoc(doc(firestoreDB, "teammates", `${docId}`), {
        teammateName: teammateName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        teammateEmail: teammateEmail,
        isActive: true,
        whatsappNumber: whatsappNumber
    });
}