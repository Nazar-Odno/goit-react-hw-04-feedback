import { useState } from 'react';

import Container from './Container/Container';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const handleFeedbackName = currentFeedback => {

    switch (currentFeedback) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      
      default:
        return;
    };
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100) || 0;
  };
  
  const total = countTotalFeedback();
  const percent = countPositiveFeedbackPercentage();

  return (
      <Container>

        <Section title={"Please leave feedback"}>
          <FeedbackOptions
            options={options}
            onFeedbackName={handleFeedbackName}
          />
        </Section>

        <Section title={"Statistics"}>
          {
            total
            ?
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              totalFeedback={total}
              positiveFeedback={percent}
            />
            :
            <Notification message={"There is no feedback"} />
          }
        </Section>

      </Container>
    )
};
