function Vue (item, selector, controller) {
	this.item = item;
	this.selector = selector || null;
	this.controller = controller || null;
	this.isActive = false;
	this.creerVue();
}

Vue.prototype = Object.create({
	creerVue : function() {
		if (this.selector) {
		var vue = this;
		console.log("Vue :");
		console.log(vue);
		$(this.selector).on("click", function () {
			    if (!vue.isActive) {
		            var action = vue.controller;
		            action.focus = {	
		                view: vue,
		                item: vue.item,
		            };
		            next (action);
		        }
		    });
		}
	},

	setName : function (name) {
		console.log('setName');
		var child = $(this.selector).children();
		console.log(child);
        $(child[1]).text(this.item.getName());
	},

	setDesc : function (name) {
		var child = $(this.selector).children();
        $(child[0]).text(this.item.getName());
	},

	getItem : function () {
		return this.item;
	},

	remove : function () {
			this.isActive = false;
			$(this.selector).remove();
	},
	
	show : function () {
		$(this.selector).children().each( function () {
            $(this).show();
        });
	}
})

function VueListeProjet (item, selector, controller) {
	Vue.call(this, item, selector,  new ProjectFocusAction(this, item));
	$('main > div > h2').text(projet.getName());      // Nom du projet en haut de la page
	if (!this.item.hasGoal()) {                       // Afficher du texte si le projet est vide
	    $('#vueProjet ').append(
	        $('<p>').text('Créez de nouveaux objectifs pour renforcer votre projet !')
	    );
    }
}

VueListeProjet.prototype = Object.create(Vue.prototype, {
	addGoal : { 
		value : function (item) {
			// S'il était vide auparavant, il faut supprimer le message invitant l'utilisateur à le remplir
			if (!this.item.hasGoal()) {
                $("#vueProjet  p").each(function () {$(this).remove()});		
			}

			var child = new VueListeGoal(item, null);
			child.setParent(this);
		
			// cablage assez sale pour insérer la vue du nouvel item au bon endroit sur la page HTML
			$(this.selector).children().each( function () {
				if ($(this).hasClass('content')) {
					$(this).children().each (
						function () {
							if($(this).hasClass('children')) {
									$(this).append($(child.selector));
							}
					});
				}	
			});
		},
},

remove : {
	value : function () {
		if(this.conteneur) this.conteneur.onChildLost(this);
		$(this.selector).remove();
	},
  },
  
  onChildLost : {
  	value : function (vue) {
  		if (!this.item.hasGoal()) {
  			$('#vueProjet').append($('<p>').text('Créez de nouveaux objectifs pour renforcer votre projet !'));
  		}
  	},
  },
  
  setName : {
  	value : function (name) {
	  		Vue.prototype.setName.call(this, name);
	        $('#ongletProjet > h1').text(this.item.getName());
	        $('main > div	 > h2').text(this.item.getName());
	    },
  	},
});

VueListeProjet.prototype.constructor = VueListeProjet;

function VueListeGoal (item, selector) {
	Vue.call(this, item, selector, new GoalFocusAction(this, item));
	this.conteneur = null;
}

