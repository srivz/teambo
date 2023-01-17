import React, { useState } from 'react'
import { Table, Button, Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import { message, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export default function AnalyticsClientTable() {
    const [key, setKey] = useState();
    return (
        <Container>
            <Row style={{ marginTop: "-80px", marginRight: "80px" }}>
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
            <Row style={{ marginTop: "100px" }}>
                <Container>
                    <Tab.Container id="left-tabs-example" onSelect={key => setKey(key)} activeKey={key}>
                        <Row>
                            <Col sm={4} style={{ margin: "-30px -50px" }}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link className="ab" eventKey="ChaiCup" style={key === "ChaiCup" ? { width: "8rem", color: "white", backgroundColor: "#3975e9", marginBottom: ".5em" } : { width: "8rem", color: "black", backgroundColor: "#f1f4fb", marginBottom: ".5em" }}>ChaiCup</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="ab" eventKey="Vit bhopal" style={key === "Vit bhopal" ? { width: "8rem", color: "white", backgroundColor: "#3975e9", marginBottom: ".5em" } : { width: "8rem", color: "black", backgroundColor: "#f1f4fb", marginBottom: ".5em" }}>Vit bhopal</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} style={{ margin: "-90px -120px" }}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="ChaiCup">
                                        <Table backgroundColor="#fff" size="sm">
                                            <thead>
                                                <tr>

                                                    <th>Task</th>
                                                    <th>Teammate</th>
                                                    <th>Assigned<FontAwesomeIcon icon="fa-solid fa-sort" /></th>
                                                    <th>Corrections<FontAwesomeIcon icon="fa-solid fa-sort" /></th>
                                                    <th>Man hours<FontAwesomeIcon icon="fa-solid fa-sort" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr> <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>Logo Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Vit bhopal">
                                        <Table backgroundColor="#fff" size="sm">
                                            <thead>
                                                <tr>

                                                    <th>Task</th>
                                                    <th>Teammate</th>
                                                    <th>Assigned</th>
                                                    <th>Corrections</th>
                                                    <th>Man hours</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>
                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr> <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                                <tr>
                                                    <td>asd Corrections</td>
                                                    <td>Suriya</td>
                                                    <td>jan,20 2023</td>
                                                    <td>+25</td>
                                                    <td>02 hrs</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </Row>
        </Container>
    )
}


