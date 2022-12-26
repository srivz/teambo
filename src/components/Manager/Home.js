import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { child, get, onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [view, setView] = useState(true);
  const [once, setOnce] = useState(true);
  const [manager, setManager] = useState({});
  const [teammateList, setTeammateList] = useState([{}]);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (user.uid && once) {
        setOnce(false);
        await onValue(
          ref(db, `manager/${user.uid}`),
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setManager(data);
              console.log(manager);
              getTeammates(data.teammates);
            } else {
              console.log("No data available");
            }
          },
          { onlyOnce: true }
        );
      }
    } else {
      window.location.href = "/";
    }
  });

  function getTeammates(teamList) {
    teamList.forEach((teammate) => {
      onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
        if (snapshot.exists()) {
          setTeammateList(
            (teammateList) => [...teammateList, snapshot.val()],
            teammate
          );
        } else {
          console.log("No data available");
        }
      });
    });
  }

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
      {/* {console.log(teammateList)} */}
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
