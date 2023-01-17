import React from 'react'
import { Button, Table, Col, Row } from 'react-bootstrap';
import { Dropdown, message, } from 'antd';
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
export default function AnalyticsEmployeeTable() {
    return (
        <div className="container">
            <div>
                <Row style={{ marginTop: "-85px" }}>
                    <Col md={10}><Row>
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
                                marginTop: '5px',
                                height: "2em",
                                width: 'fit-content',
                                paddingLeft: '.5em',
                                paddingTop: '5px',
                                paddingRight: '.5em',
                                borderRadius: "100px",
                                border: "1px solid #CDCDCD"
                            }}
                        ><FontAwesomeIcon
                                icon="fa-solid fa-magnifying-glass" />
                        </Button>
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
            <Table variant="Hex #FFFFFF" size="sm" style={{ marginTop: "-20px" }}>
                <thead>
                    <tr>

                        <th>Employee</th>
                        <th>Task</th>
                        <th>Live Task</th>
                        <th>Man hours</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>
                    </tr>
                    <tr>

                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>
                    </tr>
                    <tr>

                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr> <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                    <tr>
                        <td>Logo Corrections</td>
                        <td>Surya</td>
                        <td>jan,20 2023</td>

                        <td>16 hrs</td>

                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


