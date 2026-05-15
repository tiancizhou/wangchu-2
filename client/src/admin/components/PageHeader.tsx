import { Button, Space, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  publicLocation?: string;
  extra?: ReactNode;
};

export function PageHeader({ title, description, publicLocation, extra }: Props) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header-main">
        <Typography.Title level={3} className="admin-page-header-title">{title}</Typography.Title>
        {description && <Typography.Paragraph type="secondary" className="admin-page-header-desc">{description}</Typography.Paragraph>}
        {publicLocation && (
          <Typography.Text type="secondary" className="admin-page-header-location">
            <LinkOutlined />前台位置：
            <a href={publicLocation} target="_blank" rel="noreferrer">{publicLocation}</a>
          </Typography.Text>
        )}
      </div>
      {extra && <Space>{extra}</Space>}
    </div>
  );
}

export { Button as PageHeaderButton };
