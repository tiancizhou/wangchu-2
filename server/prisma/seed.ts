import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth.js';

const legalStatementSections = [
  {
    heading: '我们的责任',
    paragraphs: [
      '本站内的信息、内容不是全面的。尽管我们非常努力，但他们可能不是精确的、及时更新的或适合于任何特殊情况。我们不承担因不精确确或遗漏而产生的责任，但欺骗性的错误表述除外。您根据本站内的信息而做出的决定应完全是您的责任。桔尔润（北京）润滑油有限公司以及其子公司不承担因登录本站、使用本站或使用本站内的信息而产生的任何直接和间接的损失或损害。当然，如果您发电子邮件至juerrun@163.com提出问题，我们非常高兴和您讨论。',
      '如果您提供的信息是有关个人方面的信息，我们将根据网站的《用户隐私声明》予以对待，否则，如果您提供信息给我们，视为同意我们对这些信息拥有无限的权利，我们可以选择任何方式使用这些信息。这些信息将不构成机密信息。'
    ]
  },
  {
    heading: '本网站的版权和商标所有权',
    paragraphs: [
      '除非另有规定，本站的全部内容和下载内容直接归所有我司或通过子公司间接归其所有。版权所有，违者必究。',
      '您有责任遵守所有可适用的版权法。我们允许您在浏览网页的过程中进行复制作为必要的附带行为；为个人合理使用之目的，您可以打印本站内容，但严禁用于其它方面。“kronprinsK”“kronprins”“王储”产品的品牌都是商标，归桔尔润（北京）润滑油有限公司所有。没有我们的明示许可，您不得抄袭本站，也不可将其连接到主页以外的其它网页。'
    ]
  },
  {
    heading: '链接使用',
    paragraphs: [
      '我们和我们的子公司不对其它网站的内容负责，包括友情链接网站的内容。我们对这些网站或链接不负任何相关责任。',
      '如果我们对第三方网站提供超级连接，那是因为我们诚实地相信该网站含有或可能含有与我们的网站内容相关的材料。这链接并不意味着桔尔润（北京）润滑油有限公司或其子公司已经检查过或赞成该第三方网站或其内容——实际上有时候超链接链接到的第三方网站所载的观点可能与桔尔润（北京）润滑油有限公司或其子公司网站的内容相矛盾。'
    ]
  },
  {
    heading: '本网站所适用的法律',
    paragraphs: [
      '您对本网站和其下载内容的使用及这些条件条款的作用均适用中国法律，对于因使用本网站引起的纠纷，管辖地法院应拥有排他性的管辖权。',
      '倘主管当局认为这些条件条款的任何条款或条款的任何部分在某一限度内无效、非法或不可实施，则该条款将在相应限度内终止效力，其余条款仍将在法律允许的最大限度内有效和实施。'
    ]
  },
  {
    heading: '版权所有 翻版必究',
    paragraphs: []
  }
];

const prisma = new PrismaClient();

const categories = [
  { name: '汽油机油', slug: 'gasoline-oil', sortOrder: 1 },
  { name: '柴油机油', slug: 'diesel-oil', sortOrder: 2 },
  { name: '工业油品', slug: 'industrial-oil', sortOrder: 3 },
  { name: '导热油', slug: 'thermal-oil', sortOrder: 4 },
  { name: '润滑油', slug: 'lubricating-oil', sortOrder: 5 },
  { name: '特种油品研发', slug: 'special-oil', sortOrder: 6 }
];

const currentNavigationItems = [
  { label: '关于我们', url: '/#about', sortOrder: 1 },
  { label: '产品与项目分类', url: '/products', sortOrder: 2 },
  { label: '生产与智造', url: '/#process', sortOrder: 3 },
  { label: '项目案例', url: '/#project-cases', sortOrder: 4 },
  { label: '联系我们', url: '/contact', sortOrder: 5 }
];

const obsoleteContentSections = [
  { pageKey: 'home', sectionKey: 'featureCards' },
  { pageKey: 'home', sectionKey: 'supportModule' },
  { pageKey: 'home', sectionKey: 'certificatePreview' },
  { pageKey: 'support', sectionKey: 'supportPage' },
  { pageKey: 'consult', sectionKey: 'contactPanel' },
  { pageKey: 'supportDetails', sectionKey: 'productionBlending' },
  { pageKey: 'supportDetails', sectionKey: 'labTesting' },
  { pageKey: 'supportDetails', sectionKey: 'qualityInspection' }
];

