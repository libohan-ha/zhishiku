'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CategoryType = '单词' | '语法' | '其他';

type KnowledgeFormProps = {
  initialData?: {
    id?: string;
    content: string;
    category: CategoryType | null;
  };
  isEditing?: boolean;
};

export default function KnowledgeForm({ initialData, isEditing = false }: KnowledgeFormProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState<CategoryType | null>(initialData?.category || '单词');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const router = useRouter();

  const categories: CategoryType[] = ['单词', '语法', '其他'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    try {
      if (isEditing && initialData?.id) {
        // Update existing knowledge item
        const { error } = await supabase
          .from('knowledge_items')
          .update({
            content,
            category,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);

        if (error) throw error;

        setMessage({ text: '知识条目已更新', type: 'success' });
        setTimeout(() => router.push('/knowledge'), 1500);
      } else {
        // Create new knowledge item
        const { error } = await supabase
          .from('knowledge_items')
          .insert({
            content,
            category,
          });

        if (error) throw error;

        setMessage({ text: '知识条目已创建', type: 'success' });
        setTimeout(() => router.push('/knowledge'), 1500);
      }
    } catch (error: any) {
      setMessage({ text: error.message || '保存失败', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          分类
        </label>
        <select
          id="category"
          value={category || '单词'}
          onChange={(e) => setCategory(e.target.value as CategoryType)}
          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="输入知识内容..."
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 gap-2 sm:gap-0 mt-4 sm:mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? '保存中...' : isEditing ? '更新' : '创建'}
        </button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-md ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
