import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function writeCompany(name) {
    const docRef = await addDoc(collection(firestoreDB, "companies"), {
        companyName: name
    });
    console.log("Document written with ID: ", docRef.id);
}
export async function writeDesignation(companyId, name) {
    const docRef = await updateDoc(doc(firestoreDB, "companies", companyId), {
        designations: arrayUnion(name)
    });
    console.log("Document written with ID: ", docRef.id);
}
export async function addNewManager(managerName, companyName, companyId, designation, managerEmail, whatsappNumber) {
    const docRef = await addDoc(collection(firestoreDB, "manager"), {
        managerName: managerName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        isActive: true,
        managerEmail: managerEmail,
        whatsappNumber: whatsappNumber
    });
    console.log("Document written with ID: ", docRef.id);
}
export async function addNewTeammate(teammateName, designation, teammateEmail, whatsappNumber) {
    const docRef = await addDoc(collection(firestoreDB, "teammates"), {
        teammateName: teammateName,
        designation: designation,
        teammateEmail: teammateEmail,
        isActive: true,
        whatsappNumber: whatsappNumber
    });
    console.log("Document written with ID: ", docRef.id);
}