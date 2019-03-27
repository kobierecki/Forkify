export default class Likes {
    constructor(){
        this.likes = [];
    }
    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);

        // PERSIST DATA TO LOCAL STORAGE
        this.persistData();
        return like;
    }
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id == id);
        this.likes.splice(index, 1)

        // PERSIST DATA TO LOCAL STORAGE
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id == id) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }
    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        // RESTORE LIKES FROM localStorage
        if (storage) this.likes = storage;
    }
}