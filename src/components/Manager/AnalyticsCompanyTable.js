import React from 'react'
import { Table, Button, Col, Row } from 'react-bootstrap';
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
export default function AnalyticsCompanyTable() {
    return (
        <div className="container">
            <div>
                <Row style={{ marginTop: "-50px" }}>
                    <Col md={10}>
                        <Row>
                            <input
                                style={{
                                    width: '200px',
                                    padding: '.4em',
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
                                    margin: '10px',
                                    width: 'fit-content',
                                    paddingLeft: '.65em',
                                    paddingRight: '.65em',
                                    borderRadius: "25px",
                                    border: "1px solid #CDCDCD",
                                }}
                                type="dashed"
                                shape="circle"
                            ><FontAwesomeIcon
                                    style={{
                                        fontWeight: "bolder"
                                    }}
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
            </div >
            <Table variant="Hex #FFFFFF" size="sm">
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

                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>
                    </tr>
                    <tr>

                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>
                    </tr>
                    <tr>

                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>
                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr> <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                    <tr>
                        <td>Vit bhopal</td>
                        <td>65</td>
                        <td>02</td>
                        <td>1.2k hrs</td>

                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


