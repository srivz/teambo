import React, { useState } from 'react'
import { Table, Button, Col, Row, Container } from 'react-bootstrap';
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
        key: '4',

    },
    {
        label: 'Custom',
        key: '4',

    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
export default function AnalyticsCompanyTable(props) {
    const [sortBasis, setSortBasis] = useState()
    const [companyList, setCompanyList] = useState(props?.manager?.clients)
    return (
        <Container>
            <div>
                <Row style={{ marginTop: "-85px", marginLeft: "-50px" }}>
                    <Col md={10}>
                        <Row>
                            <input
                                style={{
                                    width: '200px',
                                    padding: '1em',
                                    height: "2em",
                                    fontSize: "medium",
                                    paddingLeft: '1em',
                                    margin: '5px',
                                    border: "1px solid #CBCBCB",
                                    borderRadius: "100px",
                                }}
                                type="search"
                                name="search"
                                id="search"
                            // onChange={(e) => { setSearchText(e.target.value); }}
                            />
                            <Button variant='light'
                                style={{
                                    margin: '5px',
                                    height: "2em",
                                    width: 'fit-content',
                                    paddingLeft: '.5em',
                                    paddingTop: '5px',
                                    paddingRight: '.5em',
                                    borderRadius: "100px",
                                    border: "1px solid #CDCDCD"
                                }}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </Button>
                        </Row>
                    </Col>
                    <Col md={2} style={{ marginLeft: "-50px" }} >
                        <Dropdown menu={menuProps}>
                            <Button variant='light'>
                                This Year{" "}<FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div >
            <Table style={{ marginTop: "-20px", width: "60%", marginLeft: "-50px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "200px", fontWeight: "bold" }}>Client Name</TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="center">
                            Task{" "}<FontAwesomeIcon className='pointer' icon="fa-solid fa-sort" onClick={() => { sortBasis === "totalTaskCountD" ? setSortBasis("totalTaskCountA") : sortBasis === "totalTaskCountA" ? setSortBasis("totalTaskCountD") : setSortBasis("totalTaskCountA") }} />
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="center">
                            Live Task{" "}<FontAwesomeIcon className='pointer' icon="fa-solid fa-sort" onClick={() => { sortBasis === "currentTaskCountD" ? setSortBasis("currentTaskCountA") : sortBasis === "currentTaskCountA" ? setSortBasis("currentTaskCountD") : setSortBasis("currentTaskCountA") }} />
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="center">
                            Man hours{" "}<FontAwesomeIcon className='pointer' icon="fa-solid fa-sort" onClick={() => { sortBasis === "manHoursD" ? setSortBasis("manHoursA") : sortBasis === "manHoursA" ? setSortBasis("manHoursD") : setSortBasis("manHoursA") }} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companyList.sort((a, b) =>
                        sortBasis === "totalTaskCountD" ? (a.totalTaskCount > b.totalTaskCount ? -1 : 1) :
                            sortBasis === "totalTaskCountA" ? (a.totalTaskCount < b.totalTaskCount ? -1 : 1) :
                                sortBasis === "currentTaskCountA" ? (a.taskCount > b.taskCount ? -1 : 1) :
                                    sortBasis === "currentTaskCountD" ? (a.taskCount < b.taskCount ? -1 : 1) :
                                        sortBasis === "manHoursA" ? (a.manHours > b.manHours ? -1 : 1) :
                                            sortBasis === "manHoursD" ? (a.manHours < b.manHours ? -1 : 1) :
                                                (a.clientNumber < b.clientNumber ? -1 : 1)
                    )
                        .map((info, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell style={{ fontWeight: "bold" }} title={info.name}>
                                        {info.name.length < 23 ? info.name : info.name.slice(0, 20) + "..."}
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="center">
                                        {info.totalTaskCount}
                                    </TableCell>
                                    <TableCell align="center" style={info.taskCount === 0 ? { color: "#000", fontWeight: "bold" } : { color: "#3975e9", fontWeight: "bold" }}>
                                        {info.taskCount === 0 ? "--" : info.taskCount}
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="center">
                                        {info.manHours} hrs
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </Container>
    )
}


