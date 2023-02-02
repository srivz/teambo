import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    OverlayTrigger,
    Row,
} from 'react-bootstrap'
import { requestAcceptTeammate, requestRejectTeammate } from '../../database/write/teammateWriteFunction'

export default function Notifications(props) {
    const [show, setShow] = useState(true)
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        if (props.otherNotifications !== undefined)
            setOriginalData(props.otherNotifications);
    }, [props.otherNotifications]);

    const accept = (managerId, name) => {
        requestAcceptTeammate(managerId, name, props?.id).then(() => { setOriginalData([]) })
    }
    const clearAllNotifications = () => {
        // remove(ref(db, `manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/notifications/`)).then(() => { setShow(false); })
    }
    const reject = (managerId, name, index) => {
        requestRejectTeammate(managerId, name, props?.id).then(() => {
            let list1 = originalData.slice(0, index);
            let list2 = originalData.slice(index + 1);
            let list = list1.concat(list2)
            setOriginalData(list)
        })
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
                        <div className='notification-dropdown-menu'>
                            <div className='notification-dropdown-menu-list notification-dropdown-menu-height'>
                                <Row className='notification-dropdown-menu-height'>
                                    <div
                                        className="bg-white"
                                        style={{
                                            padding: '1em',
                                            width: '300px',
                                            boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                                        }}
                                    >
                                        {!props?.teammate.notifications ? (
                                            <Col className='text-end'>
                                                <span className='pointer' style={{ color: "#9b9b9b", fontSize: "small", paddingBottom: ".5em" }}>
                                                    <FontAwesomeIcon size={"xs"} icon="fa-solprops?.id fa-x" /> Clear
                                                </span>
                                            </Col>
                                        ) : (
                                            <Row>
                                                <Col className='text-end'>
                                                    <span className='pointer' style={{ color: "#9b9b9b", fontSize: "small", paddingBottom: ".5em" }}
                                                        onClick={() => { clearAllNotifications(); }}>
                                                        <FontAwesomeIcon size={"xs"} icon="fa-solprops?.id fa-x" /> Clear
                                                    </span>
                                                </Col>
                                            </Row>
                                        )}
                                        {originalData || props?.teammate?.notifications ?
                                            originalData ? originalData.map((info, index) => {
                                                return (
                                                    <>
                                                        <Row
                                                            style={{
                                                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 1px',
                                                                margin: '1px',
                                                                color: 'black',
                                                                padding: '1em',
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
                                                                <FontAwesomeIcon

                                                                    onClick={() => {
                                                                        reject(info.managerId, info.managerName, index);
                                                                    }}
                                                                    className="pointer"
                                                                    size="2xl"
                                                                    color='red'
                                                                    icon="fa-solprops?.id fa-circle-xmark"
                                                                />
                                                            </Col>
                                                            <Col md={2} sm={2}>
                                                                <FontAwesomeIcon
                                                                    onClick={() => {
                                                                        accept(info.managerId, info.managerName);
                                                                    }}
                                                                    className="pointer"
                                                                    size="2xl"
                                                                    color='green'
                                                                    icon="fa-solprops?.id fa-circle-check"
                                                                />
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
                                    </div></Row></div></div> : <></>
                }
            >
                <Button
                    variant="light"
                    onClick={() => { setShow(true) }}
                    style={{
                        border: '2px solid #9b9b9b',
                        color: 'black',
                        fontFamily: 'rockwen',
                        fontWeight: 'bold',
                        borderRadius: '15px',
                        marginRight: '1em',
                    }}
                >
                    <FontAwesomeIcon
                        className="pointer"
                        size="xl"
                        icon="fa-regular fa-bell"
                    />
                    {props?.teammate?.notifications || originalData.length !== 0 ? (
                        <div class="notification-dot"></div>
                    ) : (
                        <></>
                    )}
                </Button>
            </OverlayTrigger>
        </>
    )
}
