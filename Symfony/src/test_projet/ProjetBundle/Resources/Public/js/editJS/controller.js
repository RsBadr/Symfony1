var currentAction;
var lastAction;
var vueActive;

function next ( action ) {
    if (currentAction != action) {
        if (action) {
            lastAction = currentAction;
            currentAction = action;
        }
        if (lastAction)
            lastAction.end();
        currentAction.begin();
     }
}

function ItemFocusAction (view, item) {
    this.view = view || null;
    this.item = item || null;

    var action = this;

    this.begin = function () {
        if (vueActive) {
            vueActive.isActive = false;
        }
        console.log('FocusAction.begin');
        this.loadAction();
        this.init();
        this.updateHTML();
        vueActive = action.view;
        vueActive.isActive = true;
        vueActive.show();
    };

    this.end = function () {
        console.log('FocusAction.end');
    };

    this.init = function () {
            $('option').on('mouseover', function() {
                $('.selected').each(
                    function() {
                        $(this).removeClass('selected');
                    }
                );
                $(this).addClass('selected');
            });
        }

    this.updateHTML = function () {
        $('#nameGoal').text(action.item.getName());
        if (action.item.getDesc()) 
            $('#description').text(action.item.getDesc());
        else
            $('#description').text("Aucune description n'est disponible. Aidez-vous à garder les idées claires en détaillant vos objectifs.");
    };
        
}

ItemFocusAction.prototype = Object.create({
    loadAction : function () {

            console.log('ItemFocusAction');
        $('#action')
        .empty()
        .append (
            $('<option>')
            .append(
                $('<img>').attr('src', editImg)
            )
            .append(
                $('<span>').text('Changer le nom')
            )
            .on('click', function() {
                next(editNameAction);
            })
        )
        .append (
            $('<option>')
            .append(
                $('<img>').attr('src', editImg)
            )
            .append(
                $('<span>').text('Changer la description')
            )
            .on('click', function() {
                next(editDescAction);
            })
        );
    },
});

function ProjectFocusAction (view, project) {
    ItemFocusAction.call(this, view, project);
}

