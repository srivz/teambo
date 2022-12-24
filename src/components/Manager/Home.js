import React, { useState } from "react";
import { database } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { ref, set } from "firebase/database";

export default function Home() {
  const [view, setView] = useState(true);
  function handleChange(newValue) {
    setView(newValue);
  }

  function writeUserData(client, taskTitle, description) {
    var today = new Date();
    set(ref(database, "teambo/companyName1/teammate/emailid1/tasks/1"), {
      client: client,
      taskTitle: taskTitle,
      description: description,
      updates: {
        // updateDoc(doc(database, "employees", info.adhaarCardNumber), {  companies: arrayUnion(info.companyId),})
        0: {
          date:
            String(today.getDate()).padStart(2, "0") +
            "/" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "/" +
            today.getFullYear(),
          time:
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds(),
          corrections: "0",
          status: "Assigned",
        },
      },
    });
  }
  return (
    <div>
      <NavBar
        user="MANAGER"
        name="Pavithra"
        role="Manager"
      />
      {view ? (
        <HomeList
          viewType={view}
          onChange={handleChange}
          addTask={writeUserData}
        />
      ) : (
        <HomeBlock
          viewType={view}
          onChange={handleChange}
          addTask={writeUserData}
        />
      )}
    </div>
  );
}
