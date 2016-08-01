import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  classNames: ['toasts'],
  flashMessages: inject.service(),
  reversedFlashQueue: computed('flashMessages.arrangedQueue.[]', function() {
    return this.get('flashMessages.arrangedQueue').reverse();
  })
});
