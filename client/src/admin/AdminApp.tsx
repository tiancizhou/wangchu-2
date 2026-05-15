import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { adminTheme } from './theme';

const desktopViewport = 'width=1280, initial-scale=1.0';
const defaultViewport = 'width=device-width, initial-scale=1.0';

function AdminFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return null;
}

export function AdminApp() {
  useEffect(() => {
    const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    const previousContent = viewport?.content;

    if (viewport) viewport.content = desktopViewport;

    return () => {
      if (viewport) viewport.content = previousContent || defaultViewport;
    };
  }, []);

  return (
    <>
      <AdminFonts />
      <ConfigProvider theme={adminTheme} locale={zhCN}>
        <AntdApp>
          <Outlet />
        </AntdApp>
      </ConfigProvider>
    </>
  );
}
