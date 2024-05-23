$(document).ready(function () { // Begin checking if localStorage contains entries.
    $('#loadTaskMessage').text('Ladataan...');
    taskNumber = localStorage.length / 2;
    if (taskNumber > 0) { // IF tasks are found in localStorage.
        console.log("Found " + taskNumber + " saved tasks. Total number of localStorage entries: " + localStorage.length);
        $('#loadTaskMessage').text('Löytyi ' + taskNumber + ' tallennettua tehtävää!');
        for (let i = 0; i < localStorage.length; i++) {
            if (!(localStorage.key(i).includes("Check"))) { // Skips "Check" entries in localStorage.
                inputValue = (localStorage.getItem(localStorage.key(i))); // Retrieves entry value from localStorage.
                var li = $("<li />").text(inputValue); // Initialize list item.
                storageKeyTask = localStorage.key(i);
                storageKeyCheck = storageKeyTask + "Check";
                deleteButton(li);    // Creates "delete" button to newly added entry.
                idPanel(li); // Adds task id to user interface.
                let checkStatus = localStorage.getItem(storageKeyCheck); // Retrieves "checked" status from localStorage.
                if (checkStatus == 'true') { // If TRUE, adds "checked" status to loaded entry.
                    $(li).attr({
                        'id': (localStorage.key(i)),
                        'class': 'checked list-group-item text-break'
                    });
                } else { // If FALSE, "checked" status is NOT added.
                    $(li).attr({
                        'id': (localStorage.key(i)),
                        'class': 'list-group-item text-break'
                    });
                }
                $('#taskList').append(li); // Adds task from localStorage to user interface.
            }
        }
        console.log('Sorting list items now...');
        var taskListSort = $('#taskList');
        var taskListSortItems = taskListSort.children('li').get();
        taskListSortItems.sort(function (a, b) { // Uses localStorage keys to sort list.
            a = parseInt($(a).attr('id').slice(7)); // Removes "myTasks" and only leaves id, then converts to integer.
            b = parseInt($(b).attr('id').slice(7)); // ^
            return ((a > b) ? 1 : -1); // Compares task id integers with ternary operator.
        });
        $(taskListSortItems).appendTo('#taskList');
    } else { // IF no tasks exist in localStorage.
        console.log("No saved tasks found.");
        $('#loadTaskMessage').text('Tallennettuja tehtäviä ei löytynyt.');
    }

    $('.counted').on("load propertychange keyup input paste", function () { // For character counter. Thank you to Eric Niquette for guide on how to accomplish this. https://www.niquette.ca/articles/input-counter/
        var limit = $(this).attr("maxlength");
        var remainingChars = limit - $(this).val().length;
        if (remainingChars <= 0) {
            $(this).val($(this).val().substring(0, limit));
        }
        $(this).nextAll('.screen-only').first().text(remainingChars <= -1 ? 0 : remainingChars + ' merkkiä jäljellä');
    });
    $('.counted').trigger('load');
})

$('#newTaskInput').click(function () { // Takes user input and creates a task with it.
    var minLimit = $('#taskInput').attr("minlength");
    var inputValue = taskInput.value;
    if (inputValue < minLimit) {
        $('#countertext').text('Syötä vähintään 1 merkki.');
    } else {
        newTask(inputValue, false);
    }
})

function newTask(inputValue) {
    newToStorage(inputValue);
    var li = $("<li />").text(inputValue);
    deleteButton(li);    // Creates "delete" button to newly added entry.
    idPanel(li); // Adds task id to user interface.
    $('#taskList').append(li);
    $(li).hide();
    $(li).fadeIn(400);
    $(li).attr({
        'id': (storageKeyTask),
        'class': 'list-group-item text-break'
    });
    $('#loadTaskMessage').text('Tehtäviä: ' + localStorage.length / 2);
}

function newToStorage(inputValue) { // This SAVES new list entry TO localStorage.
    storageID = 0;
    taskNumber = localStorage.length / 2;
    for (let i = 0; i < taskNumber; i++) { // Used to avoid overwriting localStorage entries by finding first free spot.
        if ("myTasks" + storageID in localStorage) {
            storageID++;
        }
    }
    storageKeyTask = "myTasks" + storageID;
    storageKeyCheck = storageKeyTask + "Check";
    localStorage.setItem(storageKeyTask, inputValue); // New entry is saved to localStorage.
    localStorage.setItem(storageKeyCheck, false); // New entries are not checked by default.
    return storageKeyTask;
}

function deleteButton(li) { // Creates delete buttons to list items.
    var span = $('<span />').text('\u00D7').attr({
        'class': 'close text-break',
        'id': storageKeyTask
    });
    $(li).append(span);
}

function idPanel(li) { // Creates id panels to list items.
    var span = $('<span />').text('#' + storageKeyTask.slice(7)).attr({
        'class': 'id text-break',
        'id': storageKeyTask
    });
    $(li).append(span);
}

$('#taskList').click(function (event) {
    if (event.target.tagName === 'LI') { // Checkmark event.
        event.target.classList.toggle('checked'); // Toggles checkmark on <li> item.
        storageKeyCheck = event.target.id + "Check"; // Used for updating localStorage entries.
        if (event.target.classList.contains('checked')) {
            localStorage.setItem(storageKeyCheck, true);
        } else {
            localStorage.setItem(storageKeyCheck, false);
        }
    }
    else if (event.target.tagName === 'SPAN') { // Deletion event.

        $(event.target.parentNode).slideUp(1000, function () {
            $(event.target.parentNode).remove(); // Removes list entry from user interface.
        });
        localStorage.removeItem(event.target.id); // Removes list entry from localStorage.
        localStorage.removeItem(event.target.id + "Check"); // Removes "checked" key and value from localStorage.
        $('#loadTaskMessage').text('Tehtäviä: ' + localStorage.length / 2);
    }
})

$('#clearStorage').click(function () { // Clears local storage when button is pressed.
    $('#taskList').children('li').slideUp(1000, function () {
        $('#taskList').children('li').remove();
    });
    localStorage.clear();
    $('#loadTaskMessage').text('Tehtäviä: ' + localStorage.length / 2);
})