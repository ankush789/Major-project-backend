//method to submit the form data for new post using AJAX
let createPost = function(){
    // Fetching form using jquery
    let newPostForm = $('#new-post-form');

    //Prevent the normal form submission and make it submit using ajax-jquery
    newPostForm.submit(function(e){
        e.preventDefault();
        //Creating Ajax Request
        $.ajax({
            type: 'post', //POST REQUEST
            url: '/posts/create-post', //action where the request is to be sent
            //This converts form data to Json Object
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDom(data.data.post);
                console.log(newPost);
                $('#post > ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost));


                  // call the create comment class
                   new PostComments(data.data.post._id);

                 new Noty({
                        theme: 'relax',
                        text: "Post Published",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
            }, error: function(error){
                console.log(error.responseText);
            }
        })
    })
} 

//Method to create a post in DOM
let newPostDom = function(post){
    console.log(post);
    return $(`<li id="post-${post._id }">
                <p>
                    ${post.content}                    
                    <a class="delete-post-button" href="posts/delete/${post._id}">X</a>
                    <br>
                    <small>-- ${post.user.name} </small>
                </p>
                <div class="post-comments">
                    <form action="/comments/create-comment" method="post">
                        <input type="text" name="content" id="comment-field" placeholder="Type here to add comment...">
                        <!-- Assigning Post id to the comment -->
                        <input type="hidden" name="post" value="${ post._id }">
                        <input type="submit" value="Add Comment">
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">

                        </ul>
                    </div>
                </div>
                <hr>
            </li>`);
            
}

//Method to delete a post from DOM
let deletePost = function(deleteLink){
    console.log(deleteLink);
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}
 // loop over all the existing posts on the page (when the window loads for the first time) and 
    // call the delete post method on delete link of each, also add AJAX (using the class we've created) 
    // to the delete button of each
    let convertPostsToAjax = function(){
        $('#post>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
