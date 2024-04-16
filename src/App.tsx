import { useState } from "react";
import { TimeExpiredScreen } from "@/components/timeExpiredScreen";
import { Header } from "./components/header/header";
import { Form } from "@/components/form";
import { test } from "@/api/questions";

import styles from "./App.module.css";

function App() {
  const [completed, setCompleted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const toggleExpired = () => {
    setTimeExpired((prev) => !prev);
  };

  if (timeExpired) return <TimeExpiredScreen />;

  return (
    <main className={styles.main}>
      {!completed && <Header onComplete={toggleExpired} test={test} />}
      <Form
        completed={completed}
        setCompleted={setCompleted}
        questions={test.questions}
      />
    </main>
  );
}

export default App;
