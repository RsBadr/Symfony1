<?php

namespace test_projet\ProjetBundle\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Projet
 *
 * @ORM\Table(name="projet")
 * @ORM\Entity
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"projet" = "Projet", "objectif" = "Objectif"})
 */
class Projet extends Item
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @var ArrayCollection $objectifs
     *
     * @ORM\OneToMany(targetEntity="Objectif", mappedBy="pere", cascade={"persist", "remove", "merge"})
     */
    private $objectifs;

   /**
    * @ORM\ManyToMany(targetEntity="test_projet\UserBundle\Entity\User", inversedBy="projets")
    */ 
    private $utilisateurs;

    public function getId()
    {
        return $this->id;
    }


   


    /**
     * Constructor
     */
      public function __construct()
  {
    
    $this->utilisateurs = new ArrayCollection();
    $this->objectifs = new ArrayCollection();
  }

    /**
     * Add utilisateur
     *
     * @param \test_projet\UserBundle\Entity\User $utilisateur
     *
     * @return Projet
     */
    public function addUtilisateur(\test_projet\UserBundle\Entity\User $utilisateur)
    {
        $this->utilisateurs[] = $utilisateur;

        return $this;
    }

    /**
     * Remove utilisateur
     *
     * @param \test_projet\UserBundle\Entity\User $utilisateur
     */
    public function removeUtilisateur(\test_projet\UserBundle\Entity\User $utilisateur)
    {
        $this->utilisateurs->removeElement($utilisateur);
    }

    /**
     * Get utilisateurs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUtilisateurs()
    {
        return $this->utilisateurs;
    }

    /**
     * Add objectif
     *
     * @param \test_projet\ProjetBundle\Entity\Objectif $objectif
     *
     * @return Projet
     */
    public function addObjectif(\test_projet\ProjetBundle\Entity\Objectif $objectif)
    {
        $this->objectifs[] = $objectif;

        return $this;
    }

    /**
     * Remove objectif
     *
     * @param \test_projet\ProjetBundle\Entity\Objectif $objectif
     */
    public function removeObjectif(\test_projet\ProjetBundle\Entity\Objectif $objectif)
    {
        $this->objectifs->removeElement($objectif);
    }

    /**
     * Get objectifs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObjectifs()
    {
        return $this->objectifs;
    }
}
