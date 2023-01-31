import React, { useEffect, useState, useRef } from 'react'
import logo from '../../assets/images/Group 3.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Login.css'
import { auth } from '../../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Loader from '../Loader/Loader'
import { Row, Dropdown } from 'react-bootstrap'
import writeCompany, { addNewManager, addNewTeammate, writeDesignation } from '../../database/write/signUpWriteFunctions'
import readCompanies from '../../database/read/signUpReadFunctions'

export default function Signup({ userid }) {
  const [newCompany, setNewCompany] = useState('')
  const [newDesignation, setNewDesignation] = useState('')
  const [designationNameList, setDesignationNameList] = useState([])
  const [companyNameList, setCompanyNameList] = useState([])
  const [isHide, setIsHide] = useState(false)
  const [isHide2, setIsHide2] = useState(false)
  const passwordRef = useRef()
  const passwordRef2 = useRef()
  const [prevCompanies, setPrevCompanies] = useState([])
  const [prevDesignations, setPrevDesignations] = useState([])
  const [loading, setLoading] = useState(false)

  const searchCompany = (e) => {
    setNewCompany(e.target.value)
    const newFilter = prevCompanies.filter((val) => {
      return val.toLowerCase().includes(e.target.value.toLowerCase())
    })
    if (e.target.value === '') {
      setCompanyNameList(prevCompanies)
    } else {
      setCompanyNameList(newFilter)
    }
  }
  const searchDesignation = (e) => {
    setNewDesignation(e.target.value)
    const newFilter = prevDesignations.filter((val) => {
      return val.toLowerCase().includes(e.target.value.toLowerCase())
    })
    if (e.target.value === '') {
      setDesignationNameList(prevDesignations)
    } else {
      setDesignationNameList(newFilter)
    }
  }

  async function fetchData() {
    try {
      const data = await readCompanies();
      setPrevCompanies(data)
      if (user.companyId !== '') {
        data.filter((info) => { return (info.id === user.companyId) }).map((info) => { return (setPrevDesignations(info.data.designations)) })
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData1();

    async function fetchData1() {
      try {
        const data = await readCompanies();
        setPrevCompanies(data)
      } catch (error) {
        console.error(error);
      }
    }
  }, [])

  const addCompany = () => {
    if (newCompany !== '')
    {
      writeCompany(newCompany)
      fetchData()
      setNewCompany('')
    }
  }

  const addDesignation = () => {
    if (newDesignation !== '') {
      writeDesignation(user.companyId, newDesignation)
      fetchData()
      setNewDesignation('')
      }
  }

  const [user, setUser] = useState({
    name: '',
    companyName: '',
    designation: '',
    whatsAppNo: '',
    companyId: ''
  })
  const [userLog, setUserLog] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setUser({ ...user, ...newInput })
  }
  const handleChangeLog = (event) => {
    let newInput1 = { [event.target.name]: event.target.value }
    setUserLog({ ...userLog, ...newInput1 })
  }
  const registerUser = async (docId) => {
    if (user.designation === 'Manager') {
      addNewManager(docId, user.name, user.companyName, user.companyId, user.designation, userLog.email, user.whatsAppNo).then(() => (window.location.href = '/signUp/response'))
    } else {
      addNewTeammate(docId, user.name, user.companyName, user.companyId, user.designation, userLog.email, user.whatsAppNo).then(() => (window.location.href = '/signUp/response'))

    }
  }

  const registerLogin = () => {
    createUserWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((cred) => {
        updateProfile(auth.currentUser, {
          photoURL: user.designation === 'Manager' ? 'Manager' : 'Teammate',
          displayName: user.name,
        })
        registerUser(cred.user.uid)
      })
      .catch((err) => {
        setLoading(false)
        alert(err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      user.name==="" || user.companyName==="" || user.designation===""
    ) {
      alert('Fill the fields')
    }
    else if (userLog.password.length < 6) {
      alert('Password should be atleast 6 characters!!!')
    } else {
      if (userLog.password === userLog.confirmPassword) {
        setLoading(true)
        localStorage.setItem('currentUser', JSON.stringify(user.name))
        registerLogin()
      } else {
        alert('Passwords does not match!!')
      }
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-container2">
          <div className="form-box1">
            <div className="img text-center">
                <img className="w-50" src={logo} alt="" />
            </div>
              <h4 className="mt-4 text-center mb-4 signup-para">
                Sign up a new Teambo account!
              </h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4 ">
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                    <label htmlFor="name">Name</label>
                    <input
                      className="form-control rounded-3"
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Name"
                      onChange={handleChange}
                    />
                  </div>
                    <div className="col-sm-4 col-md-4">
                      <label htmlFor="email">Email</label>
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChangeLog}
                      />
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <label htmlFor="What's app no">What's app no</label>
                      <input
                        className="form-control"
                        name="whatsAppNo"
                        id="What's app no"
                        type="text"
                        placeholder="What's app no"
                        onChange={handleChange}
                      />
                    </div>
                </div>
              </div>
              <div className="form-group mb-4">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <label htmlFor="pwd">Company Name</label>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="w-100  company-dropdown"
                        >
                          {user.companyName === ''
                            ? 'Select Company '
                            : user.companyName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="company-dropdown-menu">
                          <div className="add-new-company-input">
                            <input
                              type="text"
                              name="newCompany"
                              placeholder="Search Company"
                              value={newCompany}
                              onChange={searchCompany}
                            />
                          </div>
                          <div className=" company-dropdown-menu-list company-dropdown-menu-height">
                            <Row className="company-dropdown-menu-height">
                              {companyNameList.length === 0 && newCompany === '' ?
                                prevCompanies.map((company, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setUser((old) => {
                                          return {
                                            ...old,
                                            companyName: '' + company.data.companyName, companyId: company.id
                                          }
                                        });
                                        setPrevDesignations(company.data.designations);
                                      }}
                                    >
                                      {company.data.companyName}
                                    </Dropdown.Item>
                                  )
                                }) : companyNameList.map((company, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setUser((old) => {
                                          return {
                                            ...old,
                                            companyName: '' + company.data.companyName, companyId: company.id
                                          }
                                        });
                                        setPrevDesignations(company.data.designations);
                                      }}
                                    >
                                      {company.data.companyName}
                                    </Dropdown.Item>
                                  )
                                })}
                            </Row>
                          </div>
                          <div className="add-new-input">
                            <button
                              type="button"
                              onClick={addCompany}
                              className="w-100"
                            >
                              Add Company
                            </button>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <label htmlFor="pwd">Password:</label>
                      <div className="password-div">
                        <input
                          type="password"
                          id="pwd"
                          placeholder="Password"
                          name="password"
                          ref={passwordRef}
                          onChange={handleChangeLog}
                        />
                        {isHide ? (
                          <FontAwesomeIcon
                            icon="fa-solid fa-eye"
                            style={{
                              paddingRight: '.4em',
                              fontSize: '20px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              passwordRef.current.type = 'password'
                              setIsHide(false)
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon="fa-solid fa-eye-slash"
                              style={{
                                paddingRight: '.4em',
                                fontSize: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                passwordRef.current.type = 'text'
                                setIsHide(true);
                              }}
                            />
                        )}
                      </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                      <label htmlFor="pwd">Designation</label>
                      {userid === "teammate" ?
                        <Dropdown
                        drop={"up"}>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="w-100  company-dropdown"
                        >
                          {user.designation === ''
                            ? 'Select Designation '
                            : user.designation}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="company-dropdown-menu">

                            <div className="add-new-company-input">
                            <input
                              type="text"
                              name="newDesignation"
                              placeholder="Search Designation"
                              value={newDesignation}
                              onChange={searchDesignation}
                            />
                          </div>
                          <div className=" company-dropdown-menu-list company-dropdown-menu-height">
                            <Row className="company-dropdown-menu-height">

                              {designationNameList.length === 0 && newDesignation === ''
                                ? prevDesignations?.map((designation, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setUser((old) => {
                                          return {
                                            ...old,
                                            designation: '' + designation,
                                          }
                                        })
                                      }}
                                    >
                                      {designation}
                                    </Dropdown.Item>
                                  )
                                })
                                : designationNameList.map((designation, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setUser((old) => {
                                          return {
                                            ...old,
                                            designation: '' + designation,
                                          }
                                        })
                                      }}
                                    >
                                      {designation}
                                    </Dropdown.Item>
                                  )
                                })}

                            </Row>
                          </div>
                          <div className="add-new-input">
                            <button
                              type="button"
                              onClick={addDesignation}
                              className="w-100"
                            >
                              Add Designation
                            </button>
                            </div>
                        </Dropdown.Menu>
                        </Dropdown> :
                        <Dropdown
                          drop={"down"}>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="w-100  company-dropdown"
                          >
                            {user.designation === ''
                              ? 'Select Designation '
                              : user.designation}
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="company-dropdown-menu"><Dropdown.Item
                            onClick={(e) => {
                              setUser((old) => {
                                return {
                                  ...old,
                                  designation: 'Manager',
                                }
                              })
                            }}
                          >
                            Manager
                          </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      }
                  </div>
                  <div className="col-sm-6 col-md-6">
                      <label htmlFor="pwd">Re-enter Password:</label>
                      <div className="password-div">
                      <input
                          type="password"
                          id="pwd"
                          placeholder="Re-enter Password"
                          name="confirmPassword"
                          ref={passwordRef2}
                          onChange={handleChangeLog}
                        />
                        {isHide2 ? (
                          <FontAwesomeIcon
                            icon="fa-solid fa-eye"
                            style={{
                              paddingRight: '.4em',
                              fontSize: '20px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              passwordRef2.current.type = 'password'
                              setIsHide2(false)
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon="fa-solid fa-eye-slash"
                              style={{
                                paddingRight: '.4em',
                                fontSize: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                passwordRef2.current.type = 'text'
                                setIsHide2(true)
                              }}
                            />
                        )}
                      </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                  className="btn btn-primary bg-blue w-100 rounded-4 mt-4"
                >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
