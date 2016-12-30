import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';
import { BrowserPolicy } from 'meteor/browser-policy-common';


// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  BrowserPolicy.content.allowSameOriginForAll();
  BrowserPolicy.content.allowDataUrlForAll();
  BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
  BrowserPolicy.content.allowOriginForAll('https://maps.googleapis.com');
  BrowserPolicy.content.allowImageOrigin("http://res.cloudinary.com");
  BrowserPolicy.content.allowImageOrigin("*.gstatic.com");
  BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");
  BrowserPolicy.content.allowStyleOrigin("https://fonts.googleapis.com");
  BrowserPolicy.content.allowInlineStyles();
  BrowserPolicy.content.allowFontDataUrl();

  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      email: process.env.ADMIN_EMAIL || 'coordinator@gmail.com',
      password: process.env.ADMIN_PWD || 'supersecret',
      role: 'coordinator',
      profile: {
        name: 'Janella London',
        school: 'Aalto University',
        photo: 'https://res.cloudinary.com/aalto/image/upload/v1483015813/default/teacher.png',
        phone: '044 625 9326'
      }
    });
  }
  if (Lists.find().count() === 0) {
    const data = [
      {
        name: 'Aalto Tips',
        items: [
          'Make a lot of friends',
          'Join Aalto Parties',
          'Work hard',
          'Play hard',
          'Do not forget your exam registration',
          'Never back down',
          'Enjoy',
        ],
      },
      {
        name: 'Aalto Associations',
        items: [
          'A!dventures',
          'Aalto Debating Society',
          'Aalto Cocktail',
          'Aalto Beer Pong',
          'AIESEC Aalto',
          'Jury',
          'Otanko ry',
          'Polygame',
          'Tea club chai'
        ],
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Lists.insert({
        name: list.name,
        incompleteCount: list.items.length,
      });

      list.items.forEach((text) => {
        Todos.insert({
          listId,
          text,
          createdAt: new Date(timestamp),
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
