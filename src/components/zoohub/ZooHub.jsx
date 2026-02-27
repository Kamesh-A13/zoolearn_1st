import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import './ZooHub.css';

// Components
import Porifera from "./porifera/Porifera";
import Platyhelminthes from "./platyhelminthes/Platyhelminthes";
import Coelenterata from "./coelenterata/Coelenterata";
import Ctenophora from "./ctenophora/Ctenophora";
import Aschelminthes from "./aschelminthes/Aschelminthes";
import Annelida from "./annelida/Annelida";
import Arthropoda from "./arthropoda/Arthropoda";
import Mollusca from "./mollusca/Mollusca";
import Echinodermata from "./echinodermata/Echinodermata";
import Hemichordata from "./hemichordata/Hemichordata";
import Chordata from "./chordata/Chordata";

// Shared components
import { ScrollReveal } from "../shared/ScrollReveal";
import Skeleton, { SkeletonSearchItem } from "../shared/Skeleton";
import CountUp from "../shared/CountUp";

// Static data moved outside component to prevent re-creation on every render
const phylumIcons = {
  porifera: "🧽",
  coelenterata: "🌊",
  ctenophora: "💫",
  platyhelminthes: "🪱",
  aschelminthes: "🦠",
  annelida: "🐛",
  arthropoda: "🦀",
  mollusca: "🐙",
  echinodermata: "⭐",
  hemichordata: "🔬",
  chordata: "🐟"
};

const phylumColors = {
  porifera: "#e74c3c",
  coelenterata: "#3498db",
  ctenophora: "#9b59b6",
  platyhelminthes: "#f39c12",
  aschelminthes: "#1abc9c",
  annelida: "#e67e22",
  arthropoda: "#e91e63",
  mollusca: "#00bcd4",
  echinodermata: "#4caf50",
  hemichordata: "#795548",
  chordata: "#2196f3"
};

// Phylum/class entries for search
const phylumMap = [
  { name: "Porifera", description: "Sponges", icon: "🧽", route: "/zoohub", scrollKey: "porifera", type: "phylum" },
  { name: "Coelenterata", description: "Cnidarians / Jellyfish & Corals", icon: "🌊", route: "/zoohub", scrollKey: "coelenterata", type: "phylum" },
  { name: "Ctenophora", description: "Comb Jellies", icon: "💫", route: "/zoohub", scrollKey: "ctenophora", type: "phylum" },
  { name: "Platyhelminthes", description: "Flatworms", icon: "🪱", route: "/zoohub", scrollKey: "platyhelminthes", type: "phylum" },
  { name: "Aschelminthes", description: "Roundworms", icon: "🦠", route: "/zoohub", scrollKey: "aschelminthes", type: "phylum" },
  { name: "Annelida", description: "Segmented Worms", icon: "🐛", route: "/zoohub", scrollKey: "annelida", type: "phylum" },
  { name: "Arthropoda", description: "Jointed-leg Animals", icon: "🦀", route: "/zoohub", scrollKey: "arthropoda", type: "phylum" },
  { name: "Mollusca", description: "Soft-bodied Animals", icon: "🐙", route: "/zoohub", scrollKey: "mollusca", type: "phylum" },
  { name: "Echinodermata", description: "Spiny-skinned Animals", icon: "⭐", route: "/zoohub", scrollKey: "echinodermata", type: "phylum" },
  { name: "Hemichordata", description: "Acorn Worms", icon: "🔬", route: "/zoohub", scrollKey: "hemichordata", type: "phylum" },
  { name: "Chordata", description: "Vertebrates & relatives", icon: "🐟", route: "/zoohub", scrollKey: "chordata", type: "phylum" },
];

