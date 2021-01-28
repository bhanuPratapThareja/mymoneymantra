import axios from 'axios';
import { useEffect, useState } from 'react';
import { getApiData } from '../../api/api';
import { getBlogComments } from '../../services/blogService'

const CommentSection = (props) => {
    console.log("blog id =", props.blogId)
    const { blogId } = props
    const [comment, setComment] = useState('')
    let [commentData, setCommentData] = useState([])

    useEffect(() => {
        const data = getBlogComments(props.blogId)
        data.then(res => (
            setCommentData(res))
        ).catch(err => console.log(err))
    }, [props.blogId])

    const getCommentSentiment = async (userId, commentId) => {
        let result = {}
        const { url } = getApiData('commentLikeDislike')
        let data = JSON.parse(JSON.stringify(commentData))
        try {
            const response = await axios.get(`${url}?customerId=${userId}&commentId=${commentId}`)
            data.comments.forEach(c => {
                if (c.commentId == commentId) {
                    c.sentiment = response.data.sentiment
                    console.log("sentiment captured")
                }
            })
            // result = response.data
            // return result
            setCommentData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const blogLikeDislike = (sentiment, blogId) => {
        const { url, body } = getApiData('blogLikeDislike')
        body.sentiment = sentiment
        body.blogId = blogId
        body.customerId = '101'
        axios.post(url, body).then(
            res => {
                getCommentData(blogId)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }
    const commentLikeDislike = (sentiment, blogId, commentId) => {
        const { url, body } = getApiData('commentLikeDislike')
        body.sentiment = sentiment
        body.blogId = blogId
        body.customerId = '101'
        body.commentId = commentId
        axios.post(url, body).then(
            res => {
                getCommentData(blogId)
            }
        ).catch(
            err => console.log(err)
        )
    }

    const postComment = (e, comment, blogId) => {
        if (e.keyCode == 13) {
            const { url, body } = getApiData('addComment')
            body.blogId = blogId
            body.customerId = '101'
            body.comment = comment
            axios.post(url, body).then(
                response => {
                    console.log("res of add comment", response)
                    getCommentData(blogId)
                    setComment('')
                }
            ).catch(
                err => console.log(err)
            )
        }

    }

    const getCommentData = (blogId) => {
        const data = getBlogComments(blogId)
        data.then(res => (setCommentData(res))).catch(err => console.log("post comment err", err))
    }

    return (
        <div className="comment-section">
            <div className="comment-section-wrapper">
                <div className="options">
                    <div className="like-dislike-wrap">
                        <button onClick={() => blogLikeDislike('like', blogId)} className="like-dislike">
                            <img src='/assets/images/icons/like.svg' />
                            <h6 id="like-count">{commentData.likesCount ? commentData.likesCount : 0}</h6>
                        </button>
                        <button onClick={() => blogLikeDislike('dislike', blogId)} className="like-dislike">
                            <img src='/assets/images/icons/dislike.svg' />
                            <h6 id="dislike-count">{commentData.dislikesCount ? commentData.dislikesCount : 0}</h6>
                        </button>
                    </div>
                    <button className="share-blog">
                        <img src='/assets/images/icons/share.svg' />
                        <h6 id="share-count">{commentData.sharedCount ? commentData.sharedCount : 0}</h6>
                    </button>

                </div>



                <div className="comment-wrap">
                    <input id="user-comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} onKeyUp={(e) => postComment(e, comment, blogId)} name="comment" placeholder="Add a comment..." />
                    <div className="added-comments">
                        {
                            commentData.comments ? commentData.comments.map((comment, i) => {
                                // getCommentSentiment('101', comment.commentId)
                                return (
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
                                )
                            }) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;