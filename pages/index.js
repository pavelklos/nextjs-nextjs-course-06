import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    console.log("SUBMIT", enteredEmail, enteredFeedback);

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    // { email: 'test@test.com', text: 'Some feedback text' }
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      // .then((data) => console.log(data));
      .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <a href='/feedback' target='_blank'>
        Feedback Page : getStaticProps()
      </a>
      <br />
      <a href='/api/feedback' target='_blank'>
        API : Feedback : GET
      </a>
      <hr />
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <hr />
      <ul>
        {feedbackItems.map((item) => {
          return (
            <li key={item.id}>
              {item.email} : {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
