import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

// Shared components
import { ToastProvider, Spinner, UnderDevelopment, ScrollToTop } from './components/shared';

// Lazy load pages for better performance
const Home = lazy(() => import('./components/home/MainHome'));
const Tree = lazy(() => import('./components/taxonomytree/tree'));
const About = lazy(() => import('./components/company/about/about'));
const TheLivingWorld = lazy(() => import('./components/home/concept/thelivingworld/TheLivingWorld'));
const BasicFeatures = lazy(() => import('./components/home/concept/BasicFeatures/BasicFeatures'));
const Patterns = lazy(() => import('./components/home/concept/Patterns/Patterns'));
// const KingdomAnimalia = lazy(() => import('./components/home/concept/KingdomAnimalia/KingdomAnimalia'));
const ZoologyImmersive = lazy(() => import('./components/showcase/ZoologyImmersive'));
const Leech = lazy(() => import('./components/home/Organisms/leech/LeechLayout'));
const Rabbit = lazy(() => import('./components/home/Organisms/rabbit/Rabbit'));
const HoneyBee = lazy(() => import('./components/home/Organisms/honeybee/HoneyBee'));
const Cockroach = lazy(() => import('./components/home/Organisms/cockroach/Cockroachcontent'));
const CareerPath = lazy(() => import('./components/career-path/CareerPath'));
const CareerCategory = lazy(() => import('./components/career-path/CareerCategory'));


// ZooHub Main
const ZooHub = lazy(() => import('./components/zoohub/ZooHub'));

// Dynamic Species Engines - Phylum Components
const PoriferaPhylum1 = lazy(() => import('./components/zoohub/porifera/Phylum1'));
const CoelenterataPhylum2 = lazy(() => import('./components/zoohub/coelenterata/Phylum2'));
const CtenophoraPhylum3 = lazy(() => import('./components/zoohub/ctenophora/Phylum3'));
const PlatyhelminthesPhylum4 = lazy(() => import('./components/zoohub/platyhelminthes/Phylum4'));
const AschelminthesPhylum5 = lazy(() => import('./components/zoohub/aschelminthes/Phylum5'));
const AnnelidaPhylum6 = lazy(() => import('./components/zoohub/annelida/Phylum6'));
const ArthropodaPhylum7 = lazy(() => import('./components/zoohub/arthropoda/Phylum7'));
const MolluscaPhylum8 = lazy(() => import('./components/zoohub/mollusca/Phylum8'));
const EchinodermataPhylum9 = lazy(() => import('./components/zoohub/echinodermata/Phylum9'));
const HemichordataPhylum10 = lazy(() => import('./components/zoohub/hemichordata/Phylum10'));
const ChordataPhylum11 = lazy(() => import('./components/zoohub/chordata/Phylum11'));

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="app-container">
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Header Section */}
        <Header />

        {/* Main Content Area with Loading State */}
        <main className="main-content">
          <Suspense fallback={<Spinner fullPage text="Loading..." />}>
            <Routes>

              {/* ============ MAIN PAGES ============ */}
              <Route path="/" element={<Home />} />
              <Route path="/taxonomy-tree" element={<Tree />} />
              <Route path="/about" element={<About />} />
              <Route path="/living-world" element={<TheLivingWorld />} />
              <Route path="/basic-features-of-classification" element={<BasicFeatures />} />
              <Route path="/anatomy" element={<Patterns />} />
              {/* <Route path="/kingdom-animalia" element={<KingdomAnimalia />} /> */}
              <Route path="/leech" element={<Leech />} />
              <Route path="/rabbit" element={<Rabbit />} />
              <Route path="/honeybee" element={<HoneyBee />} />
              <Route path="/cockroach" element={<Cockroach />} />
              <Route path="/evolution" element={<UnderDevelopment />} />
              <Route path="/career-path" element={<CareerPath />} />
              <Route path="/career-path/:categoryId" element={<CareerCategory />} />



              {/* ============ ZOOHUB MAIN ============ */}
              <Route path="/zoohub" element={<ZooHub />} />

              {/* ============ PHYLUM PORTALS ============ */}
              <Route path="/zoohub/porifera" element={<ZooHub />} />
              <Route path="/zoohub/coelenterata" element={<ZooHub />} />
              <Route path="/zoohub/ctenophora" element={<ZooHub />} />
              <Route path="/zoohub/platyhelminthes" element={<ZooHub />} />
              <Route path="/zoohub/aschelminthes" element={<ZooHub />} />
              <Route path="/zoohub/annelida" element={<ZooHub />} />
              <Route path="/zoohub/arthropoda" element={<ZooHub />} />
              <Route path="/zoohub/mollusca" element={<ZooHub />} />
              <Route path="/zoohub/echinodermata" element={<ZooHub />} />
              <Route path="/zoohub/hemichordata" element={<ZooHub />} />
              <Route path="/zoohub/chordata" element={<ZooHub />} />

              {/* ============ DYNAMIC SPECIES ROUTES ============ */}
              <Route path="/zoohub/porifera/:slug" element={<PoriferaPhylum1 />} />
              <Route path="/zoohub/coelenterata/:slug" element={<CoelenterataPhylum2 />} />
              <Route path="/zoohub/ctenophora/:slug" element={<CtenophoraPhylum3 />} />
              <Route path="/zoohub/platyhelminthes/:slug" element={<PlatyhelminthesPhylum4 />} />
              <Route path="/zoohub/aschelminthes/:slug" element={<AschelminthesPhylum5 />} />
              <Route path="/zoohub/annelida/:slug" element={<AnnelidaPhylum6 />} />
              <Route path="/zoohub/arthropoda/:slug" element={<ArthropodaPhylum7 />} />
              <Route path="/zoohub/mollusca/:slug" element={<MolluscaPhylum8 />} />
              <Route path="/zoohub/echinodermata/:slug" element={<EchinodermataPhylum9 />} />
              <Route path="/zoohub/hemichordata/:slug" element={<HemichordataPhylum10 />} />
              <Route path="/zoohub/chordata/:slug" element={<ChordataPhylum11 />} />

              {/* ============ FALLBACK ============ */}
              <Route path="*" element={<UnderDevelopment />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;