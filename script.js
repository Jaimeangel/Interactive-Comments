let info={
    "currentUser": {
      "image": { 
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "./images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "./images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
}

class Comment{
    constructor({
        data,
        mainNodo
    }){
        this.data=data;
        this.nodo=mainNodo;
    }

    MainComment(){
        this.data.comments.forEach(element => {
            const content=document.createElement('div')
            content.classList.add('content')

            const comment=document.createElement('div')
            comment.classList.add('comment')
            const user_photo=document.createElement('img')
            user_photo.setAttribute('src',`${element.user.image.webp}`)
            const user_name=document.createElement('span')
            user_name.innerHTML=`${element.user.username}`
            user_name.setAttribute('id','user_name')
            const user_date=document.createElement('span')
            user_date.innerHTML=`${element.createdAt}`
            const user_comment=document.createElement('p')
            user_comment.textContent=`${element.content}`
            comment.append(user_photo,user_name,user_date,user_comment)
            
            const count=document.createElement('div')
            count.classList.add('count')
            const btn_plus=document.createElement('button')
            btn_plus.innerHTML=`+`
            const count_span=document.createElement('span')
            count_span.innerHTML=`${element.score}`
            const btn_minus=document.createElement('button')
            btn_minus.innerHTML=`-`
            count.append(btn_plus,count_span,btn_minus)

            const reply=document.createElement('div')
            reply.classList.add('reply')
            const btn_reply=document.createElement('button')
            const img_reply=document.createElement('img')
            img_reply.setAttribute('src','../images/icon-reply.svg')
            const text_reply=document.createElement('span')
            text_reply.textContent=`Reply`
            btn_reply.append(img_reply,text_reply)
            reply.append(btn_reply)

            content.append(comment,count,reply)
            this.nodo.append(content)
        });
    }
}

const mainNodo=document.querySelector('.app')

const InteractiveComments= new Comment({
    data:info,
    mainNodo:mainNodo
})

InteractiveComments.MainComment()