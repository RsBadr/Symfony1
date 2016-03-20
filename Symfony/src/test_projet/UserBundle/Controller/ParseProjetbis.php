"<?xml version=\"1.0\" encoding=\"utf-8\"?>
        <Edition id="1">
            <update type="Project" id="1"> 
                <description type="txt">kjnrifeirbi</description>
            </update>
            <update type="Task" id="35"> 
                <name>kjknr</description>
            </update>
            <Create type="Objectif" typePere="Projet" idPere="1"> 
                <name>kjknr</description>
            </update>
            
             
        </projet>";
<?php        

public function parseProjet($ichier, $em){
        $project=simplexml_load_string($fichier);
        $user = $this->getUser();
        $projet = new Projet();
        $projet->setNom($project["name"]);
        $projet->setDateCreation(new \DateTime ("now"));
        $projet->setDateDerModif(new \DateTime ("now"));
        $projet->setChecked(0);
        $projet->setSupprime(0);
        $projet->setUtilisateurs($user);
        if ($project->description["type"]== "text" and $project->description != null ){
            $projet->setDesctxt($project->description);
        }
        else{
            $projet->setDesctxt("");
        }
        if ($project->description["type"]== "file" and $project->description != null ){
            $projet->setDescfile($project->description);
        }else{
            $projet->setDescfile("");
        }
        foreach ($project->goal as $goal ) {
            $this->parseObjectifs($goal, $projet, $em);
        }
        $em->persist($projet);

    }
?>