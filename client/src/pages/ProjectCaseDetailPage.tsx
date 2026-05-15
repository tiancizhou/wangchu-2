import { renderRichText } from '../utils/richText';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContentSections, type ContentSection } from '../api/publicApi';

type ArticleSection = { heading?: string; paragraphs?: string[] };
type ProjectCaseItem = { title?: string; subtitle?: string; description?: string; imageUrl?: string; sections?: ArticleSection[] };
type ProjectCasesData = { items?: ProjectCaseItem[] };

const projectCaseDetailLinks = [
  '/project-cases/automotive-lubricants',
  '/project-cases/industrial-lubricants',
  '/project-cases/special-oil-development',
  '/project-cases/brand-customization',
  '/project-cases/thermal-oil',
  '/project-cases/synthetic-grease'
];

const fallbackItems: ProjectCaseItem[] = [
  { title: '汽车润滑油项目', subtitle: '为汽车行业提供高性能润滑油解决方案' },
  { title: '工业润滑油项目', subtitle: '工业设备润滑维护一站式服务' },
  { title: '特种油品研发', subtitle: '针对特殊场景定制研发油品' },
  { title: '品牌定制服务', subtitle: '成熟的品牌定制与产品包装方案' },
  { title: '导热油项目', subtitle: '高温导热油应用解决方案' },
  { title: '合成油脂项目', subtitle: '高性能合成油脂研发与生产' }
];

function fallbackLink(index: number) {
  return projectCaseDetailLinks[index] || projectCaseDetailLinks[0];
}

export function ProjectCaseDetailPage() {
  const { slug = '' } = useParams();
  const [section, setSection] = useState<ContentSection<ProjectCasesData> | null>(null);

  useEffect(() => {
    getContentSections('home').then((sections) => setSection(sections.projectCases as ContentSection<ProjectCasesData> | undefined || null)).catch(() => {});
  }, []);

  const items = section?.data.items?.length ? section.data.items : fallbackItems;
  const item = items.find((_, index) => fallbackLink(index) === `/project-cases/${slug}`) || items[0] || fallbackItems[0];
  const title = item.title || '项目案例';
  const paragraphs = item.sections?.flatMap((entry) => entry.paragraphs || []).filter(Boolean);
  const body = paragraphs?.length ? paragraphs : [item.subtitle || item.description || '这里填写项目案例详情内容，可在后台维护正文内容。'];

  return (
    <main className="gray-page legal-page about-page">
      <div className="breadcrumb container">当前位置：<Link to="/">首页</Link> › <Link to="/#project-cases">项目案例</Link> › {title}</div>
      <section className="content-card container legal-content about-content">
        <article className="rich-text-placeholder legal-statement-document about-rich-text">
          <h1>{title}</h1>
          {item.imageUrl && <img className="about-page-image" src={item.imageUrl} alt={title} />}
          <section className="about-statement-section">
            {body.map((paragraph) => <p key={paragraph}>{renderRichText(paragraph)}</p>)}
          </section>
        </article>
      </section>
    </main>
  );
}
