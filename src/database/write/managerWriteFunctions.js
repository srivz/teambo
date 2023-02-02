import { arrayUnion, collection, doc, getDocs, query, updateDoc, where, addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase-config";

export default async function defaultFunction() { }
export async function addNewManager(
    docId,
    managerName,
    companyName,
    companyId,
    designation,
    managerEmail,
    whatsappNumber,
) {
    await updateDoc(doc(firestoreDB, 'managers', `${docId}`), {
        managerName: managerName,
        companyName: companyName,
        companyId: companyId,
        designation: designation,
        isActive: true,
        managerEmail: managerEmail,
      whatsappNumber: whatsappNumber,
  })
}

export async function requestTeammate(managerId, managerName, teammateEmail) {
    const q = query(
        collection(firestoreDB, 'teammates'),
        where('teammateEmail', '==', teammateEmail),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
      const teammateRef = doc(firestoreDB, 'teammates', docA.id)
      updateDoc(teammateRef, {
        requests: arrayUnion({ managerId: managerId, managerName: managerName }),
    })
  })
}

export async function addNewTask(corrections,
    companyId,
    companyName,
    clientId,
    clientName,
    managerId,
    teammateName,
    teammateId,
    createdAt,
    createdBy,
    createdByEmail,
    title,
    assigned,
    deadline,
    description,
    type,
) {
    const docRef = await addDoc(collection(firestoreDB, 'tasks'), {
        corrections: corrections,
        companyId: companyId,
      isLive: true,
      companyName: companyName,
      clientId: clientId,
      clientName: clientName,
      managerId: managerId,
      teammateName: teammateName,
      teammateId: teammateId,
      taskId: 'TS - 123456',
      createdAt: createdAt,
      createdBy: createdBy,
      createdByEmail: createdByEmail,
      title: title,
      assigned: assigned,
      deadline: deadline,
      status: 'ASSIGNED',
  })
    communicationChange({ type: type, description: description }, docRef.id, {
        createdAt: createdAt,
        createdBy: createdBy,
        createdByEmail: createdByEmail,
        managerId: managerId,
        teammateId: teammateId,
    })
}

export async function communicationChange(com, id, details) {
    if (com.type === 'DESCRIPTION_ADDED')
        await addDoc(collection(firestoreDB, 'tasks', `${id}`, 'communications'), {
            isVisible: true,
            createdAt: details.createdAt,
            createdBy: details.createdBy,
            createdByEmail: details.createdByEmail,
            managerId: details.managerId,
            teammateId: details.teammateId,
            type: 'DESCRIPTION_ADDED',
            description: com.description,
        })
    else if (com.type === 'QUERY_ADDED')
        await addDoc(collection(firestoreDB, 'tasks', `${id}`, 'communications'), {
            isVisible: true,
            createdAt: details.createdAt,
            createdBy: details.createdBy,
            createdByEmail: details.createdByEmail,
            managerId: details.managerId,
            teammateId: details.teammateId,
            type: 'QUERY_ADDED',
            query: com.query,
        })
    else if (com.type === 'QUERY_REPLIED')
        await addDoc(collection(firestoreDB, 'tasks', `${id}`, 'communications'), {
            isVisible: true,
            createdAt: details.createdAt,
            createdBy: details.createdBy,
            createdByEmail: details.createdByEmail,
            managerId: details.managerId,
            teammateId: details.teammateId,
            type: 'QUERY_REPLIED',
            queryId: com.queryId,
            queryReplied: com.queryReplied,
        })
    else if (com.type === 'CORRECTION_ADDED')
        await addDoc(collection(firestoreDB, 'tasks', `${id}`, 'communications'), {
            isVisible: true,
            createdAt: details.createdAt,
            createdBy: details.createdBy,
            createdByEmail: details.createdByEmail,
            managerId: details.managerId,
            teammateId: details.teammateId,
            type: 'CORRECTION_ADDED',
            correction: com.correction,
        })
}
export async function addNewClient(
    timeStamp,
    companyId,
    clientName,
    managerId,
    managerName,
    companyName,
) {
    const docRef = await addDoc(collection(firestoreDB, 'clients'), {
        isActive: true,
        createdBy: managerId,
        createdAt: timeStamp,
        companyId: companyId,
        clientName: clientName,
        managerId: managerId,
        managerName: managerName,
        companyName: companyName,
    })
    await updateDoc(doc(firestoreDB, 'clients', `${docRef.id}`), {
        clientId: docRef.id,
    })
}

export async function approveTeammateAttendance(attendanceMarkedDate, managerId, teammateId) {
    const q = query(
        collection(firestoreDB, 'attendance'),
        where('attendanceMarkedDate', '==', attendanceMarkedDate),
        where('managerId', '==', managerId),
        where('teammateId', '==', teammateId),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docA) => {
        const attendanceRef = doc(firestoreDB, 'attendance', docA.id)
        updateDoc(attendanceRef, {
            isApproved: true,
        })
    })
}