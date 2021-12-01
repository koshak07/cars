import { TextField, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { commentContext } from "../contexts/CommentContext";
import { useNavigate } from "react-router";
import { authContext } from "../contexts/AuthContext";

const Comments = (props) => {
  const schema = yup.object({
    // commentator: yup
    //   .string()
    //   .min(2, "Минимальное количество символов 3")
    //   .max(30, "Максимальное количесиво символов 30")
    //   .required("Поле обязательна для заполнение"),
    comment: yup
      .string()
      .min(1, "Минимальное количество символов 3")
      .max(200, "Максимальное количесиво символов 30")
      .required("Поле обязательна для заполнение"),
  });

  const { addComment, getComments, allComments, deleteComment } =
    useContext(commentContext);

  const { user } = React.useContext(authContext);

  useEffect(() => {
    getComments();
  }, []);

  const commentId = props.productId;

  const handleSubmit = (newComment) => {
    let newobj = {
      ...newComment,
      userEmail: user.email,
      productId: commentId,
    };
    addComment(newobj);
  };

  return (
    <div className="comments">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          comment: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <div>
            <form className="new-comment" onSubmit={handleSubmit}>
              {/* <TextField
                style={{ width: "100%", marginTop: "20px" }}
                id="standard-basic"
                // label="Добавьте имя"
                placeholder="Напишите имя"
                variant="standard"
                name="commentator"
                value={values.commentator}
                error={!!errors.commentator && touched.commentator}
                helperText={touched.commentator ? errors.commentator : ""}
                onChange={handleChange}
              /> */}
              <TextField
                style={{ width: "100%", marginTop: "20px" }}
                id="standard-basic"
                // label="Добавить комментарии"
                placeholder="Напишите отзыв"
                variant="standard"
                name="comment"
                value={values.comment}
                error={!!errors.comment && touched.comment}
                helperText={touched.comment ? errors.comment : ""}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Добавить
              </Button>
            </form>
          </div>
        )}
      </Formik>

      <h2>Отзывы:</h2>
      {allComments ? (
        allComments.map((item) =>
          item.productId === commentId ? (
            <div className="comment">
              <div className="comment-container">
                <div className="commentator">
                  <h6>{item.userEmail}</h6>
                </div>
                <div className="commentt">
                  <p>{item.comment}</p>
                </div>
                {item.userEmail === user.email ? (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => deleteComment(item.id)}
                    style={{ marginBottom: "7px" }}
                  >
                    Удалить
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <></>
          )
        )
      ) : (
        <h2>Нет отзывов</h2>
      )}
    </div>
  );
};

export default Comments;
