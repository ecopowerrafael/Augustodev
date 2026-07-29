import React, { useState } from 'react';
import { VektorBlogPost, VektorTab } from '../../types/vektor';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface VektorBlogSectionProps {
  posts: VektorBlogPost[];
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorBlogSection: React.FC<VektorBlogSectionProps> = ({ posts, setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<VektorBlogPost | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Inteligência & Guias Tributários</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
          Conteúdo prático para <span className="italic font-normal text-emerald-400">tomar decisões com segurança.</span>
        </h2>
        <p className="text-xs text-stone-400 font-serif leading-relaxed">
          Artigos escritos por nossos advogados tributaristas e contadores sêniores explicando mudanças na legislação, Fator R, BPO financeiro e estratégias de economia fiscal.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-4 font-mono text-xs">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['all', 'Planejamento Tributário', 'Gestão Empresarial', 'Abertura de Empresa', 'BPO Financeiro'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border transition ${
                selectedCategory === cat 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold' 
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat === 'all' ? 'Todos os Artigos' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500 text-xs font-mono"
          />
        </div>
      </div>

      {/* Articles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div 
            key={post.id}
            className="bg-[#181918] border border-stone-800 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-4">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter contrast-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-950/80 backdrop-blur-md border border-stone-800 text-emerald-300 font-mono text-[10px] uppercase font-bold rounded-lg">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-serif text-xl font-light text-stone-100 group-hover:text-emerald-300 transition leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-400 font-serif leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-500">{post.author}</span>
              <button
                onClick={() => setActiveArticleModal(post)}
                className="px-3 py-1.5 bg-stone-900 hover:bg-emerald-400 hover:text-stone-950 text-stone-200 font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1"
              >
                <span>Ler Artigo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-6 text-stone-100 max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 border-b border-stone-800 pb-4">
              <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] uppercase font-bold rounded-lg inline-block">
                {activeArticleModal.category}
              </span>
              <h3 className="font-serif text-3xl font-light text-stone-100">{activeArticleModal.title}</h3>
              <div className="flex items-center space-x-3 font-mono text-xs text-stone-400">
                <span>Por {activeArticleModal.author}</span>
                <span>•</span>
                <span>{activeArticleModal.date}</span>
              </div>
            </div>

            <div className="space-y-4 font-serif text-stone-300 leading-relaxed text-sm">
              <p className="font-bold text-white text-base leading-relaxed">{activeArticleModal.summary}</p>
              <p>{activeArticleModal.content}</p>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-300">Quer aplicar esta estratégia na sua empresa?</span>
              <button
                onClick={() => {
                  setActiveArticleModal(null);
                  setActiveTab('contato');
                }}
                className="px-4 py-2 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold rounded-xl hover:bg-emerald-300"
              >
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
