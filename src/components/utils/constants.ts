export const LinkButtonTitles = {
  CREATE_POLL: {
    en: 'Create New Poll!',
    tr: 'Yeni Anket Oluştur!',
  },
  JOIN_POLL: {
    en: 'Join Existing Poll!',
    tr: 'Varolan Ankete Katıl!',
  },
  START_OVER: {
    en: 'Start Over',
    tr: 'Başa Dön',
  },
  CREATE_BUTTON: {
    en: 'Create',
    tr: 'Oluştur',
  },
  JOIN_BUTTON: {
    en: 'Join',
    tr: 'Katıl',
  },
  GOTO_LAST_BUTTON: {
    en: 'Go To Last Poll',
    tr: 'Son Ankete Git',
  },
  START_VOTING: {
    en: 'Start Voting',
    tr: 'Oylamayı Başlat',
  },
  LEAVE_POLL: {
    en: 'Leave Poll',
    tr: 'Anketten Ayrıl',
  },
  CANCEL_POLL: {
    en: 'Cancel Poll',
    tr: 'Anketi İptal Et',
  },
  SUBMIT_VOTES: {
    en: 'Submit Votes',
    tr: 'Gönder',
  },
  END_POLL: {
    en: 'End Poll',
    tr: 'Anketi Bitir',
  },
  NOMINATE: {
    en: 'Nominate',
    tr: 'Aday Göster',
  },
} as const;

export const InputLabels = {
  ROOM_OWNER: {
    en: 'Who is creating',
    tr: 'Anket Sahibi',
    placeholder: {
      en: 'John Doe',
      tr: 'İsminizi giriniz',
    },
  },
  POLL_TOPIC: {
    en: 'Poll Topic',
    tr: 'Anket Konusu',
    placeholder: {
      en: 'Which comes first? Chicken or egg?',
      tr: 'Menemen soğanlı mı olur soğansız mı?',
    },
  },
  VOTES_PER_PARTICIPANT: {
    en: 'Votes Per Participant',
    tr: 'Katılımcı Başına Oy',
  },
  ROOM_CODE: {
    en: 'Enter Code Provided by "Friend"',
    tr: 'Katılman İçin Verilmiş Kodu Gir',
    placeholder: {
      en: 'XXXXXX',
      tr: 'XXXXXX',
    },
  },
  USERNAME: {
    en: 'Your Name',
    tr: 'Katılımcı',
    placeholder: {
      en: 'John Doe',
      tr: 'İsminizi giriniz',
    },
  },
};

export const Headers = {
  HOMEPAGE: {
    en: 'Wellcome to Pollable',
    tr: "Pollable'a Hoşgeldin",
  },
  POLL_TOPIC: {
    en: 'Poll Topic',
    tr: 'Anket Konusu',
  },
  POLL_ID: {
    en: 'Poll Code',
    tr: 'Anket Kodu',
  },
  RESULTS_PAGE: {
    en: 'Results',
    tr: 'Sonuçlar',
  },
  VOTING_PAGE: {
    en: 'Voting Page',
    tr: 'Oylama Sayfası',
  },
};

export const PollRoomLabels = {
  CANDIDATE: {
    en: 'Candidate',
    tr: 'Aday',
  },
  SCORE: {
    en: 'Score',
    tr: 'Skor',
  },
  VOTES_REMAINING: {
    en: 'Remaining votes: {0}',
    tr: 'Kalan oy sayısı: {0}',
  },
  VOTING_PAGE_SUBHEADING: {
    en: 'Select your top {0} choices in {1} nominated',
    tr: 'Aday gösterilen {1} seçenekten en iyi {0} adayı seç',
  },
  RESULTS_PAGE_SUBHEADING: {
    en: '{0} of {1} participants have voted',
    tr: '{1} katılımcıdan {0} tanesi oy kullandı',
  },
  SHOW_RESULTS_CHECKBOX: {
    en: 'Show momentry results.',
    tr: 'Anlık sonuçları göster.',
  },
  WAITING_POLL_END_MESSAGE: {
    en: 'Waiting for Admin, {0}, to finalize the poll.',
    tr: 'Oda sahibinin, {0}, anketi bitirmesi bekleniyor.',
  },
  NOMINATIONS_REQUIRED: {
    en: '{0} Nominations Required to Start!',
    tr: '{0} Aday olduğunda oylama başlayabilir!',
  },
  WAITING_POLL_START_MESSAGE: {
    en: 'Waiting for Admin, {0}, to start the poll.',
    tr: 'Oda sahibinin, {0}, anketi başlatması bekleniyor.',
  },
  NOMINATION_SUBTITLE: {
    en: 'Nominations',
    tr: 'Adaylar',
  },
};

export const ConfirmationMessages = {
  CONFIRM_BUTTON: {
    en: 'Confirm',
    tr: 'Onayla',
  },
  CANCEL_BUTTON: {
    en: 'Cancel',
    tr: 'İptal',
  },
  SUBMIT_VOTE: {
    en: 'Your selection will be saved and can not change after',
    tr: 'Emin misin? Son kararın mı?',
  },
  CANCEL_POLL: {
    en: 'This will cancel the poll and remove all users',
    tr: 'Anket iptal edilecek ve katılımcılar çıkarılacak',
  },
  END_POLL: {
    en: 'Are you sure close the poll and calculate the results?',
    tr: 'Oylama bitirilecek ve verilmiş olan oylarla sonuçlar kesinleşecek',
  },
  LEAVE_POLL: {
    en: 'You will not access the result after leaving',
    tr: 'Ayrıldıktan sonra sonuçlara erişemeyeceksin',
  },
  REMOVE_PARTICIPANT: {
    en: 'Remove {0} from poll?',
    tr: '{0} isimli katılımcı oylamadan çıkakarılsın mı?',
  },
  LEAVE_WAITING_ROOM: {
    en: 'You are leaving the poll',
    tr: 'Anketten ayrılıyorsunuz!',
  },
};

export const PageLinks = {
  HOMEPAGE: '',
  CREATE_POLL_PAGE: 'createPoll',
  JOIN_POLL_PAGE: 'joinPoll',
  WAITING_ROOM: 'waitingRoom',
  ERROR_PAGE: 'error',
} as const;

export type ButtonColors =
  | 'orange'
  | 'purple'
  | 'blue'
  | 'red'
  | 'green'
  | 'secondary'
  | 'primary';
