$(document).ready(ready);


function ready() {
  var commentForm = $(".comment-form");
  commentForm.on("submit", createComment);  // слухаємо подію submit форми
  // (вона виникає при натисканні на <input type="submit">
  // або при натисканні Enter)

  var commentList = $(".comment-list");
  commentList.on("click", "button.js-remove", onRemoveBtnClick);

  getAllComments(); // дістаємо всі коментарі з бази  даних


  /**
   * Get all comments from server
   */
  function getAllComments() {
    $.get('/comments')
    .done(function(data) {
      commentsReceived(data)
    })
    .fail(transferFailed);
  }

  /**
   * Save new command - send data to server
   */
  function createComment(event) {
    event.preventDefault();

    var data = {
      name: commentForm.find("input[name='name']").val(),
      email: commentForm.find("input[name='email']").val(),
      message: commentForm.find("textarea[name='message']").val()
    };

    // видалимо пробіли з початку та кінця рядка
    // також за допомогою регулярного виразу видалимо будь-які теги, якщо такі були внесені
    // тобто, якщо користувач введе "<b>Hi!</b> My name is Sara"
    // то ми видалимо <b> та </b>, щоб отримати чистий текст, без всяких html тегів
    data.message = data.message.trim().replace(/(<([^>]+)>)/ig, "");


    // валідація повідомлення
    // перевіряємо чи воно не пусте, якщо так - показуємо повідомлення помилки
    if (data.message == "") {
      showError("Please, don't leave message body empty!");
      return false;
    }

    $.ajax({
      url: '/comments',
      method: "post",
      contentType: "application/json",
      data: JSON.stringify(data)
    })
      .done(function(data) {
        commentSaved(data)
      })
      .fail(transferFailed);
  }

  /**
   * Comment was saved on server and we can add it
   */
  function commentSaved(data) {
    drawComment(data);
  }

  /**
   * Create comment dom node and add to list
   * @param data
   */
  function drawComment(data) {
    var commentElement = $("<article class='comment'><header>" + data.name +
      "</header><p>" + data.message +
      "</p><footer class='comment__tools'>" +
      "<button class='btn btn--circle js-remove'>&cross;</button></footer></article>");

    commentElement.attr("data-id", data.id);
    commentList.prepend(commentElement);
  }

  /**
   * All comments were received from server
   */
  function commentsReceived(comments) {
    comments.forEach(function (comment) {
      drawComment(comment);
    });
  }

  /**
   * Listen remove btn click and send DELETE request to server
   * @param event
   */
  function onRemoveBtnClick(event) {
    var comment = $(this).parents(".comment");

    $.ajax({
      method: "DELETE",
      url: "/comments/" + comment.attr("data-id")
    })
    .done(function () {
      removeComment(comment)
    })
      .fail(transferFailed);
  }

  /**
   * Remove comment from DOM
   * @param target
   */
  function removeComment(target) {
    target.remove();
  }

  /**
   * Error handler for all requests
   */
  function transferFailed() {
    showError("An error occurred while transferring the file.");
  }

  function showError(message) {
    alert(message);
  }
}
