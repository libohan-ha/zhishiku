'use client';

import KnowledgeCard from '@/components/knowledge/KnowledgeCard';
import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type KnowledgeItem = {
  id: string;
  content: string;
  created_at: string;
  category: string | null;
};

export default function KnowledgePage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>('单词');
  const categories = ['单词', '语法', '其他'];

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const fetchKnowledgeItems = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from('knowledge_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;

      setKnowledgeItems(data || []);
    } catch (error) {
      console.error('Error fetching knowledge items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // Refetch with the new category filter
    setTimeout(fetchKnowledgeItems, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter items client-side for simplicity
    // For a production app, you might want to implement server-side search
  };

  const handleDeleteItem = () => {
    // Refresh the list after deletion
    fetchKnowledgeItems();
  };

  // Filter items based on search term (client-side filtering)
  const filteredItems = searchTerm
    ? knowledgeItems.filter(
        item =>
          item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : knowledgeItems;



  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">我的知识库</h1>
          <Link
            href="/knowledge/new"
            className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:bg-blue-700 inline-flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            添加知识条目
          </Link>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-grow order-2 sm:order-1">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索知识条目..."
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-r-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="ml-1 sm:ml-2 hidden sm:inline">搜索</span>
                </button>
              </form>
            </div>

            <div className="w-full sm:w-auto sm:min-w-[160px] md:min-w-[200px] order-1 sm:order-2">
              <select
                value={selectedCategory || '单词'}
                onChange={(e) => handleCategoryChange(e.target.value || '单词')}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有分类</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>加载中...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">暂无知识条目</p>
            <Link
              href="/knowledge/new"
              className="text-blue-600 hover:underline"
            >
              创建第一个知识条目
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredItems.map((item) => (
              <KnowledgeCard
                key={item.id}
                id={item.id}
                content={item.content}
                category={item.category}
                createdAt={item.created_at}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
