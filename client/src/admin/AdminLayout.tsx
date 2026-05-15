import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  LayoutOutlined,
  PictureOutlined,
  AppstoreOutlined,
  BulbOutlined,
  TeamOutlined,
  BankOutlined,
  ShoppingOutlined,
  MessageOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../api/adminApi';

const { Sider, Content } = Layout;

type MenuEntry = { key: string; label: string; icon: React.ReactNode };

const menuGroups: { key: string; label: string; items: MenuEntry[] }[] = [
  {
    key: 'content',
    label: '内容编辑',
    items: [
      { key: '/admin/banners', label: '轮播图管理', icon: <PictureOutlined /> },
      { key: '/admin/page/about', label: '关于我们', icon: <TeamOutlined /> },
      { key: '/admin/products?tab=categories', label: '产品与项目分类', icon: <ShoppingOutlined /> },
      { key: '/admin/page/process', label: '生产与智造', icon: <BulbOutlined /> },
      { key: '/admin/page/project-cases', label: '项目案例', icon: <AppstoreOutlined /> },
      { key: '/admin/page/contact', label: '联系我们', icon: <MessageOutlined /> },
      { key: '/admin/site', label: '页脚', icon: <BankOutlined /> },
    ],
  },
  {
    key: 'data',
    label: '数据管理',
    items: [
      { key: '/admin/products', label: '产品管理', icon: <ShoppingOutlined /> },
    ],
  },
];

const dashboardKey = '/admin';
const dashboardEntry: MenuEntry = { key: dashboardKey, label: '编辑目录', icon: <DashboardOutlined /> };

const menuItems: MenuProps['items'] = [
  { type: 'item', key: dashboardEntry.key, label: dashboardEntry.label, icon: dashboardEntry.icon },
  ...menuGroups.map((group) => ({
    type: 'group' as const,
    key: group.key,
    label: group.label,
    children: group.items.map((item) => ({ key: item.key, label: item.label, icon: item.icon })),
  })),
];

function findMenuTitle(pathname: string): string {
  if (pathname === dashboardKey || pathname === `${dashboardKey}/`) return dashboardEntry.label;
  for (const group of menuGroups) {
    const match = group.items.find((item) => pathname.startsWith(item.key));
    if (match) return match.label;
  }
  if (pathname.startsWith('/admin/products')) return '产品管理';
  return '后台';
}

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function onLogout() {
    await logout();
    navigate('/admin/login');
  }

  const currentTitle = findMenuTitle(location.pathname);
  const selectedKeys = [dashboardEntry, ...menuGroups.flatMap((group) => group.items)]
    .filter((item) => {
      const [itemPath, itemSearch] = item.key.split('?');
      return (location.pathname === itemPath && (itemSearch ? location.search === `?${itemSearch}` : !location.search)) || (item.key !== dashboardKey && !itemSearch && !location.search && location.pathname.startsWith(itemPath));
    })
    .map((item) => item.key);

  const userMenu: MenuProps['items'] = [
    { key: 'logout', label: '退出登录', icon: <LogoutOutlined />, onClick: onLogout },
  ];

  return (
    <Layout className="admin-shell">
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={232}
        collapsedWidth={64}
        className="admin-sider"
      >
        <div className="admin-sider-brand">
          <div className="admin-brand-icon">W</div>
          {!collapsed && (
            <div className="admin-brand-text">
              <span className="admin-brand-title">官网后台</span>
              <span className="admin-brand-sub">Blueprint</span>
            </div>
          )}
        </div>

        <div className="admin-sider-divider" />

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={(info) => navigate(info.key)}
          className="admin-menu"
        />

        <div className="admin-sider-spacer" />

        <div className="admin-sider-footer">
          <button type="button" className="admin-collapse-btn" onClick={() => setCollapsed((v) => !v)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {!collapsed && <span>收起菜单</span>}
          </button>
        </div>
      </Sider>

      <Layout className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <LayoutOutlined style={{ color: '#94a3b8', fontSize: 13 }} />
            <span className="admin-topbar-breadcrumb">后台 / {currentTitle}</span>
          </div>
          <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={['click']}>
            <button type="button" className="admin-user-btn">
              <Avatar size={28} icon={<UserOutlined />} style={{ background: '#f1f3f6', color: '#5b6b7f' }} />
              <span>管理员</span>
            </button>
          </Dropdown>
        </header>

        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
