var links = [
  "https://google.com",
  "https://drive.google.com/drive",
  "https://translate.google.com",
  "https://keep.google.com/",
  "https://mail.google.com/mail/u/0/",
  "https://classroom.google.com/h"
]

Template.initial.events({
  'click .chromeicon': function() {
    var randomint = Math.floor(Math.random() * (links.length - 1));
    window.open(links[randomint], "_blank")
  }
})
