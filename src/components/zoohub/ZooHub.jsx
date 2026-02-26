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

const speciesMap = [
  // ========== PORIFERA ==========
  { name: "sycon", classKey: "porifera", route: "/zoohub/porifera/sycon", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sycon_sp.jpg/200px-Sycon_sp.jpg" },
  { name: "leucosolenia", classKey: "porifera", route: "/zoohub/porifera/leucosolenia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Leucosolenia_botryoides.jpg/200px-Leucosolenia_botryoides.jpg" },
  { name: "grantia", classKey: "porifera", route: "/zoohub/porifera/grantia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Grantia_sp.jpg/200px-Grantia_sp.jpg" },
  { name: "euplectella", classKey: "porifera", route: "/zoohub/porifera/euplectella", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Euplectella_aspergillum.jpg/200px-Euplectella_aspergillum.jpg" },
  { name: "hyalonema", classKey: "porifera", route: "/zoohub/porifera/hyalonema", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Hyalonema_sieboldi.jpg/200px-Hyalonema_sieboldi.jpg" },
  { name: "spongilla", classKey: "porifera", route: "/zoohub/porifera/spongilla", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Spongilla_lacustris.jpg/200px-Spongilla_lacustris.jpg" },
  { name: "euspongia", classKey: "porifera", route: "/zoohub/porifera/euspongia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Euspongia_officinalis.jpg/200px-Euspongia_officinalis.jpg" },
  { name: "cliona", classKey: "porifera", route: "/zoohub/porifera/cliona", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cliona_celata.jpg/200px-Cliona_celata.jpg" },
  { name: "chalina", classKey: "porifera", route: "/zoohub/porifera/chalina", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haliclona_oculata.jpg/200px-Haliclona_oculata.jpg" },
  { name: "xestospongia", classKey: "porifera", route: "/zoohub/porifera/xestospongia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Xestospongia_testudinaria.jpg/200px-Xestospongia_testudinaria.jpg" },
  // ========== COELENTERATA ==========
  { name: "hydra", classKey: "coelenterata", route: "/zoohub/coelenterata/hydra", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydra-Foto.jpg/200px-Hydra-Foto.jpg" },
  { name: "obelia", classKey: "coelenterata", route: "/zoohub/coelenterata/obelia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Obelia_geniculata.jpg/200px-Obelia_geniculata.jpg" },
  { name: "physalia", classKey: "coelenterata", route: "/zoohub/coelenterata/physalia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Portuguese_Man-O-War_%28Physalia_physalis%29.jpg/200px-Portuguese_Man-O-War_%28Physalia_physalis%29.jpg" },
  { name: "aurelia", classKey: "coelenterata", route: "/zoohub/coelenterata/aurelia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aurelia-aurita-3.jpg/200px-Aurelia-aurita-3.jpg" },
  { name: "adamsia", classKey: "coelenterata", route: "/zoohub/coelenterata/adamsia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Adamsia_palliata.jpg/200px-Adamsia_palliata.jpg" },
  { name: "pennatula", classKey: "coelenterata", route: "/zoohub/coelenterata/pennatula", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pennatula_phosphorea.jpg/200px-Pennatula_phosphorea.jpg" },
  { name: "gorgonia", classKey: "coelenterata", route: "/zoohub/coelenterata/gorgonia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Gorgonia_ventalina.jpg/200px-Gorgonia_ventalina.jpg" },
  { name: "meandrina", classKey: "coelenterata", route: "/zoohub/coelenterata/meandrina", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Meandrina_meandrites.jpg/200px-Meandrina_meandrites.jpg" },
  { name: "metridium", classKey: "coelenterata", route: "/zoohub/coelenterata/metridium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Metridium_senile.jpg/200px-Metridium_senile.jpg" },
  { name: "corallium", classKey: "coelenterata", route: "/zoohub/coelenterata/corallium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Corallium_rubrum.jpg/200px-Corallium_rubrum.jpg" },
  { name: "antipatharia", classKey: "coelenterata", route: "/zoohub/coelenterata/antipatharia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Black_coral.jpg/200px-Black_coral.jpg" },
  // ========== CTENOPHORA ==========
  { name: "ctenoplana", classKey: "ctenophora", route: "/zoohub/ctenophora/ctenoplana", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ctenoplana.jpg/200px-Ctenoplana.jpg" },
  { name: "pleurobrachia", classKey: "ctenophora", route: "/zoohub/ctenophora/pleurobrachia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Pleurobrachia_pileus.jpg/200px-Pleurobrachia_pileus.jpg" },
  { name: "hormiphora", classKey: "ctenophora", route: "/zoohub/ctenophora/hormiphora", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Hormiphora_plumosa.jpg/200px-Hormiphora_plumosa.jpg" },
  { name: "cestum", classKey: "ctenophora", route: "/zoohub/ctenophora/cestum", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cestum_veneris.jpg/200px-Cestum_veneris.jpg" },
  { name: "beroe", classKey: "ctenophora", route: "/zoohub/ctenophora/beroe", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Beroe_cucumis.jpg/200px-Beroe_cucumis.jpg" },
  // ========== PLATYHELMINTHES ==========
  { name: "dugesia", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/dugesia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Dugesia_gonocephala.jpg/200px-Dugesia_gonocephala.jpg" },
  { name: "fasciola", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/fasciola", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fasciola_hepatica.jpg/200px-Fasciola_hepatica.jpg" },
  { name: "schistosoma", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/schistosoma", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Schistosoma_mansoni.jpg/200px-Schistosoma_mansoni.jpg" },
  { name: "taenia solium", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-solium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Taenia_solium_scolex.jpg/200px-Taenia_solium_scolex.jpg" },
  { name: "taenia saginata", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-saginata", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Taenia_saginata.jpg/200px-Taenia_saginata.jpg" },
  { name: "echinococcus", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/echinococcus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Echinococcus_granulosus.jpg/200px-Echinococcus_granulosus.jpg" },
  // ========== ASCHELMINTHES ==========
  { name: "ascaris", classKey: "aschelminthes", route: "/zoohub/aschelminthes/ascaris", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ascaris_lumbricoides.jpg/200px-Ascaris_lumbricoides.jpg" },
  { name: "wuchereria", classKey: "aschelminthes", route: "/zoohub/aschelminthes/wuchereria", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Wuchereria_bancrofti.jpg/200px-Wuchereria_bancrofti.jpg" },
  // ========== ANNELIDA ==========
  { name: "lumbricus", classKey: "annelida", route: "/zoohub/annelida/lumbricus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lumbricus_terrestris.jpg/200px-Lumbricus_terrestris.jpg" },
  { name: "hirudinaria", classKey: "annelida", route: "/zoohub/annelida/hirudinaria", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hirudo_medicinalis.jpg/200px-Hirudo_medicinalis.jpg" },
  // ========== ARTHROPODA ==========
  { name: "periplaneta", classKey: "arthropoda", route: "/zoohub/arthropoda/periplaneta", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Periplaneta_americana.jpg/200px-Periplaneta_americana.jpg" },
  { name: "musca", classKey: "arthropoda", route: "/zoohub/arthropoda/musca", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Musca_domestica.jpg/200px-Musca_domestica.jpg" },
  // ========== MOLLUSCA ==========
  { name: "pila", classKey: "mollusca", route: "/zoohub/mollusca/pila-globosa", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pila_globosa.jpg/200px-Pila_globosa.jpg" },
  { name: "octopus", classKey: "mollusca", route: "/zoohub/mollusca/octopus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus_vulgaris.jpg/200px-Octopus_vulgaris.jpg" },
  // ========== ECHINODERMATA ==========
  { name: "asterias", classKey: "echinodermata", route: "/zoohub/echinodermata/asterias", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Asterias_rubens.jpg/200px-Asterias_rubens.jpg" },
  // ========== HEMICHORDATA ==========
  { name: "balanoglossus", classKey: "hemichordata", route: "/zoohub/hemichordata/balanoglossus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Balanoglossus_clavigerus.jpg/200px-Balanoglossus_clavigerus.jpg" },
  // ========== CHORDATA ==========
  { name: "ascidia", classKey: "chordata", route: "/zoohub/chordata/ascidia", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767894433/Ascidia_jhgqzv.png" },
  { name: "herdmania", classKey: "chordata", route: "/zoohub/chordata/herdmania", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767894447/Herdmania_ecxear.png" },
  { name: "salpa", classKey: "chordata", route: "/zoohub/chordata/salpa", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895302/Salpa_v6xxui.png" },
  { name: "doliolum", classKey: "chordata", route: "/zoohub/chordata/doliolum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895311/Doliolum_kcjpas.png" },
  { name: "pyrosoma", classKey: "chordata", route: "/zoohub/chordata/pyrosoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895306/Pyrosoma_xupmt9.png" },
  { name: "branchiostoma", classKey: "chordata", route: "/zoohub/chordata/branchiostoma_lanceolatum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895339/Branchiostoma_lanceolatum_lnmage.png" },
  { name: "petromyzon", classKey: "chordata", route: "/zoohub/chordata/petromyzon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895415/Petromyzon_marinus_smue6p.png" },
  { name: "myxine", classKey: "chordata", route: "/zoohub/chordata/myxine", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767895410/myxine_glutinosa_vyqwnl.png" },
  { name: "scoliodon", classKey: "chordata", route: "/zoohub/chordata/scoliodon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196659/Scoliodon_laticaudus_onqoyb.png" },
  { name: "pristis", classKey: "chordata", route: "/zoohub/chordata/pristis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196645/Pristis_hv29co.png" },
  { name: "trygon", classKey: "chordata", route: "/zoohub/chordata/trygon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196672/Trygon_jv0e3i.png" },
  { name: "torpedo", classKey: "chordata", route: "/zoohub/chordata/torpedo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196667/Torpedo_jk0rwb.png" },
  { name: "carcharodon", classKey: "chordata", route: "/zoohub/chordata/carcharodon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770196618/Carcharodon_carcharias_snql93.png" },
  { name: "exocoetus", classKey: "chordata", route: "/zoohub/chordata/exocoetus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197387/Exocoetus_kvnttp.png" },
  { name: "hippocampus", classKey: "chordata", route: "/zoohub/chordata/hippocampus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197390/Hippocampus_r4zr6o.png" },
  { name: "labeo", classKey: "chordata", route: "/zoohub/chordata/labeo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197393/Labeo_rohita_g6zyn0.png" },
  { name: "catla", classKey: "chordata", route: "/zoohub/chordata/catla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197366/Catla_catla_algwyr.png" },
  { name: "clarias", classKey: "chordata", route: "/zoohub/chordata/clarias", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197380/Clarias_batrachus_toqsqe.png" },
  { name: "echeneis", classKey: "chordata", route: "/zoohub/chordata/echeneis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197384/Echeneis_rndj1u.png" },
  { name: "betta", classKey: "chordata", route: "/zoohub/chordata/betta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197339/Betta_splendens_r5yyew.png" },
  { name: "pterophyllum", classKey: "chordata", route: "/zoohub/chordata/pterophyllum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197404/Pterophyllum_scalare_qfqoqn.png" },
  { name: "latimeria", classKey: "chordata", route: "/zoohub/chordata/latimeria", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197400/Latimeria_chalumnae_zlrae2.png" },
  { name: "protopterus", classKey: "chordata", route: "/zoohub/chordata/protopterus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197397/Protopterus_annectens_fc1lqr.png" },
  { name: "bufo", classKey: "chordata", route: "/zoohub/chordata/bufo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197529/Bufo_iky9ot.png" },
  { name: "alytes", classKey: "chordata", route: "/zoohub/chordata/alytes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197518/Alytes_oezmlf.png" },
  { name: "hyla", classKey: "chordata", route: "/zoohub/chordata/hyla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197544/Hyla_lbmzja.png" },
  { name: "rhacophorus", classKey: "chordata", route: "/zoohub/chordata/rhacophorus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197754/Rhacophorus_paaoef.png" },
  { name: "rana", classKey: "chordata", route: "/zoohub/chordata/rana", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197751/Rana_dpyid8.png" },
  { name: "necturus", classKey: "chordata", route: "/zoohub/chordata/necturus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197748/Necturus_maculosus_bymsxk.png" },
  { name: "ambystoma", classKey: "chordata", route: "/zoohub/chordata/ambystoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197526/Ambystoma_tigrinum_ltgewv.png" },
  { name: "salamandra", classKey: "chordata", route: "/zoohub/chordata/salamandra", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197757/Salamandra_km1ahw.png" },
  { name: "ichthyophis", classKey: "chordata", route: "/zoohub/chordata/ichthyophis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197557/Ichthyophis_oqw4wr.png" },
  { name: "hemidactylus", classKey: "chordata", route: "/zoohub/chordata/hemidactylus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197883/Hemidactylus_bqzpvf.png" },
  { name: "calotes", classKey: "chordata", route: "/zoohub/chordata/calotes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197855/Calotes_g8mz9s.png" },
  { name: "draco", classKey: "chordata", route: "/zoohub/chordata/draco", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197872/Draco_amkrks.png" },
  { name: "chamaeleon", classKey: "chordata", route: "/zoohub/chordata/chamaeleon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197862/Chamaeleon_gtimfs.png" },
  { name: "phrynosoma", classKey: "chordata", route: "/zoohub/chordata/phrynosoma", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197938/Phrynosoma_s02hd1.png" },
  { name: "varanus", classKey: "chordata", route: "/zoohub/chordata/varanus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198076/Varanus_npexhs.png" },
  { name: "sphenodon", classKey: "chordata", route: "/zoohub/chordata/sphenodon_punctatum", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198041/Sphenodon_punctatum_bx838s.png" },
  { name: "chelone", classKey: "chordata", route: "/zoohub/chordata/chelone", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197859/Chelone_ea4fpo.png" },
  { name: "testudo", classKey: "chordata", route: "/zoohub/chordata/testudo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198055/Testudo_p5k79t.png" },
  { name: "naja", classKey: "chordata", route: "/zoohub/chordata/naja_naja", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197893/Naja_naja_zlcckg.png" },
  { name: "vipera", classKey: "chordata", route: "/zoohub/chordata/vipera_russelli", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198072/Vipera_russelli_kbzx1t.png" },
  { name: "bungarus", classKey: "chordata", route: "/zoohub/chordata/bungarus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197852/Bungarus_bypmqc.png" },
  { name: "hydrophis", classKey: "chordata", route: "/zoohub/chordata/hydrophis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197889/Hydrophis_hyllg4.png" },
  { name: "typhlops", classKey: "chordata", route: "/zoohub/chordata/typhlops", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198061/Typhlops_ctg0fa.png" },
  { name: "python", classKey: "chordata", route: "/zoohub/chordata/python", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770198037/Python_kvqhuq.png" },
  { name: "crocodylus", classKey: "chordata", route: "/zoohub/chordata/crocodylus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197865/Crocodylus_kw1m5m.png" },
  { name: "gavialis", classKey: "chordata", route: "/zoohub/chordata/gavialis_gangeticus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197879/Gavialis_gangeticus_opbcsy.png" },
  { name: "alligator", classKey: "chordata", route: "/zoohub/chordata/alligator", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770197838/Alligator_pbeml9.png" },
  { name: "corvus", classKey: "chordata", route: "/zoohub/chordata/corvus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060910/Corvus_qwxc1n.png" },
  { name: "columba", classKey: "chordata", route: "/zoohub/chordata/columba", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060907/Columba_kuhius.png" },
  { name: "psittacula", classKey: "chordata", route: "/zoohub/chordata/psittacula", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060968/Psittacula_ifzpdh.png" },
  { name: "pavo", classKey: "chordata", route: "/zoohub/chordata/pavo_cristatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060958/Pavo_Cristatus_er4gne.png" },
  { name: "penguin", classKey: "chordata", route: "/zoohub/chordata/aptenodytes_forsteri", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060654/Apetenodytes_forsteri_n8i84x.png" },
  { name: "ostrich", classKey: "chordata", route: "/zoohub/chordata/struthio_camelus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060974/Struthio_camelus_gdmfzg.png" },
  { name: "neophron", classKey: "chordata", route: "/zoohub/chordata/neophron", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060943/Neophron_vvou6n.png" },
  { name: "passer", classKey: "chordata", route: "/zoohub/chordata/passer", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771060949/Passer_go3zwg.png" },
  { name: "ornithorhynchus", classKey: "chordata", route: "/zoohub/chordata/ornithorhynchus_anatinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061140/Ornithorhynchus_anatinus_duy6mx.png" },
  { name: "macropus", classKey: "chordata", route: "/zoohub/chordata/macropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061198/Macropus_pwnylz.png" },
  { name: "pteropus", classKey: "chordata", route: "/zoohub/chordata/pteropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061214/Pteropus_edmxas.png" },
  { name: "camelus", classKey: "chordata", route: "/zoohub/chordata/camelus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061149/Camelus_zuzszv.png" },
  { name: "macaca", classKey: "chordata", route: "/zoohub/chordata/macaca", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061195/Macaca_v2fntu.png" },
  { name: "rattus", classKey: "chordata", route: "/zoohub/chordata/rattus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061217/Rattus_m8nwh2.png" },
  { name: "canis", classKey: "chordata", route: "/zoohub/chordata/canis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061152/Canis_m6rdrd.png" },
  { name: "felis", classKey: "chordata", route: "/zoohub/chordata/felis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061159/Felis_p9a1o1.png" },
  { name: "elephas", classKey: "chordata", route: "/zoohub/chordata/elephas", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061157/Elephas_b7sqon.png" },
  { name: "equus", classKey: "chordata", route: "/zoohub/chordata/equus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061158/Equus_rxt9e7.png" },
  { name: "delphinus", classKey: "chordata", route: "/zoohub/chordata/delphinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061155/Delphinus_g7rrm5.png" },
  { name: "balaenoptera", classKey: "chordata", route: "/zoohub/chordata/balaenoptera", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061146/Balaenoptera_yioh96.png" },
  { name: "panthera tigris", classKey: "chordata", route: "/zoohub/chordata/panthera_tigris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228678/Panthera_tigris_moeexr.png" },
  { name: "panthera leo", classKey: "chordata", route: "/zoohub/chordata/panthera_leo", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228668/Panthera_leo_qdbma1.png" },
  { name: "homo sapiens", classKey: "chordata", route: "/zoohub/chordata/homo_sapiens", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228525/Homo_sapiens_gwfpme.png" },
  { name: "echidna", classKey: "chordata", route: "/zoohub/chordata/echidna", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061156/Echidna_mpfue6.png" },
  { name: "koala", classKey: "chordata", route: "/zoohub/chordata/phascolarctos_cinereus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061211/Phascolarctos_cinereus_qewcmq.png" },
  { name: "wombat", classKey: "chordata", route: "/zoohub/chordata/vombatus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061225/Vombatus_szmne0.png" },
  { name: "kangaroo", classKey: "chordata", route: "/zoohub/chordata/macropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061198/Macropus_pwnylz.png" },
  { name: "platypus", classKey: "chordata", route: "/zoohub/chordata/ornithorhynchus_anatinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771061140/Ornithorhynchus_anatinus_duy6mx.png" },
  { name: "squirrel", classKey: "chordata", route: "/zoohub/chordata/sciurus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228828/Sciurus_k1j5o5.png" },
  { name: "elephant", classKey: "chordata", route: "/zoohub/chordata/elephas_maximus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771227788/Elephas_maximus_zudqyt.png" },
  { name: "rhinoceros", classKey: "chordata", route: "/zoohub/chordata/rhinoceros_unicornis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228809/Rhinoceros_unicornis_ballyn.png" },
  { name: "chimpanzee", classKey: "chordata", route: "/zoohub/chordata/pan_troglodytes", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228658/Pan_troglodytes_dxd9zx.png" },
  { name: "gorilla", classKey: "chordata", route: "/zoohub/chordata/gorilla_gorilla", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228492/Gorilla_gorilla_xxa8tj.png" },
  { name: "orangutan", classKey: "chordata", route: "/zoohub/chordata/pongo_pygmaeus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228740/Pongo_pygmaeus_uen2wk.png" },
  { name: "neanderthal", classKey: "chordata", route: "/zoohub/chordata/homo_neanderthalensis", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228516/Homo_neanderthalensis_%EF%B8%8E_quqisx.png" },
  { name: "australopithecus", classKey: "chordata", route: "/zoohub/chordata/australopithecus_africanus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226383/Australopithecus_africanus_%EF%B8%8E_tplmgv.png" },
  { name: "pteropus", classKey: "chordata", route: "/zoohub/chordata/pteropus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228747/Pteropus_nixkvk.png" },
  { name: "oryctolagus", classKey: "chordata", route: "/zoohub/chordata/oryctolagus_cuniculus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228647/Oryctolagus_cuniculus_t8kcgs.png" },
  { name: "canis", classKey: "chordata", route: "/zoohub/chordata/canis_lupus_familiaris", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226508/Canis_lupus_familiaris_vxbxin.png" },
  { name: "felis", classKey: "chordata", route: "/zoohub/chordata/felis_catus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228332/Felis_catus_mc0zft.png" },
  { name: "equus", classKey: "chordata", route: "/zoohub/chordata/equus_ferus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228322/Equus_ferus_vk3fio.png" },
  { name: "balaenoptera", classKey: "chordata", route: "/zoohub/chordata/balaenoptera_musculus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226455/Balaenoptera_musculus_xvpjua.png" },
  { name: "delphinus", classKey: "chordata", route: "/zoohub/chordata/delphinus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226548/Delphinus_adgsnw.png" },
  { name: "physeter", classKey: "chordata", route: "/zoohub/chordata/physeter_macrocephalus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228704/Physeter_macrocephalus_nzmckp.png" },
  { name: "dugong", classKey: "chordata", route: "/zoohub/chordata/dugong_dugon", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771226597/Dugong_dugon_a4b239.png" },
  { name: "hylobates", classKey: "chordata", route: "/zoohub/chordata/hylobates_hoolock", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228533/Hylobates_hoolock_onqil7.png" },
  { name: "lemur", classKey: "chordata", route: "/zoohub/chordata/lemur_catta", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228558/Lemur_catta_ycpw9m.png" },
  { name: "manis", classKey: "chordata", route: "/zoohub/chordata/manis_crassicaudata", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228612/Manis_crassicaudata_hmhx0t.png" },
  { name: "lutra", classKey: "chordata", route: "/zoohub/chordata/lutra", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228578/Lutra_dvb4z8.png" },
  { name: "lynx", classKey: "chordata", route: "/zoohub/chordata/lynx", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228591/Lynx_u612f1.png" },
  { name: "phoca", classKey: "chordata", route: "/zoohub/chordata/phoca", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228697/Phoca_llziwy.png" },
  { name: "trichechus", classKey: "chordata", route: "/zoohub/chordata/trichechus", thumbnail: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771228845/Trichechus_ke90cy.png" },
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
      setResults(
        speciesMap.filter((s) => s.name.includes(value))
      );
      setIsSearching(false);
    }, 200);
  };

  // 🔗 Navigate to species page
  const handleSpeciesClick = (item) => {
    navigate(item.route);
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
                placeholder="Search species (e.g., hydra, sycon, octopus...)"
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
