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
      <header className="bg-[#0f0f0f] border-b-4 border-[#a8e6cf] sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-7">
          <h1 className="text-5xl font-bold tracking-tighter text-white drop-shadow-sm">
            Game-M
          </h1>
          <p className="text-lg text-gray-400 mt-2">Fresh Gaming News • Every Day</p>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-[73px] z-40 bg-[#111111] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search news (GTA, Elden Ring, Mobile Legends...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-[#1a1a1a] border border-gray-700 focus:border-[#a8e6cf] rounded-2xl px-6 py-4 text-lg placeholder-gray-500 focus:outline-none transition-all"
            />
            <button
              onClick={refreshPage}
              className="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700 hover:border-[#a8e6cf] px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition-all active:scale-95"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-6xl mx-auto px-6 pb-5 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {['all', 'pc', 'mobile', 'esports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-[#a8e6cf] text-black shadow-md' 
                  : 'bg-[#1f1f1f] text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? 'All News' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="group bg-[#161616] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_30px_70px_rgba(168,230,207,0.15)] transition-all duration-700 hover:-translate-y-3"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-xs px-3 py-1 rounded-full">
                  {news.category.toUpperCase()}
                </div>
              </div>
              
              <div className="p-7">
                <p className="text-sm text-gray-500 mb-3 tracking-wide">{news.date}</p>
                <h2 className="text-2xl font-semibold leading-tight mb-5 group-hover:text-[#a8e6cf] transition-colors">
                  {news.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-[17px]">
                  {news.desc}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center mt-7 text-[#a8e6cf] font-semibold hover:text-white transition-colors"
                >
                  Read full story 
                  <span className="ml-2 text-xl">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-400">No matching news found</p>
            <p className="text-gray-500 mt-3">Try different keywords or clear the search</p>
          </div>
        )}
      </main>

      <footer className="text-center py-16 text-gray-500 text-sm border-t border-gray-900">
        Game-M • Built with ❤️ in Termux • Nairobi, Kenya
      </footer>
    </div>
  );
}

export default App;
