import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../admin/components';
import { ContentSectionsAdminPage, type ContentSectionEditorConfig } from './ContentSectionsAdminPage';

type PageTool = { title: string; description: string; to: string; action: string };
type PageEditorConfig = {
  title: string;
  publicLocation: string;
  description: string;
  tools: PageTool[];
  contentConfig?: ContentSectionEditorConfig;
  hideHeroDetails?: boolean;
};

const pageConfigs: Record<string, PageEditorConfig> = {
  home: {
    title: '首页',
    publicLocation: '/',
    description: '管理网站首页的轮播图、关于我们、产品与项目分类、生产与智造和项目案例内容。',
    tools: [
      { title: '首页轮播图', description: '上传和排序首页顶部的大图轮播。', to: '/admin/banners', action: '进入轮播图管理' },
      { title: '产品与项目分类', description: '首页产品与项目分类读取产品分类；在这里维护分类名称、图片、说明和排序。', to: '/admin/categories', action: '进入分类管理' },
      { title: '基础信息', description: '维护公司名称、Logo、联系电话和页脚信息。', to: '/admin/site', action: '进入基础信息' }
    ],
    contentConfig: {
      pageKey: 'home',
      title: '首页内容模块',
      description: '选择首页上的一个模块进行文字、图片和显示状态编辑。',
      editableKeys: ['aboutPreview', 'processModule', 'projectCases'],
      moduleHelp: {
        aboutPreview: '显示在首页”关于我们”区域，用于展示公司简介、四图展示和底部说明。',
        processModule: '显示在首页“生产与智造”区域，用于介绍制作工艺和设备能力。',
        projectCases: '显示在首页”项目案例”区域，用于展示项目案例图片、标题和说明。'
      },
      saveSuccessText: '首页内容已保存',
      saveButtonText: '保存首页内容'
    }
  },
  products: {
    title: '产品中心',
    publicLocation: '/products',
    description: '管理产品分类、产品列表，以及产品中心页面上的加盟优势和福利内容。',
    tools: [
      { title: '产品管理', description: '新增、编辑和隐藏网站展示的产品。', to: '/admin/products', action: '进入产品管理' },
      { title: '产品分类', description: '维护产品中心左侧分类和分类图片。', to: '/admin/categories', action: '进入分类管理' }
    ],
    contentConfig: {
      pageKey: 'products',
      title: '产品中心页面内容',
      description: '编辑产品中心页面中的合作优势和加盟福利内容。',
      editableKeys: ['advantages', 'benefits'],
      moduleHelp: {
        advantages: '显示在产品中心的加盟优势区域。',
        benefits: '显示在产品中心的加盟福利区域。'
      },
      loadingText: '产品中心内容加载中...',
      emptyText: '还没有产品中心内容模块，请先运行初始化数据。',
      saveSuccessText: '产品中心内容已保存',
      saveButtonText: '保存产品中心内容'
    }
  },
  process: {
    title: '生产与智造',
    publicLocation: '/#process',
    description: '',
    tools: [],
    hideHeroDetails: true,
    contentConfig: {
      pageKey: 'home',
      title: '生产与智造',
      description: '',
      editableKeys: ['processModule'],
      moduleHelp: {
        processModule: '显示在首页“生产与智造”区域，用于介绍制作工艺和设备能力。'
      },
      loadingText: '生产与智造加载中...',
      saveSuccessText: '生产与智造已保存',
      saveButtonText: '保存生产与智造',
      hideModuleSelector: true,
      hidePublishSwitch: true,
      hideBaseSettings: false,
      hidePageChrome: true,
      hideEditorHeader: true
    }
  },
  legal: {
    title: '法律声明',
    publicLocation: '/legal',
    description: '管理法律声明页面正文内容，前台保持法律文档固定版式。',
    tools: [],
    contentConfig: {
      pageKey: 'legal',
      title: '法律声明页面内容',
      description: '编辑法律声明页面正文内容。',
      editableKeys: ['legalStatement'],
      moduleHelp: {
        legalStatement: '显示在法律声明页面正文区域。'
      },
      loadingText: '法律声明内容加载中...',
      emptyText: '还没有法律声明内容模块，请先运行初始化数据。',
      saveSuccessText: '法律声明内容已保存',
      saveButtonText: '保存法律声明内容',
      hideModuleSelector: true,
      hideBaseSettings: true,
      hideEditorHeader: true,
      hidePageChrome: true
    }
  },
  'project-cases': {
    title: '项目案例',
    publicLocation: '/#project-cases',
    description: '',
    tools: [],
    hideHeroDetails: true,
    contentConfig: {
      pageKey: 'home',
      title: '项目案例',
      description: '',
      editableKeys: ['projectCases'],
      moduleHelp: {
        projectCases: '显示在首页“项目案例”区域，用于展示项目案例图片、标题和说明。'
      },
      loadingText: '项目案例加载中...',
      saveSuccessText: '项目案例已保存',
      saveButtonText: '保存项目案例',
      hideModuleSelector: true,
      hidePublishSwitch: true,
      hideBaseSettings: false,
      hidePageChrome: true,
      hideEditorHeader: true
    }
  },
  contact: {
    title: '联系我们',
    publicLocation: '/contact',
    description: '管理联系我们页面的地图图片、地址、电话、邮箱等联系信息。',
    tools: [],
    contentConfig: {
      pageKey: 'contact',
      title: '联系我们页面内容',
      description: '编辑联系我们页面左侧联系信息和右侧地图图片。',
      editableKeys: ['contactInfo'],
      moduleHelp: {
        contactInfo: '显示在联系我们页面的公司名称、地址、电话、邮箱和地图图片。'
      },
      loadingText: '联系我们内容加载中...',
      emptyText: '还没有联系我们内容模块，请先运行初始化数据。',
      saveSuccessText: '联系我们内容已保存',
      saveButtonText: '保存联系我们内容',
      hideModuleSelector: true,
      hideBaseSettings: true,
      hideEditorHeader: true,
      hidePageChrome: true
    }
  },
  about: {
    title: '关于我们',
    publicLocation: '/#about、/about',
    description: '',
    tools: [],
    hideHeroDetails: true,
    contentConfig: {
      pageKey: 'home',
      title: '关于我们',
      description: '',
      editableKeys: ['aboutPreview'],
      moduleHelp: {
        aboutPreview: '显示在首页“关于我们”区域，用于展示公司简介和图片。'
      },
      loadingText: '关于我们内容加载中...',
      saveSuccessText: '关于我们内容已保存',
      saveButtonText: '保存关于我们内容',
      hideModuleSelector: true,
      hidePublishSwitch: true,
      hideBaseSettings: true,
      hidePageChrome: true,
      hideEditorHeader: true
    }
  }
};

export function PageEditorAdminPage() {
  const { page = 'home' } = useParams();
  const config = pageConfigs[page] || pageConfigs.home;

  return (
    <div>
      <PageHeader title={config.title} description={config.hideHeroDetails ? undefined : config.description} publicLocation={config.hideHeroDetails ? undefined : config.publicLocation} />
      {config.tools.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {config.tools.map((tool) => (
            <Col xs={24} md={12} xl={6} key={tool.to}>
              <Card hoverable style={{ height: '100%' }}>
                <Space direction="vertical" size={12} style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <Typography.Title level={5} style={{ marginTop: 0 }}>{tool.title}</Typography.Title>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>{tool.description}</Typography.Paragraph>
                  </div>
                  <Link to={tool.to}><Button type="primary" icon={<ArrowRightOutlined />}>{tool.action}</Button></Link>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {config.contentConfig && <ContentSectionsAdminPage config={config.contentConfig} />}
    </div>
  );
}
