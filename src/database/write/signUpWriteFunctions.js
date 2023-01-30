import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function defaultFunction() {
}
export function writeCompany(name) {
    const docRef = addDoc(collection(db, "Companies"), {
        companyName: name
    });
    console.log("Document written with ID: ", docRef.id);
}
export function writeDesignation(companyId, name) {
    const docRef = updateDoc(doc(db, "Companies", companyId), {
        designations: arrayUnion(name)
    });
    console.log("Document written with ID: ", docRef.id);
}
export function addNewManager(managerName, companyName, companyId, designation, managerEmail, whatsappNumber) {
    const docRef = addDoc(collection(db, "Manager"), {
        managerName: managerName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        managerEmail: managerEmail,
        whatsappNumber: whatsappNumber
    });
    console.log("Document written with ID: ", docRef.id);
}
export function addNewTeammate(teammateName, designation, teammateEmail, managerId, whatsappNumber) {
    const docRef = addDoc(collection(db, "Teammates"), {
        teammateName: teammateName,
        designation: designation,
        teammateEmail: teammateEmail,
        managerId: arrayUnion(managerId),
        whatsappNumber: whatsappNumber
    });
    console.log("Document written with ID: ", docRef.id);
}