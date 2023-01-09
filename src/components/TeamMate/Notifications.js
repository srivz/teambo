import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref, remove, set, update } from 'firebase/database'
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

    const acceptChange = (managerId, managerTeam) => {
        if (managerTeam === undefined) {
            set(ref(db, `teammate/${props?.id}/link/`), { index: 0, managerId: managerId })
            set(ref(db, `manager/${managerId}/teammates/`), [{
                data: props?.teammate, teammateId: props?.id, teammateIndex: 0
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
                let newArr2 = [...newArr, { data: props?.teammate, teammateId: props?.id, teammateIndex: newArr.length }]
                set(ref(db, `manager/${managerId}/teammates/`), newArr2)
                remove(ref(db, `manager/${managerId}/teammates/${newArr.length}/data/notifications/`))

            }
        }
    }
    const accept = (managerId) => {
        if (once2) {
            onValue(ref(db, `manager/${managerId}`), (snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    remove(ref(db, `teammate/${props?.id}/notifications`))
                    acceptChange(managerId, data.teammates)
                } else {
                    alert('No manager found')
                }
            })
            setOnce2(false)
        }
    }
    const clearAllNotifications = () => {
        remove(ref(db, `teammate/${props?.id}/notifications`))
    }
    const reject = (index) => {
        remove(ref(db, `teammate/${props?.id}/notifications/requests/${index}`))
    }
    return (
        <>
            <OverlayTrigger
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                rootClose
                overlay={
                    <div
                        className="bg-white"
                        style={{
                            padding: '1em',
                            marginTop: '2px',
                            marginLeft: '-50px',
                            width: '300px',
                            boxShadow: 'rgba(0, 0, 0, 0.15) 1px 3px 5px',
                        }}
                    >{!props?.teammate.notifications ? (<></>) : (<Row>
                        <Col className='text-end'><span className='pointer' style={{ color: "#9b9b9b" }}
                            onClick={() => {
                                clearAllNotifications()
                                }}><FontAwesomeIcon size={"xs"} icon="fa-solprops?.id fa-x" /> Clear</span></Col>
                    </Row>)}
                        {!props?.teammate.notifications ? (
                            <Row
                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                    margin: '1px',
                                    color: 'black',
                                    padding: '.5em',
                                    fontFamily: 'rockwen',
                                    border: '2px black',
                                }}
                                align="center"
                            >
                                No Notifications Available
                            </Row>
                        ) : (props?.teammate?.notifications?.requests ?
                            props?.teammate?.notifications?.requests.map((info, index) => {
                                    return (
                                        <>
                                            <Row
                                                    style={{
                                                        boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                                    margin: '1px',
                                                        color: 'black',
                                                        padding: '.5em',
                                                    fontFamily: 'rockwen',
                                                    border: '2px black',
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
                                                            >
                                                                <FontAwesomeIcon
                                                            className="pointer"
                                                            size="xl"
                                                            icon="fa-solprops?.id fa-circle-xmark"
                                                                />
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
                                                            >
                                                                <FontAwesomeIcon
                                                            className="pointer"
                                                            size="xl"
                                                            icon="fa-solprops?.id fa-circle-check"
                                                        />
                                                    </Badge>
                                                        </Col>
                                            </Row>
                                            <br />
                                        </>
                                    )
                            }) : props?.teammate?.notifications.map((info, index) => {
                                return (
                                    <><Row
                                        style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                            margin: '1px',
                                            color: 'black',
                                            padding: '.5em',
                                            fontFamily: 'rockwen',
                                            border: '2px black',
                                        }}
                                        key={index}
                                    >{info}</Row></>)
                                })
                        )}
                    </div>
                }
            >
                <Button
                    variant="light"
                    className="box-shadow"
                    style={
                        !props?.teammate?.notifications
                            ? {
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                padding: '10px',
                                borderRadius: '15px',
                                marginRight: '1em',
                            }
                            : {
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                padding: '10px',
                                borderRadius: '15px',
                                marginRight: '1em',
                                paddingLeft: '1.2em',
                            }
                    }
                >
                    <FontAwesomeIcon
                        className="pointer"
                        size="xl"
                        icon="fa-regular fa-bell"
                    />
                    {!props?.teammate?.notifications ? (
                        <></>
                    ) : (
                        <div class="notification-dot"></div>
                    )}
                </Button>
            </OverlayTrigger>
        </>
    )
}
