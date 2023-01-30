import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function writeCompany(name) {
    await addDoc(collection(firestoreDB, "companies"), {
        companyName: name, isActive: true
    });
}
export async function writeDesignation(companyId, name) {
    await updateDoc(doc(firestoreDB, "companies", companyId), {
        designations: arrayUnion(name)
    });
}
export async function addNewManager(managerName, companyName, companyId, designation, managerEmail, whatsappNumber) {
    await addDoc(collection(firestoreDB, "managers"), {
        managerName: managerName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        isActive: true,
        managerEmail: managerEmail,
        whatsappNumber: whatsappNumber
    });
}
export async function addNewTeammate(teammateName, companyName, companyId, designation, teammateEmail, whatsappNumber) {
    await addDoc(collection(firestoreDB, "teammates"), {
        teammateName: teammateName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        teammateEmail: teammateEmail,
        isActive: true,
        whatsappNumber: whatsappNumber
    });
}