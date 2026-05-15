import { Typography } from 'antd';
import {
  PictureOutlined,
  AppstoreOutlined,
  BulbOutlined,
  TeamOutlined,
  MessageOutlined,
  BankOutlined,
  ShoppingOutlined,
  RightOutlined,
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
  { to: '/admin/site', title: '页脚', description: '维护页脚公司信息、联系方式、友情链接和备案信息。', icon: <BankOutlined /> },
];

const dataEntries: Entry[] = [
  { to: '/admin/products', title: '产品管理', description: '统一管理产品列表、产品详情、分类入口、排序和发布状态。', icon: <ShoppingOutlined /> },
];

function EntryCard({ entry, index }: { entry: Entry; index: number }) {
  return (
    <Link to={entry.to} className="dash-card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="dash-card-icon">{entry.icon}</div>
      <div className="dash-card-body">
        <div className="dash-card-head">
          <span className="dash-card-title">{entry.title}</span>
          <RightOutlined className="dash-card-arrow" />
        </div>
        <span className="dash-card-desc">{entry.description}</span>
      </div>
    </Link>
  );
}

export function DashboardPage() {
  return (
    <div className="dash-page">
      <header className="dash-header">
        <Typography.Title level={3} className="dash-title">编辑目录</Typography.Title>
        <p className="dash-subtitle">从下方选择要编辑的网站内容模块，每个入口对应一个前台可见的页面或区域。</p>
      </header>

      <section className="dash-section">
        <h4 className="dash-section-label">内容编辑</h4>
        <div className="dash-grid">
          {contentEntries.map((entry, i) => <EntryCard entry={entry} key={entry.to} index={i} />)}
        </div>
      </section>

      <section className="dash-section">
        <h4 className="dash-section-label">数据管理</h4>
        <div className="dash-grid">
          {dataEntries.map((entry, i) => <EntryCard entry={entry} key={entry.to} index={i + contentEntries.length} />)}
        </div>
      </section>
    </div>
  );
}
