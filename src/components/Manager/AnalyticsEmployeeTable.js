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
            <Table variant="Hex #FFFFFF" size="sm" style={{ marginTop: "-20px", width: "60%", marginLeft: "-50px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Employee</TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align='center'>
                            Task{" "}
                            <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer' onClick={() => { sortBasis === "totalTaskCountD" ? setSortBasis("totalTaskCountA") : sortBasis === "totalTaskCountA" ? setSortBasis("totalTaskCountD") : setSortBasis("totalTaskCountA") }} />
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align='center'>
                            Live Task{" "}
                            <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer' onClick={() => { sortBasis === "currentTaskCountD" ? setSortBasis("currentTaskCountA") : sortBasis === "currentTaskCountA" ? setSortBasis("currentTaskCountD") : setSortBasis("currentTaskCountA") }} />
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align='center'>
                            Man hours{" "}
                            {/* <FontAwesomeIcon icon="fa-solid fa-sort" className='pointer'  onClick={() => { sortBasis === "manHoursD" ? setSortBasis("manHoursA") : sortBasis === "manHoursA" ? setSortBasis("manHoursD") : setSortBasis("manHoursA") }} /> */}
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
                                            // sortBasis === "manHoursA" ? (a.manHours > b.manHours ? -1 : 1) :
                                            //     sortBasis === "manHoursD" ? (a.manHours < b.manHours ? -1 : 1) :
                                            (a.teammateIndex < b.teammateIndex ? -1 : 1)
                        ).map((teammate) => {
                            return (<TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>{teammate.data.name}</TableCell>
                                <TableCell align='center' style={{ fontWeight: "bold" }}>{teammate.data.totalNumberOfTasks || 0}</TableCell>
                                <TableCell align='center' style={teammate.data.liveTasks === 0 ? { color: "#000", fontWeight: "bold" } : { color: "#3975e9", fontWeight: "bold" }}>{teammate.data.liveTasks || 0}</TableCell>
                                <TableCell align='center' style={{ fontWeight: "bold" }}>16 hrs</TableCell>
                            </TableRow>)
                        })
                    }


                </TableBody>
            </Table>
        </div>
    )
}


