// ====== 1. Animation Hero (Carte Japon) ======
gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=250%",    // On allonge le scroll de l'intro à 250vh
        scrub: 1,
        pin: true,
        pinSpacing: false // Pour contrôler précisément l'apparition des photos via le margin-top CSS
    }
});

heroTl.to("#scroll-indicator", { opacity: 0, duration: 0.1 }, 0)
// Le zoom et la disparition du Japon (durée proportionnelle de 1)
.to("#japan-map", {
    scale: 25,          
    opacity: 0,         
    transformOrigin: "55% 60%", 
    ease: "power2.inOut",
    duration: 1
}, 0)
// Effet de zoom uniformisé et synchronisé pour les deux textes
.to(["h1", "#hero-subtitle"], {
    scale: 1.2,
    ease: "power1.inOut",
    duration: 0.65
}, 0.25)
// Wankel disparaît en premier (sans le scale, géré au-dessus)
.to("h1", {
    opacity: 0,
    ease: "power1.inOut",
    duration: 0.5
}, 0.25)
// Sous-titre apparaît doucement à travers la carte
.to("#hero-subtitle", {
    opacity: 1,
    ease: "power1.inOut",
    duration: 0.15
}, 0.30)
// Sous-titre disparaît subtilement après Wankel
.to("#hero-subtitle", {
    opacity: 0,
    ease: "power1.inOut",
    duration: 0.4
}, 0.45); 

// ====== 2. Animation Photos Drift (Progressif & Artistique) ======
const images = gsap.utils.toArray(".drift-img");

images.forEach((img, i) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: img,
            start: "top 85%",  // Commence un petit peu plus tard
            end: "bottom 45%", // Fini très vite : dès que l'image est à un peu moins de la moitié du haut !
            scrub: 1,
        }
    });

    // 1: Fade IN ultra rapide comme un flash
    tl.fromTo(img, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power1.out" }
    )
    // 2: Plateau très court, c'est éphémère !
    .to(img, { opacity: 1, y: 0, duration: 0.25 })
    // 3: Fade OUT assez rapide et long pour faire une transition plus fuyante
    .to(img, { opacity: 0, y: 0, duration: 0.6, ease: "power1.inOut" });
});

// ====== 3. Animation Apparition Modèle 3D ======
gsap.fromTo("#model-section", 
    { opacity: 0 }, 
    {
        scrollTrigger: {
            trigger: "#model-section",
            start: "top 70%",
            end: "top 20%",
            scrub: true
        },
        opacity: 1
    }
);

// ====== 2. Logique du Side Panel (Section 2) ======

