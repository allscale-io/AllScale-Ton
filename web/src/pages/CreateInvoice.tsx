import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Card, Select, Spin } from 'antd';
import { fetchProducts, createInvoice } from '../utils/api';

interface CreateInvoiceProps {
  onInvoiceCreated?: () => void;
  onSwitchToInvoices?: () => void;
}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({ onInvoiceCreated, onSwitchToInvoices }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      await createInvoice({
        productId: values.productId,
        buyer: values.buyer,
        amount: Number(values.amount),
      });
      message.success('Invoice created!');
      form.resetFields();
      if (onInvoiceCreated) onInvoiceCreated();
      if (onSwitchToInvoices) onSwitchToInvoices();
    } catch {
      message.error('Failed to create invoice');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card bordered style={{ maxWidth: 360, margin: '0 auto' }}>
      <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}>Create Invoice</Typography.Title>
      {loading ? <Spin /> : (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="Product" name="productId" rules={[{ required: true, message: 'Please select a product' }]}> 
            <Select placeholder="Select product">
              {products.map((p) => (
                <Select.Option key={p.id} value={p.id}>{p.name} ({p.price} TON)</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Buyer Address" name="buyer" rules={[{ required: true, message: 'Please enter buyer address' }]}> 
            <Input placeholder="Buyer Address" />
          </Form.Item>
          <Form.Item label="Amount (TON)" name="amount" rules={[{ required: true, message: 'Please enter amount' }]}> 
            <Input type="number" placeholder="Amount (TON)" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block loading={submitting}>Create</Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default CreateInvoice; 