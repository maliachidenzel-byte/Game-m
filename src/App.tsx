import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  desc: string;
  category: string;
  image: string;
}

const newsData: NewsItem[] = [
  { id: 1, title: "GTA VI Release Date Rumors Heat Up", date: "April 18, 2026", desc: "Rockstar confirms another security incident but says it has no impact on development. Launch still eyed for late 2026.", category: "pc", image: "https://picsum.photos/id/1015/800/400" },
  { id: 2, title: "Mobile Legends New Hero Revealed", date: "April 17, 2026", desc: "Moonton introduces a highly mobile assassin hero popular in Kenya and East Africa servers.", category: "mobile", image: "https://picsum.photos/id/237/800/400" },
  { id: 3, title: "Elden Ring DLC Gets Massive Update", date: "April 16, 2026", desc: "FromSoftware releases new content that fans are calling one of the best expansions ever.", category: "pc", image: "https://picsum.photos/id/180/800/400" },
  { id: 4, title: "Valorant New Agent Leaked", date: "April 15, 2026", desc: "Riot Games preparing a new controller agent with unique smoke abilities.", category: "esports", image: "https://picsum.photos/id/201/800/400" },
  { id: 5, title: "Black Myth: Wukong Season 2 Announced", date: "April 14, 2026", desc: "Game Science confirms major new bosses and areas coming this summer.", category: "pc", image: "https://picsum.photos/id/251/800/400" },
  { id: 6, title: "Free Fire OB50 Update Brings New Map", date: "April 13, 2026", desc: "Garena introduces a massive new Bermuda-inspired map.", category: "mobile", image: "https://picsum.photos/id/133/800/400" },
  { id: 7, title: "League of Legends Worlds 2026 Qualifiers", date: "April 12, 2026", desc: "Top teams from Kenya and Africa begin their journey to Worlds.", category: "esports", image: "https://picsum.photos/id/870/800/400" },
  { id: 8, title: "New PS5 Pro Games Showcase", date: "April 11, 2026", desc: "Sony reveals upcoming titles optimized for the PS5 Pro.", category: "pc", image: "https://picsum.photos/id/106/800/400" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState(newsData);

  useEffect(() => {
    let result = newsData;

    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) || 
        item.desc.toLowerCase().includes(term)
      );
    }

    setFilteredNews(result);
  }, [searchTerm, activeCategory]);

  const refreshPage = () => window.location.reload();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b-4 border-[#a8e6cf] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Game-M</h1>
          <p className="text-base sm:text-lg text-gray-400 mt-1">Latest Video Game News</p>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-[73px] z-40 bg-[#111111] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-5 py-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-[#1a1a1a] border border-gray-700 focus:border-[#a8e6cf] rounded-2xl px-5 py-4 text-base placeholder-gray-500 focus:outline-none"
            />
            <button
              onClick={refreshPage}
              className="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700 hover:border-[#a8e6cf] px-7 py-4 rounded-2xl font-medium flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Categories - Scrollable on mobile */}
        <div className="max-w-6xl mx-auto px-5 pb-5 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {['all', 'pc', 'mobile', 'esports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-[#a8e6cf] text-black shadow-md' 
                  : 'bg-[#1f1f1f] text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid - Responsive */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="group bg-[#161616] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-52 sm:h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-[10px] px-3 py-1 rounded-full tracking-widest">
                  {news.category.toUpperCase()}
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-xs text-gray-500 mb-3">{news.date}</p>
                <h2 className="text-xl sm:text-2xl font-semibold leading-tight mb-4 group-hover:text-[#a8e6cf] transition-colors line-clamp-2">
                  {news.title}
                </h2>
                <p className="text-gray-300 text-[15px] leading-relaxed line-clamp-4">
                  {news.desc}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center mt-6 text-[#a8e6cf] font-semibold hover:text-white transition-colors text-sm"
                >
                  Read full story →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No results found</p>
            <p className="text-gray-500 mt-2">Try different search terms or category</p>
          </div>
        )}
      </main>

      <footer className="text-center py-12 text-gray-500 text-sm border-t border-gray-900">
        Game-M • Built in Termux • Nairobi, Kenya
      </footer>
    </div>
  );
}

export default App;
