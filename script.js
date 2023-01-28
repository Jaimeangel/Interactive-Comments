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
            "parentId":2,
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
            "parentId":2,
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

    Counter(e,id,type,parent_id){
      const counter=e.target.parentElement.querySelector('.counter');

      if(type==='replies'){
        this.data.comments.every(element=>{
          if(element.id===parent_id){
            element.replies.every(reply=>{
              if(reply.id===id){
                if(e.target.innerText==='+'){
                  reply.score=reply.score+1
                  counter.innerText=`${reply.score}`
                }else if(e.target.innerText==='-'){
                  if(reply.score>0){
                    reply.score=reply.score-1
                    counter.innerText=`${reply.score}`
                  }
                }
                return false
              }
              return true;
            })
            return false;
          }
          return true;
        })
      }else{
        this.data.comments.every(element=>{
          if(element.id===id){
            if(e.target.innerText==='+'){
              element.score=element.score+1
              counter.innerText=`${element.score}`
            }else if(e.target.innerText==='-'){
              if(element.score>0){
                element.score=element.score-1
                counter.innerText=`${element.score}`
              }
            }
            return false
          }
          return true;
        })
      }
    }

    ReplyComment(e,id,type,parent_id){
      let comments;
      if(type==='replies'){
        comments=document.querySelectorAll(`[data-id='${parent_id}'] .reply_content .content`)
      }else{
        comments=document.querySelectorAll('.wrap')
      }
      for (let index = 0; index < comments.length; index++) {
        const element = comments[index];
        console.log(element)
        console.log(element.firstChild)
        if(parseInt(element.dataset.id)===id){
          const content=document.createElement('div')
          content.classList.add('content')

          const comment=document.createElement('div')
          comment.classList.add('textReply')
          const comment_text=document.createElement('textarea')
          comment.append(comment_text)

          const user_img=document.createElement('div')
          user_img.classList.add('currentUser')
          const img_user=document.createElement('img')
          img_user.setAttribute('src',`${this.data.currentUser.image.png}`)
          user_img.append(img_user)

          const btn_reply=document.createElement('div')
          btn_reply.classList.add('btnReply')
          const reply_btn=document.createElement('button')
          reply_btn.textContent=`REPLY`
          btn_reply.append(reply_btn)

          content.append(comment,user_img,btn_reply)
          if(type==='replies'){
            element.insertAdjacentElement('afterend',content)
            break
          }
          element.firstChild.insertAdjacentElement('afterend',content)
          break
        }
      }
    }

    CommentComponent(element,type){
      const content=document.createElement('div')
      content.classList.add('content')
      content.setAttribute('data-type',`${type}`)
      content.setAttribute('data-id',`${element.id}`)
      
      /* Comment */
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
      /* Count */
      const count=document.createElement('div')
      count.classList.add('count')
      const btn_plus=document.createElement('button')
      btn_plus.innerHTML=`+`

      btn_plus.onclick=(event)=>this.Counter(event,element.id,type,element.parentId)

      const count_span=document.createElement('span')
      count_span.classList.add('counter')
      count_span.innerHTML=`${element.score}`

      const btn_minus=document.createElement('button')
      btn_minus.innerHTML=`-`

      btn_minus.onclick=(event)=>this.Counter(event,element.id,type,element.parentId)

      count.append(btn_plus,count_span,btn_minus)

      /* Reply */
      const reply=document.createElement('div')
      reply.classList.add('reply')

      const btn_reply=document.createElement('button')
      btn_reply.onclick=(e)=>this.ReplyComment(e,element.id,type,element.parentId)

      const img_reply=document.createElement('img')
      img_reply.setAttribute('src','../images/icon-reply.svg')
      const text_reply=document.createElement('span')
      text_reply.textContent=`Reply`
      btn_reply.append(img_reply,text_reply)
      reply.append(btn_reply)

      content.append(comment,count,reply)
      return content;
    }

    WrapCommentSection(element){
      const wrapComment=document.createElement('div')
        wrapComment.classList.add('wrap')
        wrapComment.setAttribute('data-id',`${element.id}`)

        const comment_componenet=this.CommentComponent(element,'comments')
        wrapComment.append(comment_componenet)

        if(element.replies.length!=0){
          const wrap_reply=document.createElement('div')
          wrap_reply.classList.add('reply_content')
  
          element.replies?.forEach(element=>{
            const reply_componenet=this.CommentComponent(element,'replies')
            wrap_reply.append(reply_componenet)
          })
          wrapComment.append(wrap_reply)
        }


        this.nodo.append(wrapComment)
    }

    MainComment(){
      this.data.comments.forEach(element=>{
        this.WrapCommentSection(element)
      });
    }
}

const mainNodo=document.querySelector('.app')

const InteractiveComments= new Comment({
    data:info,
    mainNodo:mainNodo
})

InteractiveComments.MainComment()