// Taxonomic class entries for search
const classMap = [
  // Porifera classes
  { name: "Calcarea", phylum: "Porifera", scrollKey: "porifera", type: "class" },
  { name: "Hexactinellida", phylum: "Porifera", scrollKey: "porifera", type: "class" },
  { name: "Demospongiae", phylum: "Porifera", scrollKey: "porifera", type: "class" },
  // Coelenterata classes
  { name: "Hydrozoa", phylum: "Coelenterata", scrollKey: "coelenterata", type: "class" },
  { name: "Scyphozoa", phylum: "Coelenterata", scrollKey: "coelenterata", type: "class" },
  { name: "Anthozoa", phylum: "Coelenterata", scrollKey: "coelenterata", type: "class" },
  // Ctenophora classes
  { name: "Tentaculata", phylum: "Ctenophora", scrollKey: "ctenophora", type: "class" },
  { name: "Nuda", phylum: "Ctenophora", scrollKey: "ctenophora", type: "class" },
  // Platyhelminthes classes
  { name: "Turbellaria", phylum: "Platyhelminthes", scrollKey: "platyhelminthes", type: "class" },
  { name: "Trematoda", phylum: "Platyhelminthes", scrollKey: "platyhelminthes", type: "class" },
  { name: "Cestoda", phylum: "Platyhelminthes", scrollKey: "platyhelminthes", type: "class" },
  // Aschelminthes classes
  { name: "Nematoda", phylum: "Aschelminthes", scrollKey: "aschelminthes", type: "class" },
  { name: "Enoplea", phylum: "Aschelminthes", scrollKey: "aschelminthes", type: "class" },
  // Annelida classes
  { name: "Polychaeta", phylum: "Annelida", scrollKey: "annelida", type: "class" },
  { name: "Oligochaeta", phylum: "Annelida", scrollKey: "annelida", type: "class" },
  { name: "Hirudinea", phylum: "Annelida", scrollKey: "annelida", type: "class" },
  // Arthropoda classes
  { name: "Onychophora", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Crustacea", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Insecta", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Arachnida", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Chilopoda", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Diplopoda", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  { name: "Merostomata", phylum: "Arthropoda", scrollKey: "arthropoda", type: "class" },
  // Mollusca classes
  { name: "Polyplacophora", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  { name: "Scaphopoda", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  { name: "Gastropoda", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  { name: "Bivalvia", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  { name: "Cephalopoda", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  { name: "Monoplacophora", phylum: "Mollusca", scrollKey: "mollusca", type: "class" },
  // Echinodermata classes
  { name: "Asteroidea", phylum: "Echinodermata", scrollKey: "echinodermata", type: "class" },
  { name: "Ophiuroidea", phylum: "Echinodermata", scrollKey: "echinodermata", type: "class" },
  { name: "Echinoidea", phylum: "Echinodermata", scrollKey: "echinodermata", type: "class" },
  { name: "Holothuroidea", phylum: "Echinodermata", scrollKey: "echinodermata", type: "class" },
  { name: "Crinoidea", phylum: "Echinodermata", scrollKey: "echinodermata", type: "class" },
  // Hemichordata classes
  { name: "Enteropneusta", phylum: "Hemichordata", scrollKey: "hemichordata", type: "class" },
  // Chordata classes
  { name: "Ascidiacea", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Thaliacea", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Leptocardii", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Cyclostomata", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Chondrichthyes", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Osteichthyes", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Amphibia", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Reptilia", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Aves", phylum: "Chordata", scrollKey: "chordata", type: "class" },
  { name: "Mammalia", phylum: "Chordata", scrollKey: "chordata", type: "class" },
];

const speciesMap = [
  { name: "sycon", scientificName: "Scypha sponge", classKey: "porifera", route: "/zoohub/porifera/sycon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671742/sycon_kzvnrx.png" },
  { name: "leucosolenia", scientificName: "White tubular sponge", classKey: "porifera", route: "/zoohub/porifera/leucosolenia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671721/Leucosolenia_lyznns.png" },
  { name: "grantia", scientificName: "Grant’s sponge", classKey: "porifera", route: "/zoohub/porifera/grantia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671622/Grantia_oxhw07.png" },
  { name: "euplectella", scientificName: "Venus Flower Basket", classKey: "porifera", route: "/zoohub/porifera/euplectella", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671687/Euplectella_zkbhq3.png" },
  { name: "hyalonema", scientificName: "Glass Rope Sponge", classKey: "porifera", route: "/zoohub/porifera/hyalonema", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671709/Hyalonema_d6gda7.png" },
  { name: "spongilla", scientificName: "Freshwater Sponge", classKey: "porifera", route: "/zoohub/porifera/spongilla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671733/Spongilla_ykscrw.png" },
  { name: "euspongia", scientificName: "Bath Sponge", classKey: "porifera", route: "/zoohub/porifera/euspongia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671701/Euspongia_sckgkk.png" },
  { name: "cliona", scientificName: "Boring Sponge", classKey: "porifera", route: "/zoohub/porifera/cliona", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671680/Cliona_mkq4gd.png" },
  { name: "xestospongia", scientificName: "Giant Barrel Sponge", classKey: "porifera", route: "/zoohub/porifera/xestospongia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671751/Xestospongia_pxgw30.png" },
  { name: "chalina", scientificName: "Finger Sponge", classKey: "porifera", route: "/zoohub/porifera/chalina", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767671657/Chalina_ip1gvg.png" },
  { name: "hydra", scientificName: "Freshwater polyp", classKey: "coelenterata", route: "/zoohub/coelenterata/hydra", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892096/Hydra_ljhbjv.png" },
  { name: "obelia", scientificName: "Sea fur / Sea moss", classKey: "coelenterata", route: "/zoohub/coelenterata/obelia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892152/Obelia_ovbvj3.png" },
  { name: "physalia", scientificName: "Portuguese man-of-war", classKey: "coelenterata", route: "/zoohub/coelenterata/physalia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892218/Physalia_d0xxsl.png" },
  { name: "aurelia", scientificName: "Moon jellyfish", classKey: "coelenterata", route: "/zoohub/coelenterata/aurelia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892060/Aurelia_y0ii6v.png" },
  { name: "adamsia", scientificName: "Sea anemone", classKey: "coelenterata", route: "/zoohub/coelenterata/adamsia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892009/Adamsia_orkdvo.png" },
  { name: "pennatula", scientificName: "Sea pen", classKey: "coelenterata", route: "/zoohub/coelenterata/pennatula", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892197/Pennatula_fx3glt.png" },
  { name: "gorgonia", scientificName: "Sea fan", classKey: "coelenterata", route: "/zoohub/coelenterata/gorgonia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892082/Gorgonia_vyf78r.png" },
  { name: "meandrina", scientificName: "Brain coral", classKey: "coelenterata", route: "/zoohub/coelenterata/meandrina", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767891973/Meandrina_pqw88x.png" },
  { name: "metridium", scientificName: "Plumose anemone", classKey: "coelenterata", route: "/zoohub/coelenterata/metridium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892113/Metridium_czmjde.png" },
  { name: "corallium", scientificName: "Red coral", classKey: "coelenterata", route: "/zoohub/coelenterata/corallium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892072/Corallium_x9awvc.png" },
  { name: "antipatharia", scientificName: "Black corals", classKey: "coelenterata", route: "/zoohub/coelenterata/antipatharia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767892029/Antipatharia_txlpbb.png" },
  { name: "ctenoplana", scientificName: "Creeping comb jelly", classKey: "ctenophora", route: "/zoohub/ctenophora/ctenoplana", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767893538/Ctenoplana_hbzyki.png" },
  { name: "pleurobrachia", scientificName: "Sea gooseberry", classKey: "ctenophora", route: "/zoohub/ctenophora/pleurobrachia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767893553/Pleurobrachia_ffya5t.png" },
  { name: "hormiphora", scientificName: "Comb jelly", classKey: "ctenophora", route: "/zoohub/ctenophora/hormiphora", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767893551/Hormiphora_jmfpun.png" },
  { name: "cestum", scientificName: "Venus girdle", classKey: "ctenophora", route: "/zoohub/ctenophora/cestum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767893548/Cestum_imikzw.png" },
  { name: "beroe", scientificName: "Comb jelly", classKey: "ctenophora", route: "/zoohub/ctenophora/beroe", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767893545/Beroe_cke3tj.png" },
  { name: "dugesia", scientificName: "Planarian", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/dugesia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595669/Dugesia_hpaibv.png" },
  { name: "fasciola hepatica", scientificName: "Sheep liver fluke", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/fasciola", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595716/Fasciola_hepatica_wso3xw.png" },
  { name: "schistosoma", scientificName: "Blood Fluke", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/schistosoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595732/Schistosoma_ru8kzg.png" },
  { name: "taenia solium", scientificName: "Pork tapeworm", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-solium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595750/Taenia_solium_oew5qm.png" },
  { name: "taenia saginata", scientificName: "Beef tapeworm", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-saginata", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595743/Taenia_saginata_xaxmpq.png" },
  { name: "echinococcus", scientificName: "Dog tapeworm", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/echinococcus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767595702/Echinococcus_pi8lv5.png" },
  { name: "ascaris lumbricoides", scientificName: "Roundworm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/ascaris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982056/Ascaris_lumbricoides_izwqjh.png" },
  { name: "wuchereria bancrofti", scientificName: "Filarial worm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/wuchereria", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982084/Wuchereria_bancrofti_azjsvd.png" },
  { name: "ancylostoma duodenale", scientificName: "Hookworm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/ancylostoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982052/Ancylostoma_duodenale_c7jhbf.png" },
  { name: "enterobius vermicularis", scientificName: "Pinworm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/enterobius", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982065/Enterobius_vermicularis_htjsjz.png" },
  { name: "loa loa", scientificName: "Eye worm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/loa-loa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982069/Loa_loa_maj2rm.png" },
  { name: "trichuris trichiura", scientificName: "Whipworm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/trichuris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982078/Trichuris_trichiura_erm3qa.png" },
  { name: "trichinella spiralis", scientificName: "Trichina worm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/trichinella", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982073/Trichinella_spiralis_tjazqd.png" },
  { name: "dracunculus medinensis", scientificName: "Guinea worm", classKey: "aschelminthes", route: "/zoohub/aschelminthes/dracunculus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768982060/Dracunculus_medinensis_eibpmm.png" },
  { name: "neanthes", scientificName: "Sand worm", classKey: "annelida", route: "/zoohub/annelida/neanthes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984042/Neanthes_bsotgt.png" },
  { name: "chaetopterus", scientificName: "Parchment worm", classKey: "annelida", route: "/zoohub/annelida/chaetopterus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984020/Chaetopterus_lwyfzd.png" },
  { name: "aphrodita", scientificName: "Sea mouse", classKey: "annelida", route: "/zoohub/annelida/aphrodita", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768983997/Aphrodita_ljkqci.png" },
  { name: "arenicola", scientificName: "Lugworm", classKey: "annelida", route: "/zoohub/annelida/arenicola", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984016/Arenicola_gpugoh.png" },
  { name: "lampito mauritii", scientificName: "Indian earthworm", classKey: "annelida", route: "/zoohub/annelida/lampito-mauritii", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984033/Lampito_mauritii_ttkkue.png" },
  { name: "pheretima posthuma", scientificName: "Earthworm", classKey: "annelida", route: "/zoohub/annelida/pheretima-posthuma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984044/Pheretima_posthuma_lj6y2z.png" },
  { name: "megascolex", scientificName: "Giant earthworm", classKey: "annelida", route: "/zoohub/annelida/megascolex", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984099/Megascolex_qckucb.png" },
  { name: "tubifex", scientificName: "Sludge worm", classKey: "annelida", route: "/zoohub/annelida/tubifex", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984047/Tubifex_nafvip.png" },
  { name: "lumbricus", scientificName: "Earthworm", classKey: "annelida", route: "/zoohub/annelida/lumbricus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984035/Lumbricus_wfhpyb.png" },
  { name: "hirudinaria granulosa", scientificName: "Cattle leech", classKey: "annelida", route: "/zoohub/annelida/hirudinaria-granulosa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984024/Hirudinaria_granulosa_bpsrjd.png" },
  { name: "hirudo", scientificName: "Medicinal leech", classKey: "annelida", route: "/zoohub/annelida/hirudo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768984030/Hirudo_rrbynu.png" },
  { name: "peripatus", scientificName: "Velvet worm", classKey: "arthropoda", route: "/zoohub/arthropoda/peripatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060363/Peripatus_o09obg.png" },
  { name: "palaemon", scientificName: "Prawn / Freshwater Prawn", classKey: "arthropoda", route: "/zoohub/arthropoda/palaemon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060541/Palaemon_zt97tj.png" },
  { name: "macrobrachium", scientificName: "Giant Freshwater Prawn / Scampi / River Prawn", classKey: "arthropoda", route: "/zoohub/arthropoda/macrobrachium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060529/Macrobactrum_k5rdik.png" },
  { name: "cancer", scientificName: "True crab", classKey: "arthropoda", route: "/zoohub/arthropoda/cancer", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060461/cancer_tvitw9.png" },
  { name: "lucifer", scientificName: "Ghost shrimp", classKey: "arthropoda", route: "/zoohub/arthropoda/lucifer", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060518/lucifer_tneeyj.png" },
  { name: "eupagurus", scientificName: "Hermit crab", classKey: "arthropoda", route: "/zoohub/arthropoda/eupagurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060501/euparugus_lbi0jb.png" },
  { name: "daphnia", scientificName: "Water flea", classKey: "arthropoda", route: "/zoohub/arthropoda/daphnia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060486/dafina_x1ngnw.png" },
  { name: "cyclops", scientificName: "Copepod", classKey: "arthropoda", route: "/zoohub/arthropoda/cyclops", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060474/cyclops_h6keae.png" },
  { name: "astacus", scientificName: "Crayfish", classKey: "arthropoda", route: "/zoohub/arthropoda/astacus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060445/astacus_ktbezp.png" },
  { name: "palinurus", scientificName: "Spiny lobster", classKey: "arthropoda", route: "/zoohub/arthropoda/palinurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060556/palinurus_jc0k8t.png" },
  { name: "bombyx mori", scientificName: "Mulberry silkworm", classKey: "arthropoda", route: "/zoohub/arthropoda/bombyx-mori", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060662/bombyx_mori_nzio0j.png" },
  { name: "lepisma saccharina", scientificName: "Silverfish", classKey: "arthropoda", route: "/zoohub/arthropoda/lepisma-saccharina", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768061543/lepsima-removebg-preview_frm809.png" },
  { name: "antheraea mylitta", scientificName: "Tropical tasar silkworm", classKey: "arthropoda", route: "/zoohub/arthropoda/antheraea-mylitta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060734/mylitta_fjo2ue.png" },
  { name: "antheraea paphia", scientificName: "Tropical tasar moth", classKey: "arthropoda", route: "/zoohub/arthropoda/antheraea-paphia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060749/paphia_holg0z.png" },
  { name: "antheraea proylei", scientificName: "Oak tasar silkworm", classKey: "arthropoda", route: "/zoohub/arthropoda/antheraea-proylei", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060796/proylei_nicrvc.png" },
  { name: "antheraea assamensis", scientificName: "Muga silkworm", classKey: "arthropoda", route: "/zoohub/arthropoda/antheraea-assamensis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060656/assamensis_idnuf0.png" },
  { name: "philosamia ricini", scientificName: "Eri silkmoth", classKey: "arthropoda", route: "/zoohub/arthropoda/philosamia-ricini", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060771/philosamia_dq1rfb.png" },
  { name: "periplaneta americana", scientificName: "Cockroach", classKey: "arthropoda", route: "/zoohub/arthropoda/periplaneta-americana", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060767/periplanta_jcvuxs.png" },
  { name: "apis indica", scientificName: "Indian honey bee", classKey: "arthropoda", route: "/zoohub/arthropoda/apis-indica", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060650/apis_indica_chxnke.png" },
  { name: "musca domestica", scientificName: "Housefly", classKey: "arthropoda", route: "/zoohub/arthropoda/musca-domestica", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060719/musca_domestica_luivou.png" },
  { name: "laccifer", scientificName: "Lac insect", classKey: "arthropoda", route: "/zoohub/arthropoda/laccifer", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060684/laccifer_xkk7c2.png" },
  { name: "anopheles", scientificName: "Malaria mosquito", classKey: "arthropoda", route: "/zoohub/arthropoda/anopheles", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060644/anopheles_buassy.png" },
  { name: "culex", scientificName: "Common mosquito", classKey: "arthropoda", route: "/zoohub/arthropoda/culex", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060667/culex_yy4abh.png" },
  { name: "aedes", scientificName: "Dengue mosquito", classKey: "arthropoda", route: "/zoohub/arthropoda/aedes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060627/aedes_qq40th.png" },
  { name: "xenopsylla", scientificName: "Rat flea", classKey: "arthropoda", route: "/zoohub/arthropoda/xenopsylla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060804/xenopsylla_tkxxlm.png" },
  { name: "glossina", scientificName: "Tsetse fly", classKey: "arthropoda", route: "/zoohub/arthropoda/glossina", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060674/glossina_qf3duk.png" },
  { name: "phlebotomus", scientificName: "Sand fly", classKey: "arthropoda", route: "/zoohub/arthropoda/phlebotomus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060783/phlebotomus_womcq6.png" },
  { name: "locusta", scientificName: "Locust", classKey: "arthropoda", route: "/zoohub/arthropoda/locusta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060708/locusta_cnspv6.png" },
  { name: "araneus", scientificName: "Garden orb-weaver spider", classKey: "arthropoda", route: "/zoohub/arthropoda/araneus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060852/araneus_ybf4zq.png" },
  { name: "buthus", scientificName: "Yellow scorpion", classKey: "arthropoda", route: "/zoohub/arthropoda/buthus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060858/buthus_rdfa8t.png" },
  { name: "palamneus", scientificName: "Black scorpion", classKey: "arthropoda", route: "/zoohub/arthropoda/palamneus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060868/palamneus_duj4f9.png" },
  { name: "scolopendra hardwickei", scientificName: "Indian blue centipede", classKey: "arthropoda", route: "/zoohub/arthropoda/scolopendra-hardwickei", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060953/scolopendra_hardwickei_il2y1b.png" },
  { name: "archispirostreptus gigas", scientificName: "Giant African millipede", classKey: "arthropoda", route: "/zoohub/arthropoda/archispirostreptus-gigas", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768060982/archispirotrptus_gigas_nib8mk.png" },
  { name: "limulus", scientificName: "Horseshoe crab", classKey: "arthropoda", route: "/zoohub/arthropoda/limulus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768061330/lemulus-removebg-preview_mke1gv.png" },
  { name: "chaetopleura", scientificName: "Chiton / Coat-of-mail shell", classKey: "mollusca", route: "/zoohub/mollusca/chaetopleura", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102611/Chaetopleura_wp6ppp.png" },
  { name: "chiton", scientificName: "Coat-of-mail shell", classKey: "mollusca", route: "/zoohub/mollusca/chiton", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102617/Chiton_btgiv5.png" },
  { name: "dentalium", scientificName: "Tusk shell", classKey: "mollusca", route: "/zoohub/mollusca/dentalium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102631/Dentalium_ebjnqz.png" },
  { name: "pila globosa", scientificName: "Apple snail", classKey: "mollusca", route: "/zoohub/mollusca/pila_globosa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102646/Pila_globosa_cxtyhi.png" },
  { name: "aplysia", scientificName: "Sea hare", classKey: "mollusca", route: "/zoohub/mollusca/aplysia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102588/Aplysia_b5hjkw.png" },
  { name: "conus marmoreus", scientificName: "Marbled cone snail", classKey: "mollusca", route: "/zoohub/mollusca/conus_marmoreus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102629/Conus_marmoreus_gkdqfv.png" },
  { name: "unio", scientificName: "Freshwater mussel", classKey: "mollusca", route: "/zoohub/mollusca/unio", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102657/Unio_iqhmtv.png" },
  { name: "mytilus", scientificName: "Marine mussel", classKey: "mollusca", route: "/zoohub/mollusca/mytilus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102724/Mytilus_icxcpy.png" },
  { name: "lamellidens", scientificName: "Freshwater pearl mussel", classKey: "mollusca", route: "/zoohub/mollusca/lamellidens", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102632/Lamellidens_ryycck.png" },
  { name: "pinctada", scientificName: "Pearl oyster", classKey: "mollusca", route: "/zoohub/mollusca/pinctada", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102649/Pinctada_em5bxg.png" },
  { name: "spondylus", scientificName: "Thorny oyster", classKey: "mollusca", route: "/zoohub/mollusca/spondylus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102652/Spondylus_ygtqnu.png" },
  { name: "ostrea", scientificName: "Oyster", classKey: "mollusca", route: "/zoohub/mollusca/ostrea", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770103032/Ostrea_dibwmj.png" },
  { name: "loligo", scientificName: "Squid", classKey: "mollusca", route: "/zoohub/mollusca/loligo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102634/Loligo_xjtqbd.png" },
  { name: "nautilus", scientificName: "Nautilus", classKey: "mollusca", route: "/zoohub/mollusca/nautilus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102637/Nautilus_iuztri.png" },
  { name: "octopus", scientificName: "Octopus", classKey: "mollusca", route: "/zoohub/mollusca/octopus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102641/Octopus_pgsgai.png" },
  { name: "sepia", scientificName: "Cuttlefish", classKey: "mollusca", route: "/zoohub/mollusca/sepia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102655/Sepia_wtpaco.png" },
  { name: "architeuthes", scientificName: "Giant squid", classKey: "mollusca", route: "/zoohub/mollusca/architeuthes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102597/Architeuthes_m3fj02.png" },
  { name: "neopilina galathea", scientificName: "Living fossil mollusc", classKey: "mollusca", route: "/zoohub/mollusca/neopilina_galathea", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102639/Neopilina_galathea_gebuh8.png" },
  { name: "asterias", scientificName: "Common starfish", classKey: "echinodermata", route: "/zoohub/echinodermata/asterias", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360493/Asterias_habged.png" },
  { name: "astropecten", scientificName: "Sand star", classKey: "echinodermata", route: "/zoohub/echinodermata/astropecten", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360496/Astropecten_bnftwd.png" },
  { name: "pentaceros", scientificName: "Horned starfish", classKey: "echinodermata", route: "/zoohub/echinodermata/pentaceros", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360537/Pentaceros_tv8ynk.png" },
  { name: "ophiothrix", scientificName: "Brittle star", classKey: "echinodermata", route: "/zoohub/echinodermata/ophiothrix", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360528/Ophiothrix_bc2hdg.png" },
  { name: "ophiura", scientificName: "Brittle star", classKey: "echinodermata", route: "/zoohub/echinodermata/ophiura", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360532/Ophiura_ym6abk.png" },
  { name: "echinus", scientificName: "Sea urchin", classKey: "echinodermata", route: "/zoohub/echinodermata/echinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360511/Echinus_eotis0.png" },
  { name: "echinocardium", scientificName: "Heart urchin", classKey: "echinodermata", route: "/zoohub/echinodermata/echinocardium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360508/Echinocardium_ohmfl0.png" },
  { name: "cucumaria", scientificName: "Sea cucumber", classKey: "echinodermata", route: "/zoohub/echinodermata/cucumaria", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360504/Cucumaria_fmxlmu.png" },
  { name: "holothuria", scientificName: "Sea cucumber", classKey: "echinodermata", route: "/zoohub/echinodermata/holothuria", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360522/Holothuria_ddp7k9.png" },
  { name: "antedon", scientificName: "Feather star", classKey: "echinodermata", route: "/zoohub/echinodermata/antedon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769360490/Antedon_fmu9ps.png" },
  { name: "balanoglossus", scientificName: "Acorn worm", classKey: "hemichordata", route: "/zoohub/hemichordata/balanoglossus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769410292/balanoglossus_z0bacg.png" },
  { name: "saccoglossus", scientificName: "Acorn worm", classKey: "hemichordata", route: "/zoohub/hemichordata/saccoglossus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769410298/Saccoglossus_lr8wsu.png" },
  { name: "ptychodera flava", scientificName: "Acorn worm", classKey: "hemichordata", route: "/zoohub/hemichordata/ptychodera-flava", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769410294/Ptychodera_flava_bjmhjz.png" },
  { name: "ascidia", scientificName: "Sea squirt", classKey: "chordata", route: "/zoohub/chordata/ascidia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767894433/Ascidia_jhgqzv.png" },
  { name: "herdmania", scientificName: "Red sea squirt", classKey: "chordata", route: "/zoohub/chordata/herdmania", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767894447/Herdmania_ecxear.png" },
  { name: "salpa", scientificName: "Salpa", classKey: "chordata", route: "/zoohub/chordata/salpa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895302/Salpa_v6xxui.png" },
  { name: "doliolum", scientificName: "Doliolid", classKey: "chordata", route: "/zoohub/chordata/doliolum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895311/Doliolum_kcjpas.png" },
  { name: "pyrosoma", scientificName: "Fire body", classKey: "chordata", route: "/zoohub/chordata/pyrosoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895306/Pyrosoma_xupmt9.png" },
  { name: "branchiostoma lanceolatum", scientificName: "Lancelet / Amphioxus", classKey: "chordata", route: "/zoohub/chordata/branchiostoma_lanceolatum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895339/Branchiostoma_lanceolatum_lnmage.png" },
  { name: "petromyzon marinus", scientificName: "Sea lamprey", classKey: "chordata", route: "/zoohub/chordata/petromyzon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895415/Petromyzon_marinus_smue6p.png" },
  { name: "myxine glutinosa", scientificName: "Hagfish/slime eel", classKey: "chordata", route: "/zoohub/chordata/myxine", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895410/myxine_glutinosa_vyqwnl.png " },
  { name: "scoliodon laticaudus", scientificName: "Dogfish / Spadenose shark", classKey: "chordata", route: "/zoohub/chordata/scoliodon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196659/Scoliodon_laticaudus_onqoyb.png" },
  { name: "pristis", scientificName: "Sawfish", classKey: "chordata", route: "/zoohub/chordata/pristis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196645/Pristis_hv29co.png" },
  { name: "trygon", scientificName: "Stingray", classKey: "chordata", route: "/zoohub/chordata/trygon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196672/Trygon_jv0e3i.png" },
  { name: "torpedo", scientificName: "Electric ray", classKey: "chordata", route: "/zoohub/chordata/torpedo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196667/Torpedo_jk0rwb.png" },
  { name: "carcharodon carcharias", scientificName: "Great white shark", classKey: "chordata", route: "/zoohub/chordata/carcharodon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196618/Carcharodon_carcharias_snql93.png" },
  { name: "exocoetus", scientificName: "Flying fish", classKey: "chordata", route: "/zoohub/chordata/exocoetus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197387/Exocoetus_kvnttp.png" },
  { name: "hippocampus", scientificName: "Seahorse", classKey: "chordata", route: "/zoohub/chordata/hippocampus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197390/Hippocampus_r4zr6o.png" },
  { name: "labeo rohita", scientificName: "Rohu", classKey: "chordata", route: "/zoohub/chordata/labeo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197393/Labeo_rohita_g6zyn0.png" },
  { name: "catla catla", scientificName: "Catla", classKey: "chordata", route: "/zoohub/chordata/catla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197366/Catla_catla_algwyr.png" },
  { name: "clarias batrachus", scientificName: "Magur", classKey: "chordata", route: "/zoohub/chordata/clarias", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197380/Clarias_batrachus_toqsqe.png" },
  { name: "echeneis", scientificName: "Sucker fish / Remora", classKey: "chordata", route: "/zoohub/chordata/echeneis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197384/Echeneis_rndj1u.png" },
  { name: "betta splendens", scientificName: "Fighter fish", classKey: "chordata", route: "/zoohub/chordata/betta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197339/Betta_splendens_r5yyew.png" },
  { name: "pterophyllum scalare", scientificName: "Angel fish", classKey: "chordata", route: "/zoohub/chordata/pterophyllum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197404/Pterophyllum_scalare_qfqoqn.png" },
  { name: "latimeria chalumnae", scientificName: "Coelacanth", classKey: "chordata", route: "/zoohub/chordata/latimeria", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197400/Latimeria_chalumnae_zlrae2.png" },
  { name: "protopterus annectens", scientificName: "African lungfish", classKey: "chordata", route: "/zoohub/chordata/protopterus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197397/Protopterus_annectens_fc1lqr.png" },
  { name: "bufo", scientificName: "Toad", classKey: "chordata", route: "/zoohub/chordata/bufo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197529/Bufo_iky9ot.png" },
  { name: "alytes", scientificName: "Midwife toad", classKey: "chordata", route: "/zoohub/chordata/alytes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197518/Alytes_oezmlf.png" },
  { name: "hyla", scientificName: "Tree frog", classKey: "chordata", route: "/zoohub/chordata/hyla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197544/Hyla_lbmzja.png" },
  { name: "rhacophorus", scientificName: "Flying frog", classKey: "chordata", route: "/zoohub/chordata/rhacophorus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197754/Rhacophorus_paaoef.png" },
  { name: "rana", scientificName: "Frog", classKey: "chordata", route: "/zoohub/chordata/rana", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197751/Rana_dpyid8.png" },
  { name: "necturus maculosus", scientificName: "Mudpuppy", classKey: "chordata", route: "/zoohub/chordata/necturus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197748/Necturus_maculosus_bymsxk.png" },
  { name: "ambystoma tigrinum", scientificName: "Tiger salamander", classKey: "chordata", route: "/zoohub/chordata/ambystoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197526/Ambystoma_tigrinum_ltgewv.png" },
  { name: "salamandra", scientificName: "Fire salamander", classKey: "chordata", route: "/zoohub/chordata/salamandra", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197757/Salamandra_km1ahw.png" },
  { name: "ichthyophis", scientificName: "Caecilian", classKey: "chordata", route: "/zoohub/chordata/ichthyophis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197557/Ichthyophis_oqw4wr.png" },
  { name: "hemidactylus", scientificName: "House lizard / Gecko", classKey: "chordata", route: "/zoohub/chordata/hemidactylus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197883/Hemidactylus_bqzpvf.png" },
  { name: "calotes", scientificName: "Garden lizard", classKey: "chordata", route: "/zoohub/chordata/calotes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197855/Calotes_g8mz9s.png" },
  { name: "draco", scientificName: "Flying lizard", classKey: "chordata", route: "/zoohub/chordata/draco", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197872/Draco_amkrks.png" },
  { name: "chamaeleon", scientificName: "Chameleon", classKey: "chordata", route: "/zoohub/chordata/chamaeleon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197862/Chamaeleon_gtimfs.png" },
  { name: "phrynosoma", scientificName: "Horned lizard", classKey: "chordata", route: "/zoohub/chordata/phrynosoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197938/Phrynosoma_s02hd1.png" },
  { name: "varanus", scientificName: "Monitor lizard", classKey: "chordata", route: "/zoohub/chordata/varanus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198076/Varanus_npexhs.png" },
  { name: "sphenodon punctatum", scientificName: "Tuatara", classKey: "chordata", route: "/zoohub/chordata/sphenodon_punctatum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198041/Sphenodon_punctatum_bx838s.png" },
  { name: "chelone", scientificName: "Sea turtle", classKey: "chordata", route: "/zoohub/chordata/chelone", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197859/Chelone_ea4fpo.png" },
  { name: "testudo", scientificName: "Tortoise", classKey: "chordata", route: "/zoohub/chordata/testudo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198055/Testudo_p5k79t.png" },
  { name: "naja naja", scientificName: "Indian cobra", classKey: "chordata", route: "/zoohub/chordata/naja_naja", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197893/Naja_naja_zlcckg.png" },
  { name: "vipera russelli", scientificName: "Russell\'s viper", classKey: "chordata", route: "/zoohub/chordata/vipera_russelli", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198072/Vipera_russelli_kbzx1t.png" },
  { name: "bungarus", scientificName: "Krait", classKey: "chordata", route: "/zoohub/chordata/bungarus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197852/Bungarus_bypmqc.png" },
  { name: "hydrophis", scientificName: "Sea snake", classKey: "chordata", route: "/zoohub/chordata/hydrophis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197889/Hydrophis_hyllg4.png" },
  { name: "typhlops", scientificName: "Blind snake", classKey: "chordata", route: "/zoohub/chordata/typhlops", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198061/Typhlops_ctg0fa.png" },
  { name: "python", scientificName: "Python", classKey: "chordata", route: "/zoohub/chordata/python", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198037/Python_kvqhuq.png" },
  { name: "crocodylus", scientificName: "Crocodile", classKey: "chordata", route: "/zoohub/chordata/crocodylus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197865/Crocodylus_kw1m5m.png" },
  { name: "gavialis gangeticus", scientificName: "Gharial", classKey: "chordata", route: "/zoohub/chordata/gavialis_gangeticus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197879/Gavialis_gangeticus_opbcsy.png" },
  { name: "alligator", scientificName: "Alligator", classKey: "chordata", route: "/zoohub/chordata/alligator", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197838/Alligator_pbeml9.png" },
  { name: "ichthyosaurus communis", scientificName: "Fish lizard", classKey: "chordata", route: "/zoohub/chordata/ichthyosaurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197886/Ichthyosaurus_communis_%EF%B8%8E_mxckvr.png" },
  { name: "triceratops horridus", scientificName: "Three-horned face", classKey: "chordata", route: "/zoohub/chordata/triceratops", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198064/Triceratops_horridus_%EF%B8%8E_bvpicd.png" },
  { name: "stegosaurus stenops", scientificName: "Roofed lizard", classKey: "chordata", route: "/zoohub/chordata/stegosaurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198051/Stegosaurus_stenops_%EF%B8%8E_au7ji4.png" },
  { name: "brachiosaurus altithorax", scientificName: "Arm lizard", classKey: "chordata", route: "/zoohub/chordata/brachiosaurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197841/Brachiosaurus_altithorax_%EF%B8%8E_mouin2.png" },
  { name: "tyrannosaurus rex", scientificName: "Tyrant lizard king", classKey: "chordata", route: "/zoohub/chordata/tyrannosaurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198067/Tyrannosaurus_rex_%EF%B8%8E_cjrciq.png" },
  { name: "pteranodon longiceps", scientificName: "Winged reptile", classKey: "chordata", route: "/zoohub/chordata/pteranodon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197948/Pteranodon_longiceps_%EF%B8%8E_vopkkg.png" },
  { name: "corvus", scientificName: "Crow", classKey: "chordata", route: "/zoohub/chordata/corvus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060910/Corvus_qwxc1n.png" },
  { name: "columba", scientificName: "Pigeon", classKey: "chordata", route: "/zoohub/chordata/columba", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060907/Columba_kuhius.png" },
  { name: "psittacula", scientificName: "Parrot", classKey: "chordata", route: "/zoohub/chordata/psittacula", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060968/Psittacula_ifzpdh.png" },
  { name: "pavo cristatus", scientificName: "Peacock", classKey: "chordata", route: "/zoohub/chordata/pavo_cristatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060958/Pavo_Cristatus_er4gne.png" },
  { name: "aptenodytes forsteri", scientificName: "Emperor penguin", classKey: "chordata", route: "/zoohub/chordata/aptenodytes_forsteri", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060654/Apetenodytes_forsteri_n8i84x.png" },
  { name: "struthio camelus", scientificName: "Ostrich", classKey: "chordata", route: "/zoohub/chordata/struthio_camelus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060974/Struthio_camelus_gdmfzg.png" },
  { name: "rhea", scientificName: "Rhea", classKey: "chordata", route: "/zoohub/chordata/rhea", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060971/Rhea_c2ppze.png" },
  { name: "dromaius novaehollandiae", scientificName: "Emu", classKey: "chordata", route: "/zoohub/chordata/dromaius_novaehollandiae", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060912/Dromaius_novaehollandiae_jadmth.png" },
  { name: "apteryx", scientificName: "Kiwi", classKey: "chordata", route: "/zoohub/chordata/apteryx", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060664/Apteryx_a7rkue.png" },
  { name: "casuarius", scientificName: "Cassowary", classKey: "chordata", route: "/zoohub/chordata/casuarius", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060897/Casuarius_ar0cz9.png" },
  { name: "neophron", scientificName: "Egyptian vulture", classKey: "chordata", route: "/zoohub/chordata/neophron", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060943/Neophron_vvou6n.png" },
  { name: "passer", scientificName: "House Sparrow", classKey: "chordata", route: "/zoohub/chordata/passer", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060949/Passer_go3zwg.png" },
  { name: "gallus gallus", scientificName: "Domestic fowl", classKey: "chordata", route: "/zoohub/chordata/gallus_gallus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060914/Gallus_gallus_t4myed.png" },
  { name: "trochilus colubris", scientificName: "Ruby-throated hummingbird", classKey: "chordata", route: "/zoohub/chordata/trochilus_colubris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060980/Trochilus_colubris_ckubst.png" },
  { name: "chalcophaps indica", scientificName: "Emerald dove", classKey: "chordata", route: "/zoohub/chordata/chalcophaps_indica", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060905/Chalcophaps_indica_uvahxj.png" },
  { name: "pitohui dichrous", scientificName: "Poison bird", classKey: "chordata", route: "/zoohub/chordata/pitohui_dichrous", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060962/pitohui_dichrous_z8iyea.png" },
  { name: "geospiza magnirostris", scientificName: "Large ground finch", classKey: "chordata", route: "/zoohub/chordata/geospiza_magnirostris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060933/Geospiza_magnirostris_n61vkz.png" },
  { name: "geospiza fortis", scientificName: "Medium ground finch", classKey: "chordata", route: "/zoohub/chordata/geospiza_fortis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060920/Geospiza_fortis_tewqjg.png" },
  { name: "geospiza fuliginosa", scientificName: "Small ground finch", classKey: "chordata", route: "/zoohub/chordata/geospiza_fuliginosa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060929/Geospiza_fuliginosa_yt9p3i.png" },
  { name: "geospiza difficilis", scientificName: "Sharp-beaked ground finch", classKey: "chordata", route: "/zoohub/chordata/geospiza_difficilis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060918/Geospiza_difficilis_jj9l1r.png" },
  { name: "geospiza scandens", scientificName: "Cactus ground finch", classKey: "chordata", route: "/zoohub/chordata/geospiza_scandens", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060935/Geospiza_scandens_ie57vr.png" },
  { name: "camarhynchus psittacula", scientificName: "Large tree finch", classKey: "chordata", route: "/zoohub/chordata/camarhynchus_psittacula", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060696/Camarhynchus_psittacula_gqfxrw.png" },
  { name: "camarhynchus parvulus", scientificName: "Small tree finch", classKey: "chordata", route: "/zoohub/chordata/camarhynchus_parvulus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060690/Camarhynchus_parvulus_sjffdh.png" },
  { name: "camarhynchus pallidus", scientificName: "Woodpecker finch", classKey: "chordata", route: "/zoohub/chordata/camarhynchus_pallidus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060683/Camarhynchus_pallidus_zrgcfa.png" },
  { name: "certhidea olivacea", scientificName: "Warbler finch", classKey: "chordata", route: "/zoohub/chordata/certhidea_olivacea", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060902/Certhidea_olivacea_ltosdt.png" },
  { name: "platyspiza crassirostris", scientificName: "Vegetarian finch", classKey: "chordata", route: "/zoohub/chordata/platyspiza_crassirostris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060965/Platyspiza_crassirostris_jsanft.png" },
  { name: "archaeopteryx", scientificName: "Archaeopteryx", classKey: "chordata", route: "/zoohub/chordata/archaeopteryx", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060675/Archaeopteryx_ldrm2p.png" },
  { name: "ornithorhynchus anatinus", scientificName: "Duck-billed Platypus", classKey: "chordata", route: "/zoohub/chordata/ornithorhynchus_anatinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061140/Ornithorhynchus_anatinus_duy6mx.png" },
  { name: "echidna", scientificName: "Spiny anteater", classKey: "chordata", route: "/zoohub/chordata/echidna", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061156/Echidna_mpfue6.png" },
  { name: "antechinus flavipes", scientificName: "Yellow-footed antechinus", classKey: "chordata", route: "/zoohub/chordata/antechinus_flavipes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061190/Antechinus_flavipes_q75wqu.png" },
  { name: "macropus", scientificName: "Kangaroo", classKey: "chordata", route: "/zoohub/chordata/macropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061198/Macropus_pwnylz.png" },
  { name: "phascolarctos cinereus", scientificName: "Koala", classKey: "chordata", route: "/zoohub/chordata/phascolarctos_cinereus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061211/Phascolarctos_cinereus_qewcmq.png" },
  { name: "vombatus", scientificName: "Wombat", classKey: "chordata", route: "/zoohub/chordata/vombatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061225/Vombatus_szmne0.png" },
  { name: "perameles", scientificName: "Bandicoot", classKey: "chordata", route: "/zoohub/chordata/perameles", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061206/Perameles_aunjt1.png" },
  { name: "petaurus breviceps", scientificName: "Sugar glider", classKey: "chordata", route: "/zoohub/chordata/petaurus_breviceps", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061208/Petaurus_breviceps_r5a0ki.png" },
  { name: "notoryctes", scientificName: "Marsupial mole", classKey: "chordata", route: "/zoohub/chordata/notoryctes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061203/Notoryctes_bqojtj.png" },
  { name: "didelphis marsupialis", scientificName: "Common opossum", classKey: "chordata", route: "/zoohub/chordata/didelphis_marsupialis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061195/Didelphis_marsupialis_igacwr.png" },
  { name: "myrmecobius fasciatus", scientificName: "Numbat", classKey: "chordata", route: "/zoohub/chordata/myrmecobius_fasciatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061201/Myrmecobius_fasciatus_ahda3n.png" },
  { name: "thylacinus cynocephalus", scientificName: "Tasmanian tiger/Thylacine", classKey: "chordata", route: "/zoohub/chordata/thylacinus_cynocephalus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061217/Thylacinus_cynocephalus_%EF%B8%8E_rwnurz.png" },
  { name: "spilocuscus maculatus", scientificName: "Spotted cuscus", classKey: "chordata", route: "/zoohub/chordata/spilocuscus_maculatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061215/Spilocuscus_maculatus_gvsab3.png" },
  { name: "dasyurus maculatus", scientificName: "Spotted-tail quoll", classKey: "chordata", route: "/zoohub/chordata/dasyurus_maculatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061193/Dasyurus_maculatus_tjpkg3.png" },
  { name: "elephas maximus", scientificName: "Asian elephant", classKey: "chordata", route: "/zoohub/chordata/elephas_maximus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771227788/Elephas_maximus_zudqyt.png" },
  { name: "loxodonta africana", scientificName: "African elephant", classKey: "chordata", route: "/zoohub/chordata/loxodonta_africana", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228574/Loxodonta_africana_svfx7s.png" },
  { name: "bos indicus", scientificName: "Indian cattle", classKey: "chordata", route: "/zoohub/chordata/bos_indicus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226475/Bos_indicus_chzkfu.png" },
  { name: "rattus fuscipes", scientificName: "Bush rat", classKey: "chordata", route: "/zoohub/chordata/rattus_fuscipes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228790/Rattus_fuscipes_zuw5tr.png" },
  { name: "sciurus", scientificName: "Squirrel", classKey: "chordata", route: "/zoohub/chordata/sciurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228828/Sciurus_k1j5o5.png" },
  { name: "pteropus", scientificName: "Flying fox", classKey: "chordata", route: "/zoohub/chordata/pteropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228747/Pteropus_nixkvk.png" },
  { name: "oryctolagus cuniculus", scientificName: "Rabbit", classKey: "chordata", route: "/zoohub/chordata/oryctolagus_cuniculus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228647/Oryctolagus_cuniculus_t8kcgs.png" },
  { name: "hyracotherium", scientificName: "Eohippus (Dawn horse)", classKey: "chordata", route: "/zoohub/chordata/hyracotherium", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228545/Hyracotherium_%EF%B8%8E_mi78ms.png" },
  { name: "orohippus", scientificName: "Early Eocene horse", classKey: "chordata", route: "/zoohub/chordata/orohippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228644/Orohippus_%EF%B8%8E_moxn95.png" },
  { name: "mesohippus", scientificName: "Middle horse", classKey: "chordata", route: "/zoohub/chordata/mesohippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228636/Mesohippus_%EF%B8%8E_hld5dm.png" },
  { name: "miohippus", scientificName: "Advanced Mesohippus", classKey: "chordata", route: "/zoohub/chordata/miohippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228640/Miohippus_%EF%B8%8E_cq5med.png" },
  { name: "parahippus", scientificName: "Early grazing horse", classKey: "chordata", route: "/zoohub/chordata/parahippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228686/Parahippus_%EF%B8%8E_vcq6jw.png" },
  { name: "merychippus", scientificName: "True grazing horse", classKey: "chordata", route: "/zoohub/chordata/merychippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228618/Merychippus_%EF%B8%8E_ry9izt.png" },
  { name: "pliohippus", scientificName: "Single-toed horse", classKey: "chordata", route: "/zoohub/chordata/pliohippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228714/Pliohippus_%EF%B8%8E_u0clzq.png" },
  { name: "callippus", scientificName: "Slender grazing horse", classKey: "chordata", route: "/zoohub/chordata/callippus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226488/Callippus_%EF%B8%8E_rz4br6.png" },
  { name: "equus ferus", scientificName: "Horse", classKey: "chordata", route: "/zoohub/chordata/equus_ferus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228322/Equus_ferus_vk3fio.png" },
  { name: "macaca", scientificName: "Macaque", classKey: "chordata", route: "/zoohub/chordata/macaca", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228600/Macaca_rj1ozb.png" },
  { name: "camelus", scientificName: "Camel", classKey: "chordata", route: "/zoohub/chordata/camelus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226501/Camelus_jtelxr.png" },
  { name: "canis lupus familiaris", scientificName: "Dog", classKey: "chordata", route: "/zoohub/chordata/canis_lupus_familiaris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226508/Canis_lupus_familiaris_vxbxin.png" },
  { name: "felis catus", scientificName: "Cat", classKey: "chordata", route: "/zoohub/chordata/felis_catus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228332/Felis_catus_mc0zft.png" },
  { name: "delphinus", scientificName: "Dolphin", classKey: "chordata", route: "/zoohub/chordata/delphinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226548/Delphinus_adgsnw.png" },
  { name: "balaenoptera musculus", scientificName: "Blue whale", classKey: "chordata", route: "/zoohub/chordata/balaenoptera_musculus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226455/Balaenoptera_musculus_xvpjua.png" },
  { name: "panthera tigris", scientificName: "Tiger", classKey: "chordata", route: "/zoohub/chordata/panthera_tigris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228678/Panthera_tigris_moeexr.png" },
  { name: "panthera leo", scientificName: "Lion", classKey: "chordata", route: "/zoohub/chordata/panthera_leo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228668/Panthera_leo_qdbma1.png" },
  { name: "manis crassicaudata", scientificName: "Indian pangolin", classKey: "chordata", route: "/zoohub/chordata/manis_crassicaudata", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228612/Manis_crassicaudata_hmhx0t.png" },
  { name: "funambulus palmarum", scientificName: "Palm squirrel", classKey: "chordata", route: "/zoohub/chordata/funambulus_palmarum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228347/Funambulus_palmarum_epnsif.png" },
  { name: "lepus nigricollis", scientificName: "Indian hare", classKey: "chordata", route: "/zoohub/chordata/lepus_nigricollis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228569/Lepus_nigricollis_lwqkhu.png" },
  { name: "physeter macrocephalus", scientificName: "Sperm whale", classKey: "chordata", route: "/zoohub/chordata/physeter_macrocephalus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228704/Physeter_macrocephalus_nzmckp.png" },
  { name: "dugong dugon", scientificName: "Dugong", classKey: "chordata", route: "/zoohub/chordata/dugong_dugon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226597/Dugong_dugon_a4b239.png" },
  { name: "rhinoceros unicornis", scientificName: "Indian rhinoceros", classKey: "chordata", route: "/zoohub/chordata/rhinoceros_unicornis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228809/Rhinoceros_unicornis_ballyn.png" },
  { name: "hylobates hoolock", scientificName: "Hoolock gibbon", classKey: "chordata", route: "/zoohub/chordata/hylobates_hoolock", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228533/Hylobates_hoolock_onqil7.png" },
  { name: "lutra", scientificName: "Otter", classKey: "chordata", route: "/zoohub/chordata/lutra", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228578/Lutra_dvb4z8.png" },
  { name: "lynx", scientificName: "Lynx", classKey: "chordata", route: "/zoohub/chordata/lynx", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228591/Lynx_u612f1.png" },
  { name: "phoca", scientificName: "Seal", classKey: "chordata", route: "/zoohub/chordata/phoca", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228697/Phoca_llziwy.png" },
  { name: "trichechus", scientificName: "Manatee", classKey: "chordata", route: "/zoohub/chordata/trichechus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228845/Trichechus_ke90cy.png" },
  { name: "pongo pygmaeus", scientificName: "Orangutan", classKey: "chordata", route: "/zoohub/chordata/pongo_pygmaeus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228740/Pongo_pygmaeus_uen2wk.png" },
  { name: "pan troglodytes", scientificName: "Chimpanzee", classKey: "chordata", route: "/zoohub/chordata/pan_troglodytes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228658/Pan_troglodytes_dxd9zx.png" },
  { name: "gorilla gorilla", scientificName: "Gorilla", classKey: "chordata", route: "/zoohub/chordata/gorilla_gorilla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228492/Gorilla_gorilla_xxa8tj.png" },
  { name: "lemur catta", scientificName: "Ring-tailed lemur", classKey: "chordata", route: "/zoohub/chordata/lemur_catta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228558/Lemur_catta_ycpw9m.png" },
  { name: "talpa", scientificName: "Mole", classKey: "chordata", route: "/zoohub/chordata/talpa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228842/Talpa_gpikln.png" },
  { name: "dryopithecus", scientificName: "Early fossil ape", classKey: "chordata", route: "/zoohub/chordata/dryopithecus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226566/Dryopithecus_africanus_%EF%B8%8E_rlifox.png" },
  { name: "kenyapithecus wickeri", scientificName: "Early Miocene ape", classKey: "chordata", route: "/zoohub/chordata/kenyapithecus_wickeri", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228553/Kenyapithecus_wickeri_%EF%B8%8E_vkg0um.png" },
  { name: "ramapithecus", scientificName: "Early hominid (fossil ape)", classKey: "chordata", route: "/zoohub/chordata/ramapithecus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228760/Ramapithecus_%EF%B8%8E_pof5qv.png" },
  { name: "sivapithecus", scientificName: "Fossil Miocene ape", classKey: "chordata", route: "/zoohub/chordata/sivapithecus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228838/Sivapithecus_%EF%B8%8E_gvckdm.png" },
  { name: "australopithecus africanus", scientificName: "Southern ape", classKey: "chordata", route: "/zoohub/chordata/australopithecus_africanus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226383/Australopithecus_africanus_%EF%B8%8E_tplmgv.png" },
  { name: "australopithecus afarensis", scientificName: "Lucy species", classKey: "chordata", route: "/zoohub/chordata/australopithecus_afarensis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226358/Australopithecus_afarensis_%EF%B8%8E_lbxcxk.png" },
  { name: "australopithecus boisei", scientificName: "Robust australopithecine", classKey: "chordata", route: "/zoohub/chordata/australopithecus_boisei", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226406/Australopithecus_boisei_%EF%B8%8E_xisccy.png" },
  { name: "australopithecus robustus", scientificName: "Robust australopithecine", classKey: "chordata", route: "/zoohub/chordata/australopithecus_robustus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226441/Australopithecus_robustus_%EF%B8%8E_ynzrfo.png" },
  { name: "homo habilis", scientificName: "Handy man", classKey: "chordata", route: "/zoohub/chordata/homo_habilis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228500/Homo_habilis_%EF%B8%8E_gtjyot.png" },
  { name: "homo erectus", scientificName: "Upright man", classKey: "chordata", route: "/zoohub/chordata/homo_erectus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228497/Homo_erectus_%EF%B8%8E_tgx2w4.png" },
  { name: "homo neanderthalensis", scientificName: "Neanderthal", classKey: "chordata", route: "/zoohub/chordata/homo_neanderthalensis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228516/Homo_neanderthalensis_%EF%B8%8E_quqisx.png" },
  { name: "homo sapiens", scientificName: "Human", classKey: "chordata", route: "/zoohub/chordata/homo_sapiens", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228525/Homo_sapiens_gwfpme.png" },
];

function ZooHub() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track if sticky bar should be visible
  const [isSticky, setIsSticky] = useState(false);
  const bannerRef = useRef(null);



  // 🔗 refs for all phyla
  const refs = {
    porifera: useRef(null),
    coelenterata: useRef(null),
    ctenophora: useRef(null),
    platyhelminthes: useRef(null),
    aschelminthes: useRef(null),
    annelida: useRef(null),
    arthropoda: useRef(null),
    mollusca: useRef(null),
    echinodermata: useRef(null),
    hemichordata: useRef(null),
    chordata: useRef(null),
  };

  // 🔍 search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);



  // Track scroll to make sticky bar appear after banner
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
        // When banner scrolls above viewport, show sticky bar
        setIsSticky(bannerBottom <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔗 Auto-scroll based on URL route
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const phylumFromUrl = pathParts[pathParts.length - 1];

    if (phylumFromUrl && refs[phylumFromUrl]) {
      setTimeout(() => {
        refs[phylumFromUrl]?.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.pathname]);



  // 🔝 scroll to class
  const scrollToClass = (key) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔍 species search with delay for skeleton effect
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Show skeleton briefly for perceived performance
    setIsSearching(true);
    setTimeout(() => {
      // Search phyla
      const phylumResults = phylumMap.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(value);
        const descMatch = (p.description || "").toLowerCase().includes(value);
        return nameMatch || descMatch;
      });

      // Search taxonomic classes
      const classResults = classMap.filter((c) => {
        return c.name.toLowerCase().includes(value);
      });

      // Search species
      const speciesResults = speciesMap.filter((s) => {
        const nameMatch = (s.name || "").toLowerCase().includes(value);
        const phylumMatch = (s.classKey || "").toLowerCase().includes(value);
        const scientificMatch = (s.scientificName || "").toLowerCase().includes(value);
        const slugMatch = (s.slug || "").toLowerCase().includes(value);
        return nameMatch || phylumMatch || scientificMatch || slugMatch;
      });

      // Phyla first, then classes, then species
      setResults([...phylumResults, ...classResults, ...speciesResults]);
      setIsSearching(false);
    }, 200);
  };

  // 🔗 Navigate to species, phylum, or class page
  const handleSpeciesClick = (item) => {
    if (item.type === "phylum" || item.type === "class") {
      // Navigate to ZooHub and scroll to the phylum section
      navigate("/zoohub");
      setTimeout(() => {
        refs[item.scrollKey]?.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const path = item.route || `/zoohub/${item.classKey}/${item.slug || item.name.replace(/\s+/g, '-').toLowerCase()}`;
      navigate(path);
    }
    setQuery("");
    setResults([]);
  };

  const handleSearch = () => {
    if (results.length > 0) {
      handleSpeciesClick(results[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="zoohub-page">
      {/* 🎯 BANNER - Home page style with left content + right carousel */}
      {/* 🎯 FULL SCREEN HERO BANNER */}
      <div className="zoohub-banner" ref={bannerRef}>
        <div className="zoohub-banner-overlay"></div>
        <div className="zoohub-banner-content">
          <ScrollReveal animation="fade-up" duration={1000}>
            <div className="zoohub-banner-center">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
                alt="ZooLearn Logo"
                className="zoohub-banner-logo"
              />
              <h1 className="zoohub-banner-brand">ZooHub</h1>
            </div>
          </ScrollReveal>
        </div>

        {/* 🖱️ SCROLL INDICATOR */}
        <div className="zoohub-scroll-indicator" onClick={() => scrollToClass('porifera')}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down"></div>
        </div>
      </div>

      {/* 🔍 STICKY NAV + SEARCH */}
      <div className={`zoohub-sticky-bar ${isSticky ? 'is-sticky' : ''}`}>
        {/* Class Navigation */}
        <div className="class-navbar">
          <div className="class-scroll">
            {Object.keys(phylumIcons).map((key) => (
              <span key={key} onClick={() => scrollToClass(key)}>
                {phylumIcons[key]} {key}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon-text">🔍</span>
              <input
                type="text"
                placeholder="Search species or phylum (e.g., hydra, chordata, octopus...)"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>

            {/* Enhanced Search Results with Thumbnails */}
            {query && (isSearching || results.length > 0) && (
              <ul className="search-results">
                {isSearching ? (
                  <>
                    <SkeletonSearchItem />
                    <SkeletonSearchItem />
                    <SkeletonSearchItem />
                  </>
                ) : (
                  results.map((item, i) => (
                    <li key={i} onClick={() => handleSpeciesClick(item)} className="search-result-item">
                      {item.type === "phylum" ? (
                        <>
                          <span className="search-result-phylum-icon">{item.icon}</span>
                          <div className="search-result-info">
                            <span className="search-result-name" style={{ textTransform: 'capitalize' }}>{item.name}</span>
                            <span
                              className="search-result-phylum"
                              style={{ backgroundColor: phylumColors[item.scrollKey] + '20', color: phylumColors[item.scrollKey] }}
                            >
                              📂 Phylum — {item.description}
                            </span>
                          </div>
                        </>
                      ) : item.type === "class" ? (
                        <>
                          <span className="search-result-phylum-icon">{phylumIcons[item.scrollKey]}</span>
                          <div className="search-result-info">
                            <span className="search-result-name" style={{ textTransform: 'capitalize' }}>{item.name}</span>
                            <span
                              className="search-result-phylum"
                              style={{ backgroundColor: phylumColors[item.scrollKey] + '20', color: phylumColors[item.scrollKey] }}
                            >
                              🏷️ Class — {item.phylum}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="search-result-thumbnail"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="search-result-info">
                            <span className="search-result-name">{item.name}</span>
                            <span
                              className="search-result-phylum"
                              style={{ backgroundColor: phylumColors[item.classKey] + '20', color: phylumColors[item.classKey] }}
                            >
                              {phylumIcons[item.classKey]} {item.classKey}
                            </span>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}
            {query && !isSearching && results.length === 0 && (
              <div className="search-results" style={{ textAlign: 'center', padding: '1.5rem 1rem', color: '#6c757d', fontSize: '0.95rem' }}>
                🔍 No species found for "{query}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📦 PHYLUM COMPONENTS with Scroll Reveal */}
      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.porifera}>
          <Porifera />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.coelenterata}>
          <Coelenterata />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.ctenophora}>
          <Ctenophora />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.platyhelminthes}>
          <Platyhelminthes />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.aschelminthes}>
          <Aschelminthes />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.annelida}>
          <Annelida />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.arthropoda}>
          <Arthropoda />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.mollusca}>
          <Mollusca />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.echinodermata}>
          <Echinodermata />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600} rootMargin="0px" threshold={0.05}>
        <section ref={refs.hemichordata}>
          <Hemichordata />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600} rootMargin="0px" threshold={0.05}>
        <section ref={refs.chordata}>
          <Chordata />
        </section>
      </ScrollReveal>

      {/* 🔸 Remaining phyla - components to be added later */}
    </div>
  );
}

export default ZooHub;
