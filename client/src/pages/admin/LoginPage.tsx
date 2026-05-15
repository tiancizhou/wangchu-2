import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/adminApi';

type LoginValues = {
  username: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  async function onSubmit(values: LoginValues) {
    try {
      await login(values.username, values.password);
      message.success('登录成功');
      navigate('/admin');
    } catch (err) {
      message.error(err instanceof Error ? err.message : '登录失败');
    }
  }

  return (
    <main className="login-page">
      <div className="login-grid-overlay" />
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">W</div>
          <div>
            <h1>官网后台</h1>
            <p>Blueprint Management Console</p>
          </div>
        </div>
        <Form layout="vertical" initialValues={{ username: 'admin', password: 'admin123456' }} onFinish={onSubmit} className="login-form">
          <Form.Item name="username" label={<span className="login-label">账号</span>} rules={[{ required: true, message: '请输入账号' }]}>
            <Input prefix={<UserOutlined />} placeholder="账号" autoComplete="username" />
          </Form.Item>
          <Form.Item name="password" label={<span className="login-label">密码</span>} rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" className="login-submit">
            进入后台
          </Button>
        </Form>
      </div>
    </main>
  );
}
