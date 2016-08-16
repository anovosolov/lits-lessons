document.addEventListener("DOMContentLoaded", ready);

function ready() {
  var commentForm = document.querySelector(".comment-form");
  commentForm.addEventListener("submit", createComment);  // слухаємо подію submit форми
                                                          // (вона виникає при натисканні на <input type="submit">
                                                          // або при натисканні Enter)

  var commentList = document.querySelector(".comment-list");
  commentList.addEventListener("click", onRemoveBtnClick);

  getAllComments(); // дістаємо всі коментарі з бази  даних


  /**
   * Get all comments from server
   */
  function getAllComments(){
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", commentsReceived);
    xhr.addEventListener("error", transferFailed);

    xhr.open('GET', '/comments');
    xhr.send();
  }

  /**
   * Save new command - send data to server
   */
  function createComment(event){
    event.preventDefault();

    var xhr = new XMLHttpRequest(),
        data = {
          name: commentForm.name.value,
          email: commentForm.email.value,
          message: commentForm.message.value
        };

    // видалимо пробіли з початку та кінця рядка
    // також за допомогою регулярного виразу видалимо будь-які теги, якщо такі були внесені
    // тобто, якщо користувач введе "<b>Hi!</b> My name is Sara"
    // то ми видалимо <b> та </b>, щоб отримати чистий текст, без всяких html тегів
    data.message = data.message.trim().replace(/(<([^>]+)>)/ig, "");


    // валідація повідомлення
    // перевіряємо чи воно не пусте, якщо так - показуємо повідомлення помилки
    if (data.message == ""){
      showError("Please, don't leave message body empty!");
      return false;
    }

    xhr.addEventListener("load", commentSaved);
    xhr.addEventListener("error", transferFailed);

    xhr.open('POST', '/comments');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
  }

  /**
   * Comment was saved on server and we can add it
   */
  function commentSaved(){
    var data = JSON.parse(this.responseText);
    drawComment(data);
  }

  /**
   * Create comment dom node and add to list
   * @param data
   */
  function drawComment(data){
    var commentElement = document.createElement("article");

    commentElement.setAttribute("data-id", data.id);
    commentElement.className = "comment";
    commentElement.innerHTML = "<header>" +
        "Comment added by " + data.name +
        "</header><p>" + data.message +
        "</p>" +
        "<footer class='comment__tools'><button class='btn btn--circle js-remove'>&cross;</button></footer>";

    commentList.insertBefore(commentElement, commentList.firstChild);
  }

  /**
   * All comments were received from server
   */
  function commentsReceived() {
    if (this.status >= 200) {
      var comments = JSON.parse(this.responseText);
      comments.forEach(function(comment){
        drawComment(comment);
      })
    }
    else {
      transferFailed();
    }
  }

  /**
   * Listen remove btn click and send DELETE request to server
   * @param event
   */
  function onRemoveBtnClick(event){
    var target = event.target;

    if (target.classList.contains("js-remove")){
      while (target != event.currentTarget) {
        target = target.parentNode;
        if (target.classList.contains("comment")) break;
      }

      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function(){removeComment(target)});
      xhr.addEventListener('error', transferFailed);

      xhr.open("DELETE","/comments/" + target.getAttribute("data-id"));
      xhr.send();
    }
  }

  /**
   * Remove comment from DOM
   * @param target
   */
  function removeComment(target) {
    console.log(event);
    commentList.removeChild(target);
  }

  /**
   * Error handler for all requests
   */
  function transferFailed() {
    showError("An error occurred while transferring the file.");
  }

  function showError(message){
    alert(message);
  }
}
