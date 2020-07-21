
const elements = {
    btnLike: document.getElementById('btn-like'),
    likesCount: document.querySelector('.likes-count'),
    btnDelete: document.querySelector('#btn-delete'),
    btnCommentToggle: document.querySelector('#btn-toggle-comment'),
    commentBox: document.getElementById('comment-box'),
    btnCommentToggleIcon: document.getElementById('btn-toggle-comment-icon')
}

elements.btnLike.addEventListener('click',likeHandler);
elements.btnDelete.addEventListener('click',deleteHandler);
elements.btnCommentToggle.addEventListener('click',btnCommentToggleHandler);

function likeHandler(e) {
    e.preventDefault()
    const imageId = elements.btnLike.getAttribute('data-id');
    fetch(`/images/${imageId}/like`,{method: 'POST'})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            elements.likesCount.innerHTML = res.likes;
        })
        .catch(err => console.log(err));
}

function deleteHandler(e) {
    e.preventDefault();
    const response = confirm('Are you sure?');
    if(response){
        const imageId = elements.btnDelete.getAttribute('data-id');
        fetch(`/images/${imageId}/delete`,{method: 'delete'})
            .then(res => res.json())
            .then(res => {
                if(res){
                    document.location = '../../';
                }
            })
            .catch(err => console.log(err))
    }
}

let display = false;
function btnCommentToggleHandler(e) {
    e.preventDefault();
    display = !display;
    if(display){
        elements.commentBox.style.display = 'block';
        elements.btnCommentToggleIcon.className = 'fa fa-angle-up'
    }else{
        elements.commentBox.style.display = 'none';
        elements.btnCommentToggleIcon.className = 'fa fa-angle-down'
    }
}