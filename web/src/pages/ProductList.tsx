import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Spin } from 'antd';
import { fetchProducts } from '../utils/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>Product List</Typography.Title>
      {loading ? <Spin /> : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {products.map((p) => (
            <Card key={p.id} bordered style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Typography.Text strong>{p.name}</Typography.Text>
                  <div style={{ color: '#888', fontSize: 14 }}>{p.price} TON</div>
                </div>
                {/* Optionally: Add create invoice button here */}
              </div>
            </Card>
          ))}
        </Space>
      )}
    </div>
  );
};

export default ProductList; 