// Données des hotspots (id, titre, texteFR, texteEN)
const hotspotsData = {
    'moteur': {
        titre: {
            fr: "Comprendre le moteur Wankel",
            en: "Understanding the Wankel Engine"
        },
        texte: {
            fr: "Le moteur rotatif Wankel, du nom de son inventeur Felix Wankel, est une véritable merveille d'ingénierie mécanique qui se distingue radicalement des moteurs à pistons traditionnels. Au lieu d'utiliser des cylindres et des pistons qui effectuent des mouvements de va-et-vient, le Wankel emploie un rotor triangulaire (celui de Reuleaux) qui tourne de manière excentrique à l'intérieur d'un carter en forme de trochoïde (le stator). \n\nCette géométrie fascinante permet de réaliser les quatre temps du cycle de combustion (admission, compression, explosion et échappement) de façon simultanée et continue, sans avoir besoin de soupapes ni de vilebrequin classique. À chaque révolution, trois explosions successives se produisent pour assurer une livraison de puissance extrêmement fluide et linéaire.\n\nL'absence de pièces en mouvement alternatif lourd confère au moteur Wankel une onctuosité rare en éliminant presque toutes les vibrations. Cela lui permet d'atteindre des régimes de rotation (RPM) affolants avec une aisance déconcertante. \n\nPopularisé dans le monde entier par Mazda, notamment via ses légendaires coupés sportifs RX-7 et RX-8, ce moteur au petit gabarit offre un centre de gravité très bas, idéal pour l'équilibre du châssis. Son rapport poids/puissance imbattable et sa sonorité mythique, souvent qualifiée de « braap braap », en ont fait l'icône absolue de la culture JDM et du drift sur circuit de montagne (les Touges japonais). \n\nToutefois, ces incroyables atouts viennent au prix d'un compromis de taille : les segments d'arrêt (apex seals) situés aux pointes du rotor s'usent prématurément. Ce problème inhérent à sa forme provoque souvent des baisses de compression, ce qui impose un entretien exigeant et régulier.",
            en: "The Wankel rotary engine, named after its German inventor Felix Wankel, is a profound mechanical engineering marvel that drastically sets itself apart from traditional piston engines. Instead of using cylinders and pistons moving back and forth, the Wankel employs a triangular rotor (a Reuleaux triangle) that spins eccentrically inside an oval, figure-eight-shaped housing known as the stator. \n\nThis fascinating geometry allows the four stages of combustion (intake, compression, power, and exhaust) to occur simultaneously and continuously without the need for complex valves or a typical crankshaft. In a single revolution, three power strokes are completed, guaranteeing an incredibly smooth and linear power delivery.\n\nThe complete absence of heavy reciprocating parts gives the Wankel engine a rare smoothness, practically eliminating all vibrations. This characteristic allows it to reach extremely high revolutions per minute (RPM) effortlessly without feeling as though the engine is straining. \n\nBrought to the masses globally by Mazda, especially inside their legendary RX-7 and RX-8 sports cars, this incredibly compact engine package provides an ultra-low center of gravity, perfecting the chassis balance. Its unbeatable power-to-weight ratio and mythical exhaust note (universally described as 'brap brap') turned it into an absolute icon inside the JDM tuning culture and mountain drifting scene (the Japanese Touge). \n\nHowever, these incredible strengths come at a significant maintenance cost: the apex seals located at the tips of the rotors are prone to rapid wear due to friction and high heat. This inherent structural flaw often leads to a drop in compression, making it a very high-maintenance, demanding machine for enthusiasts."
        }
    },
    'apex-seals': {
        titre: {
            fr: "Joints de sommet",
            en: "Apex Seals"
        },
        texte: {
            fr: "La plus grande faiblesse des moteurs Wankels, ces joints s’usent rapidement à cause du frottement contre les parois, des températures et de la compression élevées et/ou d'un manque de lubrification, entraînant une perte de compression, de la fumée et une baisse de puissance.",
            en: "The biggest weakness of Wankel engines, these seals wear out quickly due to friction against the housing, high temperatures and compression, and/or lack of lubrication, leading to a loss of compression, smoke, and a drop in power."
        }
    },
    'cycle': {
        titre: {
            fr: "Cycle en 4 étapes",
            en: "4-Stroke Cycle"
        },
        texte: {
            fr: "Chaque rotor d’un moteur Wankel tourne en 4 étapes : arrivée d'essence, compression de l'essence, combustion de l'essence et échappement des gaz. Ces étapes se répètent a chaque tour de moteur.",
            en: "Each rotor of a Wankel engine turns in 4 stages: fuel intake, fuel compression, fuel combustion, and exhaust gas. These stages are repeated with every engine revolution."
        }
    },
    'stator': {
        titre: {
            fr: "Le Stator",
            en: "The Stator"
        },
        texte: {
            fr: "Le stator est le carter fixe principal du moteur Wankel. Sa forme intérieure est celle d'une épitrochoïde, permettant au rotor triangulaire de toujours garder ses trois sommets en contact permanent avec les parois. Cela permet de délimiter trois chambres de combustion distinctes dont le volume varie continuellement au fil de la rotation.",
            en: "The stator is the main fixed housing of the Wankel engine. Its inner shape is an epitrochoid, ensuring the triangular rotor always keeps its three apices in permanent sliding contact with the walls. This creates three distinct combustion chambers whose volumes continuously vary throughout the rotation."
        }
    },
    'arbre': {
        titre: {
            fr: "L'Arbre Excentrique",
            en: "The Eccentric Shaft"
        },
        texte: {
            fr: "C'est l'équivalent du vilebrequin dans un moteur à pistons classique. L'arbre excentrique récupère le mouvement rotatif orbital particulier du rotor. Il transforme cette course excentrée en une rotation parfaitement fluide et centrée qui sera ensuite transmise à la transmission pour propulser le véhicule.",
            en: "This is the direct equivalent of the crankshaft in a conventional piston engine. The eccentric shaft captures the distinct orbital rotary motion of the rotor. It transforms this offset path into a perfectly smooth and centered rotation that is then sent to the transmission to propel the vehicle."
        }
    },
    'bougie': {
        titre: {
            fr: "Les Bougies d'Allumage",
            en: "Spark Plugs"
        },
        texte: {
            fr: "Contrairement à un moteur à pistons classique, le moteur rotatif utilise généralement deux bougies par rotor (une principale appelée 'Leading' et une secondaire appelée 'Trailing'). Cette disposition est nécessaire car la chambre de combustion prend une forme très allongée au moment de l'ignition ; deux étincelles garantissent ainsi que tout le mélange air-essence brûle efficacement pour délivrer le maximum de puissance.",
            en: "Unlike a conventional piston engine, the rotary engine typically uses two spark plugs per rotor (a main one called 'Leading' and a secondary one called 'Trailing'). This layout is necessary because the combustion chamber takes on a very elongated shape at the moment of ignition; two sparks ensure that all the air-fuel mixture burns efficiently to deliver maximum power."
        }
    }
};

