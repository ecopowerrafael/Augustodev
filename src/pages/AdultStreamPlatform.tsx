import React, { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Code, 
  Flag, 
  Server, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Radio, 
  FileCode, 
  Cpu, 
  HardDrive, 
  Activity, 
  Check, 
  Copy, 
  X, 
  ExternalLink, 
  Sparkles, 
  BarChart3, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Layers, 
  RefreshCw, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Tv, 
  SlidersHorizontal,
  ChevronDown,
  ArrowLeft,
  Sliders
} from "lucide-react";

// SEO & Breadcrumb
import { MetaTags, Breadcrumb, ProductSchema } from "../seo/SEOComponents";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  resolution: "4K HDR" | "1080p 60fps" | "720p";
  rating: number;
  studio: string;
  uploadDate: string;
  tags: string[];
  description: string;
}

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "vid-4k-001",
    title: "Cinematic High-Speed Cyber City Motion Stream 4K",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "18:42",
    views: "1.4M",
    likes: "98.4%",
    category: "4K Ultra HD",
    resolution: "4K HDR",
    rating: 4.9,
    studio: "Vortex 4K Studios",
    uploadDate: "2 hours ago",
    tags: ["4K", "Ultra HD", "High FPS", "HDR", "Cinematic"],
    description: "Ultra high bit-rate 60fps HDR stream optimized for next-generation displays with multi-channel audio."
  },
  {
    id: "vid-orig-002",
    title: "Neon Cyberpunk Nightlife Experience - VR 360 & Ultra HD",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "24:15",
    views: "890K",
    likes: "96.8%",
    category: "VR 360",
    resolution: "4K HDR",
    rating: 4.8,
    studio: "NeonEdge Media",
    uploadDate: "Yesterday",
    tags: ["VR 360", "Interactive", "Neon", "Studio Original"],
    description: "Immersive VR 360-degree interactive video stream with dynamic spatial acoustic profile."
  },
  {
    id: "vid-trend-003",
    title: "Futuristic Studio Shoot - High Performance Scene",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "12:08",
    views: "2.1M",
    likes: "99.1%",
    category: "Trending",
    resolution: "1080p 60fps",
    rating: 4.95,
    studio: "Aura Premium",
    uploadDate: "3 days ago",
    tags: ["Trending", "Studio Original", "High FPS"],
    description: "Top trending video of the week with multi-camera angles and optimized HLS chunking."
  },
  {
    id: "vid-short-004",
    title: "Quick Highlights & Behind The Scenes Session",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "06:45",
    views: "430K",
    likes: "94.2%",
    category: "Short Clips",
    resolution: "1080p 60fps",
    rating: 4.7,
    studio: "FlashClips Network",
    uploadDate: "4 days ago",
    tags: ["Short Clips", "Fast Pace", "1080p"],
    description: "High intensity short length clip crafted for mobile bandwidth efficiency and quick viewing."
  },
  {
    id: "vid-pop-005",
    title: "Elite Masterclass Session - Ultra Resolution Edition",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "31:50",
    views: "3.5M",
    likes: "99.4%",
    category: "Popular",
    resolution: "4K HDR",
    rating: 5.0,
    studio: "BlackLabel Cinema",
    uploadDate: "1 week ago",
    tags: ["Popular", "4K HDR", "Full Length"],
    description: "Award-winning full length feature video with Dolby Atmos sound and H.265 VP9 encoding."
  },
  {
    id: "vid-studio-006",
    title: "Midnight Atmosphere Performance - Studio Special",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyplays.mp4",
    duration: "15:20",
    views: "670K",
    likes: "95.5%",
    category: "Studio Originals",
    resolution: "1080p 60fps",
    rating: 4.85,
    studio: "Midnight Media",
    uploadDate: "2 weeks ago",
    tags: ["Studio Originals", "Atmospheric", "Full HD"],
    description: "Exclusive studio original release available in multi-bitrate streaming protocol."
  }
];

interface AdultStreamPlatformProps {
  onBack?: () => void;
}

