import React, { useState } from 'react'
import { Table, Button, Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import { message, Dropdown } from 'antd';
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

export default function AnalyticsClientTable(props) {
    const [key, setKey] = useState();
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
        <Container>
            <Row style={{ marginTop: "-80px", marginRight: "50px" }}>
                <Col md={10}>
                </Col>
                <Col md={2}>
                    <Dropdown menu={menuProps}>
                        <Button variant='light'>
                            This Year{" "}<FontAwesomeIcon icon="fa-solid fa-caret-down" />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
            <Row style={{ marginTop: "80px" }}>
                <Container>
                    <Tab.Container id="left-tabs-example" onSelect={key => setKey(key)} activeKey={key}>
                        <Row>
                            <Col sm={4} style={{ margin: "-30px -50px" }}>
                                <div className="analytics21-set-auto analytics21-menu-height">
                                    <Nav variant="pills" className="flex-column">
                                    {props.manager?.clients?.sort((a, b) => a.name > b.name ? 1 : -1).map((info, index) => {
                                        return (
                                            <div style={{ position: "relative" }}>
                                                <Nav.Item key={index} className={key === info.name ? "ab" : ""}>
                                                    <Nav.Link eventKey={info.name}
                                                        style={key === info.name ?
                                                            { width: "11rem", color: "white", backgroundColor: "#3975e9", marginBottom: ".5em" } :
                                                            { width: "12rem", color: "black", marginBottom: ".5em" }} title={info.name}>
                                                        {info.name.length < 20 ? info.name : info.name.slice(0, 17) + "..."}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </div>
                                        )
                                    })}
                                    </Nav></div>
                            </Col>
                            <Col sm={9} style={{ margin: "-90px -50px" }}>
                                <Tab.Content>
                                    {key && props.manager?.clients?.map((info, index) => {
                                        return (
                                            <Tab.Pane eventKey={info.name}>
                                                <div className="analytics2-set-auto analytics2-menu-height">
                                                    <Row>
                                                        <Col>
                                                <Table backgroundColor="#fff" size="sm">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{
                                                                fontFamily: 'rockwen', fontWeight: "bold"
                                                            }} >Task</TableCell>
                                                            <TableCell style={{
                                                                fontFamily: 'rockwen', fontWeight: "bold"
                                                            }} >Teammate</TableCell>
                                                            <TableCell style={{
                                                                fontFamily: 'rockwen', fontWeight: "bold"
                                                            }} >Assigned{" "}<FontAwesomeIcon icon="fa-solid fa-sort" /></TableCell>
                                                            <TableCell align="center" style={{
                                                                fontFamily: 'rockwen', fontWeight: "bold"
                                                            }} >Corrections{" "}<FontAwesomeIcon icon="fa-solid fa-sort" /></TableCell>
                                                            <TableCell align="center" style={{
                                                                fontFamily: 'rockwen', fontWeight: "bold"
                                                            }} >Man hours{" "}<FontAwesomeIcon icon="fa-solid fa-sort" /></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                                <TableBody>
                                                        {info.totalTaskCount !== 0 ? props?.manager?.teammates?.map((info1) => {
                                                            return (
                                                                <>
                                                                    {info1?.data?.tasks?.filter((info2) => { return info2.client === key })
                                                                        .map((info2, index2) => {
                                                                            return (
                                                                                <TableRow key={index2}>
                                                                                    <TableCell title={info2.task} style={{
                                                                                        fontFamily: 'rockwen', fontWeight: "bold"
                                                                                    }}>{info2.task.length < 23 ? info2.task : info2.task.slice(0, 20) + "..."}</TableCell>
                                                                                    <TableCell style={{
                                                                                        fontFamily: 'rockwen', fontWeight: "bold"
                                                                                    }}>{info1.data.name}</TableCell>
                                                                                    {info2.updates?.sort((a, b) =>
                                                                                        a.corrections > b.corrections
                                                                                            ? -1
                                                                                            : 1,
                                                                                    )
                                                                                        .filter(
                                                                                            (info3, index3) => index3 === 0,
                                                                                        )
                                                                                        .map((info3) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <TableCell style={{
                                                                                                        fontFamily: 'rockwen', fontWeight: "bold"
                                                                                                    }}>{info3.assignedStartDate}</TableCell>
                                                                                                    <TableCell style={{
                                                                                                        fontFamily: 'rockwen', fontWeight: "bold"
                                                                                                    }} align="center">{info3.corrections === "0" ? "0" : "+" + info3.corrections}</TableCell>
                                                                                                    <TableCell style={{
                                                                                                        fontFamily: 'rockwen', fontWeight: "bold"
                                                                                                    }} align="center">{hoursInFullFormat(info2.manHours)}</TableCell>
                                                                                                </>)
                                                                                        })}
                                                                                </TableRow>
                                                                            )
                                                                        })} </>
                                                            )
                                                        }) :
                                                                        <TableCell colSpan={5} align="center">No Tasks Assigned Yet</TableCell>
                                                                    }

                                                    </TableBody>
                                                            </Table>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab.Pane>
                                        )
                                    })}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </Row>
        </Container>
    )
}


