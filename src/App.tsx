/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Shield, MessageSquare, ExternalLink, Code2, Layers, CheckCircle2, Award, ArrowUpRight } from "lucide-react";

import MatrixBackground from "./components/MatrixBackground";
import NoiseFilter from "./components/NoiseFilter";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import DeliverySection from "./components/DeliverySection";
import MobilitySection from "./components/MobilitySection";
import LawyerSection from "./components/LawyerSection";
import RealEstateSection from "./components/RealEstateSection";
import EbookSection from "./components/EbookSection";
import PizzeriaSection from "./components/PizzeriaSection";
import DentalSection from "./components/DentalSection";
import PreschoolSection from "./components/PreschoolSection";
import AutoEscolaSection from "./components/AutoEscolaSection";
import ContactSection from "./components/ContactSection";
import SeoSection from "./components/SeoSection";
import SeoLandingPages, { SEO_LANDING_DATA } from "./seo/SeoLandingPages";
import LawyerPortfolio from "./pages/LawyerPortfolio";
import RealEstatePortfolio from "./pages/RealEstatePortfolio";
import EbookLandingPage from "./pages/EbookLandingPage";
import PizzeriaMenu from "./pages/PizzeriaMenu";
import DentalClinic from "./pages/DentalClinic";
import PreschoolMackenzie from "./pages/PreschoolMackenzie";
import AutoEscolaPortfolio from "./pages/AutoEscolaPortfolio";
import ArchitectPortfolio from "./pages/ArchitectPortfolio";
import ArchitectSection from "./components/ArchitectSection";
import MarvetAgropecuaria from "./pages/MarvetAgropecuaria";
import MarvetSection from "./components/MarvetSection";
import VisaPortfolio from "./pages/VisaPortfolio";
import VisaSection from "./components/VisaSection";
import MarketplacePortfolio from "./pages/MarketplacePortfolio";
import LiraDriverPro from "./pages/LiraDriverPro";
import LiraDriverSection from "./components/LiraDriverSection";
import LBTrainerSection from "./components/LBTrainerSection";
import LaserCutSaaS from "./pages/LaserCutSaaS";
import LaserCutSection from "./components/LaserCutSection";
import SolarEnergyPortfolio from "./pages/SolarEnergyPortfolio";
import SolarEnergySection from "./components/SolarEnergySection";
import StasiaCosmetics from "./pages/StasiaCosmetics";
import StasiaSection from "./components/StasiaSection";
import AlfabetizacaoInfantil from "./pages/AlfabetizacaoInfantil";
import TablewareRental from "./pages/TablewareRental";
import SneakerDistributor from "./pages/SneakerDistributor";
import BoloesCaixaReserva from "./pages/BoloesCaixaReserva";
import LojaQuadrosDecorativos from "./pages/LojaQuadrosDecorativos";
import LBTrainer from "./pages/LBTrainer";
import AdultStreamPlatform from "./pages/AdultStreamPlatform";
import AdultStreamSection from "./components/AdultStreamSection";
import SoReservarPortal from "./pages/SoReservarPortal";
import TabacariaEcommerce from "./pages/TabacariaEcommerce";
import SereneApp from "./pages/SereneApp";
import MealPrepPlatform from "./pages/MealPrepPlatform";
import ColdTrackApp from "./pages/ColdTrackApp";
import BarberFlowApp from "./pages/BarberFlowApp";
import FormulaVitaApp from "./pages/FormulaVitaApp";
import FormulaVitaSection from "./components/FormulaVitaSection";
import TaNaMaoApp from "./pages/TaNaMaoApp";
import TaNaMaoSection from "./components/TaNaMaoSection";
import NexoSegurosApp from "./pages/NexoSegurosApp";
import NexoSegurosSection from "./components/NexoSegurosSection";
import KennelLegacyApp from "./pages/KennelLegacyApp";
import KennelLegacySection from "./components/KennelLegacySection";
import { GMGCheckApp } from "./pages/GMGCheckApp";
import { GMGCheckSection } from "./components/GMGCheckSection";
import NexoTicketsApp from "./pages/NexoTicketsApp";
import { NexoTicketsSection } from "./components/NexoTicketsSection";
import BHPresentesApp from "./pages/BHPresentesApp";
import { BHPresentesSection } from "./components/BHPresentesSection";
import EntrelinhasApp from "./pages/EntrelinhasApp";
import { EntrelinhasSection } from "./components/EntrelinhasSection";
import { ContentFlowApp } from "./pages/ContentFlowApp";
import { ContentFlowSection } from "./components/ContentFlowSection";

