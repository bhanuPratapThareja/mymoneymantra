import { useEffect, useState } from 'react';
import { addComment, blogLikeDislike, commentLikeDislike, getBlogComments } from '../../services/blogService'

const CommentSection = (props) => {
    console.log("blog id =", props.blogId)
    const { blogId } = props
    const [comment, setComment] = useState('')
    // useEffect(() => {
    //     getBlogComments("3")
    // }, [])
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
                            <h6 id="like-count">250k</h6>
                        </button>
                        <button onClick={() => blogLikeDislike('dislike', blogId)} className="like-dislike">
                            <img src='/assets/images/icons/dislike.svg' />
                            <h6 id="dislike-count">250k</h6>
                        </button>
                    </div>
                    <button className="share-blog">
                        <img src='/assets/images/icons/share.svg' />
                        <h6 id="share-count">600</h6>
                    </button>

                </div>

                <div className="comment-wrap">
                    <input id="user-comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} onKeyUp={postComment} name="comment" placeholder="Add a comment..." />
                    <div className="added-comments">
                        <div className="user">
                            <div className="image"></div>
                            <div className="comment">
                                <h5>Amrita Singh</h5>
                                <h6>All Clear! I will try. You can also try other elements</h6>
                                <div className="like-dislike-click">
                                    <img src='/assets/images/icons/like.svg' />
                                    <img src='/assets/images/icons/dislike.svg' />
                                </div>
                                <span className="time">Today</span>
                            </div>
                        </div>
                        <div className="user">
                            <div className="image"></div>
                            <div className="comment">
                                <h5>Rahul Sharma</h5>
                                <h6>All Clear! I will try. You can also try other elements</h6>
                                <div className="like-dislike-click">
                                    <img src='/assets/images/icons/like.svg' />
                                    <img src='/assets/images/icons/dislike.svg' />
                                </div>
                                <span className="time">Yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;