import { Card, Col, Row, Typography } from 'antd';
import {
  PictureOutlined,
  AppstoreOutlined,
  BulbOutlined,
  TeamOutlined,
  MessageOutlined,
  BankOutlined,
  ShoppingOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

type Entry = { to: string; title: string; description: string; icon: React.ReactNode };

const contentEntries: Entry[] = [
  { to: '/admin/banners', title: '轮播图管理', description: '上传和排序首页顶部展示的图片、动图或视频。', icon: <PictureOutlined /> },
  { to: '/admin/page/about', title: '关于我们', description: '编辑首页关于我们区域的公司简介、四图展示和底部说明。', icon: <TeamOutlined /> },
  { to: '/admin/products?tab=categories', title: '产品与项目分类', description: '维护首页产品与项目分类的名称、图片、说明和排序。', icon: <ShoppingOutlined /> },
  { to: '/admin/page/process', title: '生产与智造', description: '编辑生产与智造区域的背景图、项目图片和说明。', icon: <BulbOutlined /> },
  { to: '/admin/page/project-cases', title: '项目案例', description: '编辑首页项目案例图片、标题和说明。', icon: <AppstoreOutlined /> },
  { to: '/admin/page/contact', title: '联系我们', description: '编辑联系我们页面的联系信息和地图图片。', icon: <MessageOutlined /> },
  { to: '/admin/site', title: '页脚', description: '维护页脚公司信息、联系方式、友情链接和备案信息。', icon: <BankOutlined /> }
];

const dataEntries: Entry[] = [
  { to: '/admin/products', title: '产品管理', description: '统一管理产品列表、产品详情、分类入口、排序和发布状态。', icon: <ShoppingOutlined /> }
];

function EntryGrid({ entries }: { entries: Entry[] }) {
  return (
    <Row gutter={[16, 16]}>
      {entries.map((entry) => (
        <Col xs={24} sm={12} lg={8} xxl={6} key={entry.to}>
          <Link to={entry.to} style={{ display: 'block' }}>
            <Card hoverable style={{ height: '100%' }} styles={{ body: { display: 'flex', gap: 12, alignItems: 'flex-start' } }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(22, 119, 255, 0.08)', color: '#1677ff', display: 'grid', placeItems: 'center', fontSize: 18, flex: 'none' }}>{entry.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <Typography.Text strong>{entry.title}</Typography.Text>
                  <RightOutlined style={{ color: '#94a3b8' }} />
                </div>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0, marginTop: 4 }} ellipsis={{ rows: 2 }}>{entry.description}</Typography.Paragraph>
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>编辑目录</Typography.Title>
        <Typography.Text type="secondary">从下方选择要编辑的网站内容模块，每个入口对应一个前台可见的页面或区域。</Typography.Text>
      </div>
      <section>
        <Typography.Title level={5} style={{ marginBottom: 12 }}>内容编辑</Typography.Title>
        <EntryGrid entries={contentEntries} />
      </section>
      <section>
        <Typography.Title level={5} style={{ marginBottom: 12 }}>数据管理</Typography.Title>
        <EntryGrid entries={dataEntries} />
      </section>
    </div>
  );
}
