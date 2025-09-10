"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  Figma, Palette, Smartphone, Monitor, PenTool, Layers, 
  Grid, Zap, Users, Target, Award, Coffee, 
  X, ArrowRight, Menu, Download, ExternalLink,
  ChevronLeft, ChevronRight, Star, Heart, Eye,
  Mail, Linkedin, Github, Twitter, Instagram, Dribbble,
  ArrowUpRight, Briefcase, Clock
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Banking App Redesign",
      category: "Mobile Design",
      client: "FinTech Corp",
      year: "2024",
      description: "モダンなバンキングアプリのUI/UX完全リデザイン。ユーザビリティテストで満足度を85%向上。",
      longDescription: "従来の複雑なバンキングアプリを、シンプルで直感的なインターフェースに刷新。ユーザーリサーチから始まり、ワイヤーフレーム、プロトタイプ、最終デザインまでの全プロセスを担当。",
      role: "Lead UI/UX Designer",
      tools: ["Figma", "Principle", "Maze"],
      thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=900&fit=crop"
      ],
      results: {
        userSatisfaction: "+85%",
        taskCompletion: "+60%",
        appRating: "4.8/5.0"
      },
      process: ["Research", "Wireframing", "Prototyping", "Testing", "Implementation"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 234,
      views: 1520
    },
    {
      id: 2,
      title: "E-Learning Platform",
      category: "Web Design",
      client: "EduTech Solutions",
      year: "2024",
      description: "インタラクティブな学習体験を提供するe-learningプラットフォームのデザイン。",
      longDescription: "学生と教師の両方のニーズに応える、包括的なe-learningプラットフォーム。ゲーミフィケーション要素を取り入れ、学習意欲を向上させるデザインを実現。",
      role: "UI/UX Designer",
      tools: ["Sketch", "InVision", "Framer"],
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=900&fit=crop"
      ],
      results: {
        engagement: "+120%",
        completionRate: "+75%",
        userRetention: "+90%"
      },
      process: ["User Research", "Information Architecture", "Visual Design", "Usability Testing", "Launch"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 189,
      views: 980
    },
    {
      id: 3,
      title: "Food Delivery App",
      category: "Mobile Design",
      client: "FoodHub",
      year: "2023",
      description: "スムーズな注文体験を実現するフードデリバリーアプリのUI/UXデザイン。",
      longDescription: "競合分析とユーザーインタビューを基に、最速3タップで注文完了できる革新的なインターフェースを設計。アクセシビリティにも配慮。",
      role: "Senior UI Designer",
      tools: ["Adobe XD", "ProtoPie", "Hotjar"],
      thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop"
      ],
      results: {
        conversionRate: "+45%",
        orderTime: "-50%",
        customerRating: "4.9/5.0"
      },
      process: ["Market Research", "Personas", "User Flows", "UI Design", "Developer Handoff"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 312,
      views: 2100
    },
    {
      id: 4,
      title: "Healthcare Dashboard",
      category: "Web Design",
      client: "MediCare Plus",
      year: "2024",
      description: "医療従事者向けの直感的なダッシュボードデザイン。複雑なデータを視覚化。",
      longDescription: "医療データの可視化と患者管理を効率化するダッシュボード。リアルタイムデータ表示と予測分析機能を統合したインターフェース。",
      role: "Product Designer",
      tools: ["Figma", "Tableau", "React"],
      thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1581093458791-9d42e3c5fd14?w=1200&h=900&fit=crop"
      ],
      results: {
        efficiency: "+70%",
        errorReduction: "-80%",
        userAdoption: "95%"
      },
      process: ["Stakeholder Interviews", "Data Analysis", "Wireframing", "Interactive Prototypes", "Implementation Support"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 156,
      views: 890
    },
    {
      id: 5,
      title: "Fashion E-commerce",
      category: "Web Design",
      client: "StyleHub",
      year: "2023",
      description: "ファッションECサイトの革新的なショッピング体験デザイン。",
      longDescription: "AIを活用したパーソナライゼーションと、没入型のビジュアル体験を組み合わせたファッションECプラットフォーム。",
      role: "Creative Director",
      tools: ["Figma", "After Effects", "Cinema 4D"],
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=900&fit=crop"
      ],
      results: {
        sales: "+200%",
        avgOrderValue: "+65%",
        returnRate: "-40%"
      },
      process: ["Brand Strategy", "Concept Design", "3D Visualization", "A/B Testing", "Launch Campaign"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 445,
      views: 3200
    },
    {
      id: 6,
      title: "Fitness Tracker App",
      category: "Mobile Design",
      client: "FitLife Pro",
      year: "2024",
      description: "モチベーションを維持する革新的なフィットネストラッカーアプリ。",
      longDescription: "ゲーミフィケーションとソーシャル機能を組み合わせ、ユーザーの健康習慣形成をサポートするアプリデザイン。",
      role: "UI/UX Designer",
      tools: ["Figma", "Principle", "Lottie"],
      thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1200&h=900&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=900&fit=crop"
      ],
      results: {
        dailyActiveUsers: "+150%",
        workoutCompletion: "+80%",
        socialSharing: "+200%"
      },
      process: ["Competitor Analysis", "User Journey Mapping", "Interaction Design", "Motion Design", "Beta Testing"],
      link: "https://www.figma.com/",
      behance: "https://www.behance.net/",
      likes: 267,
      views: 1450
    }
  ];

  const skills = [
    { name: "Figma", level: 95, category: "Design Tools" },
    { name: "Sketch", level: 90, category: "Design Tools" },
    { name: "Adobe XD", level: 85, category: "Design Tools" },
    { name: "Prototyping", level: 92, category: "Skills" },
    { name: "User Research", level: 88, category: "Skills" },
    { name: "Wireframing", level: 95, category: "Skills" },
    { name: "Design Systems", level: 90, category: "Skills" },
    { name: "Interaction Design", level: 87, category: "Skills" }
  ];

  const categories = ['all', 'Mobile Design', 'Web Design'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectLike = (projectId) => {
    setLikedProjects(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(projectId)) {
        newLikes.delete(projectId);
      } else {
        newLikes.add(projectId);
      }
      return newLikes;
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900">Portfolio</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-1 py-2 transition-all text-sm font-medium ${
                    activeSection === item.toLowerCase() 
                      ? 'text-blue-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />
                  )}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download="UI_UX_Designer_Resume.pdf"
                className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Resume
              </a>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {item}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download="UI_UX_Designer_Resume.pdf"
              className="block px-6 py-3 text-blue-900 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for new projects
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6">
            <span className="text-gray-900">Hi, I'm Sarah Chen</span>
            <br />
            <span className="text-blue-900 font-normal">UI/UX Designer</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            デジタルプロダクトを通じて、美しく機能的なユーザー体験を創造します。
            5年以上の経験を活かし、ユーザー中心のデザインソリューションを提供。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              View My Work
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Get In Touch
            </button>
          </div>
          
          <div className="flex gap-4 justify-center">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <Dribbble className="w-5 h-5" />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <Grid className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4 text-gray-900">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            ユーザー体験を向上させ、ビジネス目標を達成したプロジェクトの一部
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg transition-all text-sm font-medium ${
                  filter === cat
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {project.category}
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectLike(project.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        likedProjects.has(project.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                      </span>
                    </div>
                    <span className="text-blue-900 font-medium flex items-center gap-1">
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-12 text-gray-900">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <h3 className="text-2xl font-medium mb-6 text-gray-900">
                デザインで問題を解決する
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                UI/UXデザイナーとして5年以上の経験を持ち、スタートアップから大企業まで、
                様々な規模のプロジェクトに携わってきました。ユーザーリサーチから
                プロトタイピング、実装まで、デザインプロセス全体を担当。
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                美しいだけでなく、使いやすく、ビジネス目標を達成するデザインを
                心がけています。データドリブンなアプローチで、常にユーザーの
                ニーズを中心に据えたソリューションを提供します。
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="text-3xl font-light text-blue-900 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Completed Projects</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="text-3xl font-light text-blue-900 mb-2">30+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-medium">User Research</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-medium">Prototyping</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-medium">Design Systems</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-medium">Accessibility</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-900">Skills & Tools</h3>
              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-900 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-12 text-gray-900">
            Let's Work Together
          </h2>
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-900 focus:outline-none transition-colors text-gray-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-900 focus:outline-none transition-colors text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-900 focus:outline-none transition-colors resize-none text-gray-900"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Or reach out directly</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="mailto:sarah@example.com" className="text-blue-900 hover:text-blue-800 font-medium">
                  sarah@example.com
                </a>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <a href="tel:+81901234567" className="text-blue-900 hover:text-blue-800 font-medium">
                  +81 90-1234-5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              
              {/* Image Gallery */}
              <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
                
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-blue-900 w-8' : 'bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Project Details */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Design Process</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.process.map((step, idx) => (
                        <div key={step} className="flex items-center">
                          <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                            {idx + 1}. {step}
                          </span>
                          {idx < selectedProject.process.length - 1 && (
                            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Key Results</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(selectedProject.results).map(([key, value]) => (
                        <div key={key} className="bg-blue-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-light text-blue-900 mb-1">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Client</h3>
                    <p className="font-medium text-gray-900">{selectedProject.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Role</h3>
                    <p className="font-medium text-gray-900">{selectedProject.role}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Year</h3>
                    <p className="font-medium text-gray-900">{selectedProject.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                    >
                      <Figma className="w-5 h-5" />
                      View in Figma
                    </a>
                    <a
                      href={selectedProject.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View on Behance
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center sm:text-left">
              © 2024 Sarah Chen. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-gray-700 transition-colors">
                <Dribbble className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;