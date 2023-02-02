import { arrayUnion, collection, doc, getDocs, query, updateDoc, where, addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() {
}
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

export async function requestTeammate(managerId, managerName, teammateEmail) {
    const q = query(collection(firestoreDB, "teammates"), where("teammateEmail", "==", teammateEmail))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        const teammateRef = doc(firestoreDB, "teammates", docA.id);
        updateDoc(teammateRef, {
            requests: arrayUnion({ managerId: managerId, managerName: managerName })
        })
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

export async function addNewClient(companyId, clientId, clientName, managerId, managerName, companyName) {
    await addDoc(collection(firestoreDB, "client"), {
        companyId: companyId,
        clientId: clientId,
        clientName: clientName,
        managerId: managerId,
        managerName: managerName,
        companyName: companyName
    })
}