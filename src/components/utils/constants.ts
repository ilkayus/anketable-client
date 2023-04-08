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
