<?php

namespace test_projet\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tache
 *
 * @ORM\Table(name="tache")
 * @ORM\Entity
 */
class Tache extends Item
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
   * @ORM\ManyToOne(targetEntity="test_projet\ProjetBundle\Entity\Objectif", inversedBy="taches")
   * @ORM\JoinColumn(nullable=false)
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
     * Set pere
     *
     * @param \test_projet\ProjetBundle\Entity\Objectif $pere
     *
     * @return Tache
     */
    public function setPere(\test_projet\ProjetBundle\Entity\Objectif $pere = null)
    {
        $this->pere = $pere;

        return $this;
    }

    /**
     * Get pere
     *
     * @return \test_projet\ProjetBundle\Entity\Objectif
     */
    public function getPere()
    {
        return $this->pere;
    }
}
