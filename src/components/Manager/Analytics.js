import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
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
                <div>
                    <NavBar
                        user="MANAGER"
                        user2="ANALYTICS"
                        name={manager.name}
                        role={manager.designation}
                        />
                        <br />
                        <br />
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="Company" style={{ width: "7rem", margin: "0px 107px", color: "black" }}>Company</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Client" style={{ width: "7rem", margin: "0px 107px", color: "black" }}>Client</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Employee" style={{ width: "7rem", margin: "0px 107px", color: "black" }}>Employee</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Company">
                                            <AnalyticsCompanyTable />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Client">
                                            <AnalyticsClientTable />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Employee">
                                            <AnalyticsEmployeeTable />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                </div>
            )}
        </>
    )
}
