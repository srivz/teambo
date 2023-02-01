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


export async function sendRequestTeammateEmail(teammateEmail, manager) {
    const subject = `
                  <h4>${manager.managerName} requests you to join his team. Login to your <a href="www.teambo.app">Teambo</a> account to reply to his request.</h4>
                  <br />
                  <p>Thank you</p>
                `
    const heading = "Teammate Request"
    const text = `${manager.managerName} requests you to join his team.Login to your Teambo account to reply to his request.`
    try {
        const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
            heading, fromEmail: manager.managerEmail, toEmail: teammateEmail, subject: subject, text: text
        });
        if (res.status === 200) {
        }
        else {
            alert("Something went wrong");
        }
    } catch (err) {
        alert("error")
    }
}
export async function sendNewTaskEmail(teammateEmail, manager, newTask) {
    const subject = `
                  <h4> New Task ${newTask.task} from client ${newTask.client} has been Assigned to you By manager ${manager.managerName}</h4>
                  <br />
                  <p>Thank you</p>
                `
    const heading = "Task Assigned"
    const text = `New Task ${newTask.task} has been Assigned to you By manager ${manager.managerName}`
    try {
        const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
            heading, fromEmail: manager.managerEmail, toEmail: teammateEmail, subject: subject, text: text
        });
        if (res.status === 200) {
        }
        else {
            alert("Something went wrong");
        }

    } catch (err) {
        alert("error")

    }
}


