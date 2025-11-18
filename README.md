## Fonctionnalités implémentées

- Accueil : liste des annonces à partir de `data/jobs.json`, avec affichage du nombre total d’annonces visibles.
- Recherche : barre de recherche sur l’écran d’accueil.
  - Recherche par poste, entreprise ou ville (bonus par rapport au sujet qui proposait le poste uniquement).
  - Le nombre d’annonces affiché se met à jour en fonction de la recherche.
- Navigation :
  - Clic sur une annonce → écran de détail de l’annonce.
  - Bouton `Mes favoris : X` en haut de la liste → écran des favoris.
- Détail d’une annonce :
  - Informations : salaire annuel, email RH, numéro RH, date de l’annonce.
  - Informations entreprise : logo, nom, ville, adresse postale.
  - Description complète de l’annonce.
  - Bouton de gestion des favoris :
    - Depuis la liste/détail, `Ajouter au favoris` ajoute l’annonce aux favoris et navigue vers l’écran des favoris.
    - Depuis les favoris, le détail affiche `Supprimer des favoris`.
- Favoris :
  - Affichage de la liste des annonces favorites.
  - Clic sur une annonce favorite → retour sur l’écran de détail correspondant.
  - Si la liste est vide, affichage du message `Vous n'avez pas de favoris`.

## Fonctionnalités bonus

- Recherche étendue sur plusieurs champs : poste, entreprise et ville.
- Tri des annonces sur la page d’accueil :
  - Bouton `Trier par date` (choix entre date décroissant/croissant)
  - Bouton `Trier par salaire` (choix entre salaire décroissant/croissant).
- Dans le détail d'une annonce :
  - Un clic sur le numéro de téléphone propose d'appeler le numéro de téléphone.
  - Un clic sur l'e-mail ouvre l'application "MAIL", et rempli le destinataire avec l'adresse.
- Favoris :
  - Quand on supprime une annonce des favoris, un message notifie l'utilisateur de la suppression.
  - Dans les Favoris, on peut aussi trier par Date (décroissant/croissant) ou Salaire (décroissant/croissant)
