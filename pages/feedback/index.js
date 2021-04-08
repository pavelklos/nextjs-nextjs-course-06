// rfce
import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    // console.log(id);
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && (
        <div>
          <p>{feedbackData.id}</p>
          <p>{feedbackData.email}</p>
          <p>{feedbackData.text}</p>
        </div>
      )}
      <hr />
      <ul>
        {props.feedbackItems.map((item) => {
          return (
            <li key={item.id}>
              {item.email} : {item.text}{" "}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
