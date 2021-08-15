import React, { useState, useRef } from "react";

const Comment = () => {
    const [commentList, SetCommentList] = useState([]);
    const [newComment, SetNewComment] = useState("");
    const [isButtonDisabled, SetIsButtonDisabled] = useState(true);
    const textareaEl = useRef(null);

    const addCommentHandler = () => {
        const commentLists = [...commentList, { comment: newComment }];
        SetCommentList(commentLists);
        textareaEl.current.value = "";
        SetIsButtonDisabled(true);
    };

    const commentChangeHandler = (event) => {
        const newComment = event.target.value;
        SetNewComment(newComment);
        if (newComment.length > 0) {
            SetIsButtonDisabled(false);
        }
    };

    const removeCommentHandler = (id) => {
        const updateComments = [...commentList];
        updateComments.splice(id, 1);
        SetCommentList(updateComments);
    };

    const CommentCard = () => {
        return (
            <div className="comments-card">
                {commentList.length > 0 ? (
                    commentList.map((comment, index) => {
                        return (
                            <div
                                className="comments-card_item"
                                key={index}
                                onClick={() => removeCommentHandler(index)}
                            >
                                {comment.comment}
                            </div>
                        );
                    })
                ) : (
                    <div className="comments-card_empty">No Comments</div>
                )}
            </div>
        );
    };

    return (
        <div className="comments">
            <div className="comments-controls">
                <label className="comments-controls_label" htmlFor="comment">
                    Enter Comment:
                </label>
                <textarea
                    className="comments-controls_input"
                    ref={textareaEl}
                    id="comment"
                    name="comment"
                    onChange={commentChangeHandler}
                ></textarea>
                <button
                    className="comments-controls_button"
                    disabled={isButtonDisabled}
                    onClick={addCommentHandler}
                >
                    Add Comment
                </button>
            </div>
            <CommentCard />
        </div>
    );
};

export default Comment;
