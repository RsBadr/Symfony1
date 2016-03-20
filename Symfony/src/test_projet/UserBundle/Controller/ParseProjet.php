<?php

namespace test_projet\UserBundle\Controller;
use test_projet\ProjetBundle\Entity\Projet;
use test_projet\ProjetBundle\Entity\Objectif;
use test_projet\ProjetBundle\Entity\Tache;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Collections\ArrayCollection;

         $fichier = 
        "<?xml version=\"1.0\" encoding=\"utf-8\"?>
        <projet name=\"le projet 3\">
            <description type=\"text\"> la description </description>
            <goal name=\"l objectif 1\">
                <description type='file'></description>
                <task name=\"La tache 1\">
                    <description type=\"text\"> la tache 1 du projet 3 objectif 1 </description>
                </task>
             </goal>
             <goal name=\"l objectif 2\">
                <description type='file'></description>
                <task name=\"La tache 2\">
                    <description type=\"text\"> la tache 2 du projet 3 objectif 2 </description>
                </task>
                <task name=\"La tache 3\">
                    <description type=\"text\"> la tache 3 du projet 3 objectif 2 </description>
                </task>
             </goal>
        </projet>";

public function parseProjet($fichier, $em){
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
    public function parseObjectifs($goal, Projet $pere, $em){
        $objectif = new Objectif();
        $objectif->setNom($goal["name"]);
        $objectif->setDateCreation(new \DateTime ("now"));
        $objectif->setDateDerModif(new \DateTime ("now"));
        $objectif->setPere($pere);
        $objectif->setChecked(0);
        $objectif->setSupprime(0);
        if ($goal->description["type"]== "text" and $goal->description != null ){
            $objectif->setDesctxt($goal->description);
        }else{
            $objectif->setDesctxt("");
        }
        if ($goal->description["type"]== "file" and $goal->description != null ){
            $objectif->setDescfile($goal->description);
        }else{
            $objectif->setDescfile("");
        }
        foreach ($goal->goal as $obj ) {
                $this->parseObjectifs($obj, $objectif, $em);
            }
        foreach ($goal->task as $task ) {
                $this->parseTasks($task, $objectif, $em);
            }
        $em->persist($objectif);
    }
     public function parseTasks($task, Objectif $pere, $em){
        $tache = new Tache();
        $tache->setNom($task["name"]);
        $tache->setDateCreation(new \DateTime ("now"));
        $tache->setDateDerModif(new \DateTime ("now"));
        $tache->setPere($pere);
        $tache->setChecked(0);
        $tache->setSupprime(0);
        if ($task->description["type"]== "text" and $task->description != null ){
            $tache->setDesctxt($task->description);
        }else{
            $tache->setDesctxt("");
        }
       
        if ($task->description["type"]== "file" and $task->description != null ){
            $tache->setDescfile($task->description);
         }else{
            $tache->setDescfile("");
         }
        
        $em->persist($tache);  
    }
?>