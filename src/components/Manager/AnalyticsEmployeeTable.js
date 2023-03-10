import React, { useState } from 'react'
import { Button, Table, Col, Row } from 'react-bootstrap';
import { Dropdown, message, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: 'Today',
        key: '1',
    },
    {
        label: 'This Week',
        key: '2',
    },
    {
        label: 'This Month',
        key: '3',

    },
    {
        label: 'This Year',
        key: '4',

    },
    {
        label: 'All Time',
        key: '5',

    },
    {
        label: 'Custom',
        key: '6',

    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
export default function AnalyticsEmployeeTable(props) {
    const [sortBasis, setSortBasis] = useState()
    const hoursInFullFormat = (decimalHour) => {
        var decimalTimeString = String(decimalHour);
        var decimalTime = parseFloat(decimalTimeString);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        var seconds = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return ("" + hours + ":" + minutes + ":" + seconds);
    }
    return (
        <div className="container">
            <div>
                <Row style={{ marginTop: "-85px" }}>
                    <Col md={10}>
                    </Col>
                    <Col md={2} style={{ marginLeft: "-50px" }} >
                        <Dropdown menu={menuProps} style={{ marginRight: "80px" }} >
                            <Button variant='light'>
                                This Year{" "}<FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <div className="analytics3-set-auto analytics3-menu-height">
                <Row>
                    <Col>
                        <Table variant="Hex #FFFFFF" size="sm" style={{ marginTop: "-20px", width: "60%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontFamily: 'rockwen', fontWeight: "bold" }}>Employee</TableCell>
                                    <TableCell style={{ fontFamily: 'rockwen', fontWeight: "bold" }} align='center'>
                                        Task{" "}
                                        <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer' onClick={() => { sortBasis === "totalTaskCountD" ? setSortBasis("totalTaskCountA") : sortBasis === "totalTaskCountA" ? setSortBasis("totalTaskCountD") : setSortBasis("totalTaskCountA") }} />
                                    </TableCell>
                                    <TableCell style={{ fontFamily: 'rockwen', fontWeight: "bold" }} align='center'>
                                        Live Task{" "}
                                        <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer' onClick={() => { sortBasis === "currentTaskCountD" ? setSortBasis("currentTaskCountA") : sortBasis === "currentTaskCountA" ? setSortBasis("currentTaskCountD") : setSortBasis("currentTaskCountA") }} />
                                    </TableCell>
                                    <TableCell style={{ fontFamily: 'rockwen', fontWeight: "bold" }} align='center'>
                                        Man hours{" "}
                                        <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer' onClick={() => { sortBasis === "manHoursD" ? setSortBasis("manHoursA") : sortBasis === "manHoursA" ? setSortBasis("manHoursD") : setSortBasis("manHoursA") }} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props?.manager?.teammates?.sort((a, b) =>
                                        sortBasis === "totalTaskCountD" ? (a.data.totalNumberOfTasks > b.data.totalNumberOfTasks ? -1 : 1) :
                                            sortBasis === "totalTaskCountA" ? (a.data.totalNumberOfTasks < b.data.totalNumberOfTasks ? -1 : 1) :
                                                sortBasis === "currentTaskCountA" ? (a.data.liveTasks > b.data.liveTasks ? -1 : 1) :
                                                    sortBasis === "currentTaskCountD" ? (a.data.liveTasks < b.data.liveTasks ? -1 : 1) :
                                                        sortBasis === "manHoursA" ? (a.data.manHours > b.data.manHours ? -1 : 1) :
                                                            sortBasis === "manHoursD" ? (a.data.manHours < b.data.manHours ? -1 : 1) :
                                                                (a.teammateIndex < b.teammateIndex ? -1 : 1)
                                    ).map((teammate) => {
                                        return (<TableRow>
                                            <TableCell style={{ fontFamily: 'rockwen', fontWeight: "bold" }}>{teammate.data.name}</TableCell>
                                            <TableCell align='center' style={{ fontFamily: 'rockwen', fontWeight: "bold" }}>{teammate.data.totalNumberOfTasks === 0 ? 0 : teammate.data.totalNumberOfTasks < 10 ? "0" + teammate.data.totalNumberOfTasks : teammate.data.totalNumberOfTasks}</TableCell>
                                            <TableCell align='center' style={teammate.data.liveTasks === 0 ? { fontFamily: 'rockwen', color: "#000", fontWeight: "bold" } : { color: "#3975e9", fontFamily: 'rockwen', fontWeight: "bold" }}>{teammate.data.liveTasks === 0 ? "--" : teammate.data.liveTasks < 10 ? "0" + teammate.data.liveTasks : teammate.data.liveTasks}</TableCell>
                                            <TableCell align='center' style={{ fontFamily: 'rockwen', fontWeight: "bold" }}>{hoursInFullFormat(teammate.data.manHours)}</TableCell>
                                        </TableRow>)
                                    })
                                }


                            </TableBody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