// Récupération des éléments DOM
const panel = document.getElementById('side-panel');
const overlay = document.getElementById('panel-overlay');
const closeBtn = document.getElementById('close-panel');
const panelTitle = document.getElementById('panel-title');
const panelText = document.getElementById('panel-text');
const btnFr = document.getElementById('lang-fr');
const btnEn = document.getElementById('lang-en');

let currentLang = 'fr'; 
let currentActiveHotspot = null; 

// Ouverture du panel
function openPanel(hotspotId) {
    const data = hotspotsData[hotspotId];
    if (!data) return; 
    
    currentActiveHotspot = hotspotId;
    updatePanelContent(); 

    // Translation pour faire entrer le panneau (Tailwind class)
    panel.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
}

// Fermeture du panel
function closeSidePanel() {
    panel.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    currentActiveHotspot = null;
}

// Mise à jour de la langue
function updatePanelContent() {
    if (!currentActiveHotspot) return;
    
    const data = hotspotsData[currentActiveHotspot];
    panelTitle.textContent = data.titre[currentLang];
    panelText.textContent = data.texte[currentLang];
    
    // UI Boutons Switch
    if (currentLang === 'fr') {
        btnFr.classList.add('text-japan', 'font-bold');
        btnFr.classList.remove('text-zinc-500');
        btnEn.classList.remove('text-japan', 'font-bold');
        btnEn.classList.add('text-zinc-500');
    } else {
        btnEn.classList.add('text-japan', 'font-bold');
        btnEn.classList.remove('text-zinc-500');
        btnFr.classList.remove('text-japan', 'font-bold');
        btnFr.classList.add('text-zinc-500');
    }
}

// Événements clic Langues
btnFr.addEventListener('click', () => { currentLang = 'fr'; updatePanelContent(); });
btnEn.addEventListener('click', () => { currentLang = 'en'; updatePanelContent(); });

// Événements fermeture
closeBtn.addEventListener('click', closeSidePanel);
overlay.addEventListener('click', closeSidePanel);


// ====== 3. Contrôle Model-Viewer & Hotspots ======

// Commandes
const modelViewer = document.getElementById('wankel-model');
const btnAccel = document.getElementById('pedal-accel');
const btnBrake = document.getElementById('pedal-brake');
const resetModelBtn = document.getElementById('reset-model-btn');
const rpmDisplay = document.getElementById('rpm-display');

