import { BiSolidDashboard } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { MdPayments } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { MdMarkChatUnread } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { MdAddBox } from "react-icons/md";
import { IoIosWallet } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { RiProfileFill } from "react-icons/ri";

export const allNav = [
    {
        id : '1',
        title : 'Dashboard',
        icon : <BiSolidDashboard />,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : '2',
        title : 'Orders',
        icon : <FaCartArrowDown />,
        role : 'admin',
        path : '/admin/dashboard/orders'
    }, 
    {
        id : '3',
        title : 'Category',
        icon : <MdCategory />,
        role : 'admin',
        path : '/admin/dashboard/category'
    },
    {
        id : '4',
        title : 'Sellers',
        icon : <SiSellfy />,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id : '5',
        title : 'Payment Request',
        icon : <MdPayments />,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : '6',
        title : 'Deactive Sellers',
        icon : <SiAdblock />,
        role : 'admin',
        path : '/admin/dashboard/deactivate-sellers'
    },
    {
        id : '7',
        title : 'Seller Request',
        icon : <IoMdChatbubbles />,
        role : 'admin',
        path : '/admin/dashboard/seller-request'
    },
    {
        id : '8',
        title : 'Live Chat',
        icon : <MdMarkChatUnread />,
        role : 'admin',
        path : '/admin/dashboard/live-chat', 
    },
    {
        id : '9',
        title : 'Dashboard',
        icon : <BiSolidDashboard />,
        role : 'seller',
        path : '/seller/dashboard'
    },
    {
        id : '10',
        title : 'Add Product',
        icon : <MdAddBox />,
        role : 'seller',
        path : '/seller/dashboard/add-product'
    },
    {
        id : '11',
        title : 'All Products',
        icon : <IoIosWallet />,
        role : 'seller',
        path : '/seller/dashboard/all-products'
    },
    {
        id : '12',
        title : 'Discount Products',
        icon : <RiDiscountPercentFill />,
        role : 'seller',
        path : '/seller/dashboard/discount-products'
    },
    {
        id : '13',
        title : 'Orders ',
        icon : <FaCartArrowDown />,
        role : 'seller',
        path : '/seller/dashboard/orders'
    },
    {
        id : '14',
        title : 'Payments ',
        icon : <MdPayments />,
        role : 'seller',
        path : '/seller/dashboard/payments'
    },
    {
        id : '15',
        title : 'Chat-Customer ',
        icon : <IoMdChatbubbles />,
        role : 'seller',
        path : '/seller/dashboard/chat-customer'
    },
    {
        id : '16',
        title : 'Chat-Support ',
        icon : <MdMarkChatUnread />,
        role : 'seller',
        path : '/seller/dashboard/chat-support'
    },
    {
        id : '17',
        title : 'Profile ',
        icon : <RiProfileFill />,
        role : 'seller',
        path : '/seller/dashboard/profile'
    },
]