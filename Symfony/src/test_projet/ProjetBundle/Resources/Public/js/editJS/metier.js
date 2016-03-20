function Item (name, desc) {
	
	if (!Item.prototype.isNameCorrect(name)) {
        console.error('Un item ne peut avoir de nom vide');
	} else {
		this.name = name;

		this.desc = desc || '';
	}
}

Item.prototype = Object.create({
	isNameCorrect : function (name) {
	    var is = true;
	    if (!name || name == '') is = false;
	    return is;
	},

	save : function () {
			alert('Item-save');
	},

	getName : function () {
            	return this.name;
		},

	setName : function (newName) {
            if (this.isNameCorrect(newName)) {
            	this.name = newName;
            	return this;
            } 
		},

	getDesc : function () {
				return this.desc;
			},

	setDesc : function (newDesc) {
			this.desc = newDesc;
			return this;
		},

	remove : function () {
		    alert('item-remove');
	    }
});

function Project (name, desc) {
	Item.call(this, name, desc);
	this.goals = [];
}

Project.prototype =  Object.create(Item.prototype, {
	save : {
		value : function () {
			alert('Projet-save');
		},
	}, 	

	addGoal : {
		value : function (goal) {
		if (goal) {
			this.goals.push(goal);
			goal.parent = this;
		}
		return this;
		},	
	},

	clearGoal : {
		value : function () {
		this.goals = [];
		return this;
		},
	},

	remove : {
		value : function () {
		for (var i=0; i < this.goals.length; i++)
			this.goals[i].remove();
		delete this;
		},
	},

	renier : {
		value : function (goal) {
			var index = this.goals.indexOf(goal);
			this.goals.splice(index, 1);
		}
	},

	hasGoal : {
		value : function () {
			return this.goals.length > 0 ;
		}
	},

	getXML : {
		value : function () {
			var str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
			str += '<projet name="';
			str += this.name;
			str += '">';
			if (this.desc) {
				str += '<description type="text/plain">';
				str += this.desc;
				str += '</description>';
			}

			for (var i=0; i < this.goals.length; i++) {
				str += this.goals[i].getXML();
			}
	
			str += '</projet>';
			return str;
		},
	},
});

Project.prototype.constructor = Project;


function Goal (name, desc) {
	Project.call(this, name, desc);
	this.parent = null;
	this.tasks = [];
}

Goal.prototype = Object.create(Project.prototype, {
    save : {
	    value : function () {
				alert('goal-save');
		},
	},
	
	addTask : {
		value : function (task) {
	    	if (task) this.tasks.push(task);
		    return this;
		},
	},

	clearTask : {
		value : function () {
			this.tasks = [];
			return this;
		},
	},

	remove : {
		value : function () {
			if (this.parent) {
				this.parent.renier(this);
			}
			delete this;
		}
	},

	getXML : {
		value : function () {
			var str = '<goal name="';
			str += this.name;
			str += '">';
			if (this.desc) {
				str += '<description type="text/plain">';
				str += this.desc;
				str += '</description>';
			}
			
			for (var i=0; i<this.goals.length; i++) {
				str += this.goals[i].getXML();
			}

			for (var i=0; i<this.tasks.length; i++) {
				str += this.tasks[i].getXML();
			}
			
			str += '</goal>';
			return str;
		},
	},
});

Goal.prototype.constructor = Goal;

function Task (name, desc) {
	Item.call(this, name, desc);
	this.tasks = [];
}

Task.prototype = Object.create(Item.prototype, {
    save : {
    	value : function () {
			alert('task-save');
		},
	},

	addTask : {
		value : function (task) {
			if (task) this.tasks.push(task);
			return this;
		},
	},

	clearTask : { 
		value : function () {
			this.tasks = [];
			return this;
		},
	},

	getXML : {
		value : function () {
			var str = '<task name="';
			str += this.name;
			str += '">';
			if (this.desc) {
				str += '<description type="text/plain">';
				str += this.desc;
				str += '</description>';
			}
			
			for (var i=0; i<this.tasks.length; i++) {
				str += this.tasks[i].getXML();
			}
			
			str += '</task>';
			return str;
		},
	},
});

Task.prototype.constructor = Task;