const contentSections = [
  {
    pageKey: 'home',
    sectionKey: 'aboutPreview',
    title: '关于我们',
    subtitle: '桔尔润（北京）润滑油有限公司',
    data: {
      imageUrl: '',
      galleryImages: [],
      body: '桔尔润（北京）润滑油有限公司成立于2004年，位于北京市，厂区占地面积150余亩。公司专注润滑油产品研发、生产与渠道服务，围绕汽车润滑、工业润滑和特种油品场景，为客户提供稳定可靠的产品和合作支持。\n\n桔尔润坚持以研发生产为核心，建立规范化生产、检测和交付体系，持续提升产品品质与服务效率。\n\n公司拥有完善的渠道服务体系，可为客户提供产品供应、包装定制、交付安排和合作运营支持。',
      linkUrl: '/about',
      items: [
        { description: '桔尔润（北京）润滑油有限公司成立于2004年，位于北京市，厂区占地面积150余亩，强大实力让您放心。' },
        { description: '桔尔润坚持以研发生产为核心，围绕汽车润滑、工业润滑和特种油品场景提供稳定产品。' },
        { description: '公司拥有完善的渠道服务体系，为客户提供可靠的产品交付与合作支持。' }
      ]
    }
  },
  {
    pageKey: 'home',
    sectionKey: 'processModule',
    title: '生产与智造',
    subtitle: '桔尔润（北京）润滑油有限公司',
    data: {
      items: [
        {
          title: '灌装线',
          description: '自动化灌装流程提升生产效率，保障产品包装规格统一、出厂品质稳定。',
          imageUrl: '',
          galleryImages: [],
          linkUrl: '/process/filling-line',
          sections: [{ paragraphs: ['自动化灌装流程提升生产效率，围绕灌装、封口、贴标和装箱等环节建立规范化作业流程，保障产品包装规格统一、出厂品质稳定。'] }]
        },
        {
          title: '设备管理',
          description: '规范化设备管理保障生产连续性与品质稳定。',
          imageUrl: '',
          galleryImages: [],
          linkUrl: '/process/equipment-management',
          sections: [{ paragraphs: ['通过规范化设备管理、日常维护和运行检查，保障生产设备保持稳定状态，为连续生产和品质控制提供可靠基础。'] }]
        },
        {
          title: '设备',
          description: '成熟设备体系满足多类油品生产需求。',
          imageUrl: '',
          galleryImages: [],
          linkUrl: '/process/equipment',
          sections: [{ paragraphs: ['成熟设备体系覆盖调和、灌装、检测和辅助生产环节，能够满足多类润滑油产品生产需求，并支持不同规格订单的稳定交付。'] }]
        },
        {
          title: '仓储',
          description: '规范仓储管理保障产品交付效率。',
          imageUrl: '',
          galleryImages: [],
          linkUrl: '/process/warehouse',
          sections: [{ paragraphs: ['规范仓储管理围绕产品入库、存放、出库和交付流程展开，保障产品存放安全、库存清晰和订单交付效率。'] }]
        }
      ]
    }
  },
  {
    pageKey: 'home',
    sectionKey: 'projectCases',
    title: '项目案例',
    subtitle: '桔尔润（北京）润滑油有限公司',
    data: {
      items: [
        { title: '汽车润滑油项目', subtitle: '为汽车行业提供高性能润滑油解决方案', imageUrl: '', sections: [{ paragraphs: ['围绕汽车发动机润滑、清洁和保护需求，提供稳定可靠的润滑油产品组合，适配多类车辆使用场景。', '项目执行过程中结合客户渠道定位、包装规格和交付节奏，提供产品供应与应用支持。'] }] },
        { title: '工业润滑油项目', subtitle: '工业设备润滑维护一站式服务', imageUrl: '', sections: [{ paragraphs: ['面向工业设备长期运行和维护需求，提供覆盖润滑、防护和稳定运行的油品解决方案。', '通过规范化产品检测和供应管理，协助客户提升设备维护效率与产品使用稳定性。'] }] },
        { title: '特种油品研发', subtitle: '针对特殊场景定制研发油品', imageUrl: '', sections: [{ paragraphs: ['针对特殊工况、特定应用场景和差异化性能要求，开展油品配方沟通与产品研发支持。', '依托研发、检测与生产协同能力，为客户提供从需求确认到样品验证的服务流程。'] }] },
        { title: '品牌定制服务', subtitle: '成熟的品牌定制与产品包装方案', imageUrl: '', sections: [{ paragraphs: ['为合作客户提供品牌定制、包装设计和产品组合建议，支持渠道建设与终端展示。', '结合客户市场定位制定产品规格、包装形象和交付计划，帮助客户提升运营效率。'] }] },
        { title: '导热油项目', subtitle: '高温导热油应用解决方案', imageUrl: '', sections: [{ paragraphs: ['围绕高温传热系统的稳定运行需求，提供导热油产品与应用建议。', '项目服务覆盖产品选型、供应保障和后续使用沟通，帮助客户维护系统运行稳定性。'] }] },
        { title: '合成油脂项目', subtitle: '高性能合成油脂研发与生产', imageUrl: '', sections: [{ paragraphs: ['面向高性能润滑与防护需求，提供合成油脂产品研发和生产支持。', '通过原料、工艺和检测环节协同控制，保障产品性能表现与交付品质。'] }] }
      ]
    }
  },
  {
    pageKey: 'products',
    sectionKey: 'advantages',
    title: '加盟优势',
    subtitle: '桔尔润（北京）润滑油有限公司',
    data: {
      items: [
        { title: '产品优势', description: '成熟产品体系覆盖多类应用场景。', icon: '●' },
        { title: '价格优势', description: '源头供应和高效管理带来合作空间。', icon: '●' },
        { title: '品质保障', description: '标准检测流程保障产品稳定可靠。', icon: '●' },
        { title: '技术优势', description: '技术团队提供产品设计与应用支持。', icon: '●' }
      ]
    }
  },
  {
    pageKey: 'products',
    sectionKey: 'benefits',
    title: '加盟福利',
    subtitle: '桔尔润（北京）润滑油有限公司',
    data: {
      items: [
        { title: '专属经理对接', description: '为合作客户提供专人对接服务。', icon: '●', linkUrl: '/benefits/dedicated-manager' },
        { title: '按需邮寄样品', description: '根据客户需求提供样品支持。', icon: '●', linkUrl: '/benefits/sample-delivery' },
        { title: '免费设计培训', description: '提供产品展示和渠道运营支持。', icon: '●', linkUrl: '/benefits/design-training' },
        { title: '展示物料支持', description: '协助完善终端展示和产品资料。', icon: '●', linkUrl: '/benefits/display-support' },
        { title: '共建实施方案', description: '结合客户市场制定合作方案。', icon: '●', linkUrl: '/benefits/implementation-plan' },
        { title: '建立长效机制', description: '持续跟进合作效果和供应需求。', icon: '●', linkUrl: '/benefits/long-term-service' }
      ]
    }
  },
  {
    pageKey: 'contact',
    sectionKey: 'contactInfo',
    title: '联系我们',
    subtitle: '',
    data: {
      body: '',
      mapImageUrl: '',
      items: [
        { label: '公司名称', value: '桔尔润（北京）润滑油有限公司' },
        { label: '公司地址', value: '北京市大兴区科创五街38号院' },
        { label: '联系电话', value: '0519-68288220' },
        { label: '服务热线', value: '0519-68288220' },
        { label: '电子邮箱', value: 'juerrun@163.com' }
      ]
    }
  },
  {
    pageKey: 'legal',
    sectionKey: 'legalStatement',
    title: '法律声明',
    subtitle: '',
    data: {
      sections: legalStatementSections
    }
  }
];

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123456';

  const adminUser = await prisma.adminUser.findUnique({ where: { username } });
  if (!adminUser) {
    await prisma.adminUser.create({
      data: {
        username,
        passwordHash: await hashPassword(password),
        role: 'admin'
      }
    });
  }

  const footerDefaults = {
    companyName: '桔尔润（北京）润滑油有限公司',
    phone: '0519-68288220',
    hotline: '0519-68288220',
    address: '北京市大兴区科创五街38号院',
    email: 'juerrun@163.com',
    footerText: '专注润滑油产品研发、生产与渠道服务',
    footerLinksJson: JSON.stringify([]),
    footerLinkTitle: '友情链接：',
    legalLabel: '法律声明',
    legalUrl: '/legal',
    contactLabel: '联系我们',
    contactUrl: '/contact',
    copyrightText: '© 桔尔润（北京）润滑油有限公司 版权所有',
    policeFilingText: '',
    policeFilingUrl: '',
    icpText: '',
    icpUrl: '',
    seoTitle: '王储润滑油官网',
    seoDescription: '桔尔润（北京）润滑油有限公司官方网站'
  };

  const siteProfile = await prisma.siteProfile.findFirst();
  if (!siteProfile) {
    await prisma.siteProfile.create({ data: footerDefaults });
  } else {
    await prisma.siteProfile.update({ where: { id: siteProfile.id }, data: footerDefaults });
  }

  await prisma.navigationItem.deleteMany({});
  await prisma.navigationItem.createMany({ data: currentNavigationItems });

  for (const category of categories) {
    const existingCategory = await prisma.productCategory.findUnique({ where: { slug: category.slug } });
    if (!existingCategory) {
      await prisma.productCategory.create({ data: category });
    }
  }

  const categoryRows = await prisma.productCategory.findMany();
  const categoryByName = new Map(categoryRows.map((category) => [category.name, category]));

  const products = [
    {
      name: '全合成S88 0W-40',
      slug: 's88-0w-40',
      categoryName: '汽油机油',
      categoryId: categoryByName.get('汽油机油')?.id,
      topSubtitle: '高性能全合成汽油机油',
      detailTitle: 'OMAJIC-UV2030',
      detailDescription: '适用于多种汽油发动机，提供稳定润滑表现。',
      productSpecsImageUrl: '',
      detailGalleryJson: JSON.stringify([{ imageUrl: '', caption: '细节' }, { imageUrl: '', caption: '细节' }]),
      performanceTitle: '稳定的生产表现',
      performanceText: '稳定油膜保护，适配多种驾驶场景。',
      performanceItemsJson: JSON.stringify([{ icon: '⚙', title: '稳定润滑', description: '持续提供稳定油膜保护。' }, { icon: '▣', title: '品质检测', description: '严格检测后出厂。' }, { icon: '●', title: '应用支持', description: '覆盖多种使用场景。' }, { icon: '▰', title: '快速交付', description: '成熟供应链保障交付。' }]),
      sortOrder: 1
    },
    {
      name: '半合成S86',
      slug: 's86',
      categoryName: '柴油机油',
      categoryId: categoryByName.get('柴油机油')?.id,
      topSubtitle: '兼顾保护与经济性的半合成机油',
      detailTitle: '半合成S86',
      detailDescription: '满足日常车辆润滑保护需求。',
      sortOrder: 2
    },
    {
      name: 'API CI-4',
      slug: 'api-ci-4',
      categoryName: '工业油品',
      categoryId: categoryByName.get('工业油品')?.id,
      topSubtitle: '工业与商用设备润滑产品',
      detailTitle: 'API CI-4',
      detailDescription: '适用于重载工况和工业设备维护。',
      sortOrder: 3
    }
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existingProduct) {
      await prisma.product.create({ data: product });
    }
  }

  const bannerCount = await prisma.carouselBanner.count();
  if (bannerCount === 0) {
    await prisma.carouselBanner.create({
      data: {
        title: '极摩动力 超凡表现',
        subtitle: '专注润滑油产品与技术服务',
        imageUrl: '',
        linkUrl: '/products',
        sortOrder: 1
      }
    });
  }

  for (const section of obsoleteContentSections) {
    await prisma.contentSection.deleteMany({ where: section });
  }

  for (const section of contentSections) {
    await prisma.contentSection.upsert({
      where: { pageKey_sectionKey: { pageKey: section.pageKey, sectionKey: section.sectionKey } },
      update: {
        title: section.title,
        subtitle: section.subtitle || '',
        dataJson: JSON.stringify(section.data)
      },
      create: {
        pageKey: section.pageKey,
        sectionKey: section.sectionKey,
        title: section.title,
        subtitle: section.subtitle || '',
        dataJson: JSON.stringify(section.data)
      }
    });
  }

  const legacyName = '稼尔润（北京）润滑油有限公司';
  const correctName = '桔尔润（北京）润滑油有限公司';
  const sectionsWithLegacyName = await prisma.contentSection.findMany({ where: { subtitle: legacyName } });
  for (const section of sectionsWithLegacyName) {
    await prisma.contentSection.update({ where: { id: section.id }, data: { subtitle: correctName } });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
