import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
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

export async function addNewManager(docId, managerName, companyName, companyId, designation, managerEmail, whatsappNumber) {
    await setDoc(doc(firestoreDB, "managers", `${docId}`), {
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
    await setDoc(doc(firestoreDB, "teammates", `${docId}`), {
        teammateName: teammateName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        teammateEmail: teammateEmail,
        isActive: true,
        whatsappNumber: whatsappNumber
    });
}

export async function addNewTask(teammateName, companyName, companyId, clientId, clientName, managerId, createdAt, createdBy, createdByEmail,
    title, deadline) {
    await addDoc(collection(firestoreDB, "task"), {
        teammateName: teammateName,
        companyName: companyName,
        companyId: companyId,
        clientId: clientId,
        clientName: clientName,
        managerId: managerId,
        taskId: "TS - 123456",
        createdAt: createdAt,
        managerId: createdBy,
        createdByEmail: createdByEmail,
        title: title,
        assigned: true,
        deadline: deadline,
        status: "ASSIGNED"
    });

}