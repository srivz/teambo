import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref, remove, update } from 'firebase/database'
import React, { useState } from 'react'
import { Badge, Button, Col, Offcanvas, Overlay, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { db } from '../../firebase-config'

export default function Notifications({ teammate, id }) {
    const [once2, setOnce2] = useState(true)


    const acceptChange = (managerId, managerTeam) => {
        if (managerTeam === undefined) {
            update(ref(db, `manager/${managerId}/`), { teammates: [id] })
            remove(ref(db, `teammate/${id}/notifications/0`))
        } else {
            let newArr = []
            let exists = false
            managerTeam.forEach((element) => {
                if (element === id) {
                    exists = true
                }
                newArr.push(element)
            })
            if (exists) {
            } else {
                let newArr2 = [...newArr, id]
                update(ref(db, `manager/${managerId}/`), { teammates: newArr2 })
                remove(ref(db, `teammate/${id}/notifications/0`))
            }
        }
    }
    const accept = (managerId) => {
        if (once2) {
            onValue(ref(db, `manager/${managerId}`), (snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    acceptChange(managerId, data.teammates)
                } else {
                    alert('No manager found')
                }
            })
            setOnce2(false)
        }
    }

    const reject = (index) => {
        remove(ref(db, `teammate/${id}/notifications/${index}`))
    }

    return (
        <>
            <OverlayTrigger
                trigger="click"
                key={"bottom"}
                placement={"bottom"}
                rootClose
                overlay={
                    <div className='bg-white'
                        style={{
                            padding: "1em",
                            marginTop: "10px",
                            marginLeft: "-50px",
                            width: "400px",
                            boxShadow: "rgba(0, 0, 0, 0.15) 1px 3px 5px",
                        }}>
                        {!teammate?.notifications ? (
                            <Row
                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                    margin: '.5em',
                                    color: 'black',
                                    padding: '1em',
                                    fontFamily: 'rockwen',
                                    border: '2px black',
                                }}
                                align="center"
                            >
                                No Notifications Available
                            </Row>
                        ) : (
                                teammate?.notifications?.map((info, index) => {
                                    return (
                                        <>
                                            <Row
                                                style={{
                                                    boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                                    margin: '.5em',
                                                    color: 'black',
                                                    padding: '1em',
                                                    fontFamily: 'rockwen',
                                                    border: '2px black',
                                                }}
                                                key={index}
                                            >
                                                <Col md={8} sm={8}>
                                                    {info.managerName}
                                                </Col>
                                                <Col md={2} sm={2}>
                                                    <Badge
                                                        as="button"
                                                        onClick={() => {
                                                            reject(index)
                                                        }}
                                                        style={{
                                                            padding: '.5em',
                                                            color: 'black',
                                                            fontFamily: 'rockwen',
                                                            fontWeight: 'bold',
                                                            borderRadius: '25px',
                                                        }}
                                                        bg="light"
                                                    ><FontAwesomeIcon
                                                            className="pointer"
                                                            size="xl"
                                                            icon="fa-solid fa-circle-xmark" />
                                                    </Badge>
                                                </Col>
                                                <Col md={2} sm={2}>
                                                    <Badge
                                                        as="button"
                                                        onClick={() => {
                                                            accept(info.managerId)
                                                        }}
                                                        style={{
                                                            padding: '.5em',
                                                            color: 'black',
                                                            fontFamily: 'rockwen',
                                                            fontWeight: 'bold',
                                                            borderRadius: '25px',
                                                        }}
                                                        bg="light"
                                                    ><FontAwesomeIcon
                                                            className="pointer"
                                                            size="xl"
                                                            icon="fa-solid fa-circle-check"
                                                        />
                                                    </Badge>
                                                </Col>
                                            </Row>
                                            <br />
                                        </>
                                    )
                                })
                        )}</div>
                }
            ><Button
                variant='light'
                className='box-shadow'
                style={!teammate.notifications ? {
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    padding: "10px",
                    borderRadius: '15px',
                    marginRight: '1em',
                } : {
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    padding: "10px",
                    borderRadius: '15px',
                    marginRight: '1em',
                    paddingLeft: "1.2em"
                    }}>
                    <FontAwesomeIcon
                        className="pointer"
                        size="xl" icon="fa-regular fa-bell" />
                    {!teammate.notifications ? (<></>) : (<div class='notification-dot'></div>)}
                </Button>
            </OverlayTrigger>
        </>
    )
}
