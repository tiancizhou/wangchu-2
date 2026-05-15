import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AdminApp } from './admin/AdminApp';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AboutPage } from './pages/AboutPage';
import { BenefitDetailPage } from './pages/BenefitDetailPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ConsultPage } from './pages/ConsultPage';
import { ContactPage } from './pages/ContactPage';
import { FeatureDetailPage } from './pages/FeatureDetailPage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProcessDetailPage } from './pages/ProcessDetailPage';
import { ProjectCaseDetailPage } from './pages/ProjectCaseDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { SupportDetailPage } from './pages/SupportDetailPage';
import { SupportPage } from './pages/SupportPage';
import { BannersAdminPage } from './pages/admin/BannersAdminPage';
import { ContentSectionsAdminPage } from './pages/admin/ContentSectionsAdminPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { LoginPage } from './pages/admin/LoginPage';
import { PageEditorAdminPage } from './pages/admin/PageEditorAdminPage';
import { ProductEditPage } from './pages/admin/ProductEditPage';
import { ProductManagementAdminPage } from './pages/admin/ProductManagementAdminPage';
import { SiteSettingsPage } from './pages/admin/SiteSettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'consult', element: <ConsultPage /> },
      { path: 'certificates', element: <CertificatesPage /> },
      { path: 'legal', element: <LegalPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'features/:slug', element: <FeatureDetailPage /> },
      { path: 'benefits/:slug', element: <BenefitDetailPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'support/:slug', element: <SupportDetailPage /> },
      { path: 'process/:slug', element: <ProcessDetailPage /> },
      { path: 'project-cases/:slug', element: <ProjectCaseDetailPage /> }
    ]
  },
  {
    element: <AdminApp />,
    children: [
      { path: '/admin/login', element: <LoginPage /> },
      {
        path: '/admin',
        element: <ProtectedRoute />,
        children: [{ element: <AdminLayout />, children: [
          { index: true, element: <DashboardPage /> },
          { path: 'page/:page', element: <PageEditorAdminPage /> },
          { path: 'site', element: <SiteSettingsPage /> },
          { path: 'content', element: <ContentSectionsAdminPage /> },
          { path: 'categories', element: <Navigate to="/admin/products?tab=categories" replace /> },
          { path: 'products', element: <ProductManagementAdminPage /> },
          { path: 'products/new', element: <ProductEditPage /> },
          { path: 'products/:id/edit', element: <ProductEditPage /> },
          { path: 'banners', element: <BannersAdminPage /> }
        ] }]
      }
    ]
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}
