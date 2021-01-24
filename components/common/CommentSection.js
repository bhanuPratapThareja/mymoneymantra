import { useEffect, useState } from 'react';
import { addComment, blogLikeDislike, commentLikeDislike, getBlogComments } from '../../services/blogService'

const CommentSection = (props) => {
    console.log("blog id =", props.blogId)
    const { blogId, commentData } = props
    const [comment, setComment] = useState('')
    const { likesCount, dislikesCount, sharedCount } = commentData

    const postComment = (e) => {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            addComment(comment, blogId)
            setComment('')
        }

    }

    return (
        <div className="comment-section">
            <div className="comment-section-wrapper">
                <div className="options">
                    <div className="like-dislike-wrap">
                        <button onClick={() => blogLikeDislike('like', blogId)} className="like-dislike">
                            <img src='/assets/images/icons/like.svg' />
                            <h6 id="like-count">{likesCount}</h6>
                        </button>
                        <button onClick={() => blogLikeDislike('dislike', blogId)} className="like-dislike">
                            <img src='/assets/images/icons/dislike.svg' />
                            <h6 id="dislike-count">{dislikesCount}</h6>
                        </button>
                    </div>
                    <button className="share-blog">
                        <img src='/assets/images/icons/share.svg' />
                        <h6 id="share-count">{sharedCount}</h6>
                    </button>

                </div>



                <div className="comment-wrap">
                    <input id="user-comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} onKeyUp={postComment} name="comment" placeholder="Add a comment..." />
                    <div className="added-comments">
                        {
                            commentData.comments ? commentData.comments.map((comment, i) => (
                                <div key={i} className="user">
                                    <div className="image"></div>
                                    <div className="comment">
                                        <h5>{comment.userName}</h5>
                                        <h6>{comment.comment}</h6>
                                        <div className="like-dislike-click">
                                            <img onClick={() => commentLikeDislike('like', blogId, comment.commentId)} src='/assets/images/icons/like.svg' />
                                            <img onClick={() => commentLikeDislike('dislike', blogId, comment.commentId)} src='/assets/images/icons/dislike.svg' />
                                        </div>
                                        <span className="time">{comment.date}</span>
                                    </div>
                                </div>
                            )) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;