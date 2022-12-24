import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [view, setView] = useState(true);
  const [manager, setManager] = useState({});
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onValue(ref(db, "/" + user.displayName + "/" + user.uid), (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setManager(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    } else {
      window.location.href = "/";
    }
  });
  function handleChange(newValue) {
    setView(newValue);
  }
  function writeUserData(client, taskTitle, description) {
    //   var today = new Date();
    //   set(ref(db, "/teammate/id/tasks/1/"), {
    //     client: client,
    //     taskTitle: taskTitle,
    //     description: description,
    //     updates: {
    //       0: {
    //         date:
    //           String(today.getDate()).padStart(2, "0") +
    //           "/" +
    //           String(today.getMonth() + 1).padStart(2, "0") +
    //           "/" +
    //           today.getFullYear(),
    //         time:
    //           today.getHours() +
    //           ":" +
    //           today.getMinutes() +
    //           ":" +
    //           today.getSeconds(),
    //         corrections: "0",
    //         status: "Assigned",
    //       },
    //     },
    //   });
  }
  return (
    <div>
      <NavBar
        user="MANAGER"
        name={manager.name}
        role={manager.designation}
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
