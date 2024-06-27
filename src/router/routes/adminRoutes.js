import {lazy} from 'react';
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import( '../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));
const Sellers = lazy(() => import('../../views/admin/Sellers'));
const PaymentRequest = lazy(() => import('../../views/admin/PaymentRequest'));
const DeactivateSellers = lazy(() => import('../../views/admin/DeactivateSellers'));
const SellerRequest = lazy(() => import('../../views/admin/SellerRequest'));
const SellerDetails = lazy(() => import('../../views/admin/SellerDetails'));
const LiveChat = lazy(() => import('../../views/admin/LiveChat'));
const OrderDetails = lazy(() => import('../../views/admin/OrderDetails'));

export const adminRoutes = [
    {
        path : '/admin/dashboard',
        element : <AdminDashboard />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/orders',
        element : <Orders />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/category',
        element : <Category />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/sellers',
        element : <Sellers />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/payment-request',
        element : <PaymentRequest />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/deactivate-sellers',
        element : <DeactivateSellers />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/seller-request',
        element : <SellerRequest />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/seller/details/:sellerId',
        element : <SellerDetails />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/live-chat',
        element : <LiveChat />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/live-chat/:sellerId',
        element : <LiveChat />,
        ability : 'admin'
    },
    {
        path : '/admin/dashboard/order/details/:orderId',
        element : <OrderDetails />,
        ability : 'admin'
    },
]
