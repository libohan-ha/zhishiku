'use client';

import KnowledgeForm from '@/components/knowledge/KnowledgeForm';
import MainLayout from '@/components/layout/MainLayout';

export default function NewKnowledgePage() {

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">创建知识条目</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <KnowledgeForm />
        </div>
      </div>
    </MainLayout>
  );
}