// SEO Framework Imports
import { SEOProvider, MetaTags, StructuredData, getOrganizationSchema, getWebsiteSchema, getLocalBusinessSchema } from "./seo/SEOComponents";
import { AnalyticsProvider } from "./seo/AnalyticsProvider";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync with browser back/forward and custom pushState navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Track scrolling to light up navigation anchors on the main landing page
  useEffect(() => {
    if (currentPath !== "/") return;

    const handleScroll = () => {
      const sections = ["project-delivery", "project-mobility", "project-lawyer", "seo-optimization", "expertise-grid", "compiler-sandbox", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateTo = (path: string) => {
    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      window.history.pushState({}, "", route || "/");
      setCurrentPath(route || "/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, route === "/" || route === "" ? 50 : 150);
    } else {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Extract the slug from the URL path
  const slug = currentPath.startsWith("/") ? currentPath.substring(1) : currentPath;
  const isSeoPage = SEO_LANDING_DATA[slug] !== undefined;

  const renderFooter = () => {
    // Categorized footer links for crawlability and authority
    const columns = [
      {
        title: "01 // SOLUÇÕES COM IA",
        links: [
          { text: "Chatbot Personalizado com IA", path: "/desenvolvimento-de-chatbot-personalizado-com-ia" },
          { text: "Integração de APIs de IA", path: "/integracao-de-api-de-inteligencia-artificial-em-sistemas" },
          { text: "Automação de Processos", path: "/automatizacao-de-processos-internos-via-software" },
          { text: "Gerador Conteúdo Corporativo", path: "/criar-gerador-de-conteudo-automatizado-corporativo" },
          { text: "Automação Comercial", path: "/desenvolvimento-de-ferramentas-de-automacao-comercial" },
        ]
      },
      {
        title: "02 // SISTEMAS & SAAS",
        links: [
          { text: "SaaS Sob Medida", path: "/desenvolvimento-de-saas-sob-medida" },
          { text: "Sistema de Afiliados", path: "/desenvolvimento-de-sistema-de-afiliados-personalizado" },
          { text: "Painel Administrativo Restrito", path: "/criar-plataforma-web-com-painel-administrativo-restrito" },
          { text: "Sistema de Comissionamento", path: "/criar-sistema-de-comissionamento-e-vendas-web" },
          { text: "Dashboards Corporativos", path: "/desenvolvimento-de-dashboards-corporativos-integrados" },
        ]
      },
      {
        title: "03 // RESGATE & MODERNIZAÇÃO",
        links: [
          { text: "Refatoração de Sistemas Web", path: "/empresa-para-refatoracao-de-sistemas-web" },
          { text: "Corrigir Erros Código Legado", path: "/desenvolvedor-para-corrigir-erros-de-codigo-legado" },
          { text: "Banco de Dados em Nuvem", path: "/migracao-de-banco-de-dados-para-servidor-em-nuvem" },
          { text: "Modernização de Sistemas", path: "/modernizacao-de-sistemas-corporativos-antigos" },
          { text: "Manutenção de Plataformas", path: "/manutencao-preventiva-de-plataformas-web" },
        ]
      },
      {
        title: "04 // INTEGRAÇÕES & MOBILE",
        links: [
          { text: "Integração de API Customizada", path: "/integracao-de-api-customizada-em-site-profissional" },
          { text: "Aplicativo com ERP", path: "/desenvolvimento-de-aplicativo-integrado-com-erp" },
          { text: "Banco de Dados Escalável", path: "/programacao-de-sistemas-com-banco-de-dados-escalavel" },
          { text: "Plataforma Mobile e Web", path: "/criar-plataforma-mobile-integrada-com-sistema-web" },
        ]
      },
      {
        title: "05 // SEO & REPUTAÇÃO",
        links: [
          { text: "Empresa no Google Maps", path: "/como-colocar-minha-empresa-no-topo-do-google-maps" },
          { text: "Agência de SEO Local", path: "/agencia-de-seo-local-para-empresas" },
          { text: "Reputação Digital no Google", path: "/gerenciamento-de-reputacao-digital-no-google" },
          { text: "Mudar Site Sem Perder SEO", path: "/como-mudar-de-site-sem-perder-o-posicionamento-no-google" },
          { text: "SEO para E-Commerce", path: "/consultoria-de-seo-para-e-commerce" },
        ]
      },
      {
        title: "06 // PORTFÓLIO & CASOS",
        links: [
          { text: "Website Advocacia Premium", path: "/portfolio/advogado" },
          { text: "Website Imobiliária Luxo", path: "/portfolio/imobiliaria" },
          { text: "Möbius Studio de Arquitetura", path: "/portfolio/arquiteto" },
          { text: "Marvet Produtos Agropecuários", path: "/portfolio/marvet" },
          { text: "Consultoria Vistos & Passaporte", path: "/portfolio/visto-e-passaporte" },
          { text: "Marketplace de Serviços", path: "/portfolio/marketplace" },
          { text: "Landing Page E-book", path: "/portfolio/ebook" },
          { text: "Cardápio Pizzaria Artesanal", path: "/portfolio/pizzaria" },
          { text: "Clínica Odontológica Premium", path: "/portfolio/dentista" },
          { text: "Escola Infantil Mackenzie", path: "/portfolio/escola" },
          { text: "Autoescola Tecnológica Piloto", path: "/portfolio/autoescola" },
          { text: "Lira Driver Pro App", path: "/portfolio/lira-driver-pro" },
          { text: "LaserCut B2B SaaS", path: "/portfolio/laser-cut-saas" },
          { text: "Stasia Cosméticos Store", path: "/portfolio/stasia-cosmeticos" },
          { text: "Alfabetização Infantil", path: "/portfolio/alfabetizacao-infantil" },
          { text: "Aluguel de Mesa & Cozinha", path: "/portfolio/aluguel-mesa-cozinha" },
          { text: "Distribuidora de Tênis", path: "/portfolio/distribuidora-tenis" },
          { text: "Reserva de Bolões Caixa", path: "/portfolio/reserva-boloes" },
          { text: "Loja de Quadros Decorativos", path: "/portfolio/loja-quadros" },
          { text: "Plataforma Fitness LB Trainer", path: "/portfolio/lb-trainer" },
          { text: "So Reservar - Portal de Viagens", path: "/portfolio/so-reservar" },
          { text: "Tabacaria Velvet & Brasa", path: "/portfolio/tabacaria" },
          { text: "App Serene - Bem-Estar & Meditação", path: "/portfolio/serene" },
          { text: "FreshPrep - Refeições & Marmitas", path: "/portfolio/meal-prep" },
          { text: "ColdTrack - Gestão de Refrigeração", path: "/portfolio/coldtrack" },
          { text: "BarberFlow - Agendamento Barbearias", path: "/portfolio/barberflow" },
          { text: "Fórmula Vita - Farmácia de Manipulação", path: "/portfolio/formula-vita" },
          { text: "TáNáMão - App Contratação de Serviços", path: "/portfolio/tanamao" },
          { text: "Nexo Seguros - Corretora de Seguros", path: "/portfolio/nexo-seguros" },
          { text: "Kennel Legacy - Criadores de Cães & Pedigree", path: "/portfolio/kennel-legacy" },
          { text: "GMG Check - Vistorias Técnicas & Relatórios", path: "/portfolio/gmg-check" },
          { text: "Nexo Tickets - Gestão de Ingressos & Eventos", path: "/portfolio/nexo-tickets" },
          { text: "BH Presentes - Loja de Celulares", path: "/portfolio/bh-presentes" },
          { text: "Entrelinhas - Blog Minimalista & Artigos", path: "/portfolio/entrelinhas" },
          { text: "ContentFlow - SaaS de Gestão Editorial & Aprovação", path: "/portfolio/contentflow" },
          { text: "App Delivery Fast-Food", path: "/#project-delivery" },
          { text: "Plataforma Mobilidade", path: "/#project-mobility" },
          { text: "Painel de Controle SEO", path: "/#seo-optimization" },
          { text: "Showcase Arquitetônico", path: "/#expertise-grid" },
        ]
      }
    ];

    return (
      <footer className="relative bg-black border-t border-white/10 pt-16 pb-12 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          {/* SEO Links Map Directory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-left pb-12 border-b border-white/5">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
                  {col.title}
                </span>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(link.path);
                        }}
                        className="text-white/40 hover:text-[#00FF41] font-sans text-xs transition-colors duration-200 block"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo brand */}
            <div 
              onClick={() => navigateTo("/")}
              className="flex items-baseline space-x-1.5 select-none text-left cursor-pointer group"
            >
              <span className="font-sans font-black tracking-widest text-sm text-white uppercase group-hover:text-[#00FF41] transition-colors">
                AUGUSTO
              </span>
              <span className="font-mono text-[#00FF41] font-extrabold text-xs">
                DEV
              </span>
              <span className="font-mono text-white/30 text-[10px] ml-2">// CODE IN LATAM</span>
            </div>

            {/* Copyright description */}
            <p className="text-white/30 font-mono text-[10px] text-center md:text-right uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} AUGUSTO DEV. SYSTEM VERSION 2.1.0 // SECURE CONNECTION
            </p>

            {/* Bottom active status lights */}
            <div className="flex items-center space-x-3 text-white/40 font-mono text-[9px] uppercase font-bold">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#00FF41]" />
                <div className="w-1.5 h-1.5 bg-[#00FF41]/50" />
                <div className="w-1.5 h-1.5 bg-[#00FF41]/20" />
              </div>
              <span>SEO SYSTEM ACTIVE</span>
            </div>
          </div>

        </div>
      </footer>
    );
  };

  // CASE 0: Standalone 100% Independent Lawyer Portfolio Page
  if (currentPath === "/portfolio/advogado" || currentPath === "/site-de-advogado") {
    return <LawyerPortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.1: Standalone 100% Independent Real Estate Portfolio Page
  if (currentPath === "/portfolio/imobiliaria" || currentPath === "/site-de-imobiliaria") {
    return <RealEstatePortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.2: Standalone 100% Independent E-book High-Converting Landing Page
  if (currentPath === "/portfolio/ebook" || currentPath === "/venda-de-ebook" || currentPath === "/site-de-ebook") {
    return <EbookLandingPage onBack={() => navigateTo("/")} />;
  }

  // CASE 0.3: Standalone 100% Independent Pizzeria Digital Menu Page
  if (currentPath === "/portfolio/pizzaria" || currentPath === "/cardapio-digital" || currentPath === "/site-de-pizzaria" || currentPath === "/cardapio-de-pizzaria") {
    return <PizzeriaMenu onBack={() => navigateTo("/")} />;
  }

  // CASE 0.4: Standalone 100% Independent Dental Clinic Page
  if (currentPath === "/portfolio/dentista" || currentPath === "/consultorio-dentista" || currentPath === "/site-de-dentista" || currentPath === "/clinica-odontologica") {
    return <DentalClinic onBack={() => navigateTo("/")} />;
  }

  // CASE 0.5: Standalone 100% Independent Preschool Mackenzie Page
  if (currentPath === "/portfolio/escola" || currentPath === "/portfolio/preschool" || currentPath === "/escola-mackenzie" || currentPath === "/site-de-escola" || currentPath === "/pre-escola-mackenzie") {
    return <PreschoolMackenzie onBack={() => navigateTo("/")} />;
  }

  // CASE 0.6: Standalone 100% Independent Auto Escola Portfolio Page
  if (currentPath === "/portfolio/autoescola" || currentPath === "/portfolio/auto-escola" || currentPath === "/autoescola" || currentPath === "/autoescola-piloto" || currentPath === "/site-de-autoescola") {
    return <AutoEscolaPortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.7: Standalone 100% Independent Architect Portfolio Page
  if (currentPath === "/portfolio/arquiteto" || currentPath === "/portfolio/arquitetura" || currentPath === "/site-de-arquiteto" || currentPath === "/site-de-arquitetura" || currentPath === "/arquiteto" || currentPath === "/arquitetura") {
    return <ArchitectPortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.8: Standalone 100% Independent Marvet Agropecuária Page
  if (currentPath === "/portfolio/marvet" || currentPath === "/portfolio/agropecuaria" || currentPath === "/site-de-agropecuaria" || currentPath === "/marvet" || currentPath === "/agropecuaria" || currentPath === "/portfolio/marvet-agropecuaria") {
    return <MarvetAgropecuaria onBack={() => navigateTo("/")} />;
  }

  // CASE 0.9: Standalone 100% Independent Visa and Passport Page
  if (currentPath === "/portfolio/visto-e-passaporte" || currentPath === "/visto-e-passaporte" || currentPath === "/site-de-visto-e-passaporte" || currentPath === "/portfolio/consultoria-vistos") {
    return <VisaPortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.10: Standalone 100% Independent Service Marketplace Platform Page
  if (currentPath === "/portfolio/marketplace" || currentPath === "/plataforma-marketplace" || currentPath === "/site-de-marketplace" || currentPath === "/site-de-servicos" || currentPath === "/portfolio/plataforma-servicos") {
    return <MarketplacePortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.11: Standalone 100% Independent Lira Driver Pro Page
  if (currentPath === "/portfolio/lira-driver-pro" || currentPath === "/lira-driver-pro" || currentPath === "/site-de-motorista-app" || currentPath === "/site-de-motorista" || currentPath === "/portfolio/lira-driver") {
    return <LiraDriverPro onBack={() => navigateTo("/")} />;
  }

  // CASE 0.12: Standalone 100% Independent LaserCut B2B SaaS Page
  if (currentPath === "/portfolio/laser-cut-saas" || currentPath === "/laser-cut-saas" || currentPath === "/site-de-laser-cut" || currentPath === "/site-de-corte-a-laser" || currentPath === "/portfolio/corte-a-laser") {
    return <LaserCutSaaS onBack={() => navigateTo("/")} />;
  }

  // CASE 0.13: Standalone 100% Independent Solar Energy Page
  if (currentPath === "/portfolio/energia-solar" || currentPath === "/energia-solar" || currentPath === "/site-de-energia-solar" || currentPath === "/portfolio/solar" || currentPath === "/solar" || currentPath === "/site-de-energia-solar-calculadora") {
    return <SolarEnergyPortfolio onBack={() => navigateTo("/")} />;
  }

  // CASE 0.14: Standalone 100% Independent Stasia Cosmetics Page
  if (currentPath === "/portfolio/stasia-cosmeticos" || currentPath === "/stasia-cosmeticos" || currentPath === "/site-de-cosmeticos" || currentPath === "/portfolio/stasia" || currentPath === "/stasia") {
    return <StasiaCosmetics onBack={() => navigateTo("/")} />;
  }

  // CASE 0.15: Standalone 100% Independent Alfabetizacao Infantil Page
  if (currentPath === "/portfolio/alfabetizacao-infantil" || currentPath === "/alfabetizacao-infantil" || currentPath === "/site-de-alfabetizacao" || currentPath === "/site-de-alfabetizacao-infantil") {
    return <AlfabetizacaoInfantil onBack={() => navigateTo("/")} />;
  }

  // CASE 0.16: Standalone 100% Independent Tableware and Kitchen Rental Page
  if (currentPath === "/portfolio/aluguel-mesa-cozinha" || currentPath === "/aluguel-mesa-cozinha" || currentPath === "/site-de-aluguel-de-loucas" || currentPath === "/aluguel-de-loucas" || currentPath === "/site-de-aluguel-de-louças" || currentPath === "/aluguel-de-louças") {
    return <TablewareRental onBack={() => navigateTo("/")} />;
  }

  // CASE 0.17: Standalone 100% Independent Sneaker Distributor E-Commerce Page
  if (currentPath === "/portfolio/distribuidora-tenis" || currentPath === "/distribuidora-tenis" || currentPath === "/ecommerce-tenis" || currentPath === "/site-de-distribuidora-de-tenis" || currentPath === "/site-de-distribuidora-de-tênis" || currentPath === "/distribuidora-de-tenis" || currentPath === "/distribuidora-de-tênis") {
    return <SneakerDistributor onBack={() => navigateTo("/")} />;
  }

  // CASE 0.18: Standalone 100% Independent CEF Lottery Pools Reservation Simulator Page
  if (currentPath === "/portfolio/reserva-boloes" || currentPath === "/reserva-boloes" || currentPath === "/simulador-boloes" || currentPath === "/bolao-caixa" || currentPath === "/boloes-caixa" || currentPath === "/reserva-de-boloes") {
    return <BoloesCaixaReserva onBack={() => navigateTo("/")} />;
  }

  // CASE 0.19: Standalone 100% Independent Decorative Frames Virtual Store Page
  if (currentPath === "/portfolio/loja-quadros" || currentPath === "/loja-quadros" || currentPath === "/quadros-decorativos" || currentPath === "/loja-de-quadros" || currentPath === "/quadros") {
    return <LojaQuadrosDecorativos onBack={() => navigateTo("/")} />;
  }

  // CASE 0.20: Standalone 100% Independent Fitness Platform LB Trainer MVP
  if (currentPath === "/portfolio/lb-trainer" || currentPath === "/lb-trainer" || currentPath === "/plataforma-fitness" || currentPath === "/site-de-treino" || currentPath === "/site-fitness") {
    return <LBTrainer onBack={() => navigateTo("/")} />;
  }

  // CASE 0.21: Standalone 100% Independent Responsive Adult Streaming Platform
  if (currentPath === "/portfolio/adult-stream" || currentPath === "/adult-stream" || currentPath === "/site-adulto-responsivo" || currentPath === "/adult-video-platform" || currentPath === "/site-adulto" || currentPath === "/adult-streaming-platform") {
    return <AdultStreamPlatform onBack={() => navigateTo("/")} />;
  }

  // CASE 0.22: Standalone 100% Independent So Reservar Travel Portal Page
  if (currentPath === "/portfolio/so-reservar" || currentPath === "/so-reservar" || currentPath === "/soreservar" || currentPath === "/reserva-de-viagens" || currentPath === "/portal-so-reservar") {
    return <SoReservarPortal onBack={() => navigateTo("/")} />;
  }

  // CASE 0.23: Standalone 100% Independent E-commerce Tabacaria & Headshop Velvet & Brasa
  if (currentPath === "/portfolio/tabacaria" || currentPath === "/tabacaria" || currentPath === "/headshop" || currentPath === "/smoke-shop" || currentPath === "/loja-tabacaria") {
    return <TabacariaEcommerce onBack={() => navigateTo("/")} />;
  }

  // CASE 0.24: Standalone 100% Independent Serene Emotional Wellness MVP App
  if (currentPath === "/portfolio/serene" || currentPath === "/serene" || currentPath === "/app-serene" || currentPath === "/site-de-meditacao" || currentPath === "/portfolio/serene-app") {
    return <SereneApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.25: Standalone 100% Independent Meal Prep & Fresh Frozen Food Membership Platform (Factor Style)
  if (currentPath === "/portfolio/meal-prep" || currentPath === "/meal-prep" || currentPath === "/marmitas" || currentPath === "/marmita-fitness" || currentPath === "/factor" || currentPath === "/freshprep") {
    return <MealPrepPlatform onBack={() => navigateTo("/")} />;
  }

  // CASE 0.26: Standalone 100% Independent ColdTrack Refrigeration & Equipment Monitoring System
  if (currentPath === "/portfolio/coldtrack" || currentPath === "/coldtrack" || currentPath === "/cold-track" || currentPath === "/refrigeracao" || currentPath === "/coldtrackapp") {
    return <ColdTrackApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.27: Standalone BarberFlow Scheduling & Management System for Barbershops
  if (currentPath === "/portfolio/barberflow" || currentPath === "/barberflow" || currentPath === "/barbearia" || currentPath === "/barber-flow" || currentPath === "/barberflowapp") {
    return <BarberFlowApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.28: Standalone Formula Vita Compounding Pharmacy & Recipe Quote Platform
  if (currentPath === "/portfolio/formula-vita" || currentPath === "/formula-vita" || currentPath === "/farmacia-de-manipulacao" || currentPath === "/site-de-farmacia-de-manipulacao" || currentPath === "/portfolio/farmacia") {
    return <FormulaVitaApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.29: Standalone TáNáMão Service Hiring Platform & Marketplace
  if (currentPath === "/portfolio/tanamao" || currentPath === "/tanamao" || currentPath === "/aplicativo-de-servicos" || currentPath === "/tanamao-app" || currentPath === "/portfolio/servicos") {
    return <TaNaMaoApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.30: Standalone Nexo Seguros Insurance Brokerage Platform
  if (currentPath === "/portfolio/nexo-seguros" || currentPath === "/nexo-seguros" || currentPath === "/site-de-seguros" || currentPath === "/corretora-de-seguros" || currentPath === "/portfolio/seguros") {
    return <NexoSegurosApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.31: Standalone Kennel Legacy Dog Breeders & Pedigree Platform
  if (currentPath === "/portfolio/kennel-legacy" || currentPath === "/kennel-legacy" || currentPath === "/canil" || currentPath === "/pedigree" || currentPath === "/criadores" || currentPath.startsWith("/canil/") || currentPath.startsWith("/cao/")) {
    return <KennelLegacyApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.32: Standalone GMG Check Technical Inspection Platform
  if (currentPath === "/portfolio/gmg-check" || currentPath === "/gmg-check" || currentPath === "/vistorias" || currentPath === "/gmg" || currentPath === "/gmgcheck" || currentPath === "/gmg-vistorias" || currentPath === "/vistoria-gmg") {
    return <GMGCheckApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.33: Standalone Nexo Tickets Ticketing & Split Payments Platform
  if (currentPath === "/portfolio/nexo-tickets" || currentPath === "/nexo-tickets" || currentPath === "/ingressos" || currentPath === "/nexo" || currentPath === "/nexotickets" || currentPath === "/eventos-nexo" || currentPath === "/tickets") {
    return <NexoTicketsApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.34: Standalone BH Presentes - Cell Phone Store Landing Page (Pampulha, BH)
  if (currentPath === "/portfolio/bh-presentes" || currentPath === "/bh-presentes" || currentPath === "/pampulha-cell" || currentPath === "/celulares" || currentPath === "/bh-celulares" || currentPath === "/celulares-pampulha" || currentPath === "/loja-de-celulares") {
    return <BHPresentesApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.35: Standalone 100% Independent Entrelinhas Minimalist Personal Blog
  if (currentPath === "/portfolio/entrelinhas" || currentPath === "/entrelinhas" || currentPath === "/blog" || currentPath === "/site-de-blog" || currentPath === "/blog-minimalista" || currentPath === "/artigos") {
    return <EntrelinhasApp onBack={() => navigateTo("/")} />;
  }

  // CASE 0.36: Standalone 100% Independent ContentFlow Editorial & Approval SaaS
  if (currentPath === "/portfolio/contentflow" || currentPath === "/contentflow" || currentPath === "/saas-de-conteudo" || currentPath === "/gestao-editorial" || currentPath === "/content-flow" || currentPath === "/portal-de-aprovacao") {
    return <ContentFlowApp onBack={() => navigateTo("/")} />;
  }

  // CASE 1: Path matches one of our 23 SEO-optimized friendly URLs
  if (isSeoPage) {
    return (
      <SEOProvider>
        <AnalyticsProvider>
          <div className="relative min-h-screen bg-[#020202] text-white flex flex-col font-sans relative selection:bg-[#00FF41]/30 selection:text-white antialiased overflow-x-hidden">
            <MatrixBackground />
            <NoiseFilter />

            {/* Header/Navbar */}
            <header className="fixed top-4 left-4 right-4 h-16 bg-black/80 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-between px-6 z-40 max-w-7xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in">
              {/* Logo Brand clicking goes back to Home */}
              <div 
                onClick={() => navigateTo("/")} 
                className="flex items-center space-x-2.5 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border border-[#00FF41]/50 animate-spin" />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-sans font-black tracking-widest text-sm text-white group-hover:text-[#00FF41] transition-colors uppercase">
                    AUGUSTO
                  </span>
                  <span className="font-mono text-[#00FF41] font-extrabold text-xs">
                    DEV
                  </span>
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => navigateTo("/")}
                  className="px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider text-white/50 border border-transparent hover:text-[#00FF41] cursor-pointer flex items-center space-x-1"
                >
                  <span>← VOLTAR PARA HOME</span>
                </button>
              </nav>

              {/* Contact CTA Button */}
              <button
                onClick={() => {
                  const contactEl = document.getElementById("contact");
                  if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-1.5 px-4 rounded border border-[#00FF41]/50 bg-black text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.3)] font-mono text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 hover:bg-[#00FF41]/15 group cursor-pointer"
              >
                <span className="flex items-center space-x-1.5">
                  <MessageSquare className="h-3 w-3 text-[#00FF41]" />
                  <span>ORÇAMENTO</span>
                </span>
              </button>
            </header>

            <main className="relative max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-32 space-y-24 w-full">
              {/* Standalone Keyword SEO Landing Page */}
              <SeoLandingPages initialSlug={slug} />

              {/* Contact Form Section */}
              <section id="contact" className="scroll-mt-24 pt-16 border-t border-white/5">
                <ContactSection />
              </section>
            </main>

            {/* Categorized Footer Links */}
            {renderFooter()}
          </div>
        </AnalyticsProvider>
      </SEOProvider>
    );
  }

  // CASE 2: Main Homepage
  return (
    <SEOProvider>
      <AnalyticsProvider>
        <div className="relative min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
          
          {/* Dynamic SEO Meta Tags & Multi-schema JSON-LD Data */}
          <MetaTags />
          <StructuredData id="organization" schema={getOrganizationSchema()} />
          <StructuredData id="website" schema={getWebsiteSchema()} />
          <StructuredData id="localbusiness" schema={getLocalBusinessSchema()} />

          {/* 1. Ambient Background Particles and Noise */}
          <MatrixBackground />
          <NoiseFilter />

          {/* 2. Glassmorphic High-Tech Header / Navbar */}
          <header className="fixed top-4 left-4 right-4 h-16 bg-black/80 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-between px-6 z-40 max-w-7xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            
            {/* Small Logo Brand */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border border-[#00FF41]/50 animate-spin" />
                <div className="absolute h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-pulse" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-sans font-black tracking-widest text-sm text-white group-hover:text-[#00FF41] transition-colors uppercase">
                  AUGUSTO
                </span>
                <span className="font-mono text-[#00FF41] font-extrabold text-xs">
                  DEV
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { label: "Cases", id: "project-delivery" },
                { label: "SEO", id: "seo-optimization" },
                { label: "Expertise", id: "expertise-grid" },
                { label: "Contato", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === item.id
                      ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30"
                      : "text-white/50 border border-transparent hover:text-[#00FF41]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Contact CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="py-1.5 px-4 rounded border border-[#00FF41]/50 bg-black text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.3)] font-mono text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 hover:bg-[#00FF41]/15 group cursor-pointer"
            >
              <span className="flex items-center space-x-1.5">
                <MessageSquare className="h-3 w-3 text-[#00FF41]" />
                <span>CONTATO</span>
              </span>
            </button>

          </header>

          {/* 3. Hero Section */}
          <section className="relative w-full pt-16">
            <Hero />
          </section>

          {/* Main Structural Layout Wrapper */}
          <main className="relative max-w-7xl mx-auto px-4 md:px-8 space-y-32 pb-32">
            
            {/* Section divider with coordinate systems */}
            <div className="flex items-center space-x-4 w-full select-none">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 flex-1" />
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] font-semibold">CASOS DE SUCESSO // DESENVOLVIMENTOS</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 flex-1" />
            </div>

            {/* 4. Delivery Case Section (Case 01) */}
            <section className="scroll-mt-24">
              <DeliverySection />
            </section>

            {/* 5. Mobility Case Section (Case 02) */}
            <section className="scroll-mt-24">
              <MobilitySection />
            </section>

            {/* 6. Lawyer Case Section (Case 03) */}
            <section className="scroll-mt-24">
              <LawyerSection />
            </section>

            {/* 6.1. Real Estate Case Section (Case 04) */}
            <section className="scroll-mt-24">
              <RealEstateSection />
            </section>

            {/* 6.2. E-book Landing Page Case Section (Case 05) */}
            <section className="scroll-mt-24">
              <EbookSection />
            </section>

            {/* 6.3. Pizzeria Digital Menu Case Section (Case 06) */}
            <section className="scroll-mt-24">
              <PizzeriaSection />
            </section>

            {/* 6.4. Dental Clinic Case Section (Case 07) */}
            <section className="scroll-mt-24">
              <DentalSection />
            </section>

            {/* 6.5. Preschool Mackenzie Case Section (Case 08) */}
            <section className="scroll-mt-24">
              <PreschoolSection />
            </section>

            {/* 6.6. Autoescola Piloto Case Section (Case 09) */}
            <section className="scroll-mt-24">
              <AutoEscolaSection />
            </section>

            {/* 6.7. Möbius Studio Architect Portfolio Case Section (Case 10) */}
            <section className="scroll-mt-24">
              <ArchitectSection />
            </section>

            {/* 6.8. Marvet Agropecuária Case Section (Case 11) */}
            <section className="scroll-mt-24">
              <MarvetSection />
            </section>

            {/* 6.9. Visa and Passport Consulting Case Section (Case 12) */}
            <section className="scroll-mt-24" id="project-visa">
              <VisaSection />
            </section>

            {/* 6.10. Lira Driver Pro Case Section (Case 13) */}
            <section className="scroll-mt-24" id="project-lira-driver">
              <LiraDriverSection />
            </section>

            {/* 6.11. LaserCut B2B SaaS Case Section (Case 14) */}
            <section className="scroll-mt-24" id="project-laser-cut">
              <LaserCutSection />
            </section>

            {/* 6.12. Solar Energy Case Section (Case 15) */}
            <section className="scroll-mt-24" id="project-solar-energy">
              <SolarEnergySection />
            </section>

            {/* 6.13. Stasia Cosmetics Case Section (Case 16) */}
            <section className="scroll-mt-24" id="project-stasia">
              <StasiaSection />
            </section>

            {/* 6.14. LB Trainer Fitness SaaS Case Section (Case 17) */}
            <section className="scroll-mt-24" id="project-lb-trainer">
              <LBTrainerSection />
            </section>

            {/* 6.15. Adult Streaming Platform Case Section (Case 21) */}
            <section className="scroll-mt-24" id="project-adult-stream">
              <AdultStreamSection />
            </section>

            {/* 6.16. Formula Vita Compounding Pharmacy Case Section (Case 28) */}
            <section className="scroll-mt-24" id="project-formula-vita">
              <FormulaVitaSection />
            </section>

            {/* 6.17. TáNáMão Service Hiring Marketplace Case Section (Case 29) */}
            <section className="scroll-mt-24" id="project-tanamao">
              <TaNaMaoSection />
            </section>

            {/* 6.18. Nexo Seguros Insurance Brokerage Case Section (Case 30) */}
            <section className="scroll-mt-24" id="project-nexo-seguros">
              <NexoSegurosSection />
            </section>

            {/* 6.19. Kennel Legacy Dog Breeders & Pedigree Platform Case Section (Case 31) */}
            <section className="scroll-mt-24" id="project-kennel-legacy">
              <KennelLegacySection />
            </section>

            {/* 6.20. GMG Check Technical Inspection Platform Case Section (Case 32) */}
            <section className="scroll-mt-24" id="project-gmg-check">
              <GMGCheckSection onOpenApp={() => navigateTo("/portfolio/gmg-check")} />
            </section>

            {/* 6.21. Nexo Tickets Ticketing & Split Payments Platform Case Section (Case 33) */}
            <section className="scroll-mt-24" id="project-nexo-tickets">
              <NexoTicketsSection onOpenApp={() => navigateTo("/portfolio/nexo-tickets")} />
            </section>

            {/* 6.22. BH Presentes Cell Phone Store Landing Page Case Section (Case 34) */}
            <section className="scroll-mt-24" id="project-bh-presentes">
              <BHPresentesSection onOpenApp={() => navigateTo("/portfolio/bh-presentes")} />
            </section>

            {/* 6.23. Entrelinhas Minimalist Personal Blog Case Section (Case 35) */}
            <section className="scroll-mt-24" id="project-entrelinhas">
              <EntrelinhasSection onOpenApp={() => navigateTo("/portfolio/entrelinhas")} />
            </section>

            {/* 6.24. ContentFlow SaaS MVP Case Section (Case 36) */}
            <section className="scroll-mt-24" id="project-contentflow">
              <ContentFlowSection onOpenApp={() => navigateTo("/portfolio/contentflow")} />
            </section>

            {/* Section divider */}
            <div className="flex items-center space-x-4 w-full select-none">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 flex-1" />
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] font-semibold">OTIMIZAÇÃO DE PERFORMANCE & SEO // GOOGLE</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 flex-1" />
            </div>

            {/* SEO Case Section */}
            <section className="scroll-mt-24">
              <SeoSection />
            </section>

            {/* Section divider */}
            <div className="flex items-center space-x-4 w-full select-none">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 flex-1" />
              <span className="font-mono text-[9px] text-[#00FF41] tracking-[0.3em] font-semibold">SEO KEYWORDS LANDING HUB // DYNAMIC SEARCH</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 flex-1" />
            </div>

            {/* Dynamic SEO Landing Pages Preview Hub */}
            <section className="scroll-mt-24">
              <SeoLandingPages />
            </section>

            {/* Section divider */}
            <div className="flex items-center space-x-4 w-full select-none">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 flex-1" />
              <span className="font-mono text-[9px] text-[#00FF41] tracking-[0.3em] font-semibold">TECNOLOGIAS & CORE METRICAS</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 flex-1" />
            </div>

            {/* 8. Bento Grid Architectural Showcase */}
            <section className="scroll-mt-24">
              <BentoGrid />
            </section>

            {/* Section divider */}
            <div className="flex items-center space-x-4 w-full select-none">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/10 flex-1" />
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] font-semibold">CONECTE-SE AO FUTURO</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/10 flex-1" />
            </div>

            {/* 9. Contact form dashboard panel */}
            <section className="scroll-mt-24">
              <ContactSection />
            </section>

          </main>

          {/* 10. Categorized Footer Links */}
          {renderFooter()}

        </div>
      </AnalyticsProvider>
    </SEOProvider>
  );
}
