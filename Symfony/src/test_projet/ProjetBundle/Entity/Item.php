<?php

namespace test_projet\ProjetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Item
 *
 * @ORM\Table(name="item")
 * @ORM\Entity
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"item" = "Item", "projet" = "Projet", "tache"="Tache"})
 */
 
abstract class Item
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
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=255)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="desctxt", type="string", length=255)
     */
    private $desctxt;

    /**
     * @var string
     *
     * @ORM\Column(name="descfile", type="blob", nullable=true)
     */
    private $descfile;

    /**
     * @var dateTime
     *
     * @ORM\Column(name="dateCreation", type="date")
     */
    private $dateCreation;

    /**
     * @var dateTime
     *
     * @ORM\Column(name="dateDerModif", type="date")
     */
    private $dateDerModif;

    /**
     * @var boolean
     *
     * @ORM\Column(name="checked", type="boolean")
     */
    private $checked;

    /**
     * @var boolean
     *
     * @ORM\Column(name="supprime", type="boolean")
     */
    private $supprime;
    
   

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
     * Set nom
     *
     * @param string $nom
     *
     * @return Item
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

   

    /**
     * Set dateCreation
     *
     * @param dateTime $dateCreation
     *
     * @return Item
     */
    public function setDateCreation($dateCreation)
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    /**
     * Get dateCreation
     *
     * @return dateTime
     */
    public function getDateCreation()
    {
        return $this->dateCreation;
    }

    /**
     * Set dateDerModif
     *
     * @param dateTime $dateDerModif
     *
     * @return Item
     */
    public function setDateDerModif($dateDerModif)
    {
        $this->dateDerModif = $dateDerModif;

        return $this;
    }

    /**
     * Get dateDerModif
     *
     * @return dateTime
     */
    public function getDateDerModif()
    {
        return $this->dateDerModif;
    }

    /**
     * Set checked
     *
     * @param \boolean $checked
     *
     * @return Item
     */
    public function setChecked($checked)
    {
        $this->checked = $checked;

        return $this;
    }

    /**
     * Get checked
     *
     * @return \boolean
     */
    public function getChecked()
    {
        return $this->checked;
    }

    /**
     * Set supprime
     *
     * @param \boolean $supprime
     *
     * @return Item
     */
    public function setSupprime($supprime)
    {
        $this->supprime = $supprime;

        return $this;
    }

    /**
     * Get supprime
     *
     * @return \boolean
     */
    public function getSupprime()
    {
        return $this->supprime;
    }

    /**
     * Set desctxt
     *
     * @param string $desctxt
     *
     * @return Item
     */
    public function setDesctxt($desctxt)
    {
        $this->desctxt = $desctxt;

        return $this;
    }

    /**
     * Get desctxt
     *
     * @return string
     */
    public function getDesctxt()
    {
        return $this->desctxt;
    }

    /**
     * Set descfile
     *
     * @param string $descfile
     *
     * @return Item
     */
    public function setDescfile($descfile)
    {
        $this->descfile = $descfile;

        return $this;
    }

    /**
     * Get descfile
     *
     * @return string
     */
    public function getDescfile()
    {
        return $this->descfile;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->objectifs = new \Doctrine\Common\Collections\ArrayCollection();
    }

}
