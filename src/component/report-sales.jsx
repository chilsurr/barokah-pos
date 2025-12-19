import React from 'react';
import { Flex, Space, Table,Button, Tag } from 'antd';
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
const columns = [
  {
    title: 'Tgl',
    dataIndex: 'Tgl',
    key: 'Tgl',
    width: 20,
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Trx',
    dataIndex: 'Trx',
    key: 'Trx',
    width: 50,
  },
  {
    title: 'AveragePurchase',
    dataIndex: 'AveragePurchase',
    key: 'AveragePurchase',
    width: 120,
  },
  {
    title: 'Sales',
    key: 'Sales',
    dataIndex: 'Sales',
    width: 120,
  },
  {
    title: 'Margin',
    key: 'Margin',
    dataIndex: 'Margin',
    width: 120,
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    render: (_, record) => (
      <Space size="middle">
        <Button>See Detail</Button>
      </Space>
    ),
  },
];
const data = [
  {
    Tgl: '1',
    Trx: '60',
    AveragePurchase: '20.000',
    Sales: '5.604.500',
    Margin: '2.780.000',
  },
  {
    Tgl: '2',
    Trx: '79',
    AveragePurchase: '25.000',
    Sales: '6.303.700',
    Margin: '1.200.500',
  },
  {
    Tgl: '3',
    Trx: '56',
    AveragePurchase: '23.000',
    Sales: '4.765.500',
    Margin: '1.320.500',
  },
];

function ReportSales(){
  const navigate = useNavigate()
    useEffect(()=>{
      if (!isAuthenticated()) {
          navigate("/login")
      }
  },[])
  return(
    <Table columns={columns} dataSource={data} />
  )
};
export default ReportSales;