if (modelViewer) {
    let speed = 0;
    let isAccel = false;
    let isBrake = false;

    const toggleHotspots = (show) => {
        document.querySelectorAll('.hotspot').forEach(h => {
            const id = h.dataset.id;
            if (['admission', 'compression', 'explosion', 'echappement'].includes(id)) {
                h.style.opacity = '1';
                h.style.pointerEvents = 'auto';
                return;
            }
            h.style.opacity = show ? '1' : '0';
            h.style.pointerEvents = show ? 'auto' : 'none';
        });
    };

    // Au chargement, on met la vitesse à 0 (l'animation "tourne" mais à vitesse 0)
    modelViewer.addEventListener('load', () => {
        modelViewer.timeScale = 0;
        toggleHotspots(true);
    });

    // Boucle très simple
    setInterval(() => {
        if (isAccel) {
            speed += 0.2;
            if (speed > 15) speed = 15;
        } else if (isBrake) {
            speed -= 0.4;
            if (speed < 0) speed = 0;
        }

        // On met à jour Model Viewer SEULEMENT si nécessaire
        if (modelViewer.timeScale !== speed) {
            modelViewer.timeScale = speed;
            if (rpmDisplay) rpmDisplay.innerText = Math.round(speed * 650);

            if (speed > 0.1) {
                toggleHotspots(false);
            } else {
                toggleHotspots(true);
            }
        }
    }, 50);

    // Événements pédales
    if (btnAccel) {
        btnAccel.addEventListener('mousedown', (e) => { e.preventDefault(); isAccel = true; });
        btnAccel.addEventListener('mouseup', () => isAccel = false);
        btnAccel.addEventListener('mouseleave', () => isAccel = false);
        btnAccel.addEventListener('touchstart', (e) => { e.preventDefault(); isAccel = true; });
        btnAccel.addEventListener('touchend', () => isAccel = false);
    }

    if (btnBrake) {
        btnBrake.addEventListener('mousedown', (e) => { e.preventDefault(); isBrake = true; });
        btnBrake.addEventListener('mouseup', () => isBrake = false);
        btnBrake.addEventListener('mouseleave', () => isBrake = false);
        btnBrake.addEventListener('touchstart', (e) => { e.preventDefault(); isBrake = true; });
        btnBrake.addEventListener('touchend', () => isBrake = false);
    }

    if (resetModelBtn) {
        resetModelBtn.addEventListener('click', () => {
            speed = 0;
            modelViewer.timeScale = 0;
            modelViewer.currentTime = 0;
            toggleHotspots(true);
            if (rpmDisplay) rpmDisplay.innerText = "0";
        });
    }
}

// =========================================================
// OUTIL DE DÉBOGAGE POUR PLACER LES HOTSPOTS DANS LE NAVIGATEUR
// =========================================================
if (modelViewer) {
    // Utilise SHIFT + CLIC GAUCHE pour contourner la main (OrbitControls)
    modelViewer.addEventListener('click', (event) => {
        // Bloque l'action si la touche Majuscule (Shift) n'est pas enfoncée
        if (!event.shiftKey) return; 

        // Obtenir la position 3D exact du clic sur le modèle !
        const hit = modelViewer.positionAndNormalFromPoint(event.clientX, event.clientY);
        
        if (hit != null) {
            // Le clic a bien touché une surface du modèle 3D
            const pos = hit.position;
            const norm = hit.normal;
            
            // Formatage de la chaîne de position pour la copier directement
            const newPositionString = `${pos.x.toFixed(4)} ${pos.y.toFixed(4)} ${pos.z.toFixed(4)}`;
            const newNormalString = `${norm.x.toFixed(4)} ${norm.y.toFixed(4)} ${norm.z.toFixed(4)}`;
            
            // Affiche ça dans la console
            console.log(`%c👉 NOUVELLES COORDONNÉES RÉCUPÉRÉES !`, `color: #00ff00; font-weight: bold; font-size: 14px;`);
            console.log(`   data-position="${newPositionString}"`);
            console.log(`   data-normal="${newNormalString}"`);
        } else {
            console.log("Clic dans le vide !");
        }
    });
}
// =========================================================

// 2. Connexion du Bouton Global d'explication
const btnComprendre = document.getElementById('btn-comprendre');
if (btnComprendre) {
    btnComprendre.addEventListener('click', () => {
        openPanel('moteur');
    });
}
