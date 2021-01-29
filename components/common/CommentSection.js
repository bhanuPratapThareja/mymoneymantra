import axios from 'axios';
import { useEffect, useState } from 'react';
import { getApiData } from '../../api/api';
import { getBlogComments } from '../../services/blogService'

const CommentSection = (props) => {
    console.log("blog id =", props.blogId)
    const { blogId } = props
    const [comment, setComment] = useState('')
    const [blogSentiment, setBlogSentiment] = useState('')
    const [commentData, setCommentData] = useState([])

    useEffect(() => {
        const data = getBlogComments(props.blogId)
        data.then(res => {
            // setCommentData(res)
            res.comments.forEach(c => {
                getCommentSentiment("101", c.commentId, res)
            })
            getBlogSentiment('101', props.blogId)
        }
        ).catch(err => console.log(err))
    }, [props.blogId])

    const getCommentSentiment = async (userId, commentId, data) => {
        const { url } = getApiData('commentLikeDislike')

        try {
            const response = await axios.get(`${url}?customerId=${userId}&commentId=${commentId}`)
            data.comments.forEach(c => {
                if (c.commentId == commentId) {
                    c.sentiment = response.data.sentiment
                }
            })
            setCommentData(data)
        } catch (err) {
            console.log(err)
        }
    }
    const getBlogSentiment = async (customerId, blogId) => {
        const { url } = getApiData('blogLikeDislike')
        let data = JSON.parse(JSON.stringify(commentData))
        try {
            const response = await axios.get(`${url}?blogId=${blogId}&customerId=${customerId}`)
            // console.log(response)
            // data.sentiment = response.data.sentiment
            setBlogSentiment(response.data.sentiment)
        } catch (err) {
            console.log(err)
        }
    }

    const blogLikeDislike = (currentSentiment, blogId, likeStatus) => {
        const { url, body } = getApiData('blogLikeDislike')
        body.blogId = blogId
        body.customerId = '101'
        if (likeStatus) {
            if (currentSentiment == "DISLIKE") {
                return
            }
            if (currentSentiment == "" || currentSentiment == null) {
                body.sentiment = "like"
            }
            if (currentSentiment == "LIKE") {
                body.sentiment = ""
            }
        } else {
            if (currentSentiment == "LIKE") {
                return
            }
            if (currentSentiment == "" || currentSentiment == null) {
                body.sentiment = "dislike"
            }
            if (currentSentiment == "DISLIKE") {
                body.sentiment = ""
            }
        }
        // body.sentiment = sentiment

        console.log(currentSentiment, likeStatus, body)
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
    const commentLikeDislike = (currentSentiment, blogId, commentId, likeStatus) => {
        const { url, body } = getApiData('commentLikeDislike')
        if (likeStatus) {
            if (currentSentiment == "DISLIKE") {
                return
            }
            if (currentSentiment == "" || currentSentiment == null) {
                body.sentiment = "like"
            }
        } else {
            if (currentSentiment == "LIKE") {
                return
            }
            if (currentSentiment == "" || currentSentiment == null) {
                body.sentiment = "dislike"
            }
            if (currentSentiment = "DISLIKE") {
                body.sentiment = ""
            }
        }
        body.blogId = blogId
        body.customerId = '101'
        body.commentId = commentId
        // console.log(likeStatus, currentSentiment, body)
        axios.post(url, body).then(
            res => {
                getCommentData(blogId)
            }
        ).catch(
            err => console.log(err)
        )
    }

    const getClassOfSentimentButtons = (currentSentiment) => {

    }

    const postComment = (e, comment, blogId) => {
        if (e.keyCode == 13) {
            const { url, body } = getApiData('addComment')
            body.blogId = blogId
            body.customerId = '101'
            body.comment = comment
            axios.post(url, body).then(
                response => {
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
        data.then(res => {
            res.comments.forEach(c => {
                getCommentSentiment("101", c.commentId, res)
            })
            getBlogSentiment('101', props.blogId)
        }).catch(err => console.log("post comment err", err))
    }

    return (
        <div className="comment-section">
            <div className="comment-section-wrapper">
                <div className="options">
                    <div className="like-dislike-wrap">
                        <button onClick={() => blogLikeDislike(blogSentiment, blogId, true)} className="like-dislike">
                            <img src={`/assets/images/icons/${blogSentiment == 'LIKE' ? 'like_active' : 'like'}.svg`} />
                            <h6 id="like-count">{commentData.likesCount ? commentData.likesCount : 0}</h6>
                        </button>
                        <button onClick={() => blogLikeDislike(blogSentiment, blogId, false)} className="like-dislike">
                            <img src={`/assets/images/icons/${blogSentiment == 'DISLIKE' ? 'dislike_active' : 'dislike'}.svg`} />
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
                                return (
                                    <div key={i} className="user">
                                        <div className="image"></div>
                                        <div className="comment">
                                            <h5>{comment.userName}</h5>
                                            <h6>{comment.comment}</h6>
                                            <div className="like-dislike-click">
                                                <img onClick={() => commentLikeDislike(comment.sentiment, blogId, comment.commentId, true)} src={`/assets/images/icons/${comment.sentiment == 'LIKE' ? 'like_active' : 'like'}.svg`} />
                                                <img onClick={() => commentLikeDislike(comment.sentiment, blogId, comment.commentId, false)} src={`/assets/images/icons/${comment.sentiment == 'DISLIKE' ? 'dislike_active' : 'dislike'}.svg`} />
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