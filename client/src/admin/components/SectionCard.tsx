import { Card, Tag, Typography, Space } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useState, type ReactNode, useEffect } from 'react';

type Status = 'active' | 'hidden';

type Props = {
  title: string;
  description?: string;
  status?: Status;
  extra?: ReactNode;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  children: ReactNode;
};

function statusTag(status?: Status) {
  if (status === 'active') return <Tag color="success">显示中</Tag>;
  if (status === 'hidden') return <Tag>已隐藏</Tag>;
  return null;
}

export function SectionCard({ title, description, status, extra, defaultCollapsed = true, collapsed: controlled, onCollapsedChange, children }: Props) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const collapsed = controlled ?? internal;

  useEffect(() => {
    if (controlled !== undefined) setInternal(controlled);
  }, [controlled]);

  function toggle() {
    const next = !collapsed;
    if (controlled === undefined) setInternal(next);
    onCollapsedChange?.(next);
  }

  return (
    <Card bordered className="admin-section-card" styles={{ body: { padding: collapsed ? 0 : 20 } }}>
      <div onClick={toggle} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); }} className="admin-section-card-toggle">
        <CaretRightOutlined className={`admin-section-card-arrow${collapsed ? '' : ' admin-section-card-arrow-expanded'}`} />
        <div className="admin-section-card-title">
          <Space size={8} align="center" wrap>
            <Typography.Text strong>{title}</Typography.Text>
            {statusTag(status)}
          </Space>
          {description && <Typography.Paragraph type="secondary" className="admin-section-card-desc">{description}</Typography.Paragraph>}
        </div>
        {extra && <Space onClick={(e) => e.stopPropagation()}>{extra}</Space>}
      </div>
      {!collapsed && (
        <div className="admin-section-card-body">
          {children}
        </div>
      )}
    </Card>
  );
}