export default function AdultStreamPlatform({ onBack }: AdultStreamPlatformProps) {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<"browse" | "importer" | "sitemap" | "admin">("browse");
  
  // Selected Video & Player State
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [currentVideo, setCurrentVideo] = useState<VideoItem>(INITIAL_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [quality, setQuality] = useState<"4K HDR" | "1080p 60fps" | "720p">("4K HDR");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  
  // VAST Ad Engine Simulator State
  const [vastAdActive, setVastAdActive] = useState(true);
  const [adTimeLeft, setAdTimeLeft] = useState(5);
  const [canSkipAd, setCanSkipAd] = useState(false);
  const [vastTagUrl, setVastTagUrl] = useState("https://adserver.vortex-network.com/vast.xml?zone=78912");
  const [vastImpressions, setVastImpressions] = useState(148290);
  const [vastCpm, setVastCpm] = useState(4.85);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResolution, setSelectedResolution] = useState("All");
  const [selectedDurationFilter, setSelectedDurationFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"views" | "rating" | "date">("views");

  // Modals
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("Copyright / DMCA Violation");
  const [reportComment, setReportComment] = useState("");
  const [copiedToast, setCopiedToast] = useState("");

  // Embed Customizer Options
  const [embedAutoplay, setEmbedAutoplay] = useState(true);
  const [embedMute, setEmbedMute] = useState(true);
  const [embedVast, setEmbedVast] = useState(true);
  const [embedWidth, setEmbedWidth] = useState("854");
  const [embedHeight, setEmbedHeight] = useState("480");

  // VPS Video Scraper & Importer State
  const [scrapeUrl, setScrapeUrl] = useState("https://adult-network.com/video/v-9981245");
  const [scrapeProgress, setScrapeProgress] = useState(0);
  const [scrapeStatus, setScrapeStatus] = useState<"idle" | "scraping" | "downloading" | "transcoding" | "complete">("idle");
  const [scrapedMetadata, setScrapedMetadata] = useState<{
    title: string;
    duration: string;
    category: string;
    resolution: string;
    thumbnails: string[];
    tags: string[];
  } | null>(null);

  // Video Ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timer for VAST Ad skip countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (vastAdActive && adTimeLeft > 0) {
      timer = setInterval(() => {
        setAdTimeLeft((prev) => {
          if (prev <= 1) {
            setCanSkipAd(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [vastAdActive, adTimeLeft]);

  // Handle Toast Notifications
  const triggerToast = (msg: string) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(""), 3500);
  };

  // Video Player Controls
  const togglePlay = () => {
    if (vastAdActive) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 120);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const skipVastAd = () => {
    setVastAdActive(false);
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
    triggerToast("VAST Ad Skipped • Main Video Feed Started");
  };

  // Run Scraper Engine Simulation
  const handleStartScrape = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapeUrl) return;

    setScrapeStatus("scraping");
    setScrapeProgress(15);
    setScrapedMetadata(null);

    setTimeout(() => {
      setScrapeStatus("downloading");
      setScrapeProgress(45);
    }, 1200);

    setTimeout(() => {
      setScrapeStatus("transcoding");
      setScrapeProgress(80);
      setScrapedMetadata({
        title: "High Octane Cyber Nightlife Performance (Auto Scraped)",
        duration: "14:22",
        category: "4K Ultra HD",
        resolution: "4K HDR",
        thumbnails: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80"
        ],
        tags: ["Auto Imported", "VPS Scraped", "4K HDR", "HLS Segmented"]
      });
    }, 2800);

    setTimeout(() => {
      setScrapeStatus("complete");
      setScrapeProgress(100);

      const newVid: VideoItem = {
        id: `vid-scraped-${Date.now()}`,
        title: "High Octane Cyber Nightlife Performance (Imported to VPS)",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: "14:22",
        views: "1.2K",
        likes: "100%",
        category: "4K Ultra HD",
        resolution: "4K HDR",
        rating: 5.0,
        studio: "Direct VPS Importer Engine",
        uploadDate: "Just now",
        tags: ["Auto Imported", "VPS Scraped", "4K HDR"],
        description: "Directly scraped and transcoded into VPS NVMe storage with HLS multi-bitrate chunks."
      };

      setVideos([newVid, ...videos]);
      triggerToast("Video imported successfully to VPS & added to database!");
    }, 4200);
  };

  // Filtered Videos
  const filteredVideos = videos.filter((vid) => {
    const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          vid.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || vid.category === selectedCategory;
    const matchesResolution = selectedResolution === "All" || vid.resolution === selectedResolution;
    
    let matchesDuration = true;
    const durMins = parseInt(vid.duration.split(":")[0]) || 0;
    if (selectedDurationFilter === "short") matchesDuration = durMins < 10;
    if (selectedDurationFilter === "medium") matchesDuration = durMins >= 10 && durMins <= 25;
    if (selectedDurationFilter === "long") matchesDuration = durMins > 25;

    return matchesSearch && matchesCategory && matchesResolution && matchesDuration;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "date") return a.id.localeCompare(b.id);
    return parseFloat(b.views) - parseFloat(a.views);
  });

  // Generated Embed Code String
  const embedCodeString = `<iframe src="https://stream.vortexmedia.io/embed/${currentVideo.id}?autoplay=${embedAutoplay ? 1 : 0}&muted=${embedMute ? 1 : 0}&vast=${embedVast ? 1 : 0}" width="${embedWidth}" height="${embedHeight}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;

  // Dynamic XML Sitemap String
  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Dynamic XML Sitemap Generated for Video Streaming Engine -->
  ${videos.map(v => `
  <url>
    <loc>https://vortexmedia.io/watch/${v.id}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <video:video>
      <video:thumbnail_loc>${v.thumbnail}</video:thumbnail_loc>
      <video:title><![CDATA[${v.title}]]></video:title>
      <video:description><![CDATA[${v.description}]]></video:description>
      <video:content_loc>${v.videoUrl}</video:content_loc>
      <video:player_loc allow_embed="yes">https://stream.vortexmedia.io/embed/${v.id}</video:player_loc>
      <video:duration>840</video:duration>
      <video:rating>${v.rating}</video:rating>
      <video:view_count>${v.views.replace(/[^0-9.]/g, "")}00000</video:view_count>
      <video:publication_date>2026-07-20T10:00:00+00:00</video:publication_date>
      <video:family_friendly>no</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>`).join("")}
</urlset>`;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-[#FF2A6D]/30 selection:text-[#FF2A6D] relative overflow-x-hidden">
      
      {/* Meta tags for English SEO */}
      <MetaTags 
        title="VortexMedia - High-Performance Responsive Adult Video Platform & Custom HTML5 Player"
        description="Scalable adult streaming platform developed from scratch with custom HTML5 player, VAST ad network support, VPS video importer, embed code generator, dynamic XML sitemaps, and English UI."
      />

      {/* Floating Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FF2A6D] text-white px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-[0_10px_30px_rgba(255,42,109,0.4)] flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Portfolio Top Bar Banner */}
      <div className="bg-[#0D121D] border-b border-white/10 px-4 py-2.5 text-xs font-mono flex items-center justify-between text-gray-400">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (onBack) onBack();
              else {
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new Event("popstate"));
              }
            }}
            className="flex items-center space-x-1.5 text-white hover:text-[#FF2A6D] font-bold uppercase transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Return to Agency Portfolio</span>
          </button>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-gray-300">
            Case 21 // Scalable Responsive Adult Streaming Engine & Custom Player
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-[#FF2A6D]/15 text-[#FF2A6D] border border-[#FF2A6D]/30 px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px]">
            100% English UI & SEO
          </span>
          <span className="hidden sm:inline-block bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px]">
            VPS Storage Ready
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#FF2A6D] to-[#00F0FF] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,42,109,0.4)]">
            <div className="h-full w-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center text-[#FF2A6D]">
              <Tv className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-sans font-black tracking-wider text-lg text-white uppercase">VORTEX</span>
              <span className="font-mono font-extrabold text-xs text-[#FF2A6D] bg-[#FF2A6D]/10 px-1.5 py-0.5 rounded border border-[#FF2A6D]/30">MEDIA</span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono hidden sm:block">Ultra-Fast HTML5 Video Engine & VAST Network</p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {[
            { id: "browse", label: "Stream Platform", icon: Tv },
            { id: "importer", label: "VPS Importer", icon: Download },
            { id: "sitemap", label: "XML Sitemap", icon: FileCode },
            { id: "admin", label: "Admin CMS", icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF2A6D] to-[#9900FF] text-white shadow-[0_4px_15px_rgba(255,42,109,0.3)]"
                    : "bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button: Embed Code or Upload */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEmbedModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF2A6D]/40 text-xs font-mono font-bold text-gray-200 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Code className="h-4 w-4 text-[#FF2A6D]" />
            <span className="hidden sm:inline">Embed Video</span>
          </button>
        </div>
      </header>

      {/* Main Content Render Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* ================= TAB 1: STREAM PLATFORM BROWSE & PLAYER ================= */}
        {activeTab === "browse" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* HERO PLAYER & VIDEO VIEWING STAGE */}
            <div className={`relative bg-[#0D121F] rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ${isTheaterMode ? "max-w-full" : ""}`}>
              
              {/* VIDEO PLAYER CONTAINER */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                
                {/* HTML5 VIDEO STREAM */}
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.thumbnail}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain"
                  playsInline
                />

                {/* VAST AD OVERLAY SIMULATOR */}
                {vastAdActive && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 flex flex-col justify-between p-6 text-left animate-fade-in">
                    {/* Top Ad Badge & Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-[#FF2A6D] text-white px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Zap className="h-4 w-4 animate-pulse" />
                        <span>VAST Ad Network Active</span>
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                        CPM Rate: ${vastCpm.toFixed(2)} USD
                      </span>
                    </div>

                    {/* Center Ad Interactive Banner */}
                    <div className="max-w-xl mx-auto bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-slate-900/80 border border-white/20 rounded-2xl p-6 text-center space-y-3 shadow-2xl">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300 font-bold block">Sponsor Advertisement</span>
                      <h3 className="text-xl font-bold text-white">Ultra-Speed VPS Streaming & Storage Solutions</h3>
                      <p className="text-xs text-gray-300">Deploy NVMe dedicated streaming nodes with unlimited bandwidth and custom HLS transcoding.</p>
                      <button 
                        onClick={() => triggerToast("Clicked VAST Ad Banner • Redirected to Sponsor URL")}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#FF2A6D] to-[#00F0FF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 cursor-pointer inline-flex items-center space-x-1.5"
                      >
                        <span>Learn More</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Bottom Skip Timer or Action */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <p className="text-xs font-mono text-gray-400">
                        {canSkipAd ? "Ad finishes shortly or skip now." : `Video plays after ad • Skip in ${adTimeLeft}s`}
                      </p>
                      {canSkipAd ? (
                        <button
                          onClick={skipVastAd}
                          className="px-6 py-2.5 bg-[#FF2A6D] hover:bg-pink-600 text-white font-mono text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,42,109,0.5)] cursor-pointer transition-all flex items-center space-x-2"
                        >
                          <span>Skip Ad</span>
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <div className="px-5 py-2 bg-white/10 border border-white/10 text-gray-400 font-mono text-xs rounded-xl flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-[#FF2A6D] animate-spin" />
                          <span>Skip in {adTimeLeft}s</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PLAY / PAUSE LARGE OVERLAY BUTTON */}
                {!isPlaying && !vastAdActive && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto h-20 w-20 rounded-full bg-[#FF2A6D]/80 backdrop-blur-md text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,42,109,0.6)] border border-white/20 hover:scale-110 transition-all cursor-pointer z-20"
                  >
                    <Play className="h-10 w-10 fill-current ml-1" />
                  </button>
                )}

                {/* PLAYER BOTTOM CUSTOM CONTROLS HUD */}
                {!vastAdActive && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 space-y-2">
                    
                    {/* SEEKBAR SLIDER */}
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max={duration || 120}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF2A6D]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      
                      {/* Left Controls: Play, Time, Volume */}
                      <div className="flex items-center space-x-4">
                        <button onClick={togglePlay} className="text-white hover:text-[#FF2A6D] transition-colors cursor-pointer">
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                        </button>

                        <div className="flex items-center space-x-2 group/vol">
                          <button onClick={toggleMute} className="text-white hover:text-[#FF2A6D] transition-colors cursor-pointer">
                            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF2A6D]"
                          />
                        </div>

                        <span className="text-gray-300 text-[11px]">
                          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Right Controls: Quality, Speed, Theater Mode */}
                      <div className="flex items-center space-x-3">
                        <select
                          value={quality}
                          onChange={(e) => {
                            setQuality(e.target.value as any);
                            triggerToast(`Switched Resolution to ${e.target.value}`);
                          }}
                          className="bg-black/60 border border-white/20 text-white text-[11px] font-mono px-2 py-1 rounded-md focus:outline-none focus:border-[#FF2A6D]"
                        >
                          <option value="4K HDR">4K HDR (12 Mbps)</option>
                          <option value="1080p 60fps">1080p 60fps (6 Mbps)</option>
                          <option value="720p">720p HD (2.5 Mbps)</option>
                        </select>

                        <select
                          value={playbackSpeed}
                          onChange={(e) => {
                            const spd = parseFloat(e.target.value);
                            setPlaybackSpeed(spd);
                            if (videoRef.current) videoRef.current.playbackRate = spd;
                          }}
                          className="bg-black/60 border border-white/20 text-white text-[11px] font-mono px-2 py-1 rounded-md focus:outline-none focus:border-[#FF2A6D]"
                        >
                          <option value="0.75">0.75x</option>
                          <option value="1">1.0x Normal</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                        </select>

                        <button
                          onClick={() => setIsTheaterMode(!isTheaterMode)}
                          className={`p-1 rounded text-white hover:text-[#FF2A6D] transition-colors cursor-pointer ${isTheaterMode ? "text-[#FF2A6D]" : ""}`}
                          title="Toggle Theater Mode"
                        >
                          <Maximize className="h-4 w-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* VIDEO METADATA & ACTION BUTTONS */}
              <div className="p-6 text-left space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#FF2A6D]/20 text-[#FF2A6D] border border-[#FF2A6D]/30 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase">
                        {currentVideo.category}
                      </span>
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase">
                        {currentVideo.resolution}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">• {currentVideo.uploadDate}</span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold text-white">{currentVideo.title}</h1>
                  </div>

                  {/* USER INTERACTIVE ACTIONS */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowEmbedModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-[#FF2A6D] to-[#9900FF] hover:opacity-90 text-white font-mono text-xs font-bold uppercase rounded-xl shadow-lg flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Code className="h-4 w-4" />
                      <span>Get Embed Code</span>
                    </button>

                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-4 py-2 bg-white/5 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 font-mono text-xs font-bold uppercase rounded-xl flex items-center space-x-1.5 cursor-pointer transition-colors"
                    >
                      <Flag className="h-4 w-4" />
                      <span>Report Video</span>
                    </button>
                  </div>
                </div>

                {/* STATS & CHANNEL DETAILS */}
                <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-gray-300 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 flex items-center justify-center font-extrabold text-white text-sm">
                      {currentVideo.studio.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center space-x-1">
                        <span>{currentVideo.studio}</span>
                        <ShieldCheck className="h-4 w-4 text-[#00F0FF]" />
                      </div>
                      <span className="text-[10px] text-gray-400">Verified Studio Provider</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1.5">
                      <Eye className="h-4 w-4 text-[#FF2A6D]" />
                      <span>{currentVideo.views} Views</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <ThumbsUp className="h-4 w-4 text-[#00F0FF]" />
                      <span>{currentVideo.likes} Approval</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Rating {currentVideo.rating}/5.0</span>
                    </div>
                  </div>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {currentVideo.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-mono text-gray-400 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* ADVANCED SEARCH & FILTERING BAR */}
            <div className="bg-[#0D121F] border border-white/10 rounded-3xl p-6 text-left space-y-6 shadow-xl">
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                
                {/* Search Input Box */}
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Advanced Search (e.g., 4K, Studio, VR 360)..."
                    className="w-full bg-black/50 border border-white/10 focus:border-[#FF2A6D] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors font-sans"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Filter Controls: Duration, Resolution, Sort */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto font-mono text-xs">
                  
                  {/* Duration Filter */}
                  <div className="flex items-center space-x-1 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <select
                      value={selectedDurationFilter}
                      onChange={(e) => setSelectedDurationFilter(e.target.value)}
                      className="bg-transparent text-white focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Durations</option>
                      <option value="short">Short (&lt; 10 min)</option>
                      <option value="medium">Medium (10-25 min)</option>
                      <option value="long">Long (&gt; 25 min)</option>
                    </select>
                  </div>

                  {/* Resolution Filter */}
                  <div className="flex items-center space-x-1 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Sliders className="h-3.5 w-3.5 text-gray-400" />
                    <select
                      value={selectedResolution}
                      onChange={(e) => setSelectedResolution(e.target.value)}
                      className="bg-transparent text-white focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Quality</option>
                      <option value="4K HDR">4K HDR</option>
                      <option value="1080p 60fps">1080p 60fps</option>
                      <option value="720p">720p HD</option>
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div className="flex items-center space-x-1 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl">
                    <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-white focus:outline-none cursor-pointer"
                    >
                      <option value="views">Sort by Views</option>
                      <option value="rating">Highest Rated</option>
                      <option value="date">Newest First</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
                {["All", "4K Ultra HD", "Trending", "Studio Originals", "VR 360", "Short Clips", "Popular"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#FF2A6D] text-white shadow-[0_0_15px_rgba(255,42,109,0.4)]"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* VIDEO CATALOG GRID */}
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2">
                  <Tv className="h-5 w-5 text-[#FF2A6D]" />
                  <span>Video Catalog ({filteredVideos.length})</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">Stream Protocol: HLS Adaptive Bitrate</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setCurrentVideo(vid);
                      setVastAdActive(true);
                      setAdTimeLeft(5);
                      setCanSkipAd(false);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className={`group bg-[#0D121F] border rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(255,42,109,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      currentVideo.id === vid.id ? "border-[#FF2A6D] ring-1 ring-[#FF2A6D]" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    {/* THUMBNAIL CONTAINER */}
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                        <span className="bg-black/70 backdrop-blur-md text-[#FF2A6D] border border-[#FF2A6D]/30 text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-md uppercase">
                          {vid.resolution}
                        </span>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10">
                        {vid.duration}
                      </div>

                      {/* Center Play Hover Icon */}
                      <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-[#FF2A6D]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                        <Play className="h-6 w-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* CARD INFO */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-[#FF2A6D] transition-colors line-clamp-2 leading-snug">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-mono">{vid.studio}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-white/5 pt-2.5">
                        <span>{vid.views} views</span>
                        <span className="text-emerald-400 font-bold">{vid.likes}</span>
                        <span>★ {vid.rating}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: VPS VIDEO SCRAPER & MASS IMPORTER ================= */}
        {activeTab === "importer" && (
          <div className="bg-[#0D121F] border border-white/10 rounded-3xl p-8 text-left space-y-8 shadow-2xl animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-[#FF2A6D]/10 text-[#FF2A6D] rounded-xl">
                    <Download className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">VPS Video Scraper & Direct Importer</h2>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Import video streams directly from external networks to your VPS storage with automatic metadata extraction.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-gray-300 flex items-center space-x-2 shrink-0">
                <Server className="h-4 w-4 text-[#00F0FF]" />
                <span>VPS Path: /var/www/vps_storage/hls/</span>
              </div>
            </div>

            {/* Scraper Input Form */}
            <form onSubmit={handleStartScrape} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                  Target Adult Video Stream URL or RSS Feed
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    required
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    placeholder="https://external-network.com/watch/v89123..."
                    className="flex-1 bg-black/60 border border-white/10 focus:border-[#FF2A6D] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition-colors font-mono"
                  />
                  <button
                    type="submit"
                    disabled={scrapeStatus !== "idle" && scrapeStatus !== "complete"}
                    className="px-6 py-3 bg-gradient-to-r from-[#FF2A6D] to-[#9900FF] hover:opacity-90 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase rounded-2xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
                  >
                    <RefreshCw className={`h-4 w-4 ${scrapeStatus !== "idle" && scrapeStatus !== "complete" ? "animate-spin" : ""}`} />
                    <span>Start VPS Scrape & Import</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Live Progress HUD */}
            {scrapeStatus !== "idle" && (
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-300 flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-[#FF2A6D] animate-pulse" />
                    <span>Status: {scrapeStatus.toUpperCase()}</span>
                  </span>
                  <span className="text-[#FF2A6D] font-bold">{scrapeProgress}%</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF2A6D] to-[#00F0FF] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${scrapeProgress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] font-mono text-gray-400 pt-2">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    1. URL Resolution: <strong className="text-emerald-400">PASSED</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    2. HLS Transcoding: <strong className={scrapeProgress >= 45 ? "text-emerald-400" : "text-amber-400"}>PROCESSING</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    3. Thumbnail Grid: <strong className={scrapeProgress >= 80 ? "text-emerald-400" : "text-gray-500"}>QUEUED</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    4. DB Sync: <strong className={scrapeProgress === 100 ? "text-emerald-400" : "text-gray-500"}>PENDING</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Extracted Metadata Preview */}
            {scrapedMetadata && (
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4 text-xs font-mono">
                <h4 className="font-bold text-white uppercase text-sm flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Auto-Extracted Metadata Summary</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Title:</span>
                    <strong>{scrapedMetadata.title}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Duration & Quality:</span>
                    <strong>{scrapedMetadata.duration} • {scrapedMetadata.resolution}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] mb-2">Auto-Generated Thumbnail Preview Grid:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {scrapedMetadata.thumbnails.map((thumb, idx) => (
                      <img key={idx} src={thumb} alt="Preview" className="w-full h-24 object-cover rounded-xl border border-white/10" />
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 3: DYNAMIC XML SITEMAP GENERATOR ================= */}
        {activeTab === "sitemap" && (
          <div className="bg-[#0D121F] border border-white/10 rounded-3xl p-8 text-left space-y-6 shadow-2xl animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FileCode className="h-5 w-5 text-[#00F0FF]" />
                  <h2 className="text-xl font-bold text-white">Dynamic XML Sitemap Generator</h2>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Generates schema-compliant Google Video Sitemap XML automatically for indexed search engine web crawlers.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(xmlSitemapContent);
                  triggerToast("Copied dynamic sitemap.xml to clipboard!");
                }}
                className="px-5 py-2.5 bg-[#FF2A6D] text-white font-mono text-xs font-bold uppercase rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-lg"
              >
                <Copy className="h-4 w-4" />
                <span>Copy XML Code</span>
              </button>
            </div>

            {/* XML Code Viewer */}
            <div className="bg-black/80 border border-white/10 rounded-2xl p-4 overflow-x-auto font-mono text-[11px] text-emerald-400 max-h-[480px] scrollbar-thin">
              <pre className="whitespace-pre-wrap">{xmlSitemapContent}</pre>
            </div>

          </div>
        )}

        {/* ================= TAB 4: FULL ADMIN CMS DASHBOARD ================= */}
        {activeTab === "admin" && (
          <div className="bg-[#0D121F] border border-white/10 rounded-3xl p-8 text-left space-y-8 shadow-2xl animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Admin CMS & VAST Ad Control Panel</h2>
                <p className="text-xs text-gray-400 font-mono">Full authority content management, user reports queue & server metrics.</p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-xl">
                  ● VPS Server Online
                </span>
              </div>
            </div>

            {/* SERVER PERFORMANCE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>VPS CPU Load</span>
                  <Cpu className="h-4 w-4 text-[#FF2A6D]" />
                </div>
                <div className="text-2xl font-bold text-white">18.4%</div>
                <p className="text-[10px] text-emerald-400">8 Core Dedicated Node</p>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>RAM Usage</span>
                  <Activity className="h-4 w-4 text-[#00F0FF]" />
                </div>
                <div className="text-2xl font-bold text-white">3.2 GB / 32 GB</div>
                <p className="text-[10px] text-gray-400">Shared HLS Cache Buffer</p>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>NVMe Storage</span>
                  <HardDrive className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">420 GB / 2.0 TB</div>
                <p className="text-[10px] text-gray-400">79% Free SSD Capacity</p>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Stream Output</span>
                  <Globe className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">4.8 Gbps</div>
                <p className="text-[10px] text-emerald-400">1,420 Active HLS Streams</p>
              </div>

            </div>

            {/* VAST AD NETWORK CONFIGURATION */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-[#FF2A6D]" />
                <span>VAST Ad Tag Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase">VAST XML Server URL</label>
                  <input
                    type="text"
                    value={vastTagUrl}
                    onChange={(e) => setVastTagUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF2A6D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase">Target CPM Rate ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vastCpm}
                    onChange={(e) => setVastCpm(parseFloat(e.target.value))}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF2A6D]"
                  />
                </div>
              </div>
            </div>

            {/* USER REPORTS MODERATION QUEUE */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>User Video Reports Queue (2 Pending)</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-amber-400 font-bold block">[DMCA / Copyright] Video #vid-4k-001</span>
                    <p className="text-gray-400 text-[11px] mt-0.5">Reported by user: "Requesting attribution update for creator credit."</p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button 
                      onClick={() => triggerToast("Dismissed report")}
                      className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20"
                    >
                      Dismiss
                    </button>
                    <button 
                      onClick={() => triggerToast("Video status updated")}
                      className="px-3 py-1.5 bg-[#FF2A6D] text-white rounded-lg hover:bg-pink-600"
                    >
                      Review Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ================= MODAL 1: EMBED CODE GENERATOR ================= */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-left animate-fade-in">
          <div className="bg-[#0D121F] border border-white/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[#FF2A6D]">
                <Code className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Embed Video Player Generator</h3>
              </div>
              <button onClick={() => setShowEmbedModal(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Customizer Toggles */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <label className="flex items-center space-x-2 bg-black/40 p-3 rounded-xl border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={embedAutoplay}
                  onChange={(e) => setEmbedAutoplay(e.target.checked)}
                  className="accent-[#FF2A6D]"
                />
                <span>Autoplay</span>
              </label>

              <label className="flex items-center space-x-2 bg-black/40 p-3 rounded-xl border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={embedMute}
                  onChange={(e) => setEmbedMute(e.target.checked)}
                  className="accent-[#FF2A6D]"
                />
                <span>Default Muted</span>
              </label>

              <label className="flex items-center space-x-2 bg-black/40 p-3 rounded-xl border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={embedVast}
                  onChange={(e) => setEmbedVast(e.target.checked)}
                  className="accent-[#FF2A6D]"
                />
                <span>VAST Ads Active</span>
              </label>
            </div>

            {/* Code Output Box */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400">HTML IFrame Embed Code:</label>
              <div className="bg-black/90 border border-white/10 rounded-2xl p-4 font-mono text-xs text-cyan-300 break-all select-all">
                {embedCodeString}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-mono text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(embedCodeString);
                  triggerToast("Copied HTML Embed Code to Clipboard!");
                  setShowEmbedModal(false);
                }}
                className="px-6 py-2.5 bg-[#FF2A6D] hover:bg-pink-600 text-white font-mono text-xs font-bold uppercase rounded-xl flex items-center space-x-1.5 shadow-lg cursor-pointer"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Embed Code</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL 2: USER REPORT VIDEO ================= */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-left animate-fade-in">
          <div className="bg-[#0D121F] border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-red-400">
                <Flag className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Report Video Issues</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">Reason for Report</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF2A6D]"
                >
                  <option value="Copyright / DMCA Violation">Copyright / DMCA Violation</option>
                  <option value="Broken Video or Audio Stream">Broken Video or Audio Stream</option>
                  <option value="Incorrect Title or Tags">Incorrect Title or Tags</option>
                  <option value="Spam / Misleading Content">Spam / Misleading Content</option>
                  <option value="Low Quality Transcode">Low Quality Transcode</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">Additional Details</label>
                <textarea
                  rows={3}
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  placeholder="Provide timestamps or relevant details..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF2A6D]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-mono text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  triggerToast("Thank you! Report submitted to moderation queue.");
                  setShowReportModal(false);
                  setReportComment("");
                }}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase rounded-xl shadow-lg cursor-pointer"
              >
                Submit Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
