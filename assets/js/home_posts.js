//method to submit the form data for new post using AJAX
let createPost = function(){
    let newPostForm = $('#new-post-form');

    //Prevent the normal form submission and make it submit using ajax-jquery
    newPostForm.submit(function(e){
        e.preventDefault();
        //Creating Ajax Request
        $.ajax({
            type: 'post',
            url: '/posts/create-post',
            //This converts form data to Json Object
            data: newPostForm.serialize(),
            success: function(data){
                console.log(data);
            }, error: function(error){
                console.log(error.responseText);
            }
        })
    })
} 

//Method to create a post in


createPost();