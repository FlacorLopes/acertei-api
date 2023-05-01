const Collator = new Intl.Collator('pt-br', {
  ignorePunctuation: true,
  sensitivity: 'base',
  usage: 'sort',
});

export { Collator };
