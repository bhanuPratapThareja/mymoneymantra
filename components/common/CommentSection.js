import axios from 'axios';
import { concat, slice } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getApiData } from '../../api/api';
import { getBlogComments } from '../../services/blogService'
import BlogMediaLinks from './BlogMediaLinks';

const CommentSection = (props) => {
    let limit = 3
    const [comment, setComment] = useState('')
    const [blogSentiment, setBlogSentiment] = useState('')
    // const [commentData, setCommentData] = useState([])
    const [comments, setComments] = useState([])
    const [share, setShare] = useState(false)
    const [dislikeCount, setDislikeCount] = useState(null)
    const [likeCount, setLikeCount] = useState(null)
    const [shareCount, setShareCount] = useState(null)
    const [loadMore, setLoadMore] = useState(limit < comments.length);
    const [list, setList] = useState(slice(comments, 0, limit))
    const [index, setIndex] = useState(limit);
    const { blogId } = props
    let defaultUserId = '101'

    useEffect(() => {
        const data = getBlogComments(props.blogId)
        data.then(res => {
            let newList = slice(res.comments, 0, limit)
            let newLoadMore = index < res.comments.length - 1
            setComments(res.comments)
            newList.forEach(c => {
                // getCommentSentiment(defaultUserId, c.commentId, newList)
                getSentimentOnLoadmore([], newList, c.commentId, defaultUserId, newLoadMore)
            })
            // setLoadMore(newLoadMore)
            getBlogSentiment(defaultUserId, props.blogId)
        }
        ).catch(err => console.log(err))
    }, [props.blogId])

    const handleCommentLikeDislikeStatus = async (userId, commentId) => {
        const { url } = getApiData('commentLikeDislike')
        try {
            const response = await axios.get(`${url}?customerId=${userId}&commentId=${commentId}`)
            let allComments = JSON.parse(JSON.stringify(list))
            let comment = allComments.find(c => c.commentId == commentId)
            let index = allComments.indexOf(comment)
            allComments[index].sentiment = response.data.sentiment
            setList(allComments)
        } catch (err) {
            console.log(err)
        }
    }

    const loadMoreCommnets = () => {
        const newIndex = index + limit;
        let slicedList = slice(comments, index, newIndex)
        const newLoadMore = newIndex < (comments.length - 1);
        slicedList.forEach(item => {
            getSentimentOnLoadmore(list, slicedList, item.commentId, defaultUserId, newLoadMore)
        })
    }

    const getSentimentOnLoadmore = async (list, slicedList, commentId, userId, loadMoreStatus) => {
        const { url } = getApiData('commentLikeDislike')
        try {
            const response = await axios.get(`${url}?customerId=${userId}&commentId=${commentId}`)
            slicedList.forEach(c => {
                if (c.commentId == commentId) {
                    c.sentiment = response.data.sentiment
                }
            })
            let newList = [...list, ...slicedList]
            const newIndex = index + limit;
            setIndex(newIndex);
            setLoadMore(loadMoreStatus);
            setList(newList)
        } catch (err) {
            console.log(err)
        }
    }

    // const getCommentSentiment = async (userId, commentId, data) => {
    //     const { url } = getApiData('commentLikeDislike')

    //     try {
    //         const response = await axios.get(`${url}?customerId=${userId}&commentId=${commentId}`)
    //         data.forEach(c => {
    //             if (c.commentId == commentId) {
    //                 c.sentiment = response.data.sentiment
    //             }
    //         })
    //         setCommentData(data)
    //         setComments(data.comments)
    //         setList(data)
    //         setLoadMore(true)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const getBlogSentiment = async (customerId, blogId) => {
        const { url } = getApiData('blogLikeDislike')
        try {
            const response = await axios.get(`${url}?blogId=${blogId}&customerId=${customerId}`)
            const data = await getBlogComments(blogId)
            setLikeCount(data.likesCount)
            setDislikeCount(data.dislikesCount)
            setShareCount(data.sharedCount)
            setBlogSentiment(response.data.sentiment)
        } catch (err) {
            console.log(err)
        }
    }

    const blogLikeDislike = (currentSentiment, blogId, likeStatus) => {
        const { url, body } = getApiData('blogLikeDislike')
        body.blogId = blogId
        body.customerId = defaultUserId
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

        axios.post(url, body).then(
            res => {
                // getCommentData(blogId)
                getBlogSentiment(defaultUserId, blogId)
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
        body.blogId = blogId
        body.customerId = defaultUserId
        body.commentId = commentId
        axios.post(url, body).then(
            res => {
                // getCommentData(blogId)
                handleCommentLikeDislikeStatus(defaultUserId, commentId)
            }
        ).catch(
            err => console.log(err)
        )
    }

    const postComment = (e, comment, blogId) => {
        if (e.keyCode == 13) {
            const { url, body } = getApiData('addComment')
            body.blogId = blogId
            body.customerId = defaultUserId
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

    const getDateToDisplay = (date) => {
        let newDate = new Date()
        let today = moment(newDate).format('YYYY-MM-DD')
        let yesterday = moment(newDate).subtract(1, 'day')
        if (moment(date).isSame(today)) {
            return 'Today'
        } else if (moment(date).isSame(yesterday.format('YYYY-MM-DD'))) {
            return 'Yesterday'
        } else {
            return date
        }
    }

    const getCommentData = (blogId) => {
        data.then(res => {
            setComments(res.comments)
            let newList = slice(res.comments, 0, limit)
            let newLoadMore = index < res.comments.length - 1
            newList.forEach(c => {
                getSentimentOnLoadmore([], newList, c.commentId, defaultUserId, newLoadMore)
                // getCommentSentiment(defaultUserId, c.commentId, newList)
            })
            getBlogSentiment(defaultUserId, props.blogId)
        }).catch(err => console.log("post comment err", err))
    }

    const shareBlog = async (openPopUp) => {
        if (openPopUp) {
            setShare(true)
            const { url, body } = getApiData('shareBlog')
            body.blogId = props.blogId
            body.customerId = defaultUserId
            body.shared = 'yes'
            try {
                const response = await axios.post(url, body)
                getBlogSentiment(defaultUserId, props.blogId)
            } catch (err) {
                console.log(err)
            }
        } else {
            setShare(false)
        }
    }

    return (
        <div className="comment-section">
            {share ? <BlogMediaLinks blogData={props.blogData} blogShareButton={true} openBlogShare={shareBlog} url={props.url} /> : null}
            <div className="comment-section-wrapper">
                <div className="options">
                    <div className="like-dislike-wrap">
                        <button onClick={() => blogLikeDislike(blogSentiment, blogId, true)} className="like-dislike">
                            <img src={`/assets/images/icons/${blogSentiment == 'LIKE' ? 'like_active' : 'like'}.svg`} />
                            <h6 id="like-count">{likeCount ? likeCount : 0}</h6>
                        </button>
                        <button onClick={() => blogLikeDislike(blogSentiment, blogId, false)} className="like-dislike">
                            <img src={`/assets/images/icons/${blogSentiment == 'DISLIKE' ? 'dislike_active' : 'dislike'}.svg`} />
                            <h6 id="dislike-count">{dislikeCount ? dislikeCount : 0}</h6>
                        </button>
                    </div>
                    <button onClick={() => shareBlog(true)} className="share-blog">
                        <img src='/assets/images/icons/share.svg' />
                        <h6 id="share-count">{shareCount ? shareCount : 0}</h6>
                    </button>
                </div>
                <div className="comment-wrap">
                    <input id="user-comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} onKeyUp={(e) => postComment(e, comment, blogId)} name="comment" placeholder="Add a comment..." />
                    <div className="added-comments">
                        {
                            list ? list.map((comment, i) => {
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
                                            <span className="time">{getDateToDisplay(comment.date)}</span>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                    {loadMore && <button onClick={loadMoreCommnets} className="cstm-load-btn"> Load More </button>}
                </div>
            </div>
        </div>
    );
}

export default CommentSection;