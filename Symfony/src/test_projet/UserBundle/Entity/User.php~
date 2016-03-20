<?php

namespace test_projet\UserBundle\Entity;


use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

     /**
     * @var ArrayCollection $projets
     *
     * @ORM\ManyToMany(targetEntity="test_projet\ProjetBundle\Entity\Projet", mappedBy="utilisateurs", cascade={"persist", "remove"})
     */
    private $projets;

    /**
     * Add projet
     *
     * @param \test_projet\ProjetBundle\Entity\Projet $projet
     *
     * @return User
     */
    public function addProjet(\test_projet\ProjetBundle\Entity\Projet $projet)
    {
        $this->projets[] = $projet;

        return $this;
    }

    /**
     * Remove projet
     *
     * @param \test_projet\ProjetBundle\Entity\Projet $projet
     */
    public function removeProjet(\test_projet\ProjetBundle\Entity\Projet $projet)
    {
        $this->projets->removeElement($projet);
    }

    /**
     * Get projets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProjets()
    {
        return $this->projets;
    }
}
