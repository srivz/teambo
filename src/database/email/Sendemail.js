import axios from "axios";

export default async function sendEmail(teammate, manager, index) {

    const subject = `
    <h4> Your Task ${teammate.tasks[index].task} has been Approved By manger ${manager.name}</h4>
    <br />
    <p>Thank you</p>
   `
    const heading = "Task Approved"
    const text = `Your Task ${teammate.tasks[index].task} has been Approved By manger ${manager.name}`
    try {
        const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
            heading, fromEmail: manager.email, toEmail: teammate.email, subject: subject, name: teammate.name, text: text, whatsAppNo: teammate?.whatsAppNo
        });
        if (res.status === 200) {
            return true;
            // const newLiveTaskCount = props?.manager.teammates[id].data.liveTasks - 1
            // clientTaskComplete(props?.managerId, teammate.tasks[index].clientIndex, props?.manager?.clients[teammate.tasks[index].clientIndex].taskCount)
            // update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/tasks/${index}/updates/${latest}`), { status: "Completed" })
            // update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data`), { liveTasks: newLiveTaskCount })
        }
        else {
            return false
            // alert("Something went wrong");
        }
    } catch (err) {
        return false;
        // alert("error")
        // console.log(err)
    }
}