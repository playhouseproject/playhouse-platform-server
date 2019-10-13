const {Service} = require.main.require('./helpers/service');

const eventMessages = require.main.require('./data/event-messages.json');

module.exports = class EventLogger extends Service {
  log(eventCode, eventPayload, aloud) {
    const eventTimestamp = Date.now();

    if (aloud && process.env['NODE_ENV'] === 'development') {
      switch (eventCode.split('/')[0]) {
        case '2': {
          console.error(
            renderEventMessage(eventTimestamp, eventCode, eventPayload)
          );

          break;
        }
        case '1': {
          console.warn(
            renderEventMessage(eventTimestamp, eventCode, eventPayload)
          );

          break;
        }
        default: {
          console.info(
            renderEventMessage(eventTimestamp, eventCode, eventPayload)
          );
        }
      }
    }
  }
};

function renderEventMessage(eventTimestamp, eventCode, eventPayload) {
  const eventDayTime = new Date(eventTimestamp).toLocaleTimeString('en-US');

  let result = `${eventDayTime} / ${eventMessages[eventCode]}`;

  if (eventPayload != null) {
    const eventPayloadString = Object.entries(eventPayload)
      .map(entry => entry.join(': '))
      .join(', ');

    result += `/ ${eventPayloadString}`;
  }

  return result;
}
