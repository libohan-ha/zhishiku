'use client';

import KnowledgeForm from '@/components/knowledge/KnowledgeForm';
import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type KnowledgeItem = {
  id: string;
  content: string;
  category: string | null;
};

export default function EditKnowledgePage() {
  const [item, setItem] = useState<KnowledgeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
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
        .select('id, content, category')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        setError('知识条目不存在或您没有权限编辑');
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



  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">编辑知识条目</h1>

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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <KnowledgeForm initialData={item} isEditing={true} />
          </div>
        ) : null}
      </div>
    </MainLayout>
  );
}
