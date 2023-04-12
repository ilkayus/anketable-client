import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLinks, LinkButtonTitles, InputLabels } from '../utils/constants';
import InputWithLabel from '../utils/InputWithLabel';
import LinkButton from '../utils/LinkButton';
import { createPoll, selectPollState } from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';

const CreatePollForm = () => {
  const dispatch = useAppDispatch();
  const { l } = useAppSelector(selectPollState);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [votesPerVoter, setVotesPerVoter] = useState(1);
  const isNameValid = name.length > 0 && name.length < 36;
  const isTopicValid = topic.length > 0 && topic.length < 60;
  const isVotesValid = votesPerVoter > 0 && votesPerVoter < 6;
  const isCreateable = !(isNameValid && isTopicValid && isVotesValid);

  const handleCreateClick = () => {
    void dispatch(
      createPoll({
        name,
        topic,
        votesPerVoter,
      }),
    );
    navigate(`/${PageLinks.WAITING_ROOM}`, { state: 'CREATE' });
  };

  return (
    <div className="flex flex-col w-full justify-around gap-[10vh] items-stretch h-full mx-auto">
      <div>
        <InputWithLabel
          label={InputLabels.ROOM_OWNER[l]}
          value={name}
          setValue={setName}
          placeholder={InputLabels.ROOM_OWNER.placeholder[l]}
          invalid={!isNameValid}
        />
        <InputWithLabel
          label={InputLabels.POLL_TOPIC[l]}
          value={topic}
          setValue={setTopic}
          placeholder={InputLabels.POLL_TOPIC.placeholder[l]}
          invalid={!isTopicValid}
        />
        <InputWithLabel
          label={InputLabels.VOTES_PER_PARTICIPANT[l]}
          value={votesPerVoter}
          setValue={setVotesPerVoter}
          type="number"
          invalid={!isVotesValid}
        />
      </div>
      <div className="flex flex-col">
        <LinkButton
          label={LinkButtonTitles.CREATE_BUTTON[l]}
          link={PageLinks.HOMEPAGE}
          color="orange"
          disabled={isCreateable}
          handleClick={handleCreateClick}
        />
        <LinkButton
          label={LinkButtonTitles.START_OVER[l]}
          link={PageLinks.HOMEPAGE}
          color="purple"
        />
      </div>
    </div>
  );
};

export default CreatePollForm;