VueListeGoal.prototype = Object.create(Vue.prototype, {
	creerVue : { 
		value : function () {
		    var vue = this;
		    var view = $('<li>');
		    view
		    .addClass('goal')
		    .append(
		    	$('<img>').attr('src', goal)
		    )
		    .append(
		    	$('<span>').text(vue.item.getName())
		    );

		    var conteneur = $('<div>')
		    .addClass('content')
		    .addClass('content')
		    .append(    
		       	$('<span>')
		       	.text(vue.item.getDesc())
		       	.addClass('desc')
		    )
		    .append(
		        $('<ul>').addClass('children')
		    )
		    .hide()
		    .appendTo(view);

		    // On ajoute un écouteur à l'objectif
			view.on('click', function (event) {
		        event.stopPropagation();
		            conteneur.toggle();
		        
		        if (vue != vueActive) {
		            var action = vue.controller;
		            console.log('creation de la vue, -> action');
		            console.log(action);
		            
		            action.focus = {
		                view: vue,
		                item: vue.item,
		            };

		            next (action);
		        }
		    });
		    this.selector = view;
	},
},

	addGoal : 
	{ value :
		function (item) {
		var child = new VueListeGoal(item);
		child.setParent(this);
		$(this.selector).children().each( function () {
			if ($(this).hasClass('content')) {
				$(this).children().each (
					function () {
						if($(this).hasClass('children')) {
							$(this).append($(child.selector));
						}
			});
		}	
	});
	},
},

	setParent : {
		value :
			function (VueListe) {
		this.conteneur = VueListe;
	},
},

addTask : 
	{ value :
		function (item) {
		var child = new VueListeTask(item);
		child.setParent(this);
		$(this.selector).children().each( function () {
			if ($(this).hasClass('content')) {
				$(this).children().each (
					function () {
						if($(this).hasClass('children')) {
							$(this).append($(child.selector));
						}
			});
		}	
	});
	},
},

remove : {
	value : function () {
		this.isActive = false;
		if(this.conteneur) this.conteneur.onChildLost(this);
		$(this.selector).remove();
	},
  },
  
  onChildLost : {
  	value : function (vue) {
  		console.log('ooups, ' + vue + ' est mort !');
  	},
  },

  setDesc : {
  	value : function (newDesc) {
  			$(this.selector).children().each( function () {
				if ($(this).hasClass('content')) {
					$(this).children().each(function() {
						if ($(this).hasClass('desc')) {
							$(this).text(newDesc);
						}
					})
				}
  			}
  		)},
  },
});

VueListeGoal.prototype.constructor = VueListeGoal;

function VueListeTask (item, selector) {
	Vue.call(this, item, selector, new TaskFocusAction(this, item));
	this.conteneur = null;
}

VueListeTask.prototype = Object.create(Vue.prototype, {
	creerVue : { 
		value : function () {
		    var vue = this;
		    var view = $('<li>');
		    view
		    .addClass('task')
		    .append(
		    	$('<img>').attr('src', task)
		    )
		    .append(
		    	$('<span>').text(vue.item.getName())
		    );

		    var conteneur = $('<div>')
		    .addClass('content')
		    .addClass('content')
		    .append(    
		       	$('<span>')
		       	.text(vue.item.getDesc())
		       	.addClass('desc')
		    )
		    .append(
		        $('<ul>').addClass('children')
		    )
		    .hide()
		    .appendTo(view);

		    // On ajoute un écouteur à l'objectif
			view.on('click', function (event) {
		        event.stopPropagation();
		            conteneur.toggle();
		        
		        if (vue != vueActive) {
		            var action = vue.controller;
		            console.log('creation de la vue, -> action');
		            console.log(action);
		            
		            action.focus = {
		                view: vue,
		                item: vue.item,
		            };

		            next (action);
		        }
		    });
		    this.selector = view;
	},
},

	addTask : 
	{ value :
		function (item) {
		var child = new VueListeTask(item);
		child.setParent(this);
		$(this.selector).children().each( function () {
			if ($(this).hasClass('content')) {
				$(this).children().each (
					function () {
						if($(this).hasClass('children')) {
							$(this).append($(child.selector));
						}
			});
		}	
	});
	},
},

	setParent : {
		value :
			function (VueListe) {
		this.conteneur = VueListe;
	},
},

remove : {
	value : function () {
		this.isActive = false;
		if(this.conteneur) this.conteneur.onChildLost(this);
		$(this.selector).remove();
	},
  },
  
  onChildLost : {
  	value : function (vue) {
  		console.log('ooups, ' + vue + ' est mort !');
  	},
  },

  setDesc : {
  	value : function (newDesc) {
  			$(this.selector).children().each( function () {
				if ($(this).hasClass('content')) {
					$(this).children().each(function() {
						if ($(this).hasClass('desc')) {
							$(this).text(newDesc);
						}
					})
				}
  			}
  		)},
  },
});

VueListeTask.prototype.constructor = VueListeTask;