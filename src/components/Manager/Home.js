import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { onValue, ref, remove, set, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [view, setView] = useState(true);
  const [manager, setManager] = useState({});
  const [once, setOnce] = useState(true);
  const [once1, setOnce1] = useState(true);
  const [teammateList, setTeammateList] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        let userSet = onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            setManager(data);
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
    if (once1)
      teamList.forEach((teammate) => {
        onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setTeammateList((teammateList) => [
              ...teammateList,
              { data, teammate },
            ]);
          } else {
            console.log("No data available");
          }
        });
      });
    setOnce1(false);
  };
  function handleChange(newValue) {
    setView(newValue);
  }
  function writeUserData(newTask, teammateId, index) {
    set(ref(db, `/teammate/${teammateId}/tasks/${index}/`), newTask)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteCurrentTask(teammateId, index) {
    remove(ref(db, `/teammate/${teammateId}/tasks/${index}/`))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function downCurrentTask(teammateId, index) {
    update(
      ref(db, `/teammate/${teammateId}/tasks/${index}/priority`),
      index - 1
    )
      .then(() => {
        update(
          ref(db, `/teammate/${teammateId}/tasks/${index - 1}/priority`),
          index + 1
        )
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function upCurrentTask(teammateId, index) {
    set(ref(db, `/teammate/${teammateId}/tasks/${index}/priority`), index + 1)
      .then(() => {
        update(ref(db, `/teammate/${teammateId}/tasks/${index + 1}/`), {
          priority: index - 1,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
          team={teammateList}
          onChange={handleChange}
          addTask={writeUserData}
          deleteTask={deleteCurrentTask}
          DownTask={downCurrentTask}
          UpTask={upCurrentTask}
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
