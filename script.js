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
    'rotor': {
        titre: {
            fr: "Le Rotor",
            en: "The Rotor"
        },
        texte: {
            fr: "Le rotor est le cœur du moteur Wankel. De forme triangulaire (dite triangle de Reuleaux), il tourne à l'intérieur du carter (stator). Son mouvement planétaire crée trois chambres de volume variable, permettant d'effectuer les quatre temps du cycle de combustion (admission, compression, combustion, échappement) simultanément. L'absence de mouvement alternatif (comme dans un moteur à pistons classique) réduit drastiquement les vibrations et permet d'atteindre des régimes très élevés, ce qui en fait un moteur particulièrement apprécié dans le sport automobile et la culture underground du drift japonais.",
            en: "The rotor is the heart of the Wankel engine. Triangular in shape (Reuleaux triangle), it rotates inside the housing (stator). Its planetary movement creates three chambers of variable volume, allowing the four strokes of the combustion cycle (intake, compression, combustion, exhaust) to perform simultaneously. The absence of reciprocating motion greatly reduces vibrations and allows for extremely high RPMs, making it particularly popular in motorsport and the underground drift culture in Japan."
        }
    }
    // Ajoutez "carter", "apex-seals", "admission" etc...
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


// ====== 3. Tests / Connexion Hotspots ======

// Placeholder interactif pour tester l'UI aujourd'hui
const placeholder = document.getElementById('model-placeholder');
if(placeholder) {
    placeholder.addEventListener('click', () => {
        openPanel(placeholder.getAttribute('data-hotspot-id'));
    });
}

// DEMAIN : Vous supprimerez la partie placeholder ci-dessus, et dé-commenterez la suite :
/*
document.querySelectorAll('button[slot^="hotspot-"]').forEach(button => {
    button.addEventListener('click', (event) => {
        // En supposant que vous passez l'ID dans data-id, ex: <button slot="hotspot-rotor" data-id="rotor">
        const id = event.currentTarget.dataset.id;
        if(id) openPanel(id);
    });
});
*/