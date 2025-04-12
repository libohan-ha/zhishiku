import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">个人知识库</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">记录、整理和复习您的学习内容</p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/knowledge/new"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                创建知识条目
              </span>
            </Link>
            <Link
              href="/knowledge"
              className="bg-gray-100 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                浏览知识库
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">记录单词和语法</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">轻松记录您学习的单词、短语和语法规则，随时查阅和复习。</p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
              <li>分类整理学习内容</li>
              <li>添加例句和解释</li>
              <li>使用标签进行组织</li>
            </ul>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">高效学习和复习</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">通过强大的搜索和过滤功能，快速找到您需要的知识点。</p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
              <li>全文搜索功能</li>
              <li>按分类和标签筛选</li>
              <li>个性化学习路径</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-center">开始使用</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">只需几个简单的步骤，即可开始构建您的个人知识库</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="text-center bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">1</div>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">添加知识条目</h3>
              <p className="text-xs sm:text-sm text-gray-600">记录您的学习内容</p>
            </div>

            <div className="text-center bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">2</div>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">组织和分类</h3>
              <p className="text-xs sm:text-sm text-gray-600">选择合适的分类</p>
            </div>

            <div className="text-center bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">3</div>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">复习和学习</h3>
              <p className="text-xs sm:text-sm text-gray-600">随时查阅和学习</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
