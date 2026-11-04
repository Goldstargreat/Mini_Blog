import React, { useState } from "react";
import styles from "./CommentListItem.module.css";
// import styled from "styled-components";

// const Wrapper = styled.div`
//     width: calc(100% - 32px);
//     padding: 8px 16px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     border: 1px solid grey;
//     border-radius: 8px;
//     cursor: pointer;
//     background: white;
//     :hover {
//         background: lightgrey;
//     }
// `;

// const ContentText = styled.p`
//     font-size: 16px;
//     white-space: pre-wrap;
// `;

function CommentListItem(props) {
    const { comment, onUpdate, onDelete } = props;

    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(comment.content);
    const [saving, setSaving] = useState(false);

    const startEdit = () => {
        setDraft(comment.content);
        setEditing(true);
    };

    const handleSave = async () => {
        if (!draft.trim()) {
            alert('댓글 내용을 입력해 주세요.');
            return;
        }
        setSaving(true);
        const ok = await onUpdate(comment.id, draft);
        setSaving(false);
        if (ok) {
            setEditing(false);
        }
    };

    // 수정 모드: 입력칸 + 저장/취소 버튼
    if (editing) {
        return (
            <div className={styles.wrapper}>
                <textarea
                    className={styles.editInput}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    autoFocus
                />
                <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={handleSave} disabled={saving}>
                        {saving ? '저장 중...' : '저장'}
                    </button>
                    <button className={styles.actionButton} onClick={() => setEditing(false)} disabled={saving}>
                        취소
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.contentText}>{comment.content}</p>
            <div className={styles.actions}>
                {onUpdate && (
                    <button className={styles.actionButton} onClick={startEdit}>
                        수정
                    </button>
                )}
                {onDelete && (
                    <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onDelete(comment.id)}
                    >
                        삭제
                    </button>
                )}
            </div>
        </div>
    );
}

export default CommentListItem;
