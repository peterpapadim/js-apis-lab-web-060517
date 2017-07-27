//define functions here
var createGist = function(file_name, content, description, token){
  $.ajax({
    url: "https://api.github.com/gists",
    type: 'POST',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify({
        "description": description,
        "public": "true",
        "files": {
        [file_name]: {
          "content": content
        }
        }
      })
  })
};

var myGists = function (username){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    method: 'GET',
    success: function(userGists){
      userGists.forEach(function(gist){
        $('#list').append(`<li><a href=${gist.html_url}>${gist.description}</a></li>`)
      })
    }
  })

};

var bindCreateButton = function() {

  $('#gist-form').on('submit', function(event){
    event.preventDefault()
    var token = $('#token').val()
    var fileName = $('#file').val()
    var description = $('#description').val()
    var content= $('#content').val()
    createGist(fileName, content, description, token)
  })

  $('#view-gists-form').on('submit', function(event){
    event.preventDefault()
    $('#list').empty()
    var username = $('#username').val()
    myGists(username)
  })

};

$(document).ready(function(){
  bindCreateButton()

});


//ae804a01d7ef0174aea48c288d7118091ee04af0
