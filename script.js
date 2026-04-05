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

// ====== 2. Drift Photos Animation ======
const images = gsap.utils.toArray(".drift-img");

images.forEach((img, i) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
        }
    });

    // 1: Quick Fade IN
    tl.fromTo(img, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power1.out" }
    )
    // 2: Short hold
    .to(img, { opacity: 1, y: 0, duration: 0.25 })
    // 3: Gentle Fade OUT
    .to(img, { opacity: 0, y: 0, duration: 0.6, ease: "power1.inOut" });
});

// ====== 3. 3D Model Appearance ======
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
            fr: "Inventé par l’allemand Félix Wankel dans les années 1950, le moteur Wankel est un moteur à combustion interne qui fonctionne à la rotation d’un rotor triangulaire. Ce rotor tourne à l'intérieur d'une chambre à combustion et entraîne un arbre excentrique. Cette conception permet de transformer directement la pression des gaz en mouvement rotatif, ce qui élimine le besoin de pièces comme les bielles et le vilebrequin.\n\nLe moteur Wankel est compact, simple et léger, ce qui lui donne un excellent rapport poids/puissance. Sa rotation continue assure un fonctionnement fluide et réduit les vibrations. C'est pourquoi on le retrouve souvent dans les véhicules sportifs et les avions légers, où l'espace est limité.\n\nCependant, le moteur Wankel a aussi des inconvénients. Il consomme généralement plus de carburant (+30% en moyenne) et les joints d'étanchéité du rotor (au trois sommets) peuvent s'user rapidement. Il nécessite un entretiens spécial (le liquide lubrifiant est injecté directement dans l’essence). De plus, il peut avoir du mal à respecter les normes environnementales d’emissions de CO2.\n\nMalgré ces limites, le moteur Wankel a marqué l'histoire de l'automobile. Le constructeur Mazda l'a utilisé dans des modèles célèbres comme la RX-7 et la RX-8, et a gagné les 24h du mans avec la Mazda 787B. Cela montre que cette technologie, même si elle est peu commune, peut offrir des avantages uniques dans les bonnes conditions.",
            en: "Invented by the German Felix Wankel in the 1950s, the Wankel engine is an internal combustion engine that operates through the rotation of a triangular rotor. This rotor spins inside a combustion chamber and drives an eccentric shaft. This design allows the gas pressure to be directly transformed into rotary motion, eliminating the need for parts like connecting rods and a crankshaft.\n\nThe Wankel engine is compact, simple, and lightweight, giving it an excellent power-to-weight ratio. Its continuous rotation ensures smooth operation and reduces vibrations. This is why it is often found in sports cars and light aircraft, where space is limited.\n\nHowever, the Wankel engine also has disadvantages. It generally consumes more fuel (+30% on average) and the rotor seals (at the three apices) can wear out quickly. It requires special maintenance (lubricating fluid is injected directly into the fuel). Additionally, it can struggle to meet environmental CO2 emission standards.\n\nDespite these limitations, the Wankel engine has left its mark on automotive history. The manufacturer Mazda used it in famous models like the RX-7 and RX-8, and won the 24 Hours of Le Mans with the Mazda 787B. This shows that this technology, even if uncommon, can offer unique advantages under the right conditions."
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

    // Load initial speed
    modelViewer.addEventListener('load', () => {
        modelViewer.timeScale = 0;
        toggleHotspots(true);
        if (rpmDisplay) rpmDisplay.innerText = "0";
    });

    // Simple loop
    setInterval(() => {
        if (isAccel) {
            speed += 0.3;
            if (speed > 15) speed = 15;
        } else if (isBrake) {
            speed -= 0.6;
            if (speed < 0) speed = 0;
        }

        // On accélère artificiellement l'animation 3D de 150% par rapport à sa valeur d'origine,
        // pour une même "valeur" RPM affichée.
        const animationSpeed = speed * 1.5;

        // Update Model Viewer ONLY if needed
        if (modelViewer.timeScale !== animationSpeed) {
            modelViewer.timeScale = animationSpeed;
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
// Hotspot placement debug tool (Shift + Click)
// =========================================================
if (modelViewer) {
    modelViewer.addEventListener('click', (event) => {
        if (!event.shiftKey) return; 

        const hit = modelViewer.positionAndNormalFromPoint(event.clientX, event.clientY);
        
        if (hit != null) {
            const pos = hit.position;
            const norm = hit.normal;
            
            const newPositionString = `${pos.x.toFixed(4)} ${pos.y.toFixed(4)} ${pos.z.toFixed(4)}`;
            const newNormalString = `${norm.x.toFixed(4)} ${norm.y.toFixed(4)} ${norm.z.toFixed(4)}`;
            
            console.log(`[Hotspot Coordinates]`);
            console.log(`data-position="${newPositionString}"`);
            console.log(`data-normal="${newNormalString}"`);
        }
    });
}
// =========================================================

// Global explanation button setup
const btnComprendre = document.getElementById('btn-comprendre');
if (btnComprendre) {
    btnComprendre.addEventListener('click', () => {
        openPanel('moteur');
    });
}
