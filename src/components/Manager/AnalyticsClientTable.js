import React from 'react'
import { Table, Button, Container } from 'react-bootstrap';
import { message, Dropdown } from 'antd';
import { Col, Row } from 'react-bootstrap';
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
    return (
        <Container>
            <div>
                <Row>
                    <Col md={10}>
                        <Row>

                        </Row>
                    </Col>
                    <Col md={2}>
                        <Dropdown menu={menuProps} >
                            <Button variant='light'>
                                This Year{" "}<FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
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
        </Container>
    )
}


