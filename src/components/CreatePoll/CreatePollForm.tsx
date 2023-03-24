import { useState } from "react";
import { PageLinks, LinkButtonTitles } from "../utils/constants";
import InputWithLabel from "../utils/InputWithLabel";
import LinkButton from "../utils/LinkButton";

const CreatePollForm = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [votesPerParticipant, setVotesPerParticipant] = useState(1);
  const isNameValid = name.length > 0 && name.length < 36;
  const isTopicValid = topic.length > 0 && topic.length < 36;
  const isVotesValid = votesPerParticipant > 0 && votesPerParticipant < 6;
  const isCreateable = !(isNameValid && isTopicValid && isVotesValid);
  return (
    <div className="flex flex-col w-full justify-around items-stretch h-full mx-auto">
      <div>
        <InputWithLabel
          label="Who is creating"
          value={name}
          setValue={setName}
          placeholder="John Doe"
          invalid={!isNameValid}
        />
        <InputWithLabel
          label="Poll Topic"
          value={topic}
          setValue={setTopic}
          placeholder="Which comes first? Chicken or egg?"
          invalid={!isTopicValid}
        />
        <InputWithLabel
          label="Votes Per Participant"
          value={votesPerParticipant}
          setValue={setVotesPerParticipant}
          type="number"
          invalid={!isVotesValid}
        />
      </div>
      <div className="flex flex-col">
        <LinkButton
          label={LinkButtonTitles.CREATE_BUTTON}
          link={PageLinks.HOMEPAGE}
          color="orange"
          disabled={isCreateable}
        />
        <LinkButton
          label={LinkButtonTitles.START_OVER}
          link={PageLinks.HOMEPAGE}
          color="purple"
        />
      </div>
    </div>
  );
};

export default CreatePollForm;
