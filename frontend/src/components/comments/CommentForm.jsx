import { useState } from "react";
import "./comments.css";

const CommentForm = (props) => {
  const [text, setText] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setWaiting(true);
    await props.handleSubmit(text, props.commentid);
    setWaiting(false);
    setText("");
    props.handleClose(false);
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    props.handleClose(false);
  };

  return (
    <>
      <div className="comment-form-container mt-2">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="posts"
            role="tabpanel"
            aria-labelledby="posts-tab"
          >
            <div className="form-group">
              <textarea
                className="form-control"
                id="message"
                rows="3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What are you thinking?"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="btn-toolbar justify-content-between">
          <div className="btn-group">
            <button
              className="btn btn-primary"
              disabled={text.length === 0 || waiting}
              onClick={handleCreateComment}
            >
              {waiting && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {waiting ? props.submitLabel + "ing..." : props.submitLabel}
            </button>
            {props.hasCancelButton && (
              <button
                type="button"
                className="btn btn-danger"
                disabled={waiting}
                onClick={handleCloseForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
