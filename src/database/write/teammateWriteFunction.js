import { addDoc, arrayRemove, arrayUnion, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() {
}

export async function requestAcceptTeammate(managerId, id) {
    console.log(managerId, "=>", id)
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

export async function markAttendance(companyId, teammateId, managerId, teammateName, managerName, companyName, date, timeStamp) {
    const attendanceRef = collection(firestoreDB, "attendance");
    await addDoc(attendanceRef, {
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
    const attendanceMarkedRef = doc(firestoreDB, "teammates", `${teammateId}`);
    await updateDoc(attendanceMarkedRef, {
        attendanceMarkedDate: date
    });
}
