import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../images/logo1.png'
import heroImage from '../images/heroImage1.jpg';
import { 
  Brain, 
  PenTool, 
  Sparkles, 
  Trophy,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  ArrowRight,
  Check,
  Star,
  Users,
  FileText,
  Award
} from 'lucide-react';
import './index.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze handwriting patterns with exceptional accuracy"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Digital Transformation",
      description: "Convert handwritten medical notes into clear, legible digital text instantly"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Our system evolves and improves with each contribution from medical professionals"
    }
  ];

  const stats = [
    { value: "Starting", label: "Data Collection Phase", icon: <FileText className="w-5 h-5" /> },
    { value: "Early", label: "Development Stage", icon: <Check className="w-5 h-5" /> },
    { value: "Join Now", label: "Be Among First Contributors", icon: <Star className="w-5 h-5" /> },
    { value: "24/7", label: "Support Available", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <img 
                src={logo}
                alt="DeepScribe"
                className="h-8 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#contribute" className="text-gray-600 hover:text-gray-900 transition-colors">Contribute</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 Q20,5 30,30 T50,30 T70,30 T90,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10,50 Q20,25 30,50 T50,50 T70,50 T90,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10,70 Q20,45 30,70 T50,70 T70,70 T90,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="handwritten text-6xl md:text-7xl block mb-2">Transform</span>{" "}
              Medical Handwriting<br />
              into Digital Clarity
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Be part of the pioneering team that's building the future of medical documentation. Your handwriting samples will train our groundbreaking AI model.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group shadow-lg"
              >
                <span>Start Contributing</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#how-it-works"
                className="px-8 py-4 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage}
                alt="Doctor writing notes" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="handwritten text-4xl">Our </span> <span className="ml-1">Journey</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're at the beginning of an exciting journey to revolutionize medical documentation. Join us now to make the biggest impact.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="handwritten text-4xl">Powerful </span> <span className="ml-1">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge technology makes handwriting analysis faster and more accurate than ever before.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow hover-scale"
              >
                <div className="w-14 h-14 bg-gray-900 text-white rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="handwritten text-4xl">How </span> <span className="ml-1">It Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of medical professionals and help improve healthcare documentation.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "1", title: "Sign Up", description: "Create your account with your medical credentials", icon: <Users className="w-5 h-5" /> },
                { step: "2", title: "Contribute", description: "Submit handwriting samples through our intuitive interface", icon: <PenTool className="w-5 h-5" /> },
                { step: "3", title: "Earn Points", description: "Get rewarded for your valuable contributions", icon: <Award className="w-5 h-5" /> },
                { step: "4", title: "Track Progress", description: "Monitor your impact on the medical community", icon: <Trophy className="w-5 h-5" /> }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    {item.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section id="contribute" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="handwritten text-4xl">Why </span> <span className="ml-1">Contribute</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your contributions will directly shape the future of medical documentation technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Be a Pioneer",
                description: "Join the first wave of contributors who will shape this groundbreaking technology from the beginning."
              },
              {
                title: "Earn Recognition & Rewards",
                description: "Early contributors receive special recognition, higher point values, and exclusive benefits."
              },
              {
                title: "Transform Healthcare",
                description: "Help create technology that will save countless hours of documentation time for medical professionals worldwide."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,30 Q20,5 30,30 T50,30 T70,30 T90,30" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M10,50 Q20,25 30,50 T50,50 T70,50 T90,50" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M10,70 Q20,45 30,70 T50,70 T70,70 T90,70" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Ready to <span className="handwritten text-4xl md:text-5xl">Transform </span> <span className="ml-1">Healthcare?</span>
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Be among the first to contribute to this revolutionary medical documentation technology.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-lg flex items-center mx-auto space-x-2 group"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img 
                src={logo}
                alt="DeepScribe"
                className="h-8 w-auto mb-4"
              />
              <p className="text-gray-600 mb-4 max-w-md">
                We're building a revolutionary deep learning model to convert handwritten medical text to structured digital text in real time. Your contributions are essential to our success.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/VISTORA-TRAYANA-LLP" target="_blank" className="text-gray-400 hover:text-gray-600">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/medtrack.care?igsh=MXY0M2U3NzdpYjdjaA==" target="_blank" className="text-gray-400 hover:text-gray-600">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/medtrack-care" target="_blank" className="text-gray-400 hover:text-gray-600">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a></li>
                <li><a href="#contribute" className="text-gray-600 hover:text-gray-900 transition-colors">Contribute</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              © 2025 DeepScribe. Made by <a href="https://medtrack.co.in" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-gray-900">MedTrack</a>
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              A product of VISTORA TRAYANA LLP
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}