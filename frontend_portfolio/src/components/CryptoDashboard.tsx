import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, BarChart, Bar,
  PieChart, Pie, Cell, Treemap,
  Legend
} from 'recharts';
import {
  ArrowUp, ArrowDown, Search, ArrowLeft, Database, Activity,
  ChevronLeft, ChevronRight, PieChart as PieIcon, Grid,
  Layers, BarChart2, TrendingUp, RotateCcw, AlertTriangle
} from 'lucide-react';

// --- TYPES ---
interface MarketCoin {
  symbol: string;
  name: string;
  price_usd: number;
  market_cap: number;
  total_volume: number;
  change_24h_pct: number;
  drawdown_pct: number;
  logo_url: string;
  rank: number;
}

interface HistoricalData {
  date: string;
  price_usd: number;
  moving_avg_7d: number;
  total_volume: number;
}

// --- COLORS ---
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#444'];

// --- FORMATTERS ---
const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
const fmtCompact = (n: number) => new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(n);

// --- Custom Axios Instance for extended timeout ---
const apiAxios = axios.create({ 
    timeout: 20000 
});


const CryptoDashboard: React.FC = () => {
  // STATE
  const [view, setView] = useState<'OVERVIEW' | 'DETAIL'>('OVERVIEW');
  const [marketData, setMarketData] = useState<MarketCoin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<MarketCoin | null>(null);
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // New States for Mobile/Cold Start Handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true); // To manage initial 2s delay


  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // API URL (FIXED: Using the correct import.meta.env for Vite and fallback)
  // const API_BASE_URL = import.meta.env.VITE_RENDER_API_URL || 'http://localhost:8000';


  const LIVE_RENDER_URL = 'https://meresa.onrender.com';
  // We will skip all the complex environment variable checks and just use the live URL
  const API_BASE_URL = LIVE_RENDER_URL;


  // --- 1. LOAD DATA FUNCTION (The Core Fetch Logic) ---
  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    setIsRetrying(true);

    // --- FIX: Delay for network stability (2 seconds) ---
    if (isFirstLoad) {
        // Wait 2 seconds before firing the FIRST request to allow mobile network stack to stabilize
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }

    try {
      // Use the custom Axios instance with the correct API URL
      const res = await apiAxios.get(`${API_BASE_URL}/api/market-overview`);
      
      if (res.data.length === 0) {
           throw new Error("API returned an empty dataset.");
      }
      
      setMarketData(res.data);
      setIsFirstLoad(false); 
      
    } catch (err: any) {
      console.error("Fetch Error:", err);
      // Logic for mobile cold start failure
      setError("Connection failed (Backend is waking up). Please tap 'Retry'.");
      
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  // --- Initial Load Effect ---
  useEffect(() => {
    fetchOverview();
  }, []);
  
  // --- Drill Down Handler (Uses apiAxios) ---
  const handleDrillDown = async (symbol: string) => {
    const coin = marketData.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());
    if (!coin) return;

    setSelectedCoin(coin);
    setView('DETAIL');
    try {
      const res = await apiAxios.get(`${API_BASE_URL}/api/crypto-trends?symbol=${coin.symbol}`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- DATA PREPARATION FOR CHARTS ---
  const filteredCoins = marketData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);
  const paginatedCoins = filteredCoins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pieData = useMemo(() => { 
    const top5 = marketData.slice(0, 5);
    const others = marketData.slice(5).reduce((acc, curr) => acc + curr.market_cap, 0);
    return [
      ...top5.map(c => ({ name: c.symbol.toUpperCase(), value: c.market_cap, symbol: c.symbol })),
      { name: 'OTHERS', value: others, symbol: 'OTHERS' }
    ];
  }, [marketData]);

  const treeMapData = useMemo(() => { 
    return [{
      name: 'Market',
      children: marketData.slice(0, 20).map(c => ({
        name: c.symbol.toUpperCase(),
        size: c.market_cap,
        change: c.change_24h_pct,
        symbol: c.symbol
      }))
    }];
  }, [marketData]);

  const globalStats = useMemo(() => { 
    if (marketData.length === 0) return null;
    const totalCap = marketData.reduce((acc, curr) => acc + (curr.market_cap || 0), 0);
    const totalVol = marketData.reduce((acc, curr) => acc + (curr.total_volume || 0), 0);
    const btc = marketData.find(c => c.symbol.toLowerCase() === 'btc');
    const btcDom = btc ? (btc.market_cap / totalCap) * 100 : 0;
    const topGainer = [...marketData].sort((a, b) => b.change_24h_pct - a.change_24h_pct)[0];
    return { totalCap, totalVol, btcDom, topGainer };
  }, [marketData]);


  // --- RENDER LOGIC ---

  // 1. ERROR/RETRY STATE (Mobile Fix Display)
  if (error && !loading) {
    return (
      <div className="w-full h-[500px] bg-[#15191f] rounded-2xl border border-red-900/50 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
        <h3 className="text-xl text-white font-bold">Connection Failed (Server Cold Start)</h3>
        <p className="text-gray-400 mt-2 max-w-md">
          {error}
        </p>
        <button
          onClick={fetchOverview}
          disabled={isRetrying}
          className="mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 transition disabled:bg-gray-600"
        >
          {isRetrying ? <Activity size={20} className="animate-spin" /> : <RotateCcw size={20} />}
          {isRetrying ? "Waking Up Server (Max 30s)..." : "Tap to Retry Connection"}
        </button>
      </div>
    );
  }

  // 2. LOADING STATE (Default Loading)
  if (loading && !error) {
    return (
      <div className="w-full h-[500px] bg-[#15191f] rounded-2xl border border-gray-800 flex flex-col items-center justify-center space-y-4">
        <Activity className="text-cyan-500 w-12 h-12 animate-spin" />
        <span className="text-gray-400 font-mono">Loading initial data...</span>
      </div>
    );
  }

  // 3. MAIN DASHBOARD RENDER
  return (
    <div className="w-full bg-[#0b0e11] min-h-[800px] p-6 rounded-2xl border border-gray-800 shadow-2xl text-white font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Database className="text-cyan-500" />
          <div>
            <h1 className="text-2xl font-bold">Crypto Data Viz</h1>
            <p className="text-xs text-gray-500 font-mono">BIGQUERY LIVE FEED • {marketData.length} ASSETS TRACKED</p>
          </div>
        </div>

        {view === 'OVERVIEW' && (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#15191f] border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors w-64"
            />
          </div>
        )}

        {view === 'DETAIL' && (
          <button
            onClick={() => setView('OVERVIEW')}
            className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} /> Back to Market
          </button>
        )}
      </div>

      {/* ================= VIEW 1: MARKET OVERVIEW ================= */}
      {view === 'OVERVIEW' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* GLOBAL MARKET KPIS */}
          {globalStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-2">
                  <Layers size={12} /> Global Market Cap
                </div>
                <div className="text-xl font-bold text-white mt-1">${fmtCompact(globalStats.totalCap)}</div>
              </div>
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-2">
                  <BarChart2 size={12} /> Total 24h Volume
                </div>
                <div className="text-xl font-bold text-cyan-400 mt-1">${fmtCompact(globalStats.totalVol)}</div>
              </div>
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-2">
                  <PieIcon size={12} /> BTC Dominance
                </div>
                <div className="text-xl font-bold text-orange-400 mt-1">{globalStats.btcDom.toFixed(1)}%</div>
              </div>
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-2">
                  <TrendingUp size={12} /> Top Gainer
                </div>
                <div className="flex justify-between items-end mt-1">
                  <span className="text-xl font-bold text-white">{globalStats.topGainer?.symbol.toUpperCase()}</span>
                  <span className="text-green-400 font-mono text-sm">+{globalStats.topGainer?.change_24h_pct.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* TOP VISUALIZATIONS ROW */}
          {!loading && marketData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8 min-h-[300px] items-stretch">

              {/* 1. TREEMAP (Market Map) */}
              <div className="lg:col-span-2 bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <Grid size={16} /> Market Map (Size = Cap, Color = Change)
                </div>
                {/* FIX: min-width wrapper */}
                <div style={{ width: '100%', height: '90%', minWidth: '0px', overflow: 'hidden' }}> 
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treeMapData}
                      dataKey="size"
                      stroke="#0b0e11"
                      content={<CustomTreemapContent onSelectCoin={handleDrillDown} />}
                    >
                      <Tooltip content={<CustomTreemapTooltip />} />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 2. PIE CHART (Dominance) */}
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <PieIcon size={16} /> Market Dominance
                </div>
                {/* FIX: min-width wrapper */}
                <div style={{ width: '100%', height: '90%', minWidth: '0px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                             key={`cell-${index}`} 
                             fill={COLORS[index % COLORS.length]}
                             style={{ cursor: entry.symbol !== 'OTHERS' ? 'pointer' : 'default' }}
                             onClick={() => entry.symbol !== 'OTHERS' && handleDrillDown(entry.symbol)} 
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: number) => `$${fmtCompact(val)}`} contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                      <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* DATA TABLE */}
          <div className="bg-[#15191f] rounded-xl border border-gray-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center p-20"><Activity className="animate-spin text-cyan-500" /></div>
            ) : (
              <>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0b0e11] text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
                      <th className="p-4">Rank</th>
                      <th className="p-4">Asset</th>
                      <th className="p-4 text-right">Price</th>
                      <th className="p-4 text-right">24h Change</th>
                      <th className="p-4 text-right hidden md:table-cell">Market Cap</th>
                      <th className="p-4 text-right hidden md:table-cell">Drawdown</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {paginatedCoins.map((coin) => (
                      <tr
                        key={coin.symbol}
                        onClick={() => handleDrillDown(coin.symbol)}
                        className="hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-800/30 group"
                      >
                        <td className="p-4 text-gray-600 font-mono w-12">#{coin.rank}</td>
                        <td className="p-4 flex items-center gap-3">
                          {coin.logo_url && <img src={coin.logo_url} alt="" className="w-8 h-8 rounded-full" />}
                          <div>
                            <div className="font-bold">{coin.name}</div>
                            <div className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono text-cyan-300">{fmtMoney(coin.price_usd)}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${coin.change_24h_pct >= 0 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                            {coin.change_24h_pct >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                            {Math.abs(coin.change_24h_pct).toFixed(2)}%
                          </span>
                        </td>
                        <td className="p-4 text-right text-gray-400 hidden md:table-cell font-mono">${fmtCompact(coin.market_cap)}</td>
                        <td className="p-4 text-right hidden md:table-cell font-mono text-red-400">{coin.drawdown_pct.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* PAGINATION CONTROLS */}
                <div className="flex justify-between items-center p-4 bg-[#0b0e11] border-t border-gray-800">
                  <span className="text-xs text-gray-500">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCoins.length)} of {filteredCoins.length} assets
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center">{currentPage} / {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= VIEW 2: COIN DETAIL ================= */}
      {view === 'DETAIL' && selectedCoin && (
        <div className="animate-in fade-in zoom-in duration-300">

          {/* COIN HEADER */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex items-center gap-4">
              <img src={selectedCoin.logo_url} className="w-16 h-16 rounded-full shadow-lg border-2 border-gray-800" alt="" />
              <div>
                <h2 className="text-4xl font-bold text-white">{selectedCoin.name}</h2>
                <div className="flex gap-3 mt-2 text-sm font-mono text-gray-400">
                  <span className="bg-gray-800 px-2 py-1 rounded">RANK #{selectedCoin.rank}</span>
                  <span className="bg-gray-800 px-2 py-1 rounded">VOL: ${fmtCompact(selectedCoin.total_volume)}</span>
                </div>
              </div>
            </div>

            {/* KPI BOXES */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold">Price</div>
                <div className="text-2xl font-bold">{fmtMoney(selectedCoin.price_usd)}</div>
              </div>
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold">24h Change</div>
                <div className={`text-2xl font-bold ${selectedCoin.change_24h_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedCoin.change_24h_pct.toFixed(2)}%
                </div>
              </div>
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800">
                <div className="text-gray-500 text-[10px] uppercase font-bold">ATH Drawdown</div>
                <div className="text-2xl font-bold text-red-400">{selectedCoin.drawdown_pct.toFixed(2)}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CHART 1: PRICE TIME SERIES */}
            <div className="lg:col-span-2 bg-[#15191f] p-4 rounded-xl border border-gray-800 h-[400px]">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Historical Price Action</h3>
              <div style={{ width: '100%', height: '90%', minWidth: '0px' }}> 
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 10 }} tickFormatter={(v) => v.substring(5)} />
                    <YAxis stroke="#555" orientation="right" tickFormatter={(v) => `$${v}`} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                    <Area type="monotone" dataKey="price_usd" stroke="#06b6d4" fill="url(#colorPrice)" strokeWidth={2} />
                    <Line type="monotone" dataKey="moving_avg_7d" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" dot={false} name="7D Avg" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CHART 2: RISK GAUGE & VOLUME */}
            <div className="flex flex-col gap-6">

              {/* CUSTOM GAUGE (Simulated with Half Pie) */}
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800 flex-1 flex flex-col items-center justify-center relative">
                <h3 className="absolute top-4 left-4 text-sm font-bold text-gray-400 uppercase">Risk Meter (Drawdown)</h3>
                <RiskGauge value={Math.abs(selectedCoin.drawdown_pct)} />
                <div className="text-center mt-[-40px]">
                  <div className="text-2xl font-bold">{Math.abs(selectedCoin.drawdown_pct).toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">Below ATH</div>
                </div>
              </div>

              {/* VOLUME BAR CHART */}
              <div className="bg-[#15191f] p-4 rounded-xl border border-gray-800 flex-1">
                <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Volume Profile</h3>
                <div style={{ width: '100%', height: '80%', minWidth: '0px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={history.slice(-14)}> {/* Last 14 days */}
                      <Bar dataKey="total_volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#000' }} formatter={(val: number) => fmtCompact(val)} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white/80 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 mt-8">

        <div className="p-6">
          {/* TOP HEADER */}
          <div className="mb-1">
            <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
              Full-Stack Data Engineering
            </span>
          </div>
          {/* DESCRIPTION (THE "WHAT") */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            A professional financial terminal featuring a market-wide Treemap, paginated asset tables, 
            and real-time drill-down analytics. Built with NextJS (Recharts), NodeJS (ExpressJS), and Google BigQuery.
          </p>

          {/* TECH STACK (THE "HOW") */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">Technologies Used:</p>
            <div className="flex flex-wrap gap-2">
              {['NodeJS', 'ExpressJS', 'BigQuery', 'dbt', 'NextJS', 'Recharts'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded-lg font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* NEW: ARCHITECTURAL BREAKDOWN */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-1"><strong>Data Flow:</strong> CoinGecko → ELT Pipeline (dbt) → BigQuery</p>
            <p><strong>Service Layer:</strong> Node.js (ExpressJS) API Gateway for secure data access.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CUSTOM COMPONENTS ---

// 1. Custom Treemap Cell (Colors box based on change)
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, change, onSelectCoin } = props;
  const isPositive = change >= 0;
  // Green for up, Red for down, Opacity based on change magnitude
  const color = isPositive ? '#10B981' : '#EF4444';

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: color, stroke: '#0b0e11', strokeWidth: 2, opacity: 0.8 }} />
      {width > 50 && height > 30 && (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={12} fontWeight="bold">
          {name}
        </text>
      )}
      {width > 50 && height > 50 && (
        <text x={x + width / 2} y={y + height / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={10}>
          {change?.toFixed(1)}%
        </text>
      )}
    </g>
  );
};

const CustomTreemapTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black border border-gray-700 p-2 rounded text-xs text-white shadow-xl">
        <p className="font-bold">{data.name}</p>
        <p>Cap: ${fmtCompact(data.size)}</p>
        <p className={data.change >= 0 ? 'text-green-400' : 'text-red-400'}>
          Change: {data.change?.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

// 2. Custom Gauge (Simple SVG)
const RiskGauge = ({ value }: { value: number }) => {
  // Value is 0 to 100 (percentage drop)
  // 0% drop = Safe (Green), 80% drop = Risky (Red)
  const clamped = Math.min(Math.max(value, 0), 100);
  const angle = (clamped / 100) * 180; // 0 to 180 degrees

  return (
    <div className="relative w-48 h-24 overflow-hidden mt-8">
      <div className="w-48 h-48 rounded-full border-[15px] border-gray-700 box-border absolute top-0 left-0"></div>
      <div
        className="w-48 h-48 rounded-full border-[15px] border-transparent border-t-green-500 border-r-yellow-500 border-l-red-500 box-border absolute top-0 left-0 transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${angle - 45}deg)` }} // Simplified rotation logic for visual effect
      ></div>
      {/* Needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-24 bg-white origin-bottom transition-transform duration-1000"
        style={{ transform: `translateX(-50%) rotate(${angle - 90}deg)` }}
      ></div>
      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default CryptoDashboard;




















