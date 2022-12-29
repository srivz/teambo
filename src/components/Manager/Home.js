import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { onValue, ref, remove, set, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../Loader/Loader";

export default function Home() {
  const [view, setView] = useState(true);
  const [manager, setManager] = useState({});
  const [once, setOnce] = useState(true);
  const [loading, setLoading] = useState(false);
  const [once1, setOnce1] = useState(true);
  const [managerId, setManagerId] = useState("");
  const [teammateList, setTeammateList] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true);
        let userSet = onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            setManager(data);
            setManagerId(user.uid);
          } else {
            setLoading(false);
            console.log("No data available");
          }
        });
        if (userSet) getTeammates(manager.teammates);

        setLoading(false);
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
            setLoading(false);
            console.log("No data available");
          }
        });
      });
    setLoading(false);
    setOnce1(false);
  };

  const addNewTeammate = (teammateEmail) => {
        setLoading(true);
    if (teammateEmail === "") {
      alert("Enter email first");
      return;
    }
    let id = teammateEmail.split(".");
    let newId = id.join("_");
    if (teammateList.data.requests === undefined) {
      let newArr = [managerId];
      update(ref(db, `teammate/${newId}/requests`), newArr);
    } else {
      let newArr = [];
      teammateList.data.requests.forEach((element) => {
        newArr.push(element);
      });
      let newArr2 = [...newArr, managerId];
      update(ref(db, `teammate/${newId}/requests`), newArr2);
    }
        setLoading(false);
    window.location.reload();
  };

  function handleChange(newValue) {
    setView(newValue);
  }

  function writeUserData(newTask, teammateId, index) {
        setLoading(true);
    set(ref(db, `/teammate/${teammateId}/tasks/${index}/`), newTask)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCurrentTask(teammateId, index) {
        setLoading(true);
    remove(ref(db, `/teammate/${teammateId}/tasks/${index}/`))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              addTeammate={addNewTeammate}
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
      )}
    </>
  );
}