ProjectFocusAction.prototype = Object.create(ItemFocusAction, {
    loadAction : {
        value : function () {

            console.log('ProjectFocusAction');
            $('#action')
            .empty()
            .append (
                $('<option>')
                .addClass('selected')
                .append(
                    $('<img>').attr('src', addGoal)
                )
                .append(
                    $('<span>').text('Ajouter un objectif')
                )
                .on('click', function() {
                    next(addGoalAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer le nom')
                )
                .on('click', function() {
                    next(editNameAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer la description')
                )
                .on('click', function() {
                    next(editDescAction);
                })
            );
        },
    },
});

ProjectFocusAction.prototype.constructor = ProjectFocusAction;

function GoalFocusAction (view, project) {
    ItemFocusAction.call(this, view, project);
}

GoalFocusAction.prototype = Object.create(ItemFocusAction, {
    loadAction : {
        value : function () {
        console.log('GoalFocusAction');
            $('#action')
            .empty()
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', trash)
                )
                .append(
                    $('<span>').text('Supprimer')
                )
                .on('click', function() {
                    next(deleteAction);
                })
            )
            .append (
                $('<option>')
                .addClass('selected')
                .append(
                    $('<img>').attr('src', addGoal)
                )
                .append(
                    $('<span>').text('Ajouter un sous objectif')
                )
                .on('click', function() {
                    next(addGoalAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', addTask)
                )
                .append(
                    $('<span>').text('Ajouter une tâche')
                )
                .on('click', function() {
                    next(addTaskAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer le nom')
                )
                .on('click', function() {
                    next(editNameAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer la description')
                )
                .on('click', function() {
                    next(editDescAction);
                })
            );
            this.init();
        },
    },
});

GoalFocusAction.prototype.constructor = GoalFocusAction;

function TaskFocusAction (view, project) {
    ItemFocusAction.call(this, view, project);
}

TaskFocusAction.prototype = Object.create(ItemFocusAction, {
    loadAction : {
        value : function () {
            $('#action')
            .empty()
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', trash)
                )
                .append(
                    $('<span>').text('Supprimer')
                )
                .on('click', function() {
                    next(deleteAction);
                })
            )
            .append (
                $('<option>')
                .addClass('selected')
                .append(
                    $('<img>').attr('src', addTask)
                )
                .append(
                    $('<span>').text('Ajouter une sous tâche')
                )
                .on('click', function() {
                    next(addTaskAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer le nom')
                )
                .on('click', function() {
                    next(editNameAction);
                })
            )
            .append (
                $('<option>')
                .append(
                    $('<img>').attr('src', editImg)
                )
                .append(
                    $('<span>').text('Changer la description')
                )
                .on('click', function() {
                    next(editDescAction);
                })
            );
            this.init();
        },
    },
});

TaskFocusAction.prototype.constructor = TaskFocusAction;

var deleteAction = {
    begin : function () {
        if (vueActive.getItem() == projet) {
            alert('Pop-Up de la mort qui veut pas que tu supprimes le projet ; Baaah !');
        } else {
            $('section').hide();
            $('main').append($('<span>').text('Veuillez sélectionner un objectif').attr('id', 'message'));
            
            vueActive.getItem().remove();
            vueActive.remove();   
            vueActive = null;
        }
    },

    end : function () {
        $('#message').remove();
        $('section').show();
    },
};

var editNameAction = {
    begin : function () {
        var item = vueActive.getItem();
        var label = $('<label>').text('Comment renommer ' + item.getName() + ' ?');
        var action = this;

       $('#workbench')
        .append(label)
        .append(
            $('<input>').attr({
                id : 'rename',
                placeholder : item.getName(),
            })
        )
        .append(
            $('<button>')
            .on('click', function () {
                var newName = $('#rename').val().trim();
                if (action.isNameValid(newName)) {
                    item.setName(newName);
                    vueActive.setName(newName);
               
                    label.text('Comment renommer ' + newName + ' ?');
                    $('#nameGoal').text(newName);
                }
            })
            .append( $('<img>').attr('src', valider) )
        )
        .fadeIn('slow');
    },

    isNameValid : function (newName) {
        return newName != "";
    },

    end : function () {
        $('#workbench').hide().empty();
    },
};

var editDescAction = {
    begin : function () {
        var item = vueActive.getItem();
        var action = this;
       $('#workbench')
        .append(
            $('<label>').attr('for', 'setDesc').text('Modifier la description de ' + item.getName() + ' ?')
        )
        .append(
            $('<textarea>').attr({
                id : 'setDesc',
            })
            .text(vueActive.getItem().getDesc())
        )
        .append(
            $('<button>')
            .on('click', function () {
                var desc = $('#setDesc').val().trim();
                if (desc) {
                    vueActive.setDesc(desc);
                    item.setDesc(desc);
                    $('#description').text(item.getDesc());
                } else {
                    item.setDesc(null);
                    $('#description').text("Aucune description n'est disponible. Aidez-vous à garder les idées claires en détaillant vos objectifs.");
                }
            })
            .append( $('<img>').attr('src', valider) )
        )
        .fadeIn('slow');
    },

    end : function () {
        $('#workbench').hide().empty();
    },
};

var addGoalAction =  {
    begin : function () {
        var action = this;
        $('#workbench').append(
            $('<label>')
                .attr('for', 'setName')
                .text('Que faire pour réussir à ' + $('#nameGoal').text() + ' ?')
        )
        .append(   
            $('<input>')
                .attr({
                    type: 'text',
                    id: 'setName',
                    placeholder: 'Nom du sous-objectif à atteindre',
                })
                .one('keydown', function () {
                    $('.hidden').fadeIn('slow').removeClass('hidden');
                })
                .val('')
        )
        .append(
            $('<label>')
                .attr('for', 'setDesc')
                .text('En quoi cela consiste t-il ?')
                .addClass('hidden')
        )
        .append(
            $('<textarea>')
                .attr({
                    id: 'setDesc',
                    placeholder: 'Expliquez en quoi cela consiste ... :)',
                    class: 'hidden',
                }).val('')
        )
        .append(
            $('<button>')
            .on('click', function () {
                var name = $('#setName').val().trim();
                if (action.isNameValid(name)) {
                    var desc = $('#setDesc').val().trim(); 
                    var goal = new Goal(name, desc);
                    vueActive.addGoal(goal);
                    vueActive.getItem().addGoal(goal);
                    action.onAdd();
                }
            })
            .addClass('hidden')
            .append(
                $('<img>').attr('src', valider)
            )
        )
        .fadeIn('slow');
    },

    onAdd : function () {
        $('#setName').val('');
        $('#setDesc').val('');
    },

    isNameValid : function (newName) {
        return newName != "";
    },

    end : function () {
        $('#workbench').hide().empty();
    },

};

var addTaskAction =  {
    begin : function () {
        var action = this;
        $('#workbench').append(
            $('<label>')
                .attr('for', 'setName')
                .text('Comment réaliser ' + $('#nameGoal').text() + ' ?')
        )
        .append(   
            $('<input>')
                .attr({
                    type: 'text',
                    id: 'setName',
                    placeholder: 'Nom de la tâche',
                })
                .one('keydown', function () {
                    $('.hidden').fadeIn('slow').removeClass('hidden');
                })
                .val('')
        )
        .append(
            $('<label>')
                .attr('for', 'setDesc')
                .text('En quoi cela consiste t-elle ?')
                .addClass('hidden')
        )
        .append(
            $('<textarea>')
                .attr({
                    id: 'setDesc',
                    placeholder: 'Expliquez en quoi cela consiste ... :)',
                    class: 'hidden',
                }).val('')
        )
        .append(
            $('<button>')
            .on('click', function () {
                var name = $('#setName').val().trim();
                if (action.isNameValid(name)) {
                    var desc = $('#setDesc').val().trim(); 
                    var goal = new Goal(name, desc);
                    vueActive.addTask(goal);
                    vueActive.getItem().addTask(goal);
                    action.onAdd();
                }
            })
            .addClass('hidden')
            .append(
                $('<img>').attr('src', valider)
            )
        )
        .fadeIn('slow');
    },

    onAdd : function () {
        $('#setName').val('');
        $('#setDesc').val('');
    },

    isNameValid : function (newName) {
        return newName != "";
    },

    end : function () {
        $('#workbench').hide().empty();
    },
};