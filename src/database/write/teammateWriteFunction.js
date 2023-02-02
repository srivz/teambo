import { addDoc, arrayRemove, arrayUnion, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() {
}

export async function requestAcceptTeammate(managerId, id) {
    const teammateRef = doc(firestoreDB, "teammates", id);
    await updateDoc(teammateRef, {
        managerId: arrayUnion(managerId),
        requests: deleteField(),
        currentManagerId: managerId
    });
}

export async function requestRejectTeammate(managerId, name, id) {
    const teammateRef = doc(firestoreDB, "teammates", id);
    await updateDoc(teammateRef, {
        requests: arrayRemove({ managerId: managerId, managerName: name })
    });
}

export async function markTeammateAttendance(companyId, teammateId, managerId, teammateName, managerName, companyName, date, timeStamp) {
    console.log({ companyId, teammateId, managerId, teammateName, managerName, companyName, date, timeStamp })
    await addDoc(collection(firestoreDB, "attendance"), {
        companyId: companyId,
        teammateId: teammateId,
        managerId: managerId,
        teammateName: teammateName,
        managerName: managerName,
        companyName: companyName,
        attendanceMarkedDate: date,
        attendanceMarked: timeStamp,
        isApproved: false
    });
    await updateDoc(doc(firestoreDB, "teammates", `${teammateId}`), {
        attendanceMarkedDate: date
    });
}
