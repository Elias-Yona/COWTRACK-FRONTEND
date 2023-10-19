import { AiOutlineLineChart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiPieChart } from 'react-icons/fi';
import { BsBarChart } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { GiLouvrePyramid, GiFactory, GiSplitArrows } from 'react-icons/gi';
import { MdSupervisorAccount, MdLocalMall, MdBusinessCenter } from 'react-icons/md';
import { FaUserShield, FaFolder, FaMapMarker, FaCartArrowDown, FaMoneyBill, FaCashRegister, FaShareAlt } from 'react-icons/fa';


export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'sales metrics',
          icon: <AiOutlineLineChart />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'sales persons',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
        {
          name: 'supervisors',
          icon: <MdSupervisorAccount />,
        },
        {
          name: 'managers',
          icon: <FaUserShield />,
        },
        {
          name: 'suppliers',
          icon: <GiFactory />,
        },
        {
          name: 'products',
          icon: <MdLocalMall />,
        },
        {
          name: 'product categories',
          icon: <FaFolder />,
        },
        {
          name: 'locations',
          icon: <FaMapMarker />,
        },
        {
          name: 'branches',
          icon: <MdBusinessCenter />,
        },
        {
          name: 'cart',
          icon: <FaCartArrowDown />,
        },
        {
          name: 'payment methods',
          icon: <FaMoneyBill />,
        },
        {
          name: 'sales',
          icon: <FaCashRegister />,
        },
        {
          name: 'stock',
          icon: <AiOutlineStock />,
        },
        {
          name: 'stock transfers',
          icon: <GiSplitArrows />,
        },
        {
          name: 'stock distributions',
          icon: <FaShareAlt />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: 'stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];