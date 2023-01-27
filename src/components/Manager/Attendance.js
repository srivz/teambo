import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

export default function Attendance(props) {
    const onSelectEventSlotHandler = (slotInfo) => {
        let today = new Date(slotInfo.start)
        let day = String(today.getDate()).padStart(2, '0') +
            '-' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '-' +
            today.getFullYear()
        alert(day);
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
                            onSelectSlot={(slotInfo) => { onSelectEventSlotHandler(slotInfo) }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
