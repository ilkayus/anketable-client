import { useState } from "react";
import InputWithLabel from "../utils/InputWithLabel";

const CreatePollForm = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [votesPerParticipant, setVotesPerParticipant] = useState(1);
  return (
    <div>
      <InputWithLabel
        label="Who is creating"
        value={name}
        setValue={setName}
        placeholder="John Doe"
      />
      <InputWithLabel
        label="Poll Topic"
        value={topic}
        setValue={setTopic}
        placeholder="Which comes first? Chicken or egg?"
      />
      <InputWithLabel
        label="Votes Per Participant"
        value={votesPerParticipant}
        setValue={setVotesPerParticipant}
        type="number"
      />
    </div>
  );
};

export default CreatePollForm;
