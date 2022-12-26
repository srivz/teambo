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
  const [once, setOnce] = useState(true);
  const [teammateList, setTeammateList] = useState([{}]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        const userSet = onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          console.log(snapshot.exists());
          if (snapshot.exists()) {
            setManager(snapshot.val());
          } else {
            console.log("No data available");
          }
        });
        if (userSet) getTeammates(manager.teammates);
        setOnce(false);
      }
    } else {
      window.location.href = "/";
    }
  });

  const getTeammates = (teamList) => {
    teamList.forEach((teammate) => {
      console.log("asasdasdasda " + teammate);
      onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTeammateList((teammateList) => [...teammateList, data], teammate);
        } else {
          console.log("No data available");
        }
      });
    });
  };

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
      {console.log(teammateList)}
      {view ? (
        <HomeList
          viewType={view}
          team={teammateList}
          onChange={handleChange}
          addTask={writeUserData}
        />
      ) : (
        <HomeBlock
          viewType={view}
          team={teammateList}
          onChange={handleChange}
          addTask={writeUserData}
        />
      )}
    </div>
  );
}
