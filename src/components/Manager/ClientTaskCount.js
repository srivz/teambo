import { ref, update } from "firebase/database";
import { db } from "../../firebase-config";

export default function clientTaskAdd(managerId, clientIndex, taskCount, totalTaskCount) {
    update(ref(db, `/manager/${managerId}/clients/${clientIndex}/`), { taskCount: taskCount + 1, totalTaskCount: totalTaskCount + 1 })
}
export function clientTaskDelete(managerId, clientIndex, taskCount, manHour) {
    update(ref(db, `/manager/${managerId}/clients/${clientIndex}/`), { taskCount: taskCount - 1, manHours: manHour })
}
export function clientTaskComplete(managerId, clientIndex, taskCount) {
    update(ref(db, `/manager/${managerId}/clients/${clientIndex}/`), { taskCount: taskCount - 1 })
}
