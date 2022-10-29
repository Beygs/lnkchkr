# Seed

Remplir sa base de données de manière automatique, c'est kiffant.

## 1\. Introduction

Une fois que tu as initialisé ta base de données en créant des tables et des models, elle est prête à accueillir des données. Mais si tu veux la remplir un peu, le faire à la main (via la console par exemple) peut être très long et fastidieux. Heureusement, la puissance de l'informatique va t'aider à créer, en quelques secondes, 100 faux `User` et 200 `books` bidons pour ton application de partage de lectures entre amis (encore une idée à 1 milliard, cadeau pour toi) 🎉

Sur Rails, c'est la fonctionnalité de "seed" qui permet d'automatiser la création d'entrées dans ta BDD et tes models. On va te présenter cela.

## 2\. Historique et contexte

Pourquoi créer plein de fausses entrées en BDD ? Tout simplement car quand tu codes sur ton application Rails, tu vas vouloir la tester : afficher les views, regarder ce que ça donne quand on clique ici ou là, etc. Mais si la BDD est vide, ben l'application ne sert généralement à rien : si tu veux visualiser à quoi elle va ressembler et tester ton back-end, c'est plus réaliste de le faire quand la BDD est un peu remplie.

Faire des seeds va te demander de **bien** comprendre le fonctionnement des model puisque tu vas créer plein d'éléments en base, et qu'ils doivent être correctement initialisés.

## 3\. La ressource

### 3.1\. Seed de base

Au lieu de remplir sa BDD de dummy-data à la main, ce qui est particulièrement fastidieux, on peut la **seed**, c’est-à-dire la remplir de données aléatoires.

Pour cela, il te faut coder dans le fichier `db/seeds.rb` les lignes qui créent ces entrées, avec strictement la même syntaxe que celle utilisée dans la console de Rails. Par exemple tu peux écrire à l'intérieur de `seeds.rb` :

    User.create(first_name: "jean", email:"jean@jean.jean")
    User.create(first_name: "paul", email:"paul@paul.paul")
    puts "Deux utilisateurs ont été créés"

Une fois le fichier modifié et sauvegardé, il te suffit de lancer sa lecture par Rails en faisant dans ton terminal :

    $ rails db:seed

Rails va alors te créer les 2 utilisateurs "jean" et "paul", et t'afficher, dans le terminal, "Deux utilisateurs ont été créés". Fais le test avec l'application Rails que tu as depuis ce matin (celle avec le model `User`).

Maintenant, ne me crois pas sur parole quand je te dis que 2 utilisateurs ont été créés : lance la console et fais un petit `User.last` : tu devrais retrouver "paul". Et si tu fais un `User.find_by(first_name: "jean")`, tu devrais retrouver "jean" (sauf si tu as créé avant un user avec ce même `first_name`).

### 3.2\. Seed de bourrin

OK, donc tu vois comment créer quelques entrées. Mais imaginons que tu veuilles tester une page affichant **tous** les utilisateurs de ton site : pourquoi ne pas en créer 100 afin d'être plus proche de la réalité (on espère que tu développeras pas une app Rails pour 2 utilisateurs) et vérifier que tout s'affiche bien proprement ?  
Rien de plus simple : quand on veut faire 100 fois quelque chose en programmation, on fait juste une boucle. Voici un exemple :

    100.times do |index|
      User.create(first_name: "Nom#{index}", email: "email#{index}@example.com")
    end

Fais le test dans ton app Rails en copiant-collant les lignes ci-dessus (enlève les lignes qui créent "jean" et "paul" sinon elles vont encore s'exécuter), fais ton `$ rails db:seed` et ensuite va en console pour confirmer que tu as bien 100 nouveaux user. Tu verras qu'ils ont des prénoms et email qui se suivent ("Nom1" - "email1@example.Com", "Nom2" - "email2@example.com", etc.) : regarde bien le code pour comprendre comment on a utilisé l'`index` de la boucle pour faire ça et ne pas créer 100 users avec les mêmes prénoms et emails.

___
** 🚀 ALERTE BONNE ASTUCE**

Comme tout le monde, tu vas te tromper au début et devoir relancer ton seed plusieurs fois. Avant d'exécuter un nouveau seed, il est généralement intelligent de remettre sa base de données à 0 pour éviter d'accumuler, au fil des seeds, une armée d'utilisateurs ayant les mêmes attributs.

Pour faire ça, tu peux commencer ton seed par :

    User.destroy_all
    OtherModel.destroy_all
    etc
___

### 3.3\. Seed avec Faker

[Faker](https://github.com/stympy/faker) est une super gem qui permet d'avoir accès à des strings aléatoires et rangés par thème. Au final ça va te permettre de seeder avec des attributs un peu moins pourris que "Nom1", "Nom2" et plutôt avec des "Chuck", "John" (et autres) choisis aléatoirement.

Pour l'utiliser regarde le readme de son repo GitHub : rajoute faker dans le gemfile et fais un `bundle install`.

Voici un exemple de seed malin en utilisant la gem Faker. Il va te créer des users avec des attributs plus réalistes :

    require 'faker'
    100.times do
      user = User.create!(first_name: Faker::Name.first_name, email: Faker::Internet.email)
    end

Faker te donne accès à pas mal de "bases de données" de mots plus ou moins WTF (❤ Faker::ChuckNorris) : la documentation GitHub est très bien faite et te les présente toutes.

## 4\. Points importants à retenir

C'est quand même plus sympa de bosser sur une app Rails qui n'est pas vide ! Le fichier `db/seeds.rb` permet de mettre des lignes de code créant des entrées en BDD via tes models. La syntaxe est strictement la même que celle que tu utilises dans la console Rails.

Une fois que ton seed est prêt, tu n'as qu'à faire `$ rails db:seed` pour que Rails exécute le fichier et peuple ta BDD.

Évidemment tu peux utiliser des boucles pour créer plusieurs dizaines d'entrées d'un coup. Et si tu veux des entrées avec des attributs sympas, utilise la gem [Faker](https://github.com/stympy/faker).