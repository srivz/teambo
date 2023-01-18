import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useState } from 'react'
import { Col, Nav, Tab, Row } from 'react-bootstrap'
import { auth, db } from '../../firebase-config'
import Loader from '../Loader/Loader'
import NavBar from '../Navs/NavBar'
import AnalyticsClientTable from './AnalyticsClientTable'
import AnalyticsCompanyTable from './AnalyticsCompanyTable'
import AnalyticsEmployeeTable from './AnalyticsEmployeeTable'

export default function Analytics() {
    const [manager, setManager] = useState({})
    const [once, setOnce] = useState(true)
    const [loading, setLoading] = useState(true)
    const [key, setKey] = useState("Company");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (once) {
                setLoading(true)
                onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
                    if (snapshot.exists()) {
                        let data = snapshot.val()
                        setManager(data)
                    } else {
                        console.log('No data available')
                    }
                    setLoading(false)
                })
                setOnce(false)
            }
        } else {
            window.location.href = '/'
        }
    })
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                    <div className='main'>
                    <NavBar
                        user="MANAGER"
                        user2="ANALYTICS"
                        name={manager.name}
                        role={manager.designation}
                        />
                        <br />
                        <br />
                        <div>
                            <h4 style={{ color: "#3975e9", margin: "0px 107px", marginBottom: "1em" }}>
                                <a href="/manager/home/list">
                                    <FontAwesomeIcon style={{ marginRight: ".5em" }} icon="fa-regular fa-circle-left" />
                                </a>{" "}Analytics
                            </h4>
                        <Tab.Container id="left-tabs-example" onSelect={key => setKey(key)} activeKey={key}>
                            <Row>
                                <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="Company" style={key === "Company" ? { width: "8rem", margin: "0px 107px", color: "white", backgroundColor: "#3975e9", marginBottom: "1em" } : { width: "8rem", margin: "0px 107px", color: "black", backgroundColor: "#f1f4fb", marginBottom: "1em" }}>Company</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Client" style={key === "Client" ? { width: "8rem", margin: "0px 107px", color: "white", backgroundColor: "#3975e9", marginBottom: "1em" } : { width: "8rem", margin: "0px 107px", color: "black", backgroundColor: "#f1f4fb", marginBottom: "1em" }}>Client</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Employee" style={key === "Employee" ? { width: "8rem", margin: "0px 107px", color: "white", backgroundColor: "#3975e9", marginBottom: "1em" } : { width: "8rem", margin: "0px 107px", color: "black", backgroundColor: "#f1f4fb", marginBottom: "1em" }}>Employee</Nav.Link>
                                        </Nav.Item>
                                        </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Company">
                                            <AnalyticsCompanyTable manager={manager} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Client">
                                            <AnalyticsClientTable manager={manager} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Employee">
                                            <AnalyticsEmployeeTable manager={manager} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                            </Tab.Container>
                        </div>
                    </div>
            )}
        </>
    )
}
