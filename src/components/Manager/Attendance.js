import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase-config';
const localizer = momentLocalizer(moment);

function ShowModal(props) {
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
                <Modal.Body>
                    {Object.keys(props?.attendance)?.map((info, index) => { return (<div>{info}<br /></div>) })}
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default function Attendance(props) {
    const [modalShow, setModalShow] = useState(false);
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
                <Modal.Body>
                    <div className="calendar-container">
                        <Calendar
                            selectable
                            localizer={localizer}
                            views={['month']}
                            style={{ height: 450 }}
                            onSelectSlot={(slotInfo) => { moment() > slotInfo.start ? onSelectEventSlotHandler(slotInfo) : doNothing() }}
                        />
                        <ShowModal
                            attendance={attendance}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
