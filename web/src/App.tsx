import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Grid, Spin } from 'antd';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

function shortAddress(addr: string) {
  return addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';
}

async function fetchTonBalance(address: string): Promise<string> {
  const res = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
  const data = await res.json();
  if (data.ok && data.result) {
    return (Number(data.result) / 1e9).toFixed(3);
  }
  throw new Error('Failed to fetch balance');
}

const App: React.FC = () => {
  const screens = useBreakpoint();
  const address = useTonAddress();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setBalance(null);
      return;
    }
    setLoading(true);
    fetchTonBalance(address)
      .then(setBalance)
      .catch(() => setBalance('Error'))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', background: '#f4f6fb' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            padding: screens.xs ? '0 8px' : '0 24px',
            height: 56,
            background: '#222',
            boxShadow: '0 1px 4px #0001',
          }}
        >
          <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>
            AllScale TON
          </div>
          <div style={{ flex: 1 }} />
          <TonConnectButton />
          {address && (
            <div style={{ color: 'white', fontSize: 14, marginLeft: 12, display: 'flex', alignItems: 'center' }}>
              {shortAddress(address)}
              <span style={{ margin: '0 8px' }}>|</span>
              {loading ? <Spin size="small" /> : balance !== null ? `${balance} TON` : null}
            </div>
          )}
        </Header>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 56px)',
            padding: screens.xs ? '16px 0' : '32px 0',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 2px 12px #0001',
              padding: screens.xs ? 16 : 32,
              margin: '0 8px',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
