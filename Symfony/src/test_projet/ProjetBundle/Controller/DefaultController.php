<?php

namespace test_projet\ProjetBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('ProjetBundle:Default:index.html.twig');
    }
    public function editAction()
    {
        return $this->render('ProjetBundle:Default:edit.html.twig');
    }
}
