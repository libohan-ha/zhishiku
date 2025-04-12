'use client';

import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type KnowledgeItem = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  category: string | null;
};

export default function KnowledgeDetailPage() {
  const [item, setItem] = useState<KnowledgeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      fetchKnowledgeItem();
    }
  }, [id]);

  const fetchKnowledgeItem = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('knowledge_items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        setError('知识条目不存在或您没有权限查看');
        return;
      }

      setItem(data);
    } catch (error: any) {
      console.error('Error fetching knowledge item:', error);
      setError(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    if (window.confirm('确定要删除这个知识条目吗？此操作不可撤销。')) {
      try {
        const { error } = await supabase
          .from('knowledge_items')
          .delete()
          .eq('id', id);

        if (error) throw error;

        router.push('/knowledge');
      } catch (error) {
        console.error('Error deleting knowledge item:', error);
        alert('删除失败，请重试');
      }
    }
  };



  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <p>加载中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              href="/knowledge"
              className="text-blue-600 hover:underline"
            >
              返回知识库
            </Link>
          </div>
        ) : item ? (
          <>
            <div className="flex justify-end mb-4 sm:mb-6">
              <div className="flex space-x-2 sm:space-x-3">
                <Link
                  href={`/knowledge/edit/${item.id}`}
                  className="bg-green-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-green-700 inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  编辑
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-red-700 inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  删除
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                {item.category && (
                  <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full inline-block order-1 sm:order-2 self-start">
                    {item.category}
                  </span>
                )}

                <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                  创建于: {new Date(item.created_at).toLocaleDateString('zh-CN')}
                  {item.updated_at && item.updated_at !== item.created_at && (
                    <span> · 更新于: {new Date(item.updated_at).toLocaleDateString('zh-CN')}</span>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-sm sm:text-base">{item.content}</div>
              </div>
            </div>

            <div className="flex justify-start">
              <Link
                href="/knowledge"
                className="text-blue-600 hover:underline inline-flex items-center text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回知识库
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </MainLayout>
  );
}
