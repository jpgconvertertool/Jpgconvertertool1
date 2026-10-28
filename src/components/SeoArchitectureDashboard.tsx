import React, { useState, useRef, useEffect } from 'react';
import {
  KEYWORD_CLUSTERS,
  GSC_TOP_COUNTRIES,
  KeywordCluster
} from '../data/seoArchitectureData.ts';
import { MASTER_KEYWORD_MAP } from '../data/masterKeywordMap.ts';
import {
  generateHierarchyJson,
  generateHierarchyCsv,
  downloadFile
} from '../utils/exportSeoHierarchy.ts';
import {
  Search,
  CheckCircle,
  Filter,
  Download,
  FileJson,
  FileSpreadsheet,
  ChevronDown,
  Check,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react';

const COMMON_CONVERSION_TASKS = [
  { task: 'Convert Apple iPhone photos', output: 'Standard sRGB JPG', path: '/heic-to-jpg' },
  { task: 'Compress photo for visa or passport', output: 'Under 50 KB JPG', path: '/compress-jpg' },
  { task: 'Convert PNG with transparent background', output: 'White or Custom BG', path: '/png-to-jpg' },
  { task: 'Extract pages from PDF document', output: 'High-DPI JPG Pages', path: '/pdf-to-jpg' },
  { task: 'Convert high-resolution camera RAW', output: 'Web-ready JPEG', path: '/raw-to-jpg' },
  { task: 'Combine multi-page TIFF scans', output: 'Single PDF File', path: '/tiff-to-pdf' },
  { task: 'Convert Microsoft Word document', output: 'Clean Page Images', path: '/word-to-jpg' },
  { task: 'Convert Photoshop design file', output: 'Flattened JPG', path: '/psd-to-jpg' },
  { task: 'Save WhatsApp media files', output: 'Universal JPG', path: '/whatsapp-to-jpg' },
  { task: 'Fix Windows JFIF image format', output: 'True JPEG Image', path: '/jfif-to-jpg' }
];

const USER_STANDARDS = [
  {
    title: '100% Private In-Browser Engine',
    status: 'Guaranteed',
    detail: 'All conversions occur strictly inside your browser\'s local memory. No photos are ever uploaded to any external server or cloud storage.'
  },
  {
    title: 'True Standard JPEG Encoding',
    status: 'Verified',
    detail: 'Outputs genuine JPEG files with valid byte headers. Guaranteed acceptance by government, visa, job, and educational portals.'
  },
  {
    title: 'Exact File Size & Dimension Controls',
    status: 'Active',
    detail: 'Set custom pixel dimensions (passport/ID photos) and target file size limits (<50 KB, <100 KB) with zero trial-and-error.'
  },
  {
    title: 'Memory-Safe Mobile Processing',
    status: 'Optimized',
    detail: 'Safe sequential decoding prevents memory crashes on smartphones and low-end devices when converting large photo batches.'
  },
  {
    title: 'Accurate Byte-Level Format Detection',
    status: 'Verified',
    detail: 'Inspects real file header bytes to correctly distinguish HEIC from AVIF, eliminating silent conversion failures.'
  },
  {
    title: 'Zero Cost & No Subscriptions',
    status: 'Unlimited',
    detail: 'Free forever with no daily file quotas, no file size caps, and no watermark restrictions for personal or commercial use.'
  }
];

export const SeoArchitectureDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<KeywordCluster>(KEYWORD_CLUSTERS[0]);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [activeSubTab, setActiveSubTab] = useState<'master-map' | 'clusters' | 'tree' | 'gsc' | 'linking' | 'technical'>('master-map');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [lastExported, setLastExported] = useState<{ format: 'JSON' | 'CSV'; filename: string } | null>(null);

  // Master Conversion Map filters
  const [mapKeyFilter, setMapKeyFilter] = useState('');
  const [mapPriorityFilter, setMapPriorityFilter] = useState('ALL');
  const [mapStatusFilter, setMapStatusFilter] = useState('ALL');
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);

  const exportDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format: 'JSON' | 'CSV') => {
    const filename = `jpgconvertertool-formats-directory.${format.toLowerCase()}`;
    if (format === 'JSON') {
      const jsonContent = generateHierarchyJson(KEYWORD_CLUSTERS);
      downloadFile(jsonContent, filename, 'application/json');
    } else {
      const csvContent = generateHierarchyCsv(KEYWORD_CLUSTERS);
      downloadFile(csvContent, filename, 'text/csv');
    }

    setLastExported({ format, filename });
    setIsExportOpen(false);

    setTimeout(() => {
      setLastExported(null);
    }, 4500);
  };

  const filteredClusters = KEYWORD_CLUSTERS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.supportingKeywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;

    return matchesSearch && matchesPriority;
  });

  const filteredMasterKeywords = MASTER_KEYWORD_MAP.filter((entry) => {
    const term = mapKeyFilter.toLowerCase();
    const matchesSearch =
      !term ||
      entry.query.toLowerCase().includes(term) ||
      entry.semanticCluster.toLowerCase().includes(term) ||
      entry.targetPage.toLowerCase().includes(term) ||
      entry.url.toLowerCase().includes(term);

    const matchesPriority = mapPriorityFilter === 'ALL' || entry.priority === mapPriorityFilter;
    const matchesStatus = mapStatusFilter === 'ALL' || entry.status === mapStatusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityLabel = (p: string) => {
    if (p === 'P1') return 'Popular';
    if (p === 'P2') return 'Standard';
    if (p === 'P3') return 'Specialized';
    return p;
  };

  const cleanRationale = (text: string) => {
    return text
      .replace(/canonical\s*spoke/gi, 'dedicated tool')
      .replace(/non-cannibalization/gi, 'dedicated')
      .replace(/tier\s*\d/gi, 'standard')
      .replace(/GSC\s*queries/gi, 'common searches')
      .replace(/crawl\s*depth/gi, 'navigation depth')
      .replace(/RFC-4180/gi, 'standard format')
      .replace(/spoke/gi, 'conversion tool')
      .replace(/hub/gi, 'converter');
  };

  return (
    <div className="space-y-6 sm:space-y-8 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Header & Top Metrics */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              <span>Supported Formats</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>Conversion Guide</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>100% Private</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Supported Formats &amp; Conversion Guide
            </h2>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              Explore all 21 supported file conversions, format specifications, and privacy features on <span className="text-neutral-900 dark:text-neutral-200 font-mono font-medium">jpgconvertertool.com</span>.
            </p>
          </div>

          {/* Metric Trio */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-neutral-800 min-w-20 sm:min-w-24 shadow-xs">
              <div className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-neutral-900 dark:text-white">21</div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Format Tools</div>
            </div>
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-neutral-800 min-w-20 sm:min-w-24 shadow-xs">
              <div className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Private &amp; Local</div>
            </div>
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-neutral-800 min-w-20 sm:min-w-24 shadow-xs">
              <div className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-red-600 dark:text-red-500">Free</div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">No Limits</div>
            </div>
          </div>
        </div>

        {/* Segmented Subtab Navigation & Download Guide Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md overflow-x-auto scrollbar-none text-xs">
            {[
              { id: 'master-map', label: '1. All Conversion Tools' },
              { id: 'clusters', label: '2. Format Specifications' },
              { id: 'tree', label: '3. Format Map & Pages' },
              { id: 'gsc', label: '4. Device & Language Support' },
              { id: 'linking', label: '5. Recommended Workflows' },
              { id: 'technical', label: '6. Privacy & Quality Standards' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors min-h-[32px] ${
                  activeSubTab === tab.id
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Download Format Guide Dropdown */}
          <div className="relative shrink-0 flex items-center gap-2 self-start md:self-auto" ref={exportDropdownRef}>
            <div className="inline-flex items-stretch rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 shadow-xs overflow-hidden">
              <button
                onClick={() => handleExport('JSON')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors min-h-[34px]"
                title="Download format guide and specifications as JSON"
              >
                <Download className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                <span>Download Guide</span>
              </button>
              <button
                onClick={() => setIsExportOpen(!isExportOpen)}
                className="px-2 py-1.5 border-l border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors min-h-[34px]"
                aria-label="Toggle download options"
                aria-expanded={isExportOpen}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Dropdown Menu for Format Selection */}
            {isExportOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#09090b] shadow-xl py-1 z-40">
                <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-850">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Format Guide &amp; Specs</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">All 21 Formats · JSON or Spreadsheet CSV</div>
                </div>

                <button
                  onClick={() => handleExport('JSON')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <FileJson className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">Structured JSON (.json)</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Complete format guide &amp; specifications</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </button>

                <button
                  onClick={() => handleExport('CSV')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-left border-t border-neutral-100 dark:border-neutral-850"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">Spreadsheet CSV (.csv)</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Format list for Excel &amp; Google Sheets</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Download Success Notification Toast */}
        {lastExported && (
          <div className="flex items-center justify-between px-3.5 py-2 rounded bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                Downloaded format guide as <strong className="text-neutral-900 dark:text-white">{lastExported.format}</strong>: <code className="text-neutral-500">{lastExported.filename}</code>
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Completed</span>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: ALL CONVERSION TOOLS */}
      {activeSubTab === 'master-map' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-[#09090b] p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversion tool, format, or task..."
                value={mapKeyFilter}
                onChange={(e) => setMapKeyFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono focus:outline-none focus:border-red-600 min-h-[36px]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Type Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-mono text-neutral-500">Popularity:</span>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'P1', label: 'Popular' },
                  { id: 'P2', label: 'Standard' },
                  { id: 'P3', label: 'Specialized' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setMapPriorityFilter(p.id)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors min-h-[30px] ${
                      mapPriorityFilter === p.id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 pl-2 border-l border-neutral-200 dark:border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-500">Availability:</span>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'Existing', label: 'Ready to Use' },
                  { id: 'New', label: 'Instant' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setMapStatusFilter(s.id)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors min-h-[30px] ${
                      mapStatusFilter === s.id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Master Map Table Container */}
          <div className="bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-600 dark:text-neutral-400">
                Showing {filteredMasterKeywords.length} of {MASTER_KEYWORD_MAP.length} Supported Conversion Tasks
              </span>
              <span className="text-[11px] text-neutral-500">Click any row to view task details and format specs</span>
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-[10px] uppercase border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="p-3">Conversion Task</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Feature / Output</th>
                    <th className="p-3">Web Page</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3">Related Formats</th>
                    <th className="p-3 text-center">Popularity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {filteredMasterKeywords.map((entry, idx) => {
                    const isExpanded = expandedQuery === entry.query;
                    return (
                      <React.Fragment key={idx}>
                        <tr
                          onClick={() => setExpandedQuery(isExpanded ? null : entry.query)}
                          className="hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors"
                        >
                          <td className="p-3 text-neutral-900 dark:text-white font-medium">
                            <span className="font-semibold text-red-600 dark:text-red-400">"{entry.query}"</span>
                            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                              ⚡ 100% In-Browser · Private
                            </span>
                          </td>
                          <td className="p-3 text-neutral-700 dark:text-neutral-300">{entry.semanticCluster}</td>
                          <td className="p-3 text-neutral-800 dark:text-neutral-200">{entry.targetPage}</td>
                          <td className="p-3 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                            <code className="text-red-600 dark:text-red-400">{entry.url.replace('https://jpgconvertertool.com', '') || '/'}</code>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                entry.status === 'Existing'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                              }`}
                            >
                              {entry.status === 'Existing' ? 'Ready to Use' : 'Instant'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {entry.internalLinks.map((link, lIdx) => (
                                <span
                                  key={lIdx}
                                  className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                                >
                                  {link}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                entry.priority === 'P1'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 border border-red-300 dark:border-red-800'
                                  : entry.priority === 'P2'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                                  : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800'
                              }`}
                            >
                              {getPriorityLabel(entry.priority)}
                            </span>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-neutral-50/70 dark:bg-neutral-950/80">
                            <td colSpan={7} className="p-3.5 border-t border-b border-neutral-200 dark:border-neutral-800">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                                  Format Guide &amp; Best Practices:
                                </span>
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                                  {cleanRationale(entry.intentRationale)}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FORMAT SPECIFICATIONS */}
      {activeSubTab === 'clusters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Format List & Filters */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white dark:bg-[#09090b] p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter 21 formats, photo types, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="w-3 h-3 text-neutral-400" />
                <span className="text-[11px] font-mono text-neutral-500">Popularity:</span>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'P1', label: 'Popular' },
                  { id: 'P2', label: 'Standard' },
                  { id: 'P3', label: 'Specialized' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setFilterPriority(p.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      filterPriority === p.id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden divide-y divide-neutral-200 dark:divide-neutral-800 max-h-[580px] overflow-y-auto">
              {filteredClusters.map((c) => {
                const isSelected = selectedCluster.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCluster(c)}
                    className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-300 dark:ring-neutral-700'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-semibold text-neutral-900 dark:text-white truncate">{c.name}</span>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 font-mono mt-0.5 truncate">"{c.primaryKeyword}"</p>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        {c.supportingKeywords.length} supported formats · 100% In-Browser
                      </p>
                    </div>

                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {getPriorityLabel(c.priority)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Format Deep-Dive */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs p-6 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{selectedCluster.name}</h3>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                    Web Page: <code className="text-red-600 dark:text-red-400 font-semibold">{selectedCluster.proposedUrl}</code>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>⚡ Instant Browser Conversion</span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span>🔒 100% Private</span>
                </div>
              </div>

              {/* Overview & Best Uses */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  Overview &amp; Best Uses
                </span>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                  <p><strong className="text-neutral-900 dark:text-white">Best For:</strong> {selectedCluster.searchIntent}</p>
                  <p><strong className="text-neutral-900 dark:text-white">Output Format:</strong> {selectedCluster.recommendedPageType}</p>
                  <p className="pt-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">{selectedCluster.description}</p>
                </div>
              </div>

              {/* Key Features & Controls */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  Key Privacy &amp; Conversion Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCluster.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Extensions List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-500">
                    Supported Formats &amp; File Extensions ({selectedCluster.supportingKeywords.length + 1})
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                    Automatic byte-level detection
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto p-3 bg-neutral-50 dark:bg-black rounded border border-neutral-200 dark:border-neutral-800 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium border border-neutral-300 dark:border-neutral-700 shadow-xs">
                    Primary: {selectedCluster.primaryKeyword}
                  </span>
                  {selectedCluster.supportingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/70 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FORMAT MAP & PAGES */}
      {activeSubTab === 'tree' && (
        <div className="bg-white dark:bg-[#09090b] p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Visual Conversion Map &amp; Available Tools</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              Direct access to all 21 specialized image, document, and camera converters.
            </p>
          </div>

          <div className="space-y-4">
            {/* Main Converter */}
            <div className="p-4 rounded bg-neutral-50 dark:bg-neutral-950 border-2 border-red-600/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white">
                  UNIVERSAL DROPZONE
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">100% In-Browser</span>
              </div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Universal JPG Converter (/)</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Drag and drop any photo, document, or camera file for instant, private conversion directly in your browser with zero upload limits.
              </p>
            </div>

            {/* Popular Conversion Tools */}
            <div className="pl-4 sm:pl-8 border-l-2 border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Core Image &amp; Document Converters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: 'PNG to JPG', url: '/png-to-jpg', intent: 'Preserves transparent background with custom solid fill' },
                  { name: 'PDF to JPG', url: '/pdf-to-jpg', intent: 'Extract multi-page PDF documents at 150/300 DPI' },
                  { name: 'HEIC to JPG', url: '/heic-to-jpg', intent: 'Safe sequential batch conversion for Apple iPhone photos' },
                  { name: 'TIFF to PDF', url: '/tiff-to-pdf', intent: 'Convert multi-page scanned office documents to compact PDF' },
                  { name: 'Compress JPG', url: '/compress-jpg', intent: 'Set exact target size limits (<30KB, <50KB, <100KB)' },
                  { name: 'Word to JPG', url: '/word-to-jpg', intent: 'Convert Microsoft Word DOCX pages into JPG images' },
                ].map((spoke, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">{spoke.name}</span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Fast</span>
                    </div>
                    <code className="text-[11px] font-mono text-neutral-500 block truncate">{spoke.url}</code>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight">{spoke.intent}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Graphic & Camera RAW Formats */}
            <div className="pl-4 sm:pl-8 border-l-2 border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Specialized Graphic &amp; Camera RAW Formats
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {['/webp-to-jpg', '/raw-to-jpg', '/psd-to-jpg', '/svg-to-jpg', '/jfif-to-jpg', '/jpf-to-jpg', '/whatsapp-to-jpg', '/tiff-to-jpg'].map((p, i) => (
                  <div key={i} className="p-2 rounded bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 text-neutral-700 dark:text-neutral-300 truncate">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DEVICE & LANGUAGE SUPPORT */}
      {activeSubTab === 'gsc' && (
        <div className="space-y-6">
          <div className="p-3.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-3 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-neutral-900 dark:text-white font-semibold">Global Device &amp; Browser Compatibility:</span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                JPGConverterTool runs 100% locally on your computer, tablet, or phone. Works with zero software installation on Safari (iOS/macOS), Chrome (Android/Windows/Mac), Firefox, and Edge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
              <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-50 dark:bg-neutral-950">
                Supported Regions &amp; Global Availability
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-500 text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Region</th>
                      <th className="p-2.5">Compatibility</th>
                      <th className="p-2.5 text-right">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850 text-neutral-700 dark:text-neutral-300">
                    {GSC_TOP_COUNTRIES.slice(0, 10).map((c, i) => (
                      <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                        <td className="p-2.5 text-neutral-900 dark:text-white font-medium">{c.country}</td>
                        <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-medium">100% Supported</td>
                        <td className="p-2.5 text-right tabular-nums text-neutral-500">&lt; 1 second</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
              <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-50 dark:bg-neutral-950">
                Common User Tasks &amp; Quick Actions
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-500 text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">User Need</th>
                      <th className="p-2.5">Output Format</th>
                      <th className="p-2.5 text-right">Direct Tool</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850 text-neutral-700 dark:text-neutral-300">
                    {COMMON_CONVERSION_TASKS.map((q, i) => (
                      <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                        <td className="p-2.5 text-neutral-900 dark:text-white font-medium">{q.task}</td>
                        <td className="p-2.5 text-neutral-600 dark:text-neutral-400">{q.output}</td>
                        <td className="p-2.5 text-right">
                          <code className="text-red-600 dark:text-red-400 font-semibold">{q.path}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RECOMMENDED WORKFLOWS */}
      {activeSubTab === 'linking' && (
        <div className="bg-white dark:bg-[#09090b] p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Recommended Conversion Workflows &amp; Shortcuts</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Step-by-step shortcuts to optimize your images for applications, forms, and social media.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-neutral-200 dark:border-neutral-800 rounded overflow-hidden">
              <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Starting File / Step</th>
                  <th className="p-2.5">Recommended Tool</th>
                  <th className="p-2.5">Helpful Option</th>
                  <th className="p-2.5">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850 text-neutral-700 dark:text-neutral-300">
                <tr>
                  <td className="p-2.5 text-neutral-900 dark:text-white font-semibold">iPhone Photos (HEIC)</td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-semibold">/heic-to-jpg</td>
                  <td className="p-2.5">Sequential batch processing</td>
                  <td className="p-2.5">Sharing with Windows PC &amp; Android devices</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-neutral-900 dark:text-white font-semibold">Transparent Graphics (PNG)</td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-semibold">/png-to-jpg</td>
                  <td className="p-2.5">Custom solid background fill</td>
                  <td className="p-2.5">Ecommerce &amp; websites requiring white background</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-neutral-900 dark:text-white font-semibold">Scanned Office Pages (TIFF)</td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-semibold">/tiff-to-pdf</td>
                  <td className="p-2.5">Multi-page document merge</td>
                  <td className="p-2.5">Office archiving, print &amp; contract documentation</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-neutral-900 dark:text-white font-semibold">Documents &amp; Contracts (PDF)</td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-semibold">/pdf-to-jpg</td>
                  <td className="p-2.5">Render at 150 or 300 DPI</td>
                  <td className="p-2.5">Document extract &amp; presentation slides</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-neutral-900 dark:text-white font-semibold">Oversized Images (JPEG)</td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-semibold">/compress-jpg</td>
                  <td className="p-2.5">Target size (&lt; 50 KB or &lt; 100 KB)</td>
                  <td className="p-2.5">Government, passport, visa &amp; job portal uploads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: PRIVACY & QUALITY STANDARDS */}
      {activeSubTab === 'technical' && (
        <div className="bg-white dark:bg-[#09090b] p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Quality, Privacy &amp; Performance Standards</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Our technical commitment to privacy, speed, and real standard-compliant JPG files.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USER_STANDARDS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs flex items-start gap-2.5"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900 dark:text-white">{item.title}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px] mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
