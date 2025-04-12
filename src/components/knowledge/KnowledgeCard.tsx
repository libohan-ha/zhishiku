'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type KnowledgeCardProps = {
  id: string;
  content: string;
  category?: string;
  createdAt: string;
  onDelete?: () => void;
};

export default function KnowledgeCard({
  id,
  content,
  category,
  createdAt,
  onDelete,
}: KnowledgeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Truncate content if it's too long
  const truncatedContent = content.length > 150
    ? content.substring(0, 150) + '...'
    : content;

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个知识条目吗？此操作不可撤销。')) {
      setIsDeleting(true);

      try {
        const { error } = await supabase
          .from('knowledge_items')
          .delete()
          .eq('id', id);

        if (error) throw error;

        if (onDelete) onDelete();
      } catch (error) {
        console.error('Error deleting knowledge item:', error);
        alert('删除失败，请重试');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          {category && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-3 sm:mb-4 whitespace-pre-line text-sm sm:text-base">{truncatedContent}</p>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm text-gray-500">
          <span className="order-2 sm:order-1">{formattedDate}</span>

          <div className="flex flex-wrap gap-3 order-1 sm:order-2">
            <Link
              href={`/knowledge/${id}`}
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              查看
            </Link>
            <Link
              href={`/knowledge/edit/${id}`}
              className="text-green-600 hover:underline inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              编辑
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:underline disabled:opacity-50 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeleting ? '删除中...' : '删除'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
