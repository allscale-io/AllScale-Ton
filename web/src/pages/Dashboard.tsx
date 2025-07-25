import React, { useEffect, useState } from 'react';
import { Typography, Tabs, Button, message, Spin, Badge } from 'antd';
import ProductList from './ProductList';
import CreateInvoice from './CreateInvoice';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { INVOICE_MANAGER_ADDRESS, encodePayInvoicePayload } from '../utils/ton-contract';
import { fetchInvoices, payInvoice } from '../utils/api';

const { TabPane } = Tabs;

interface InvoicesTabProps {
  invoices: any[];
  loading: boolean;
  onPay: (invoiceId: number, amount: number) => void;
  loadingId: number | null;
  pendingId: number | null;
  lastPaidId: number | null;
}

const InvoicesTab: React.FC<InvoicesTabProps> = ({ invoices, loading, onPay, loadingId, pendingId, lastPaidId }) => (
  <div>
    <Typography.Title level={4} style={{ marginBottom: 16 }}>Invoices & Payments</Typography.Title>
    {loading ? <Spin /> : invoices.length === 0 ? <Typography.Text>No invoices yet.</Typography.Text> : (
      invoices.map(inv => (
        <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, border: '1px solid #eee', borderRadius: 8, padding: 12, background: lastPaidId === inv.id ? '#f6ffed' : undefined }}>
          <div>
            <Typography.Text strong>Invoice #{inv.id}</Typography.Text>
            <div style={{ color: '#888', fontSize: 14 }}>{inv.amount} TON</div>
          </div>
          <div>
            {inv.status === 'unpaid' ? (
              loadingId === inv.id ? (
                <Button type="primary" loading>Pay</Button>
              ) : pendingId === inv.id ? (
                <Badge status="processing" text="Pending..." />
              ) : (
                <Button type="primary" onClick={() => onPay(inv.id, inv.amount)}>Pay</Button>
              )
            ) : lastPaidId === inv.id ? (
              <Badge status="success" text="Payment successful!" />
            ) : (
              <Typography.Text type="success">Paid</Typography.Text>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [lastPaidId, setLastPaidId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const loadInvoices = () => {
    setFetching(true);
    fetchInvoices().then(setInvoices).finally(() => setFetching(false));
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handlePay = async (invoiceId: number, amount: number) => {
    setLoadingId(invoiceId);
    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: INVOICE_MANAGER_ADDRESS,
            amount: (amount * 1e9).toFixed(0),
            payload: encodePayInvoicePayload(),
          },
        ],
      });
      setLoadingId(null);
      setPendingId(invoiceId);
      await payInvoice(invoiceId);
      message.success('Payment sent!');
      loadInvoices();
      setTimeout(() => {
        setPendingId(null);
        setLastPaidId(invoiceId);
        setTimeout(() => setLastPaidId(null), 2000);
      }, 3000);
    } catch (e) {
      setLoadingId(null);
      message.error('Payment failed or cancelled.');
    }
  };

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>Dashboard</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered tabBarGutter={32}>
        <TabPane tab="Products" key="products">
          <ProductList />
        </TabPane>
        <TabPane tab="Create Invoice" key="create-invoice">
          <CreateInvoice onInvoiceCreated={loadInvoices} onSwitchToInvoices={() => setActiveTab('invoices')} />
        </TabPane>
        <TabPane tab="Invoices" key="invoices">
          <InvoicesTab invoices={invoices} loading={fetching} onPay={handlePay} loadingId={loadingId} pendingId={pendingId} lastPaidId={lastPaidId} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard; 