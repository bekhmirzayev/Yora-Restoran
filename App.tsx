import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Utensils, 
  Phone, 
  Clock, 
  MapPin, 
  ChefHat, 
  Heart, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Send, 
  Loader2, 
  X,
  Home,
  Menu as MenuIcon,
  Users,
  Briefcase
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MenuItem, InfoCardData, ActiveTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showJobSuccess, setShowJobSuccess] = useState(false);
  
  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // UI Interaction State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedInfoCard, setSelectedInfoCard] = useState<InfoCardData | null>(null);

  // Toast Timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // --- INFO CARDS DATA ---
  const infoCards: InfoCardData[] = [
    {
        id: 'hours',
        title: "Har Kuni Ochiq",
        icon: Clock,
        shortDesc: "08:00 - 23:00",
        detailedDesc: "Restoranimiz haftaning har kuni ertalab soat 08:00 dan kechki 23:00 gacha uzluksiz ishlaydi. Ertalabdan tushlik va kechki ovqatgacha sizni kutib olamiz. Maxsus bayram kunlari yoki o'zgarishlar haqida ijtimoiy tarmoqlarimizda alohida e'lon qilinadi."
    },
    {
        id: 'location',
        title: "Qulay Joylashuv",
        icon: MapPin,
        shortDesc: "Markaz, Parkovka bor",
        detailedDesc: "Biz Toshkent shahrining markazida, Amir Temur ko'chasi 15-uyda joylashganmiz. Mehmonlarimiz uchun restoran oldida keng va bepul avtoturargoh xizmatlari mavjud. Bizga jamoat transportida ham oson yetib kelish mumkin. Manzil xaritasi bo'limini ham ko'rib chiqing!"
    },
    {
        id: 'quality',
        title: "Halol va Pokiza",
        icon: Heart,
        shortDesc: "100% Halol",
        detailedDesc: "Bizning restoranimizda faqat halol sertifikatiga ega va ekologik toza mahsulotlardan foydalaniladi. Taomlarimizni tayyorlash jarayonida tozalik va gigienaga alohida e'tibor beramiz. Sizning sog'ligingiz va ishonchingiz biz uchun eng muhim!"
    },
  ];

  // Menyu ma'lumotlari (Taomlar)
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Toshkent Palov",
      price: "45,000",
      description: "Lazer guruch, qo'y go'shti va sariq sabzi bilan damlangan an'anaviy osh.",
      image: "https://images.unsplash.com/photo-1628151016556-51203b5736b4?auto=format&fit=crop&q=80&w=800",
      category: "Asosiy"
    },
    {
      id: 2,
      name: "Qo'y Go'shtli Shashlik",
      price: "18,000",
      description: "Maxsus marinad, ziravorlar va yumshoq qo'y go'shti (bir donasi).",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
      category: "Kaboblar"
    },
    {
      id: 3,
      name: "Uyg'urcha Lag'mon",
      price: "38,000",
      description: "Qo'lda cho'zilgan xamir, selderey va mol go'shti qaylasi bilan.",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
      category: "Suyuq"
    },
    {
      id: 4,
      name: "Tandir Somsa",
      price: "12,000",
      description: "Qat-qat xamir va shirali mol go'shti qiymasi.",
      image: "https://images.unsplash.com/photo-1606756606041-8604753ba54b?auto=format&fit=crop&q=80&w=800",
      category: "Pishiriqlar"
    },
    {
      id: 5,
      name: "Manti (5 dona)",
      price: "40,000",
      description: "Yupqa xamir va maydalangan go'sht, qaymoq bilan tortiladi.",
      image: "https://images.unsplash.com/photo-1541544744-378ca6e890c2?auto=format&fit=crop&q=80&w=800",
      category: "Xamirli"
    },
    {
      id: 6,
      name: "Qaymoqli Steyk",
      price: "85,000",
      description: "Yevropa uslubida pishirilgan yumshoq mol go'shti va qo'ziqorinli sous.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
      category: "Yevropa"
    },
    {
      id: 7,
      name: "Qozon Kabob",
      price: "60,000",
      description: "Qozonda o'z yog'ida pishirilgan mol go'shti va kartoshka.",
      image: "https://images.unsplash.com/photo-1628205469446-ee30623a31c5?auto=format&fit=crop&q=80&w=800",
      category: "Asosiy"
    },
    {
      id: 8,
      name: "Tovuq Go'shtli Steyk",
      price: "55,000",
      description: "Grilda pishirilgan tovuq filesi, pishiriqlar bilan.",
      image: "https://images.unsplash.com/photo-1574900877420-53018284534f?auto=format&fit=crop&q=80&w=800",
      category: "Yevropa"
    },
    {
      id: 9,
      name: "Napoleon Torti",
      price: "25,000",
      description: "Qat-qat xamir, bodomli krem va yong'oq sepilgan.",
      image: "https://images.unsplash.com/photo-1582234032551-7667a149f696?auto=format&fit=crop&q=80&w=800",
      category: "Shirinliklar"
    },
    {
      id: 10,
      name: "Qaynar Sho'rva",
      price: "35,000",
      description: "Mol go'shti, sabzi va kartoshka bo'laklaridan tayyorlangan vitaminli sho'rva.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      category: "Suyuq"
    }
  ];

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowJobSuccess(true);
    setTimeout(() => setShowJobSuccess(false), 5000);
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const handleAiConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    setAiResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Sen "Yora" oilaviy restoranining sun'iy intellekt ofitsiantisan (AI Maslahatchi).
                Mijoz senga nima yeyishni xohlashini yoki kayfiyatini aytadi.
                
                Bizning menyu: ${JSON.stringify(menuItems)}.
                
                Foydalanuvchi so'rovi: "${aiPrompt}".
                
                Vazifang:
                1. Faqat va faqat menyudagi bor taomlarni tavsiya qil.
                2. Javobing qisqa, samimiy va o'zbek tilida bo'lsin.
                3. Tavsiya qilgan taomlaring narxini ham yozib o't.
                4. Agar menyuda yo'q narsa so'rasa, uzr so'rab, menyudagi o'xshash narsani taklif qil.
                
                Javobni chiroyli va ishtahani ochadigan qilib formatla.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
         setAiResponse(response.text);
      } else {
         setAiResponse("Uzr, hozircha aloqa yaxshi emas. Iltimos qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Tizimda xatolik yuz berdi. Iltimos keyinroq urinib ko'ring.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Toast Component
  const Toast = () => (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ${toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'}`}>
      <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-700 backdrop-blur-md bg-opacity-95">
        <div className="bg-green-500 rounded-full p-1 animate-pulse">
          <CheckCircle size={16} className="text-white" />
        </div>
        <span className="font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );

  // Modal Component
  const InfoDetailModal: React.FC<{ card: InfoCardData | null, onClose: () => void }> = ({ card, onClose }) => {
    if (!card) return null;

    const IconComponent = card.icon;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[110] flex items-center justify-center p-4 animate-fade-in-up" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100 hover:shadow-orange-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-orange-100 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{card.title}</h3>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {card.detailedDesc}
            </p>

            <button 
              onClick={onClose} 
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-medium hover:bg-orange-700 active:scale-95 transition shadow-lg hover:shadow-orange-500/30"
            >
              Tushunarli
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="font-sans text-gray-800 bg-orange-50 min-h-screen flex flex-col pb-20 md:pb-0 selection:bg-orange-200 selection:text-orange-900">
      
      <Toast />
      <InfoDetailModal card={selectedInfoCard} onClose={() => setSelectedInfoCard(null)} />

      {/* Desktop Navbar - Sticky Top */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 hidden md:block transition-all duration-300 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="bg-orange-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-md group-hover:shadow-orange-300">
              <Utensils className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-orange-900 transition-colors">Yora <span className="text-orange-600">Oilaviy Restorani</span></span>
          </div>
          
          <div className="flex space-x-8 font-medium">
            <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-500 transition hover:-translate-y-0.5`}>Bosh sahifa</button>
            <button onClick={() => setActiveTab('menu')} className={`${activeTab === 'menu' ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-500 transition hover:-translate-y-0.5`}>Menyu</button>
            <button 
              onClick={() => setActiveTab('ai-chef')} 
              className={`${activeTab === 'ai-chef' ? 'text-purple-600 bg-purple-50 ring-2 ring-purple-100' : 'text-gray-600'} px-3 py-1 rounded-full hover:text-purple-500 transition flex items-center gap-2 border border-transparent hover:border-purple-200 hover:shadow-sm active:scale-95`}
            >
              <Sparkles size={18} className="text-purple-500" /> AI Maslahat
            </button>
            <button onClick={() => setActiveTab('careers')} className={`${activeTab === 'careers' ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-500 transition hover:-translate-y-0.5`}>Vakansiya</button>
            <button onClick={() => setActiveTab('founders')} className={`${activeTab === 'founders' ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-500 transition hover:-translate-y-0.5`}>Asoschilar</button>
          </div>

          <button onClick={() => setActiveTab('menu')} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg shadow-orange-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 hover:shadow-orange-500/40">
            <ShoppingBag size={18} /> Buyurtma
          </button>
        </div>
      </nav>
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 px-4 py-3 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2 active:scale-95 transition-transform" onClick={() => setActiveTab('home')}>
           <div className="bg-orange-500 p-1.5 rounded-lg shadow-sm">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-800">Yora <span className="text-orange-600">Restorani</span></span>
        </div>
        <button 
          onClick={() => {
            setActiveTab('menu');
            showToast("Buyurtma bo'limiga o'tildi");
          }}
          className="bg-orange-50 text-orange-600 p-2.5 rounded-full hover:bg-orange-100 active:scale-90 transition-all shadow-sm border border-orange-100"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Mobile Bottom Navigation - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 flex justify-around items-center py-2 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-2 rounded-2xl w-1/5 transition-all duration-300 active:scale-90 ${activeTab === 'home' ? 'text-orange-600' : 'text-gray-400 hover:bg-gray-50'}`}>
          <Home size={22} className={`mb-1 transition-transform duration-300 ${activeTab === 'home' ? 'scale-110 -translate-y-1 fill-current' : ''}`} />
          <span className={`text-[10px] font-medium transition-opacity ${activeTab === 'home' ? 'opacity-100 font-bold' : 'opacity-80'}`}>Asosiy</span>
        </button>
        <button onClick={() => setActiveTab('menu')} className={`flex flex-col items-center p-2 rounded-2xl w-1/5 transition-all duration-300 active:scale-90 ${activeTab === 'menu' ? 'text-orange-600' : 'text-gray-400 hover:bg-gray-50'}`}>
          <MenuIcon size={22} className={`mb-1 transition-transform duration-300 ${activeTab === 'menu' ? 'scale-110 -translate-y-1 stroke-[2.5px]' : ''}`} />
          <span className={`text-[10px] font-medium transition-opacity ${activeTab === 'menu' ? 'opacity-100 font-bold' : 'opacity-80'}`}>Menyu</span>
        </button>
        <button onClick={() => setActiveTab('ai-chef')} className={`flex flex-col items-center p-2 rounded-2xl w-1/5 transition-all duration-300 active:scale-90 ${activeTab === 'ai-chef' ? 'text-purple-600' : 'text-gray-400 hover:bg-gray-50'}`}>
          <div className={`p-1.5 rounded-full mb-0.5 transition-all duration-300 ${activeTab === 'ai-chef' ? 'bg-purple-100 scale-110 -translate-y-1 shadow-sm' : ''}`}>
             <Sparkles size={20} className={`transition-all ${activeTab === 'ai-chef' ? 'fill-current animate-pulse' : ''}`} />
          </div>
          <span className={`text-[10px] font-medium transition-opacity ${activeTab === 'ai-chef' ? 'opacity-100 font-bold' : 'opacity-80'}`}>AI</span>
        </button>
        <button onClick={() => setActiveTab('careers')} className={`flex flex-col items-center p-2 rounded-2xl w-1/5 transition-all duration-300 active:scale-90 ${activeTab === 'careers' ? 'text-orange-600' : 'text-gray-400 hover:bg-gray-50'}`}>
          <Briefcase size={22} className={`mb-1 transition-transform duration-300 ${activeTab === 'careers' ? 'scale-110 -translate-y-1 stroke-[2.5px]' : ''}`} />
          <span className={`text-[10px] font-medium transition-opacity ${activeTab === 'careers' ? 'opacity-100 font-bold' : 'opacity-80'}`}>Ish</span>
        </button>
        <button onClick={() => setActiveTab('founders')} className={`flex flex-col items-center p-2 rounded-2xl w-1/5 transition-all duration-300 active:scale-90 ${activeTab === 'founders' ? 'text-orange-600' : 'text-gray-400 hover:bg-gray-50'}`}>
          <Users size={22} className={`mb-1 transition-transform duration-300 ${activeTab === 'founders' ? 'scale-110 -translate-y-1 fill-current' : ''}`} />
          <span className={`text-[10px] font-medium transition-opacity ${activeTab === 'founders' ? 'opacity-100 font-bold' : 'opacity-80'}`}>Biz</span>
        </button>
      </div>

      {/* Asosiy qism (Main Content) */}
      <main className="flex-grow w-full overflow-hidden">
        
        {/* --- HERO SECTION --- */}
        {activeTab === 'home' && (
          <div className="relative animate-fade-in-up">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" 
                 alt="Restaurant Interior" 
                 className="w-full h-full object-cover brightness-50 transform scale-105 animate-[pulse_10s_ease-in-out_infinite]"
               />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center text-white">
              {/* Xush kelibsiz xabari */}
              <h1 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight tracking-tight">
                Yora Oilaviy Restoraniga <br/> <span className="text-orange-400">xush kelibsiz!</span>
              </h1>
              <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto opacity-95 font-light animation-delay-100 animate-fade-in-up drop-shadow-md">
                Milliy va zamonaviy taomlarning betakror uyg'unligi. 
                Shinam muhit, halol mahsulotlar va yuqori sifat.
              </p>
              <div className="flex justify-center gap-4 flex-wrap animation-delay-200 animate-fade-in-up">
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-orange-900/20 transform hover:-translate-y-1 hover:scale-105 active:scale-95 border-b-4 border-orange-700 hover:border-orange-800 active:border-b-0 active:translate-y-1"
                >
                  Menyuni ko'rish
                </button>
                <button 
                  onClick={() => setActiveTab('ai-chef')}
                  className="bg-white/10 backdrop-blur hover:bg-white/20 text-white text-lg px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center gap-2 border border-white/30 hover:border-white/50 hover:scale-105 active:scale-95"
                >
                  <Sparkles size={20} className="text-purple-300 animate-pulse" /> AI Maslahatchi
                </button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20 text-left animation-delay-300 animate-fade-in-up pb-10">
                {infoCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div 
                      key={card.id}
                      onClick={() => setSelectedInfoCard(card)}
                      className="group bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl active:scale-95 shadow-lg flex md:block items-center gap-4"
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-400 md:mb-3 flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold group-hover:text-orange-200 transition-colors">{card.title}</h3>
                        <p className="text-gray-200 text-sm md:text-base">{card.shortDesc}</p>
                        <span className="text-orange-300 text-xs md:text-sm font-semibold mt-1 md:mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Batafsil <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- MENU SECTION --- */}
        {activeTab === 'menu' && (
          <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in-up">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Bizning Mazali Taomlar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                Har bir taom mehr bilan tayyorlangan. Narxlarimiz hamyonbop, sifati esa a'lo darajada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {menuItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer active:scale-[0.98] hover:-translate-y-2 relative flex flex-col h-full border border-transparent hover:border-orange-100`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => showToast(`${item.name} haqida ma'lumot ochilmoqda...`)}
                >
                  <div className="relative h-64 md:h-72 overflow-hidden rounded-t-2xl"> 
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                      {item.category}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h3>
                      <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-2 bg-orange-50 px-2 py-1 rounded-lg">{item.price}</span>
                    </div>
                    <p className="text-gray-500 mb-4 text-sm line-clamp-2 flex-grow">{item.description}</p>
                    <button 
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 flex justify-center items-center gap-2 mt-auto shadow-md hover:shadow-lg active:scale-95 group-hover:bg-gray-800"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        showToast(`${item.name} savatchaga qo'shildi!`); 
                      }}
                    >
                      <ShoppingBag size={18} /> Savatga qo'shish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- AI CHEF SECTION --- */}
        {activeTab === 'ai-chef' && (
          <div className="container mx-auto px-4 py-8 md:py-16 animate-fade-in-up">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-purple-100 rounded-full mb-4 animate-[bounce_2s_infinite]">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">AI Maslahatchi</h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Bugun nima yeyishni bilmayapsizmi? <br className="hidden md:inline" />
                  Sun'iy intellekt sizga eng mos taomni tavsiya qiladi!
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 mb-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="p-5 md:p-8 bg-gradient-to-r from-purple-50 to-white">
                  <form onSubmit={handleAiConsultation} className="relative">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Masalan: Menda yengil tushlik qilish niyati bor, lekin go'shtli bo'lsin..."
                      className="w-full h-32 p-4 pr-14 rounded-2xl border-2 border-purple-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 resize-none text-gray-700 placeholder-gray-400 bg-white transition-all shadow-sm text-base focus:shadow-md"
                      required
                    />
                    <button 
                      type="submit" 
                      disabled={isAiLoading || !aiPrompt.trim()}
                      className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white p-2 md:p-3 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center active:scale-90 hover:shadow-lg hover:-translate-y-1"
                    >
                      {isAiLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </button>
                  </form>
                </div>

                {/* AI Response Area */}
                {(aiResponse || isAiLoading) && (
                  <div className="p-5 md:p-8 border-t border-gray-100 bg-gray-50 min-h-[150px]">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-600 p-2 rounded-lg flex-shrink-0 mt-1 shadow-md animate-fade-in-up">
                        <ChefHat className="text-white w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">AI Maslahatchi javobi:</h4>
                        {isAiLoading ? (
                          <div className="space-y-3 animate-pulse">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        ) : (
                          <div className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up hover:shadow-md transition-shadow">
                            {aiResponse}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["🍜 Issiq ovqat", "🥗 Yengil salat", "🥩 Go'shtli", "💰 Arzonroq"].map((suggestion, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setAiPrompt(suggestion)}
                    className="bg-white hover:bg-purple-50 active:bg-purple-100 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-full text-xs md:text-sm border border-gray-200 hover:border-purple-200 transition-all duration-200 shadow-sm active:scale-95 hover:shadow-md hover:-translate-y-0.5"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CAREERS SECTION --- */}
        {activeTab === 'careers' && (
          <div className="container mx-auto px-4 py-8 md:py-16 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform hover:scale-[1.01] transition-transform duration-500">
              <div className="md:w-1/2 bg-gray-900 p-8 md:p-10 text-white flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-orange-500 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700"></div>
                 <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700"></div>
                 
                 <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 relative z-10">Jamoamizga qo'shiling!</h2>
                 <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base relative z-10">
                   Biz doimiy ravishda iste'dodli oshpazlar, ofitsiantlar va ma'murlarni qidiramiz. 
                   Ahil jamoa va qulay ish sharoitlari sizni kutmoqda.
                 </p>
                 <ul className="space-y-3 md:space-y-4 text-sm md:text-base relative z-10">
                   <li className="flex items-center gap-3"><CheckCircle className="text-orange-400 w-5 h-5" /> Bepul tushlik</li>
                   <li className="flex items-center gap-3"><CheckCircle className="text-orange-400 w-5 h-5" /> O'z vaqtida maosh</li>
                   <li className="flex items-center gap-3"><CheckCircle className="text-orange-400 w-5 h-5" /> Karyera o'sishi</li>
                 </ul>
              </div>

              <div className="md:w-1/2 p-6 md:p-10 bg-white">
                {!showJobSuccess ? (
                  <form onSubmit={handleJobSubmit} className="space-y-4 md:space-y-5">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Anketani to'ldiring</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Ismingiz</label>
                      <input required type="text" placeholder="Azizbek" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow hover:bg-gray-50" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Telefon raqamingiz</label>
                      <input required type="tel" placeholder="+998 90 123 45 67" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow hover:bg-gray-50" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Qaysi lavozimga?</label>
                      <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow hover:bg-gray-50">
                        <option>Ofitsiant</option>
                        <option>Oshpaz</option>
                        <option>Yordamchi oshpaz</option>
                        <option>Idish yuvuvchi</option>
                        <option>Administrator</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-orange-500/30">
                      Arizani yuborish
                    </button>
                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up py-10">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-[bounce_1s_ease-in-out_1]" />
                    <h3 className="text-2xl font-bold text-gray-800">Rahmat!</h3>
                    <p className="text-gray-600 mt-2">Sizning arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- FOUNDERS SECTION --- */}
        {activeTab === 'founders' && (
          <div className="container mx-auto px-4 py-8 md:py-16 animate-fade-in-up">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Restoran Asoschilari</h2>
              <p className="text-gray-600 mt-3 text-sm md:text-base">Yora restoranini yaratgan insonlar va ularning maqsadi.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              
              {/* Founder 1 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border-t-4 border-orange-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-inner group-hover:border-orange-100 transition-colors">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="Founder 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Jamshid aka</h3>
                <p className="text-orange-600 font-medium mb-4">Bosh Oshpaz & Asoschi</p>
                <p className="text-gray-500 text-sm italic">
                  "Men uchun ovqat shunchaki oziq-ovqat emas, bu san'at. Har bir mijozimiz bu yerdan mamnun bo'lib ketishi mening oliy maqsadim."
                </p>
              </div>

              {/* Founder 2 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border-t-4 border-gray-800 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-inner group-hover:border-gray-200 transition-colors">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Founder 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Malika opa</h3>
                <p className="text-gray-700 font-medium mb-4">Boshqaruvchi & Hamkor</p>
                <p className="text-gray-500 text-sm italic">
                  "Restoranimizda oilaviy muhit va samimiyatni saqlashga harakat qilamiz. Biznesda halollik va tartib eng muhimi."
                </p>
              </div>

            </div>
            
            <div className="mt-10 md:mt-16 bg-white p-6 md:p-8 rounded-2xl shadow-sm text-center max-w-3xl mx-auto hover:shadow-md transition-shadow duration-300">
               <h4 className="text-lg font-bold mb-2">Bizning Tarix</h4>
               <p className="text-gray-600 text-sm md:text-base">
                 "Yora" oilaviy restorani 2020-yilda kichik oilaviy choyxona sifatida ish boshlagan. Bugungi kunda esa yuzlab mehmonlarni kutib oladigan zamonaviy maskanga aylandi. Biz an'analarga sodiq qolgan holda zamonaviy xizmat ko'rsatishni maqsad qilganmiz.
               </p>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:py-12 mt-auto hidden md:block">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Utensils className="text-orange-500" /> Yora <span className="text-orange-500">Restorani</span>
            </h4>
            <p className="text-gray-400 text-sm">
              Sizning sevimli taomlaringiz va yoqimli hordiq manzili.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-lg mb-4">Bo'limlar</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-400 cursor-pointer transition-colors" onClick={() => setActiveTab('menu')}>Menyu</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors" onClick={() => setActiveTab('careers')}>Vakansiya</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors" onClick={() => setActiveTab('ai-chef')}>AI Maslahatchi</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors" onClick={() => setActiveTab('founders')}>Biz haqimizda</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Aloqa</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2 group cursor-pointer hover:text-orange-400 transition-colors">
                <Phone size={16} className="group-hover:rotate-12 transition-transform"/> +998 71 200 00 00
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-orange-400 transition-colors">
                <MapPin size={16} className="group-hover:bounce transition-transform"/> Toshkent sh, Amir Temur ko'chasi
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Ijtimoiy tarmoqlar</h5>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-tr from-yellow-500 to-pink-600 transition-all cursor-pointer transform hover:scale-110 active:scale-95 shadow-lg">IG</div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all cursor-pointer transform hover:scale-110 active:scale-95 shadow-lg">TG</div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer transform hover:scale-110 active:scale-95 shadow-lg">YT</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; 2024 Yora Oilaviy Restorani. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
};

export default App;