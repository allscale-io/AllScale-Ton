// This is a Telegram Mini App demo for AllScale + TON Hackathon
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Space } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => (
  <div style={{ textAlign: 'center', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <ThunderboltFilled style={{ fontSize: 48, color: '#1677ff', marginBottom: 16 }} />
    <Title level={2} style={{ marginBottom: 8 }}>AllScale TON Mini App</Title>
    <Paragraph style={{ fontSize: 16, marginBottom: 32, color: '#555' }}>
      Welcome! Demo for invoicing & social commerce on TON.
    </Paragraph>
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Link to="/dashboard">
        <Button type="primary" size="large" block style={{ width: 220 }}>
          Go to Dashboard
        </Button>
      </Link>
    </Space>
  </div>
);

export default Home; 