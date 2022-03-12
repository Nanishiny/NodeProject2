# Launch project   
  Vous avez deux manieres de lancer le projet:  
    - via la commande npm run start  
    - via batect, dans le fichier source vous verrez un fichier yml, ce fichier nous sert a simplifier nos taches avec docker. Pour lancer le projet dans un container, aller
    dans un            terminal taper "./batect start-server" vous pouvez aussi voir la liste des taches que peux executer batect via "./batect --list-tasks"  
    
Assurez vous que docker est bien lancé sur votre machine  
 
# Send Request  
  Dans postman créer une requete post sur l'adresse suivante localhost:8080/login.  
  modifier le body comme ceci:  
{  
    "username": "user1",  
    "password": "password1"  
}  

Le server vous renverra un Session token avec un access right ainsi qu'une durée de validité du token (1h).

