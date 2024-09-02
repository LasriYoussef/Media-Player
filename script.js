// Attends que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
    
    // Variables
    let isPlaying = false; // Indique si une piste est en cours de lecture
    let currentTrackIndex = 0; // Index de la piste actuellement jouée
    const tracks = [ // Liste des pistes musicales disponibles
        {
            title: "Dream", // Titre de la première piste
            artist: "El Debarge", // Artiste de la première piste
            src: "El Debarge A Dream.mp3" // Chemin vers le fichier audio de la première piste
        },
        {
            title: "Cherish",
            artist: "Kool and The Gang",
            src: "Kool and The Gang  Cherish.mp3"
        },
        {
            title: "End of the road",
            artist: "Boyz II Men",
            src: "Boyz II Men  End Of The Road.mp3"
        },
        {
            title: "Fragil",
            artist: "Sting feat Stevie Wonder",
            src: "Sting feat Stevie Wonder Fragil.mp3"
        },
        {
            title: "Back at one",
            artist: "Brian McKnight",
            src: "Brian McKnight  Back At One.mp3"
        },
        {
            title: "You are the one",
            artist: "D Train",
            src: "D Train  Youre the One for Me.mp3"
        },
        {
            title: "Joanna",
            artist: "Kool and The Gang",
            src: "Kool  The Gang  Joanna Official Music Video.mp3"
        },
        {
            title: "Dance with my father",
            artist: "Luther Vandross",
            src: "Luther Vandross  Dance With My Father.mp3"
        },

        // Ajoutez ici d'autres pistes si nécessaire
    ];

    // Création d'un nouvel objet Audio pour lire la piste actuelle
    const audio = new Audio(tracks[currentTrackIndex].src);
    
    // Sélection des éléments HTML pour manipuler le DOM
    const trackTitle = document.getElementById("trackTitle"); // Élément pour afficher le titre de la piste
    const artistName = document.getElementById("artistName"); // Élément pour afficher le nom de l'artiste
    const playButton = document.getElementById("btnPlay"); // Bouton de lecture/pause
    const nextButton = document.getElementById("btnNext"); // Bouton pour passer à la piste suivante
    const previousButton = document.getElementById("btnPrevious"); // Bouton pour revenir à la piste précédente
    const volumeSlider = document.getElementById("volumeSlider"); // Curseur de contrôle du volume
    const trackSlider = document.getElementById("trackSlider"); // Curseur de progression de la piste
    const searchInput = document.getElementById("searchInput"); // Champ de recherche pour filtrer les pistes
    const volumeDownButton = document.getElementById("btnVolumeDown"); // Bouton pour baisser le volume
    const volumeUpButton = document.getElementById("btnVolumeUp"); // Bouton pour augmenter le volume

    // Volume par défaut
    let volumeLevel = 0.5; // Niveau de volume par défaut (50%)
    audio.volume = volumeLevel; // Applique le volume par défaut à l'objet audio
    volumeSlider.value = volumeLevel * 100; // Initialiser le curseur avec la valeur du volume par défaut

    // Fonction pour mettre à jour les informations de la piste
    function updateTrackInfo() {
        trackTitle.innerText = tracks[currentTrackIndex].title; // Met à jour le titre de la piste
        artistName.innerText = tracks[currentTrackIndex].artist; // Met à jour le nom de l'artiste
        audio.src = tracks[currentTrackIndex].src; // Met à jour la source audio avec le fichier correspondant
    }

    // Gestion du bouton de lecture
    playButton.addEventListener("click", function () {
        if (isPlaying) { // Si une piste est en cours de lecture
            audio.pause(); // Mettre la piste en pause
            playButton.innerHTML = '<img src="play-circle.svg" alt="play-circle" width="65" height="25">'; // Change l'icône du bouton en lecture
        } else { // Si aucune piste n'est en cours de lecture
            audio.play(); // Démarre la lecture de la piste
            playButton.innerHTML = '<img src="pause-circle.svg" alt="pause-circle" width="65" height="25">'; // Change l'icône du bouton en pause
        }
        isPlaying = !isPlaying; // Inverse l'état de lecture
    });

    // Gestion du bouton Suivant
    nextButton.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Passe à la piste suivante, et revient au début si la fin de la liste est atteinte
        updateTrackInfo(); // Met à jour les informations de la piste
        if (isPlaying) { // Si une piste est en cours de lecture
            audio.play(); // Continue la lecture de la nouvelle piste
        }
    });

    // Gestion du bouton Précédent
    previousButton.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Passe à la piste précédente, et va à la fin si au début
        updateTrackInfo(); // Met à jour les informations de la piste
        if (isPlaying) { // Si une piste est en cours de lecture
            audio.play(); // Continue la lecture de la nouvelle piste
        }
    });

    // Gestion du curseur de volume
    volumeSlider.addEventListener("input", function () {
        volumeLevel = volumeSlider.value / 100; // Calcule le volume en pourcentage à partir du curseur
        audio.volume = volumeLevel; // Applique le niveau de volume calculé à l'objet audio
    });

    // Gestion du bouton de diminution du volume
    volumeDownButton.addEventListener("click", function () {
        volumeLevel = Math.max(0, volumeLevel - 0.1); // Diminue le volume par 10%, mais ne descend pas en dessous de 0
        volumeSlider.value = volumeLevel * 100; // Met à jour la position du curseur de volume
        audio.volume = volumeLevel; // Applique le nouveau niveau de volume à l'objet audio
    });

    // Gestion du bouton d'augmentation du volume
    volumeUpButton.addEventListener("click", function () {
        volumeLevel = Math.min(1, volumeLevel + 0.1); // Augmente le volume par 10%, mais ne dépasse pas 1 (100%)
        volumeSlider.value = volumeLevel * 100; // Met à jour la position du curseur de volume
        audio.volume = volumeLevel; // Applique le nouveau niveau de volume à l'objet audio
    });

    // Gestion du curseur de progression de la piste
    audio.addEventListener("timeupdate", function () {
        trackSlider.value = (audio.currentTime / audio.duration) * 100; // Met à jour le curseur de progression en fonction de la position actuelle de la piste
    });

    trackSlider.addEventListener("input", function () {
        audio.currentTime = (trackSlider.value / 100) * audio.duration; // Met à jour la position de lecture de la piste en fonction de la position du curseur
    });

    // Recherche de musique
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase(); // Récupère la valeur de recherche en minuscules
        for (let i = 0; i < tracks.length; i++) { // Parcourt toutes les pistes
            const track = tracks[i]; // Récupère la piste actuelle
            if (track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query)) { // Vérifie si le titre ou l'artiste contient la recherche
                currentTrackIndex = i; // Met à jour l'index de la piste trouvée
                updateTrackInfo(); // Met à jour les informations de la piste
                break; // Arrête la boucle après avoir trouvé une correspondance
            }
        }
    });

    // Interaction avec les éléments de la grille
    const gridItems = document.querySelectorAll('.cover'); // Sélectionne tous les éléments avec la classe "cover"
    gridItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentTrackIndex = index; // Met à jour l'index de la piste avec celui du cover cliqué
            updateTrackInfo(); // Met à jour les informations de la piste
            audio.play(); // Lance la lecture de la piste
            isPlaying = true; // Met à jour l'état de lecture
            playButton.innerHTML = '<img src="pause-circle.svg" alt="pause-circle" width="65" height="25">'; // Change le bouton en pause
        });
    });

    // Initialiser les informations de la première piste
    updateTrackInfo(); // Met à jour les informations de la piste lors du chargement initial
});
