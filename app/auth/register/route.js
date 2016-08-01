import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  flashMessages: inject.service(),
  model() {
    return this.store.createRecord('user');
  },
  actions: {
    doRegister() {
      this.get('currentModel').save().then(() => { 
        this.transitionTo('auth.login'); 
        this.get('flashMessages').send('Logged in!');
      }).catch((resp) => {
        const { errors } = resp;
        this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
      });
    }
  }
});
