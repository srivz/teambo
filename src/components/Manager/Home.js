import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";
import { onValue, ref, remove,  update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../Loader/Loader";

export default function Home() {
  const [view, setView] = useState(true);
  const [manager, setManager] = useState({});
  const [once, setOnce] = useState(true);
  const [loading, setLoading] = useState(false);
  const [once1, setOnce1] = useState(true);
  const [managerId, setManagerId] = useState("");
  const [managerName, setManagerName] = useState("");
  const [teamRequest, setTeamRequest] = useState([]);
  const [teammateList, setTeammateList] = useState([]);
  const [teammateSet, setTeammateSet] = useState([]);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {

        setLoading(true);
        onValue(ref(db, `manager/${user.uid}`), (snapshot) => {

          if (snapshot.exists()) {
            let data = snapshot.val();
            setManager(data);
            setManagerId(user.uid);

            setManagerName(user.displayName);
            setTeammateSet(data.teammates);
            if (data.teammates !== undefined) {
              getTeammates(data.teammates);
            }

          } else {

            console.log("No data available");
            setLoading(false);
          }
        });

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
            console.log("No data available");
            setLoading(false);
          }
        });
      });
    setLoading(false);
    setOnce1(false);
  };
  const getTeammatesWithMail = (teammate) => {
    onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTeamRequest(data.requests);
        return true;
      } else {
        alert("User not available");
            setLoading(false);
      }
    });
  };
  const addNewTeammate = (teammateEmail) => {
    setLoading(true);
    if (teammateEmail === "") {
      alert("Enter email first");
      setLoading(false)
      return;
    }
    let id = teammateEmail.split(".");
    let newId = id.join("_");

    getTeammatesWithMail(newId);
    if (teammateSet === undefined) {
      if (teamRequest === undefined) {
        let newArr = [{ managerId, managerName }];
        update(ref(db, `teammate/${newId}/`), { requests: newArr });
        setLoading(false);
      } else {
        let newArr = [];
        let exists = false;
        teamRequest.forEach((element) => {
          if (element.managerId === managerId) {
            exists = true;
          }
          newArr.push(element);
        });
        if (exists) {
          alert("Already requested !");
          setLoading(false);
        } else {
          let newArr2 = [...newArr, { managerId, managerName }];
          update(ref(db, `teammate/${newId}/`), { requests: newArr2 });
            setLoading(false);
        }
      }

    } else {
      let newArr = [];
      teammateSet.forEach((element) => {
        newArr.push(element);
      });

      let exist = newArr.includes(newId);
      if (exist) {
        alert("Already a Teammate !");
        setLoading(false);
      } else {
        if (teamRequest === undefined) {
          let newArr = [{ managerId, managerName }];
          update(ref(db, `teammate/${newId}/`), { requests: newArr });
          setLoading(false);
        } else {
          let newArr = [];
          let exists = false;
          teamRequest.forEach((element) => {
            if (element.managerId === managerId) {
              exists = true;
            }
            newArr.push(element);
          });
          if (exists) {
            alert("Already requested !");
            setLoading(false);
          } else {
            let newArr2 = [...newArr, { managerId, managerName }];
            update(ref(db, `teammate/${newId}/`), { requests: newArr2 });
            setLoading(false);
          }
        }
      }
    }
            setLoading(false);

    window.location.reload();
  };


  function handleChange(newValue) {
    setView(newValue);
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
              deleteTask={deleteCurrentTask}
              addTeammate={addNewTeammate}
            />
          ) : (
            <HomeBlock
              viewType={view}
              team={teammateList}
              onChange={handleChange}
            />
          )}
        </div>
      )}
    </>
  );
}