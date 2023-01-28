import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { onValue, ref, update } from 'firebase/database';
import { auth, db } from '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
const localizer = momentLocalizer(moment);

function ShowApprovalList(props) {
    function ApproveAttendence(teammateIndex) {
        const dat = new Date();
        const today = dat.getDate() + "-" + dat.getMonth() + 1 + "-" + dat.getFullYear();
        update(ref(db, `manager/${auth.currentUser.uid}/attendence/${today}/${teammateIndex}`), { approved: "Yes" }).then((res) => {
            console.log(res);
        })
    }
    return (
        <div>
            <Modal
                backdrop="static"
                {...props}
                size="md"
                className='bg-white'
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attendance Sheet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> {props?.attendance !== null ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'></TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Approved</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props?.attendance.filter((info) => { return info.approved === "No" }).map((info, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center'>
                                            {info.approved === "No" ? (index + 1) : (" ")}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {info.approved === "No" ? (info.name) : (" ")}

                                        </TableCell>
                                        <TableCell align='center'>
                                            <FontAwesomeIcon
                                                onClick={() => { ApproveAttendence(info.teammateIndex) }}
                                                className="pointer"
                                                size="2xl"
                                                color='green'
                                                icon="fa-solprops?.id fa-circle-check"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }</TableBody></Table> : <TableCell>Not Available</TableCell>}
                </Modal.Body>
            </Modal>
        </div >
    )
}
function ShowModal(props) {
    return (
        <div>
            <Modal
                backdrop="static"
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                className='bg-white'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attendance Sheet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props?.attendance !== null ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'></TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody> 
                                {props?.attendance.filter((info) => { return info.approved === "Yes" })
                                    .map((info, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align='center'>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {info.name}
                                                </TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table> : <div style={{ align: "center" }}>Not Available</div>}
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default function Attendance(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [attendance, setAttendance] = useState({})

    const onSelectEventSlotHandler = (slotInfo) => {
        let today = new Date(slotInfo.start)
        let day = String(today.getDate()).padStart(2, '0') +
            '-' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '-' +
            today.getFullYear()
        onValue(ref(db, `manager/${props?.managerid}/attendence/${day}/`), (snapshot) => {
            let data = snapshot.val();
            setAttendance(data);
        })
        setModalShow(true);
    }

    const onApprovalHandler = (slotInfo) => {
        let today = new Date()
        let day = String(today.getDate()).padStart(2, '0') +
            '-' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '-' +
            today.getFullYear()
        onValue(ref(db, `manager/${props?.managerid}/attendence/${day}/`), (snapshot) => {
            let data = snapshot.val();
            setAttendance(data);
        })
        setModalShow2(true);
    }
    const doNothing = () => {
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attendance Sheet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ position: 'relative' }} >
                    <Row><Col className='text-end'>
                        <Button style={{ position: 'relative', width: "100px", float: "right" }}
                            onClick={() => { onApprovalHandler() }}
                            variant="light">Approve</Button></Col>
                    </Row>
                    <Row>
                        <div className="calendar-container" style={{ position: 'relative', marginTop: "1em" }}>
                        <Calendar
                            selectable
                            localizer={localizer}
                            views={['month']}
                            style={{ height: 450 }}
                            onSelectSlot={(slotInfo) => { moment() > slotInfo.start ? onSelectEventSlotHandler(slotInfo) : doNothing() }}
                        />{modalShow ?
                            <ShowModal
                                attendance={attendance}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            /> : <></>}
                            {modalShow2 ?
                                <ShowApprovalList
                                    attendance={attendance}
                                    show={modalShow2}
                                    onHide={() => setModalShow2(false)}
                                /> : <></>}
                        </div></Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}
