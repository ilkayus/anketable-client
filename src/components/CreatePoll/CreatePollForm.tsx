import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLinks, LinkButtonTitles } from '../utils/constants';
import InputWithLabel from '../utils/InputWithLabel';
import LinkButton from '../utils/LinkButton';
import * as API from '../../api';

const CreatePollForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [votesPerParticipant, setVotesPerParticipant] = useState(1);
  const isNameValid = name.length > 0 && name.length < 36;
  const isTopicValid = topic.length > 0 && topic.length < 36;
  const isVotesValid = votesPerParticipant > 0 && votesPerParticipant < 6;
  const isCreateable = !(isNameValid && isTopicValid && isVotesValid);

  const handleCreateClick = async () => {
    const pollData = await API.createPoll({
      name,
      topic,
      votesPerVoter: votesPerParticipant,
    });
    navigate(`/${PageLinks.WAITING_ROOM}`, { state: pollData });
  };

  return (
    <div className="flex flex-col w-full justify-around gap-[10vh] items-stretch h-full mx-auto">
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
          handleClick={handleCreateClick}
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
