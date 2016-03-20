<?php

namespace test_projet\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Objectif
 *
 * @ORM\Table(name="objectif")
 * @ORM\Entity
 */
class Objectif extends Projet
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
     * @var ArrayCollection $taches
     *
     * @ORM\OneToMany(targetEntity="Tache", mappedBy="pere", cascade={"persist", "remove", "merge"})
     */
    private $taches;

    /**
   * @ORM\ManyToOne(targetEntity="test_projet\ProjetBundle\Entity\Projet", inversedBy="objectifs")
   * @ORM\JoinColumn(nullable=true)
   */
    private $pere;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add tach
     *
     * @param \test_projet\ProjetBundle\Entity\Tache $tach
     *
     * @return Objectif
     */
    public function addTach(\test_projet\ProjetBundle\Entity\Tache $tach)
    {
        $this->taches[] = $tach;

        return $this;
    }

    /**
     * Remove tach
     *
     * @param \test_projet\ProjetBundle\Entity\Tache $tach
     */
    public function removeTach(\test_projet\ProjetBundle\Entity\Tache $tach)
    {
        $this->taches->removeElement($tach);
    }

    /**
     * Get taches
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTaches()
    {
        return $this->taches;
    }

    /**
     * Set taches
     *
     * @param \test_projet\ProjetBundle\Entity\Objectif $taches
     *
     * @return Objectif
     */
    public function setTaches(\test_projet\ProjetBundle\Entity\Objectif $taches)
    {
        $this->taches = $taches;

        return $this;
    }

    /**
     * Set pere
     *
     * @param \test_projet\ProjetBundle\Entity\Projet $pere
     *
     * @return Objectif
     */
    public function setPere(\test_projet\ProjetBundle\Entity\Projet $pere = null)
    {
        $this->pere = $pere;

        return $this;
    }

    /**
     * Get pere
     *
     * @return \test_projet\ProjetBundle\Entity\Projet
     */
    public function getPere()
    {
        return $this->pere;
    }
}
