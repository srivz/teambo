import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref, remove, set } from 'firebase/database'
import React, { useState } from 'react'
import {
    Badge,
    Button,
    Col,
    OverlayTrigger,
    Row,
} from 'react-bootstrap'
import { db } from '../../firebase-config'

export default function Notifications(props) {
    const [once2, setOnce2] = useState(true)
    const [show, setShow] = useState(true)

    const acceptChange = (managerId, managerTeam, newTeammate) => {
        if (managerTeam === undefined) {
            set(ref(db, `teammate/${props?.id}/link/`), { index: 0, managerId: managerId })
            set(ref(db, `manager/${managerId}/teammates/`), [{
                data: { ...newTeammate, manHours: 0, totalNumberOfTasks: 0, liveTasks: 0 }, teammateId: props?.id, teammateIndex: 0
            }])
            remove(ref(db, `manager/${managerId}/teammates/0/data/notifications/`))

        } else {
            let newArr = []
            let exists = false
            managerTeam.forEach((element) => {
                if (element.teammateId === props?.id) {
                    exists = true
                }
                newArr.push(element)
            })
            if (exists) {
            } else {
                set(ref(db, `teammate/${props?.id}/link/`), { index: newArr.length, managerId: managerId })
                let newArr2 = [...newArr, { data: { ...newTeammate, manHours: 0, totalNumberOfTasks: 0, liveTasks: 0 }, teammateId: props?.id, teammateIndex: newArr.length }]
                set(ref(db, `manager/${managerId}/teammates/`), newArr2).then(() => {
                    remove(ref(db, `manager/${managerId}/teammates/${newArr.length}/data/notifications/`))
                })

            }
        }
    }
    const accept = (managerId) => {
        if (once2) {
            onValue(ref(db, `manager/${managerId}`), (snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    acceptChange(managerId, data.teammates, props?.teammate);
                    remove(ref(db, `teammate/${props?.id}/notifications`));
                    setShow(false);
                    props.otherNotifications = "";
                } else {
                    alert('No manager found')
                }
            })
            setOnce2(false)
        }
    }
    const clearAllNotifications = () => {
        remove(ref(db, `manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/notifications/`)).then(() => { setShow(false); })
    }
    const reject = (index) => {
        remove(ref(db, `teammate/${props?.id}/notifications/requests/${index}`)).then(() => { setShow(false); })
    }
    return (
        <>
            <OverlayTrigger
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                rootClose
                overlay={
                    show ?
                    <div
                        className="bg-white"
                        style={{
                            padding: '1em',
                            marginTop: '2px',
                            marginLeft: '-50px',
                            width: '300px',
                            boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                        }}
                        >
                            {!props?.teammate.notifications ? (
                                <Col className='text-end'>
                                    <span className='pointer' style={{ color: "#9b9b9b", fontSize: "small" }}>
                                        <FontAwesomeIcon size={"xs"} icon="fa-solprops?.id fa-x" /> Clear
                                    </span>
                                </Col>
                            ) : (
                                <Row>
                                    <Col className='text-end'>
                                        <span className='pointer' style={{ color: "#9b9b9b", fontSize: "small" }}
                                            onClick={() => { clearAllNotifications(); }}>
                                            <FontAwesomeIcon size={"xs"} icon="fa-solprops?.id fa-x" /> Clear
                                        </span>
                                    </Col>
                            </Row>
                            )}
                            {props?.otherNotifications?.requests || props?.teammate?.notifications ?
                                props?.otherNotifications?.requests ? props?.otherNotifications?.requests.map((info, index) => {
                                    return (
                                        <>
                                            <Row
                                                style={{
                                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 1px',
                                                    margin: '1px',
                                                    color: 'black',
                                                    padding: '.05em',
                                                    paddingBottom: '0em',
                                                    fontFamily: 'rockwen',
                                                }}
                                                key={index}
                                            >
                                                <Col md={8} sm={8}>
                                                    {' '}
                                                    {info.managerName}{' '}
                                                </Col>
                                                <Col md={2} sm={2}>
                                                    <Badge
                                                        as="button"
                                                        onClick={() => {
                                                            reject(index);
                                                        }}
                                                        style={{
                                                            padding: '.5em',
                                                            color: 'black',
                                                            fontFamily: 'rockwen',
                                                            fontWeight: 'bold',
                                                            borderRadius: '25px',
                                                        }}
                                                        bg="light"
                                                    >
                                                        <FontAwesomeIcon
                                                            className="pointer"
                                                            size="2xl"
                                                            icon="fa-solprops?.id fa-circle-xmark"
                                                        />
                                                    </Badge>
                                                </Col>
                                                <Col md={2} sm={2}>
                                                    <Badge
                                                        as="button"
                                                        onClick={() => {
                                                            accept(info.managerId); 
                                                        }}
                                                        style={{
                                                            padding: '.5em',
                                                            color: 'black',
                                                            fontFamily: 'rockwen',
                                                            fontWeight: 'bold',
                                                            borderRadius: '25px',
                                                        }}
                                                        bg="light"
                                                    >
                                                        <FontAwesomeIcon
                                                            className="pointer"
                                                            size="2xl"
                                                            icon="fa-solprops?.id fa-circle-check"
                                                        />
                                                    </Badge>
                                                </Col>
                                            </Row>
                                            <br />
                                        </>
                                    )
                                }) : <></> &&
                                    props?.teammate?.notifications ? props?.teammate?.notifications.map((info, index) => {
                                return (
                                    <><Row
                                        style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 1px',
                                            margin: '1px',
                                            color: 'black',
                                            padding: '.05em',
                                            paddingBottom: '0em',
                                            fontFamily: 'rockwen',
                                        }}
                                        key={index}
                                            ><p><span className='blue'>{info.client}</span>{info.text}</p></Row></>
                                        )
                                    }) : <></>
                                :
                                <Row
                                    style={{
                                        margin: '1px',
                                        color: 'black',
                                        padding: '.5em',
                                        fontFamily: 'rockwen',
                                    }}
                                    align="center"
                                >
                                    No Notifications Available
                                </Row>}
                    </div> : <></>
                }
            >
                <Button
                    variant="light"
                    onClick={() => { setShow(true) }}
                    style={
                        props?.teammate?.notifications || props?.otherNotifications
                            ? {
                                border: '2px solid #9b9b9b',
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                padding: '10px',
                                paddingLeft: '1.2em',
                                borderRadius: '15px',
                                marginRight: '1em',
                            }
                            : {
                                border: '2px solid #9b9b9b',
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                padding: '10px',
                                borderRadius: '15px',
                                marginRight: '1em',
                            }
                    }
                >
                    <FontAwesomeIcon
                        className="pointer"
                        size="xl"
                        icon="fa-regular fa-bell"
                    />
                    {props?.teammate?.notifications || props?.otherNotifications ? (
                        <div class="notification-dot"></div>
                    ) : (
                        <></>
                    )}
                </Button>
            </OverlayTrigger>
        </>
    )
}
