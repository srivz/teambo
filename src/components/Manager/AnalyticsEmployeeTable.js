import React from 'react'
import Table from 'react-bootstrap/Table';
import { SearchOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { Button, } from 'antd';
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
export default function AnalyticsEmployeeTable() {
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
            <Space direction="vertical">

                <Space wrap>

                    <Button style={{ width: "10rem" }}>Search</Button>
                    <Tooltip title="search" >
                        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>


                </Space>
            </Space>
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


