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



class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('UserBundle:layout.html.twig');
    }
    public function viewAction()
    {
       
    	$user = $this->getUser();
        $listProjets = $user->getProjets();
        $objectifs = new ArrayCollection();
        $taches = new ArrayCollection();
        foreach ($listProjets as $projet) {
            $listObj = $projet->getObjectifs();
            foreach ($listObj as $obj ) {
                $this->parcourObj($objectifs, $obj, $taches);      
            }     
        }
    	return $this->render('UserBundle:view.html.twig',array(
        'projets' => $listProjets,
        'objectifs' => $objectifs,
         'taches' => $taches
      ));
    }
    public function parcourObj($objectifs, $obj, $taches){
        $objectifs[] = $obj;
        $listTaches = $obj->getTaches();
        $listObj = $obj->getObjectifs();
        foreach ($listTaches as $tache) {
            $this->parcourTache($tache, $taches);
        }
        foreach ($listObj as $obj ) {
            $this->parcourObj($objectifs, $obj, $taches);
        }
    }
    public function parcourTache($tache, $taches){
        $taches[] = $tache;
    }
    public function addAction(Request $request){
        $em = $this->getDoctrine()->getManager();
         $fichier = 
        "<?xml version=\"1.0\" encoding=\"utf-8\"?>
        <projet name=\"le projet test 2\">
            <description type=\"text\"> la description </description>
            <goal name=\"l objectif 24\">
                <description type='file'></description>
                <task name=\"La tache 176\">
                    <description type=\"text\"> la tache 5R867 du projet 3 objectif 1 </description>
                </task>
            <goal name=\"l objectif 67695!86\">
                <description type='file'></description>
                <task name=\"La tache 86\">
                    <description type=\"text\"> la tache 6487§ du projet 3 objectif 1 </description>
                </task>
             </goal>
             </goal>
             
        </projet>";
        $this->parseProjet($fichier, $em);
        $em->flush();
        return $this->render('UserBundle:layout.html.twig');
    }

   public function parseProjet($fichier, $em){
        $project=simplexml_load_string($fichier);
        $user = $this->getUser();
        $projet = new Projet();
        $projet->setNom($project["name"]);
        $projet->setDateCreation(new \DateTime ("now"));
        $projet->setDateDerModif(new \DateTime ("now"));
        $projet->setChecked(0);
        $projet->setSupprime(0);
        $projet->AddUtilisateur($user);
        if ($project->description["type"]== "text" and $project->description != null ){
            $projet->setDesctxt($project->description);
        }
        else{
            $projet->setDesctxt("");
        }
        if ($project->description["type"]== "file" and $project->description != null ){
            $projet->setDescfile($project->description);
        }
        foreach ($project->goal as $goal ) {
            $this->parseObjectifs($goal,$projet, $em);
        }
        $user->addProjet($projet);
        $em->persist($projet);

    }
    public function parseObjectifs($goal,$pere,  $em){
        $objectif = new Objectif();
        $objectif->setNom($goal["name"]);
        $objectif->setDateCreation(new \DateTime ("now"));
        $objectif->setDateDerModif(new \DateTime ("now"));
        $pere->addObjectif($objectif);
        $objectif->setChecked(0);
        $objectif->setSupprime(0);
        $objectif->setPere($pere);
        if ($goal->description["type"]== "text" and $goal->description != null ){
            $objectif->setDesctxt($goal->description);
        }else{
            $objectif->setDesctxt("");
        }
        if ($goal->description["type"]== "file" and $goal->description != null ){
            $objectif->setDescfile($goal->description);
        }
        foreach ($goal->goal as $obj ) {
                $this->parseObjectifs($obj, $objectif, $em);
            }
        foreach ($goal->task as $task ) {
                $this->parseTasks($task, $objectif, $em);
            }
        
        $em->persist($objectif);
    }
     public function parseTasks($task,$pere, $em){
        $tache = new Tache();
        $tache->setNom($task["name"]);
        $tache->setDateCreation(new \DateTime ("now"));
        $tache->setDateDerModif(new \DateTime ("now"));
        $tache->setChecked(0);
        $tache->setPere($pere);
        $tache->setSupprime(0);
        if ($task->description["type"]== "text" and $task->description != null ){
            $tache->setDesctxt($task->description);
        }else{
            $tache->setDesctxt("");
        }
       
        if ($task->description["type"]== "file" and $task->description != null ){
            $tache->setDescfile($task->description);
         }
        $pere->addTach($tache);
        $em->persist($tache);  
    }
    
}
