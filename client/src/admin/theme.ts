import type { ThemeConfig } from 'antd';

export const adminTheme: ThemeConfig = {
  token: {
    colorPrimary: '#b47a08',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    colorInfo: '#2563eb',
    borderRadius: 6,
    fontSize: 13,
    fontFamily: '"DM Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f4f6f9',
    colorBorder: '#e2e7ee',
    colorBorderSecondary: '#eaeef3',
    colorText: '#1a2332',
    colorTextSecondary: '#5b6b7f',
    colorTextTertiary: '#94a3b8',
    colorFill: '#f1f3f6',
    colorFillSecondary: '#f8f9fb',
    boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
    boxShadowSecondary: '0 4px 16px rgba(0,0,0,.08)',
  },
  components: {
    Layout: {
      siderBg: '#ffffff',
      headerBg: '#ffffff',
      bodyBg: 'transparent',
      headerHeight: 0,
      headerPadding: '0',
    },
    Menu: {
      itemBg: 'transparent',
      subMenuItemBg: 'transparent',
      itemColor: '#5b6b7f',
      itemSelectedBg: 'rgba(180,122,8,.08)',
      itemSelectedColor: '#96630a',
      itemHoverBg: 'rgba(180,122,8,.05)',
      itemHoverColor: '#b47a08',
      groupTitleColor: '#94a3b8',
      itemMarginBlock: 2,
      fontSize: 13,
      iconSize: 15,
    },
    Card: {
      borderRadiusLG: 8,
      paddingLG: 20,
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#e2e7ee',
    },
    Table: {
      headerBg: '#f8f9fb',
      headerColor: '#5b6b7f',
      colorBgContainer: '#ffffff',
      rowHoverBg: 'rgba(180,122,8,.04)',
      borderColor: '#e2e7ee',
    },
    Button: {
      controlHeight: 34,
      borderRadius: 5,
      colorPrimary: '#b47a08',
      algorithm: true,
    },
    Input: {
      colorBgContainer: '#f8f9fb',
      colorBorder: '#e2e7ee',
      colorText: '#1a2332',
      activeBorderColor: '#b47a08',
      hoverBorderColor: '#c9a84c',
    },
    Select: {
      colorBgContainer: '#f8f9fb',
      colorBorder: '#e2e7ee',
      colorText: '#1a2332',
      optionSelectedBg: 'rgba(180,122,8,.1)',
    },
    Form: {
      labelColor: '#5b6b7f',
    },
    Typography: {
      colorText: '#1a2332',
      colorTextSecondary: '#5b6b7f',
    },
    Tabs: {
      colorBgContainer: 'transparent',
      itemColor: '#5b6b7f',
      itemSelectedColor: '#96630a',
      itemHoverColor: '#b47a08',
      inkBarColor: '#b47a08',
    },
    Tag: {
      colorBgContainer: 'transparent',
    },
    Switch: {
      colorPrimary: '#b47a08',
      colorPrimaryHover: '#c99620',
    },
    Modal: {
      contentBg: '#ffffff',
      headerBg: '#ffffff',
      titleColor: '#1a2332',
    },
    Dropdown: {
      colorBgElevated: '#ffffff',
    },
    Breadcrumb: {
      colorText: '#94a3b8',
      fontSize: 12,
    },
    Space: {
      size: 12,
    },
  },
};

export const adminPageBackground = '#f4f6f9';
