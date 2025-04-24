"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DataGrid, { Column } from "@/components/ui/data-grid/DataGrid";
import Image from "next/image";

// Sample user data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

// Sample product data
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample order data
interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  payment: string;
}

const DataGridPage = () => {
  // Mock data for users
  const userData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2025-04-22', avatar: '/images/user/user-01.png' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '2025-04-21', avatar: '/images/user/user-02.png' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2025-04-15', avatar: '/images/user/user-03.png' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', lastActive: '2025-04-20', avatar: '/images/user/user-04.png' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Admin', status: 'Active', lastActive: '2025-04-19', avatar: '/images/user/user-05.png' },
    { id: 6, name: 'Sarah Taylor', email: 'sarah@example.com', role: 'Viewer', status: 'Active', lastActive: '2025-04-18', avatar: '/images/user/user-01.png' },
    { id: 7, name: 'David Martinez', email: 'david@example.com', role: 'Editor', status: 'Inactive', lastActive: '2025-04-10', avatar: '/images/user/user-02.png' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Viewer', status: 'Active', lastActive: '2025-04-17', avatar: '/images/user/user-03.png' },
  ];

  // Mock data for products
  const productData: Product[] = [
    { id: 1, name: 'Modern Desk Chair', category: 'Furniture', price: 199.99, stock: 25, rating: 4.5 },
    { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 149.99, stock: 42, rating: 4.8 },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 18, rating: 4.2 },
    { id: 4, name: 'Coffee Maker', category: 'Kitchen', price: 89.99, stock: 31, rating: 4.7 },
    { id: 5, name: 'Yoga Mat', category: 'Fitness', price: 29.99, stock: 56, rating: 4.3 },
    { id: 6, name: 'Leather Notebook', category: 'Office', price: 24.99, stock: 73, rating: 4.4 },
    { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, stock: 22, rating: 4.6 },
    { id: 8, name: 'Stainless Water Bottle', category: 'Kitchen', price: 19.99, stock: 48, rating: 4.1 },
  ];

  // Mock data for orders
  const orderData: Order[] = [
    { id: 'ORD-1234', customer: 'John Doe', date: '2025-04-22', total: 299.99, status: 'Completed', payment: 'Credit Card' },
    { id: 'ORD-1235', customer: 'Jane Smith', date: '2025-04-21', total: 149.99, status: 'Processing', payment: 'PayPal' },
    { id: 'ORD-1236', customer: 'Robert Johnson', date: '2025-04-20', total: 89.99, status: 'Completed', payment: 'Credit Card' },
    { id: 'ORD-1237', customer: 'Emily Brown', date: '2025-04-19', total: 199.99, status: 'Shipped', payment: 'Credit Card' },
    { id: 'ORD-1238', customer: 'Michael Wilson', date: '2025-04-18', total: 54.98, status: 'Processing', payment: 'PayPal' },
    { id: 'ORD-1239', customer: 'Sarah Taylor', date: '2025-04-17', total: 79.99, status: 'Cancelled', payment: 'Credit Card' },
    { id: 'ORD-1240', customer: 'David Martinez', date: '2025-04-16', total: 349.98, status: 'Shipped', payment: 'PayPal' },
    { id: 'ORD-1241', customer: 'Lisa Anderson', date: '2025-04-15', total: 19.99, status: 'Completed', payment: 'Credit Card' },
  ];

  // User columns
  const userColumns: Column<User>[] = [
    {
      key: 'avatar',
      header: '',
      width: '60px',
      render: (value, row) => (
        <div className="relative h-8 w-8 rounded-full overflow-hidden">
          <Image src={value} alt={row.name} fill className="object-cover" />
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  // Product columns
  const productColumns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
      render: (value) => (
        <div>
          <span>{value}</span>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
            <div 
              className={`h-2 rounded-full ${
                value > 50 
                  ? 'bg-green-500' 
                  : value > 20 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`} 
              style={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <span className="mr-1">{value}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${
                  star <= Math.floor(value)
                    ? 'text-yellow-400' 
                    : star <= value + 0.5 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      ),
    },
  ];

  // Order columns
  const orderColumns: Column<Order>[] = [
    {
      key: 'id',
      header: 'Order ID',
      sortable: true,
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
    },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => {
        let statusClass = '';
        switch (value) {
          case 'Completed':
            statusClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
            break;
          case 'Processing':
            statusClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
            break;
          case 'Shipped':
            statusClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
            break;
          case 'Cancelled':
            statusClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
            break;
          default:
            statusClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'payment',
      header: 'Payment',
      sortable: true,
    },
  ];

  // State for selected rows
  const [selectedUserKeys, setSelectedUserKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRowClick = (row: User | Order | any) => {
    console.log('Row clicked:', row);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Data Grid Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Basic Data Grid */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Basic Data Grid
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A basic data grid with default styling.
            </p>
          </div>
          <DataGrid
            columns={userColumns}
            data={userData}
            bordered
            striped
          />
        </div>

        {/* Data Grid with Pagination */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Data Grid with Pagination
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              A data grid with built-in pagination for handling larger datasets.
            </p>
          </div>
          <DataGrid
            columns={productColumns}
            data={productData}
            pagination
            pageSize={5}
            bordered
            striped
          />
        </div>

        {/* Selectable Data Grid */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Selectable Data Grid
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A data grid with selectable rows for batch operations.
            </p>
          </div>
          <div className="mb-4">
            <button 
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedUserKeys.length === 0}
              onClick={() => alert(`Selected ${selectedUserKeys.length} users`)}
            >
              Process Selected ({selectedUserKeys.length})
            </button>
          </div>
          <DataGrid
            columns={userColumns}
            data={userData}
            selectable
            onSelectChange={(keys) => setSelectedUserKeys(keys)}
            bordered
            striped
          />
        </div>

        {/* Interactive Data Grid */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Interactive Data Grid
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A data grid with row click events for detailed views.
            </p>
          </div>
          <DataGrid
            columns={orderColumns}
            data={orderData}
            onRowClick={handleRowClick}
            bordered
            striped
            hoverable
          />
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Click on any row to view details. Check the console for the clicked row data.</p>
          </div>
        </div>

        {/* Loading State */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Loading State
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A data grid showing a loading state for asynchronous data fetching.
            </p>
          </div>
          <div className="mb-4">
            <button 
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              onClick={simulateLoading}
            >
              Simulate Loading
            </button>
          </div>
          <DataGrid
            columns={productColumns}
            data={loading ? [] : productData}
            loading={loading}
            bordered
            striped
          />
        </div>

        {/* Custom Styled Grid */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Custom Styled Grid
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A data grid with custom styling for specific rows and cells.
            </p>
          </div>
          <DataGrid
            columns={orderColumns}
            data={orderData}
            bordered
            rowClassName={(row) => 
              row.status === 'Cancelled' 
                ? 'bg-red-50 dark:bg-red-900/10' 
                : row.total > 200 
                  ? 'bg-green-50 dark:bg-green-900/10' 
                  : ''
            }
            cellClassName={(value, row, index, column) => 
              column.key === 'total' && value > 200 
                ? 'font-bold text-green-600 dark:text-green-400' 
                : ''
            }
          />
        </div>
      </div>
    </>
  );
};

export default DataGridPage;
