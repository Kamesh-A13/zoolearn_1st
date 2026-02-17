import React from "react";

import KingdomChart from "./circle/KingdomChart";
import LearnPage from "./Learnpage/LearnPage";
import Binomial from "./Binomial/Binomial";
import TaxonomyPage from "./pramid/TaxonomyPage";
import TaxonomySystematics from "./TaxonomySystematics/TaxonomySystematics";
import LivingWorldIntro from "./LivingWorldIntro/LivingWorldIntro";

import "./TheLivingWorld.css";

function LearnTheLivingWorld() {
  
  return (
    <main className="living-world-page">
      
      {/* 1. Banner (Intro) */}
      <div className="banner-wrapper">
        <LivingWorldIntro />
      </div>

      {/* 2. All Sections Stacked Vertically */}
      <div className="content-area">
        
        {/* Default Learn Section */}
        <section id="learn-section">
           <LearnPage />
        </section>

        {/* Circle / Kingdom Chart Section */}
        <section id="circle-section">
           <KingdomChart />
        </section>

        {/* Extra: Binomial Section (if needed) */}
        <section id="nomenclature-section">
           <Binomial />
        </section>

        {/* Nomenclature / Taxonomy Systematics Section */}
        <section id="binomial-section">
           <TaxonomySystematics />
        </section>

        {/* Pyramid / Taxonomy Page Section */}
        <section id="pyramid-section">
           <TaxonomyPage />
        </section>

        

      </div>
    </main>
  );
}

export default LearnTheLivingWorld;