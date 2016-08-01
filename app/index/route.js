import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  model() {
    return RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: {name: '', errors: []}
    });
  },
  actions: {
    createRoom() {
      const data = this.get('currentModel.newRoom');
      const room = this.store.createRecord('room', {name: data.name});
      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => {
        this.get('flashMessages').success(`Created room: ${data.name}`);
        this.set('currentModel.newRoom.name', '');
      }).catch((err) => {
        this.store.unloadRecord(room);
        this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      });
    },
    removeRoom(room) {
      if (window.confirm('Are you sure?')) { // Old school confirmation prompt
        room.destroyRecord().then(() => { // Successful destruction
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => { // Unsuccessful destruction
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
  }
});
