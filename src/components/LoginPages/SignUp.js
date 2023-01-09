import React, { useEffect, useState, useRef } from 'react'
import logo from '../../assets/images/Group 3.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Login.css'
import { auth, db } from '../../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { onValue, ref, set } from 'firebase/database'
import Loader from '../Loader/Loader'
import Dropdown from 'react-bootstrap/Dropdown'
import { Row } from 'react-bootstrap'

export default function Signup({ userid }) {
  const [newCompany, setNewCompany] = useState('')
  const [companyNameList, setCompanyNameList] = useState([])
  const [isHide, setIsHide] = useState(false)
  const [isHide2, setIsHide2] = useState(false)
  const passwordRef = useRef()
  const passwordRef2 = useRef()
  const [prevCompanies, setPrevCompanies] = useState([])
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
  useEffect(() => {
    onValue(ref(db, `company/`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setPrevCompanies(data)
      } else {
        console.log('No data available')
        setLoading(false)
      }
    })
  }, [])
  const addCompany = () => {
    if (newCompany !== '')
      if (prevCompanies) {
        const companies = [...prevCompanies, newCompany]
        set(ref(db, `company/`), companies)
        setNewCompany('')
      } else {
        const companies = [newCompany]
        set(ref(db, `company/`), companies)
        alert(companies)
        setNewCompany('')
      }
  }
  const [user, setUser] = useState({
    name: '',
    companyName: '',
    designation: '',
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
  const registerUser = async (currentUser) => {
    if (user.designation === 'Manager') {
      set(ref(db, '/manager/' + currentUser.uid), {
        company: user.companyName,
        designation: user.designation,
        name: user.name,
        email: userLog.email,
        teammates: [],
        clients: [],
      }).then(() => (window.location.href = '/signUp/response'))
    } else {
      await set(
        ref(db, '/teammate/' + currentUser.email.split('.').join('_')),
        {
          teammateId: currentUser.email.split('.').join('_'),
          company: user.companyName,
          designation: user.designation,
          name: user.name,
          email: userLog.email,
        },
      ).then(() => (window.location.href = '/signUp/response'))
    }
  }

  const registerLogin = () => {
    createUserWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((cred) => {
        updateProfile(auth.currentUser, {
          photoURL: user.designation === 'Manager' ? 'Manager' : 'Teammate',
          displayName: user.name,
        })
        registerUser(auth.currentUser)
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
                  <div className="col-sm-6 col-md-6">
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
                  <div className="col-sm-6 col-md-6">
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
                              {companyNameList.length === 0 && newCompany === ''
                                ? prevCompanies?.map((company, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setUser((old) => {
                                          return {
                                            ...old,
                                            companyName: '' + company,
                                          }
                                        })
                                      }}
                                    >
                                      {company}
                                    </Dropdown.Item>
                                )
                              })
                                : companyNameList.map((company, index) => {
                                  return (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e) => {
                                        setNewCompany((old) => {
                                          return {
                                            ...old,
                                            companyName: '' + company,
                                          }
                                        })
                                      }}
                                    >
                                      {company}
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
                                setIsHide(true)
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
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="designation"
                        onChange={handleChange}
                      >
                      <option
                          selected={userid === 'teammate' ? true : false}
                          hidden
                        >
                        Select Designation
                      </option>
                        {userid === 'teammate' ? (
                          <>
                            <option value="Developer">Developer</option>
                            <option value="Digital Artist">Digital Artist</option>
                            <option value="Designer">Designer</option>
                            <option value="Editor">Editor</option>
                            <option value="Content writter">
                              Content writter
                            </option>
                            <option value="Client Manager">Client Manager</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Animator">Animator</option>
                          </>
                        ) : (
                          <option
                            value="Manager"
                          >
                            Manager
                          </option>
                        )}
                    </select>
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
