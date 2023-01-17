import React from 'react'
import Table from 'react-bootstrap/Table';
import { Button, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, message, } from 'antd';

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: 'Today',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'This Week',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: 'This Month',
        key: '3',
        icon: <UserOutlined />,

    },
    {
        label: 'This Year',
        key: '4',
        icon: <UserOutlined />,

    },
    {
        label: 'All Time',
        key: '4',
        icon: <UserOutlined />,

    },
    {
        label: 'Custom',
        key: '4',
        icon: <UserOutlined />,

    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};

export default function AnalyticsClientTable() {
    return (
        <div className="container">
            <Space wrap style={{ margin: "0rem 58rem" }}>
                <Dropdown menu={menuProps} >
                    <Button>
                        <Space>
                            This Year
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>

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
        </div>
    )
}


