app.intent('ask_for_place', (conv) => {
  conv.ask(new Place(options));
});
