const bankCodes = {
  STSA: { name: 'Банка ДСК', swift: 'STSABGSF' },
  BNPA: { name: 'БНП Париба', swift: 'BNPABGSF' },
  FINV: { name: 'Първа Инвестиционна Банка', swift: 'FINVBGSF' },
  BPBI: { name: 'Пощенска Банка', swift: 'BPBIBGSF' },
  UNCR: { name: 'Уникредит Булбанк', swift: 'UNCRBGSF' },
  CECB: { name: 'Централна Кооперативна Банка', swift: 'CECBBGSF' },
  DEMI: { name: 'Търговска Банка Д', swift: 'DEMIBGSF' },
  BGUS: { name: 'Българо-Американска Кредитна Банка', swift: 'BGUSBGSF' },
  BNBG: { name: 'Българска Народна Банка', swift: 'BNBGBGSF' },
  NASB: { name: 'Българска Банка за Развитие', swift: 'NASBBGSF' },
  BUIN: { name: 'Алианц България', swift: 'BUINBGSF' },
  RZBB: { name: 'Обединена Българска Банка', swift: 'RZBBBGSF' },
  UBBS: { name: 'Обединена Българска Банка', swift: 'UBBSBGSF' }
};

export const getBankDetailsFromIban = (iban: string) => {
  const error = iban.length !== 22;
  const bankCode = iban.substring(4, 8);
  const bank = bankCodes[bankCode as keyof typeof bankCodes] || undefined;

  return {
    iban,
    name: error ? '' : bank?.name || '',
    swift: error ? '' : bank?.swift || '',
    error
  };
};
