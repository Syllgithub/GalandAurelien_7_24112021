# Projet 7 du parcours Développeur Web OpenClassrooms

## Créez un réseau social d’entreprise

### Pour lancer l'application, vous devez télécharger ce repository

### Ensuite 
* Créez une base de données nommée groupomania via mysql 
```
CREATE DATABASE groupomania;
```
* Importez le fichier groupomania.sql du dossier sql dans votre base de données (via une console)
```
mysql groupomania < groupomania.sql
```

#### Dans le dossier backend 
* Créez un fichier .env avec les informations suivantes : 
```
DB_HOST=
DB_USER=
DB_NAME=
DB_PASSWORD=
```
* Remplissez les champs ci-dessus en fonction de votre base de données 
* Lancez npm -install 
* Lancez npm run start

#### Dans le dossier frontend
* Lancez npm -install
* Lancez npm run serve
## 
* Ouvrez votre navigateur à l'adresse : http://localhost:8080 (par défaut, selon votre configuration)
* Créez un compte et essayez les différentes fonctionnalités
