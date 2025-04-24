"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Search from "@/components/ui/search/Search";
import Card from "@/components/ui/cards/Card";

// Mock data for search suggestions
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "User" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Admin" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "User" },
  { id: 6, name: "Sarah Brown", email: "sarah@example.com", role: "Editor" },
];

const mockProducts = [
  { id: 1, name: "Laptop Pro", price: "$1299", category: "Electronics" },
  { id: 2, name: "Smartphone X", price: "$999", category: "Electronics" },
  { id: 3, name: "Wireless Headphones", price: "$199", category: "Audio" },
  { id: 4, name: "Smart Watch", price: "$349", category: "Wearables" },
  { id: 5, name: "Gaming Console", price: "$499", category: "Gaming" },
];

const SearchPage = () => {
  const [basicSearch, setBasicSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // Filter users based on search term
  const filterUsers = (term: string) => {
    if (!term) return [];
    
    const normalizedTerm = term.toLowerCase();
    return mockUsers.filter((user) => 
      user.name.toLowerCase().includes(normalizedTerm) || 
      user.email.toLowerCase().includes(normalizedTerm) ||
      user.role.toLowerCase().includes(normalizedTerm)
    );
  };

  // Filter products based on search term
  const filterProducts = (term: string) => {
    if (!term) return [];
    
    const normalizedTerm = term.toLowerCase();
    return mockProducts.filter((product) => 
      product.name.toLowerCase().includes(normalizedTerm) || 
      product.category.toLowerCase().includes(normalizedTerm)
    );
  };

  // Handle search submission
  const handleSearchSubmit = (value: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
      if (selectedCategory === 'users') {
        setSearchResults(filterUsers(value));
      } else if (selectedCategory === 'products') {
        setSearchResults(filterProducts(value));
      } else {
        // All categories
        setSearchResults([...filterUsers(value), ...filterProducts(value)]);
      }
      setIsSearching(false);
    }, 500); // Simulate API delay
  };

  // Render search suggestions
  const renderSuggestions = (value: string) => {
    const filteredUsers = filterUsers(value).slice(0, 3);
    
    if (filteredUsers.length === 0) {
      return (
        <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
          No suggestions found
        </div>
      );
    }
    
    return (
      <div className="py-2">
        <p className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          User Suggestions
        </p>
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between"
            onClick={() => {
              setBasicSearch(user.name);
              handleSearchSubmit(user.name);
            }}
          >
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300 self-center">
              {user.role}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Search Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Basic Search Examples */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Search Components
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different search input variants and sizes.
              </p>

              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Search</h5>
                  <Search 
                    placeholder="Search..." 
                    value={basicSearch} 
                    onChange={setBasicSearch}
                    onSubmit={handleSearchSubmit}
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filled Variant</h5>
                  <Search 
                    placeholder="Search products..." 
                    variant="filled"
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimal Variant</h5>
                  <Search 
                    placeholder="Quick search..." 
                    variant="minimal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Small Size</h5>
                    <Search 
                      placeholder="Search..." 
                      size="sm"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medium Size (Default)</h5>
                    <Search 
                      placeholder="Search..." 
                      size="md"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Large Size</h5>
                    <Search 
                      placeholder="Search..." 
                      size="lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Square Corners</h5>
                    <Search 
                      placeholder="Search..." 
                      rounded="none"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rounded Corners</h5>
                    <Search 
                      placeholder="Search..." 
                      rounded="md"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pill Shaped</h5>
                    <Search 
                      placeholder="Search..." 
                      rounded="full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Search Features */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Advanced Search Features
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Search components with advanced features like suggestions, loading states, and custom icons.
              </p>

              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search with Suggestions</h5>
                  <Search 
                    placeholder="Search users..." 
                    renderSuggestions={renderSuggestions}
                    minCharacters={2}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Type at least 2 characters to see suggestions
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search with Loading State</h5>
                  <Search 
                    placeholder="Enter search term..." 
                    loading={isSearching}
                    onSubmit={handleSearchSubmit}
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search with Custom Icon</h5>
                  <Search 
                    placeholder="Filter results..." 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    }
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disabled Search</h5>
                  <Search 
                    placeholder="Search disabled..." 
                    disabled
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auto-submit on Input</h5>
                  <Search 
                    placeholder="Search as you type..." 
                    submitOnInput
                    debounceTime={500}
                    onSubmit={(value) => console.log('Searching for:', value)}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Search is triggered automatically as you type (with 500ms debounce)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search Application Example */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Search Application Example
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A complete search application example with category filtering and results display.
              </p>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <Search 
                      placeholder={`Search ${selectedCategory !== 'all' ? selectedCategory : ''}...`}
                      value={basicSearch}
                      onChange={setBasicSearch}
                      onSubmit={handleSearchSubmit}
                      loading={isSearching}
                      size="lg"
                      fullWidth
                    />
                  </div>
                  <div className="md:w-48">
                    <select
                      className="w-full h-12 rounded-md border border-gray-300 bg-white px-4 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="users">Users</option>
                      <option value="products">Products</option>
                    </select>
                  </div>
                </div>

                {/* Search Results */}
                <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300">
                      Search Results {searchResults.length > 0 && `(${searchResults.length})`}
                    </h5>
                  </div>
                  
                  {searchResults.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">No results found</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y dark:divide-gray-700">
                      {searchResults.map((result, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                          {result.email ? (
                            // User result
                            <div className="flex justify-between items-center">
                              <div>
                                <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200">{result.name}</h6>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{result.email}</p>
                              </div>
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                {result.role}
                              </span>
                            </div>
                          ) : (
                            // Product result
                            <div className="flex justify-between items-center">
                              <div>
                                <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200">{result.name}</h6>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{result.category}</p>
                              </div>
                              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                {result.price}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search in Header Example */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Header/Toolbar Search Examples
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Examples of search components integrated into headers or toolbars.
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-2">
                    <div className="font-medium text-gray-800 dark:text-white">Dashboard</div>
                    <div className="w-full md:w-64">
                      <Search 
                        placeholder="Search dashboard..." 
                        size="sm"
                        variant="minimal"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-600 dark:bg-primary-800 rounded-lg p-2">
                  <div className="flex justify-between items-center gap-3 p-2">
                    <div className="font-medium text-white">Products</div>
                    <div className="w-full md:w-64">
                      <Search 
                        placeholder="Find products..." 
                        size="sm"
                        variant="minimal"
                        rounded="full"
                        className="bg-primary-500/30 text-white border-primary-400"
                        inputClassName="placeholder-primary-200"
                        iconClassName="text-primary-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
                  <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
                    <h5 className="font-medium">User Management</h5>
                    <div className="flex space-x-2">
                      <Search 
                        placeholder="Search users..." 
                        size="sm"
                      />
                      <button className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Add User
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 dark:text-gray-400">Content goes here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SearchPage;
